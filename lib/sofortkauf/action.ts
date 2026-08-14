'use server'

import { getPayload } from 'payload'

import { KANZLEI } from '@/lib/kanzlei-daten'
import { KATEGORIE_LABELS } from '@/lib/katalog'
import config from '@/payload.config'
import {
  DOKUMENT_SLOTS_PRIVATPERSON,
  DOKUMENT_SLOTS_UNTERNEHMEN,
  ERLAUBTE_DOKUMENT_TYPEN,
  MAX_DOKUMENT_GROESSE_BYTES,
  kaeuferdatenSchema,
  type Kaeuferdaten,
  type SofortkaufErgebnis,
} from '@/lib/sofortkauf/schema'
import { sendeInterneBenachrichtigung, sendeKaeuferBestaetigung } from '@/lib/sofortkauf/email'

function formatiertePreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(preis)
}

function textFeld(formData: FormData, name: string): string {
  const wert = formData.get(name)
  return typeof wert === 'string' ? wert : ''
}

/**
 * Server Action für die "Sofortkauf anfragen"-Funktion. Nimmt ausschließlich
 * FormData entgegen (Textfelder + Datei-Uploads) und validiert/lädt jeden
 * sicherheitsrelevanten Wert erneut serverseitig – niemals ungeprüft aus dem
 * Client übernehmen (Produkt, Preis, Status).
 */
export async function sofortkaufAnfrageAction(formData: FormData): Promise<SofortkaufErgebnis> {
  const produktId = textFeld(formData, 'produktId').trim()
  if (!produktId) {
    return { erfolg: false, fehler: 'Es wurde keine Position übermittelt.' }
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Produkt AUSSCHLIESSLICH serverseitig aus Payload laden – niemals
  //    Preis/Status/Titel vom Client übernehmen.
  const produkt = await payload.findByID({
    collection: 'posten',
    id: produktId,
    depth: 0,
    disableErrors: true,
  })

  if (!produkt || produkt.veroeffentlicht !== true) {
    return { erfolg: false, fehler: 'Diese Position wurde nicht gefunden oder ist nicht mehr verfügbar.' }
  }

  if (produkt.status !== 'verfuegbar') {
    return {
      erfolg: false,
      fehler:
        produkt.status === 'reserviert'
          ? 'Diese Position ist bereits reserviert und kann derzeit nicht per Sofortkauf angefragt werden.'
          : 'Diese Position wurde bereits verkauft und kann nicht mehr angefragt werden.',
    }
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
    return { erfolg: false, fehler: 'Bitte überprüfen Sie Ihre Angaben.', feldFehler }
  }

  const kaeufer: Kaeuferdaten = parsed.data

  // 3. Bestätigungs-Checkboxen prüfen
  const bestaetigtRichtig = textFeld(formData, 'bestaetigungRichtigkeit') === 'on'
  const bestaetigtUebermittlung = textFeld(formData, 'bestaetigungUebermittlung') === 'on'
  if (!bestaetigtRichtig || !bestaetigtUebermittlung) {
    return {
      erfolg: false,
      fehler: 'Bitte bestätigen Sie beide Checkboxen, bevor Sie die Kaufanfrage absenden.',
    }
  }

  // 4. Dokumente validieren (Anzahl/Slots abhängig vom Käufertyp, Dateityp, Dateigröße) und
  //    SOFORT serverseitig in den Speicher lesen. Die Dokumente werden bewusst NIEMALS
  //    dauerhaft gespeichert – nicht in Vercel Blob, nicht als Payload-Media/-Relation und
  //    nicht als öffentlich erreichbare URL. Sie existieren ausschließlich als flüchtiger
  //    Buffer innerhalb dieser Funktionsausführung, werden als Resend-E-Mail-Anhang
  //    verwendet und danach mit Beendigung der Funktion automatisch verworfen.
  const erforderlicheSlots =
    kaeufer.kaeuferTyp === 'unternehmen' ? DOKUMENT_SLOTS_UNTERNEHMEN : DOKUMENT_SLOTS_PRIVATPERSON

  const dateien: { slot: string; label: string; dateiname: string; inhalt: Buffer }[] = []
  for (const slot of erforderlicheSlots) {
    const eintrag = formData.get(slot.key)
    if (!(eintrag instanceof File) || eintrag.size === 0) {
      return { erfolg: false, fehler: `Bitte laden Sie das Dokument „${slot.label}“ hoch.` }
    }
    if (eintrag.size > MAX_DOKUMENT_GROESSE_BYTES) {
      return {
        erfolg: false,
        fehler: `Die Datei „${slot.label}“ überschreitet die maximale Größe von ${Math.round(MAX_DOKUMENT_GROESSE_BYTES / (1024 * 1024))} MB.`,
      }
    }
    if (!ERLAUBTE_DOKUMENT_TYPEN.includes(eintrag.type)) {
      return {
        erfolg: false,
        fehler: `Die Datei „${slot.label}“ hat ein nicht unterstütztes Format. Erlaubt sind JPG, JPEG, PNG und PDF.`,
      }
    }
    let inhalt: Buffer
    try {
      inhalt = Buffer.from(await eintrag.arrayBuffer())
    } catch (error) {
      console.error('[v0] Fehler beim Lesen der Datei im Speicher:', error)
      return { erfolg: false, fehler: `Die Datei „${slot.label}“ konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.` }
    }
    dateien.push({ slot: slot.key, label: slot.label, dateiname: eintrag.name, inhalt })
  }

  const preisText = produkt.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof produkt.preis === 'number'
      ? formatiertePreis(produkt.preis)
      : 'Preis auf Anfrage'

  // 5. Interne Benachrichtigung MIT den Dokumenten als E-Mail-Anhang versenden. Dies ist
  //    der EINZIGE Ort, an dem die Identifikationsdokumente ankommen – sie werden an
  //    keiner anderen Stelle gespeichert. Schlägt der Versand fehl, brechen wir die
  //    Anfrage ab, statt die Anfrage ohne die Dokumente "erfolgreich" zu speichern.
  try {
    await sendeInterneBenachrichtigung({
      empfaenger: process.env.SOFORTKAUF_EMPFAENGER_EMAIL || KANZLEI.email.anzeige,
      produktTitel: produkt.titel,
      produktId: produkt.id,
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
    return {
      erfolg: false,
      fehler:
        'Ihre Kaufanfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.',
    }
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
        preis: produkt.preisAufAnfrage ? null : (produkt.preis ?? null),
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

  return { erfolg: true, kaufanfrageId }
}
