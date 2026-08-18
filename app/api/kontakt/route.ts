import { sendeInterneKontaktBenachrichtigung, sendeKontaktBestaetigung } from '@/lib/kontakt/email'
import { kontaktSchema, type Kontaktdaten, type KontaktErgebnis } from '@/lib/kontakt/schema'

// Diese Route läuft ausschließlich serverseitig (Node-Runtime). Der
// RESEND_API_KEY wird hier verwendet, aber niemals an den Client übertragen.
// Der Client sendet ausschließlich ein normales multipart/form-data per
// fetch() an diese Route – keine React Server Action. Es wird bewusst KEINE
// Payload-Collection verwendet und KEINE Nachricht in der Datenbank
// gespeichert; die Kontaktanfrage existiert ausschließlich als E-Mail.
export const runtime = 'nodejs'

function textFeld(formData: FormData, name: string): string {
  const wert = formData.get(name)
  return typeof wert === 'string' ? wert : ''
}

function fehlerAntwort(ergebnis: KontaktErgebnis & { erfolg: false }, status: number) {
  return Response.json(ergebnis, { status })
}

export async function POST(request: Request): Promise<Response> {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (error) {
    console.error('[v0] Konnte eingehende Kontaktanfrage nicht als FormData lesen:', error)
    return fehlerAntwort(
      { erfolg: false, fehler: 'Die Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.' },
      400,
    )
  }

  const rohdaten = {
    vorname: textFeld(formData, 'vorname'),
    nachname: textFeld(formData, 'nachname'),
    email: textFeld(formData, 'email'),
    telefon: textFeld(formData, 'telefon'),
    firma: textFeld(formData, 'firma'),
    betreff: textFeld(formData, 'betreff'),
    nachricht: textFeld(formData, 'nachricht'),
  }

  const parsed = kontaktSchema.safeParse(rohdaten)
  if (!parsed.success) {
    const feldFehler: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const pfad = issue.path.join('.')
      if (pfad && !feldFehler[pfad]) feldFehler[pfad] = issue.message
    }
    return fehlerAntwort({ erfolg: false, fehler: 'Bitte überprüfen Sie Ihre Angaben.', feldFehler }, 400)
  }

  const kontakt: Kontaktdaten = parsed.data

  // 1. Interne Benachrichtigung an DPSS Management senden. Schlägt der
  //    Versand fehl, brechen wir ab, statt die Anfrage fälschlich als
  //    erfolgreich zu melden.
  try {
    await sendeInterneKontaktBenachrichtigung({ kontakt, zeitstempel: new Date() })
  } catch (error) {
    console.error('[v0] Interne Kontakt-Benachrichtigung konnte nicht versendet werden:', error)
    return fehlerAntwort(
      {
        erfolg: false,
        fehler:
          'Ihre Nachricht konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.',
      },
      502,
    )
  }

  // 2. Bestätigungs-E-Mail an den Absender. Ein Fehlschlag hier darf die
  //    bereits erfolgreich übermittelte Anfrage nicht als Fehler zurückgeben.
  try {
    await sendeKontaktBestaetigung({
      empfaenger: kontakt.email,
      vorname: kontakt.vorname,
      betreff: kontakt.betreff,
    })
  } catch (error) {
    console.error('[v0] Bestätigungs-E-Mail an den Absender konnte nicht versendet werden:', error)
  }

  const ergebnis: KontaktErgebnis = { erfolg: true }
  return Response.json(ergebnis, { status: 200 })
}
