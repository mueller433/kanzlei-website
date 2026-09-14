import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { KANZLEI } from '@/lib/kanzlei-daten'
import { formatierterBruttopreis, gerundeterBruttopreis, KATEGORIE_LABELS } from '@/lib/katalog'
import { sendeInterneBenachrichtigung, sendeKaeuferBestaetigung } from '@/lib/sofortkauf/email'
import {
  DOKUMENT_SLOTS_PRIVATPERSON,
  DOKUMENT_SLOTS_UNTERNEHMEN,
  ERLAUBTE_DOKUMENT_TYPEN,
  MAX_DOKUMENT_GROESSE_BYTES,
  kaeuferdatenSchema,
  type Kaeuferdaten,
  type SofortkaufErgebnis,
} from '@/lib/sofortkauf/schema'

// Diese Route läuft ausschließlich serverseitig (Node-Runtime). RESEND_API_KEY
// und die Payload Local API werden hier verwendet, aber niemals an den Client
// übertragen. Der Client sendet ausschließlich ein normales multipart/form-data
// per fetch() an diese Route – keine React Server Action mehr für den finalen Submit.
export const runtime = 'nodejs'

function textFeld(formData: FormData, name: string): string {
  const wert = formData.get(name)
  return typeof wert === 'string' ? wert : ''
}

function fehlerAntwort(ergebnis: SofortkaufErgebnis & { erfolg: false }, status: number) {
  return Response.json(ergebnis, { status })
}

export async function POST(request: Request): Promise<Response> {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (error) {
    console.error('[v0] Konnte eingehende Anfrage nicht als FormData lesen:', error)
    return fehlerAntwort(
      { erfolg: false, fehler: 'Die Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.' },
      400,
    )
  }

  const produktId = textFeld(formData, 'produktId').trim()
  if (!produktId) {
    return fehlerAntwort({ erfolg: false, fehler: 'Es wurde keine Position übermittelt.' }, 400)
  }

  const payload = await getPayload({ config: configPromise })

  // 1. Produkt AUSSCHLIESSLICH serverseitig aus Payload laden – niemals
  //    Preis/Status/Titel vom Client übernehmen.
  const produkt = await payload.findByID({
    collection: 'posten',
    id: produktId,
    depth: 0,
    disableErrors: true,
  })

  if (!produkt || produkt.veroeffentlicht !== true) {
    return fehlerAntwort(
      { erfolg: false, fehler: 'Diese Position wurde nicht gefunden oder ist nicht mehr verfügbar.' },
      404,
    )
  }

  if (produkt.status !== 'verfuegbar') {
    return fehlerAntwort(
      {
        erfolg: false,
        fehler:
          produkt.status === 'reserviert'
            ? 'Diese Position ist bereits reserviert und kann derzeit nicht per Sofortkauf angefragt werden.'
            : 'Diese Position wurde bereits verkauft und kann nicht mehr angefragt werden.',
      },
      409,
    )
  }

  // 2. Käuferdaten validieren
  const kaeuferTypRoh = textFeld(formData, 'kaeuferTyp')
  const rohdaten = {
    kaeuferTyp: kaeuferTypRoh,
    vorname: textFeld(formData, 'vorname'),
    nachname: textFeld(formData, 'nachname'),
    email: textFeld(formData, 'email'),
    telefon: textFeld(formData, 'telefon'),
    strasse: textFeld(formData, 'strasse'),
    hausnummer: textFeld(formData, 'hausnummer'),
    plz: textFeld(formData, 'plz'),
    ort: textFeld(formData, 'ort'),
    land: textFeld(formData, 'land'),
    firma: textFeld(formData, 'firma'),
    firmenname: textFeld(formData, 'firmenname'),
    handelsregisternummer: textFeld(formData, 'handelsregisternummer'),
    ustIdNr: textFeld(formData, 'ustIdNr'),
  }

  const parsed = kaeuferdatenSchema.safeParse(rohdaten)
  if (!parsed.success) {
    const feldFehler: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const pfad = issue.path.join('.')
      if (pfad && !feldFehler[pfad]) feldFehler[pfad] = issue.message
    }
    return fehlerAntwort({ erfolg: false, fehler: 'Bitte überprüfen Sie Ihre Angaben.', feldFehler }, 400)
  }

  const kaeufer: Kaeuferdaten = parsed.data

  // 3. Bestätigungs-Checkboxen prüfen
  const bestaetigtRichtig = textFeld(formData, 'bestaetigungRichtigkeit') === 'on'
  const bestaetigtUebermittlung = textFeld(formData, 'bestaetigungUebermittlung') === 'on'
  if (!bestaetigtRichtig || !bestaetigtUebermittlung) {
    return fehlerAntwort(
      {
        erfolg: false,
        fehler: 'Bitte bestätigen Sie beide Checkboxen, bevor Sie die Kaufanfrage absenden.',
      },
      400,
    )
  }

  // 4. Dokumente validieren (Anzahl/Slots abhängig vom Käufertyp, Dateityp, Dateigröße) und
  //    SOFORT serverseitig in den Speicher lesen. Die Dokumente werden bewusst NIEMALS
  //    dauerhaft gespeichert – nicht in Vercel Blob, nicht als Payload-Media/-Relation und
  //    nicht als öffentlich erreichbare URL. Sie existieren ausschließlich als flüchtiger
  //    Buffer innerhalb dieser Request-Ausführung, werden als Resend-E-Mail-Anhang
  //    verwendet und danach mit Beendigung der Anfrage automatisch verworfen.
  const erforderlicheSlots =
    kaeufer.kaeuferTyp === 'unternehmen' ? DOKUMENT_SLOTS_UNTERNEHMEN : DOKUMENT_SLOTS_PRIVATPERSON

  const dateien: { slot: string; label: string; dateiname: string; inhalt: Buffer }[] = []
  for (const slot of erforderlicheSlots) {
    const eintrag = formData.get(slot.key)
    if (!(eintrag instanceof File) || eintrag.size === 0) {
      return fehlerAntwort({ erfolg: false, fehler: `Bitte laden Sie das Dokument „${slot.label}“ hoch.` }, 400)
    }
    if (eintrag.size > MAX_DOKUMENT_GROESSE_BYTES) {
      return fehlerAntwort(
        {
          erfolg: false,
          fehler: `Die Datei „${slot.label}“ überschreitet die maximale Größe von ${Math.round(MAX_DOKUMENT_GROESSE_BYTES / (1024 * 1024))} MB.`,
        },
        413,
      )
    }
    if (!ERLAUBTE_DOKUMENT_TYPEN.includes(eintrag.type)) {
      return fehlerAntwort(
        {
          erfolg: false,
          fehler: `Die Datei „${slot.label}“ hat ein nicht unterstütztes Format. Erlaubt sind JPG, JPEG, PNG und PDF.`,
        },
        400,
      )
    }
    let inhalt: Buffer
    try {
      inhalt = Buffer.from(await eintrag.arrayBuffer())
    } catch (error) {
      console.error('[v0] Fehler beim Lesen der Datei im Speicher:', error)
      return fehlerAntwort(
        { erfolg: false, fehler: `Die Datei „${slot.label}“ konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.` },
        400,
      )
    }
    dateien.push({ slot: slot.key, label: slot.label, dateiname: eintrag.name, inhalt })
  }

  const preisText = produkt.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof produkt.preis === 'number'
      ? formatierterBruttopreis(produkt.preis)
      : 'Preis auf Anfrage'

  // 5. Interne Benachrichtigung MIT den Dokumenten als E-Mail-Anhang versenden. Dies ist
  //    der EINZIGE Ort, an dem die Identifikationsdokumente ankommen – sie werden an
  //    keiner anderen Stelle gespeichert. Schlägt der Versand fehl, brechen wir die
  //    Anfrage ab, statt die Anfrage ohne die Dokumente "erfolgreich" zu speichern.
  try {
    await sendeInterneBenachrichtigung({
      empfaenger: process.env.SOFORTKAUF_EMPFAENGER_EMAIL || KANZLEI.email.anzeige,
      produktTitel: produkt.titel,
      produktId: String(produkt.id),
      preisText,
      kategorie: KATEGORIE_LABELS[produkt.kategorie],
      standort: produkt.standort || 'Nicht angegeben',
      kaeuferTyp: kaeufer.kaeuferTyp,
      kaeufer,
      identifikationsstatus: 'Eingegangen',
      dokumente: dateien.map((d) => ({ bezeichnung: d.label, dateiname: d.dateiname })),
      anhaenge: dateien.map((d) => ({ dateiname: d.dateiname, inhalt: d.inhalt })),
      zeitstempel: new Date(),
    })
  } catch (error) {
    console.error('[v0] Interne Benachrichtigungs-E-Mail (mit Dokumenten) konnte nicht versendet werden:', error)
    return fehlerAntwort(
      {
        erfolg: false,
        fehler:
          'Ihre Kaufanfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.',
      },
      502,
    )
  }

  // 6. Kaufanfrage als reinen Metadaten-Eintrag in Payload anlegen (Local API umgeht
  //    Access-Control standardmäßig). Es werden ausschließlich Käufer- und
  //    Produktangaben sowie die Bezeichnung der eingereichten Dokumente gespeichert –
  //    NIEMALS die Dateien oder deren Inhalt selbst. Ein Fehler hier darf die bereits
  //    erfolgreich per E-Mail übermittelte Anfrage nicht als Fehlschlag an den Käufer
  //    zurückgeben, da DPSS Management die Anfrage inklusive Dokumenten bereits erhalten hat.
  const adresse = {
    strasse: kaeufer.strasse,
    hausnummer: kaeufer.hausnummer,
    plz: kaeufer.plz,
    ort: kaeufer.ort,
    land: kaeufer.land,
  }

  let kaufanfrageId: string
  try {
    const angelegt = await payload.create({
      collection: 'kaufanfragen',
      data: {
        produkt: produkt.id,
        produktTitel: produkt.titel,
        produktKategorie: KATEGORIE_LABELS[produkt.kategorie],
        produktStandort: produkt.standort || '',
        preis:
          produkt.preisAufAnfrage || typeof produkt.preis !== 'number'
            ? null
            : gerundeterBruttopreis(produkt.preis),
        kaeuferTyp: kaeufer.kaeuferTyp,
        vorname: kaeufer.vorname,
        nachname: kaeufer.nachname,
        email: kaeufer.email,
        telefon: kaeufer.telefon,
        adresse,
        firma: kaeufer.firma || '',
        firmenname: kaeufer.kaeuferTyp === 'unternehmen' ? kaeufer.firmenname : '',
        handelsregisternummer:
          kaeufer.kaeuferTyp === 'unternehmen' ? kaeufer.handelsregisternummer || '' : '',
        ustIdNr: kaeufer.kaeuferTyp === 'unternehmen' ? kaeufer.ustIdNr || '' : '',
        eingereichteDokumente: dateien.map((d) => ({ bezeichnung: d.label, dateiname: d.dateiname })),
        identifikationsstatus: 'eingegangen',
        status: 'neu',
      },
    })
    kaufanfrageId = String(angelegt.id)
  } catch (error) {
    console.error('[v0] Fehler beim Speichern der Kaufanfrage in Payload (Metadaten):', error)
    // Die Anfrage inkl. Dokumenten ist bereits per E-Mail bei DPSS Management eingegangen.
    // Der Admin-Datensatz ist nur eine Nachverfolgungshilfe, daher hier kein Abbruch.
    kaufanfrageId = crypto.randomUUID()
  }

  // 7. Bestätigungs-E-Mail an den Käufer (OHNE Dokumente/Anhänge). Ein Fehlschlag hier
  //    darf die bereits erfolgreich übermittelte Anfrage nicht als Fehler zurückgeben.
  try {
    await sendeKaeuferBestaetigung({
      empfaenger: kaeufer.email,
      vorname: kaeufer.vorname,
      produktTitel: produkt.titel,
    })
  } catch (error) {
    console.error('[v0] Bestätigungs-E-Mail an den Käufer konnte nicht versendet werden:', error)
  }

  const ergebnis: SofortkaufErgebnis = { erfolg: true, kaufanfrageId }
  return Response.json(ergebnis, { status: 200 })
}
