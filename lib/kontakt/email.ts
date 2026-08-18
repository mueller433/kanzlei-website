import { Resend } from 'resend'

import { KANZLEI } from '@/lib/kanzlei-daten'
import type { Kontaktdaten } from '@/lib/kontakt/schema'

/**
 * WICHTIG (Sicherheit): Diese Datei läuft ausschließlich serverseitig
 * (Node-Runtime der API-Route). Der RESEND_API_KEY wird niemals an den
 * Client übertragen oder in Client-Komponenten importiert.
 */
function resendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY ist nicht konfiguriert.')
  }
  return new Resend(apiKey)
}

const ABSENDER = 'DPSS Management <kontakt@dpss-management.com>'
const INTERNER_EMPFAENGER = 'kontakt@dpss-management.com'

function escapeHtml(wert: string): string {
  return String(wert)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function zeile(label: string, wert: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#6b6b6b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#1a1a1a;font-size:13px;">${escapeHtml(wert)}</td>
    </tr>`
}

/**
 * Sendet die interne Benachrichtigung über eine neue Kontaktanfrage an das
 * DPSS-Postfach. Enthält alle Formulardaten. Die Antwortadresse (replyTo)
 * ist bewusst die E-Mail-Adresse des Absenders, damit direkt geantwortet
 * werden kann.
 */
export async function sendeInterneKontaktBenachrichtigung(input: {
  kontakt: Kontaktdaten
  zeitstempel: Date
}): Promise<void> {
  const { kontakt, zeitstempel } = input

  const zeilen = [
    zeile('Vorname', kontakt.vorname),
    zeile('Nachname', kontakt.nachname),
    zeile('E-Mail', kontakt.email),
    zeile('Telefon', kontakt.telefon),
  ]
  if (kontakt.firma) zeilen.push(zeile('Unternehmen', kontakt.firma))
  zeilen.push(zeile('Betreff', kontakt.betreff))

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
    <div style="background:#111111;color:#ffffff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a24b;">${escapeHtml(KANZLEI.name)} · Kontaktanfrage</p>
      <h1 style="margin:8px 0 0;font-size:20px;">Neue Kontaktanfrage eingegangen</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${zeilen.join('')}
      </table>

      <h2 style="font-size:15px;margin:0 0 8px;color:#1a1a1a;">Nachricht</h2>
      <p style="font-size:14px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(kontakt.nachricht)}</p>

      <p style="margin-top:24px;font-size:12px;color:#6b6b6b;">
        Eingegangen am ${zeitstempel.toLocaleString('de-DE', { dateStyle: 'long', timeStyle: 'short' })} Uhr.
      </p>
    </div>
  </div>`

  const client = resendClient()
  // WICHTIG: Der Resend-SDK-Aufruf wirft bei einem API-Fehler (z.B. ungültiger
  // Absender/Empfänger, fehlende Domain-Verifizierung) standardmäßig KEINE
  // Exception, sondern liefert ein { data, error }-Objekt zurück. Ohne diese
  // Prüfung würde eine fehlgeschlagene Zustellung fälschlich als Erfolg gewertet.
  const { error } = await client.emails.send({
    from: ABSENDER,
    to: INTERNER_EMPFAENGER,
    replyTo: kontakt.email,
    subject: `Neue Kontaktanfrage – ${kontakt.betreff}`,
    html,
  })
  if (error) {
    throw new Error(`Resend-Versand der internen Kontakt-Benachrichtigung fehlgeschlagen: ${error.message}`)
  }
}

/**
 * Sendet die Bestätigungs-E-Mail an den Absender der Kontaktanfrage. Diese
 * E-Mail bestätigt bewusst nur den erfolgreichen Eingang der Anfrage.
 */
export async function sendeKontaktBestaetigung(input: {
  empfaenger: string
  vorname: string
  betreff: string
}): Promise<void> {
  const { empfaenger, vorname, betreff } = input

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#111111;color:#ffffff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a24b;">${escapeHtml(KANZLEI.name)}</p>
      <h1 style="margin:8px 0 0;font-size:20px;">Ihre Nachricht ist eingegangen</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;font-size:14px;color:#1a1a1a;line-height:1.6;">
      <p>Guten Tag ${escapeHtml(vorname)},</p>
      <p>vielen Dank für Ihre Nachricht zum Betreff „${escapeHtml(betreff)}“. Ihre Anfrage wurde erfolgreich an ${escapeHtml(KANZLEI.name)} übermittelt. Wir melden uns zeitnah bei Ihnen zurück.</p>
      <p style="margin-top:24px;">Mit freundlichen Grüßen<br />${escapeHtml(KANZLEI.name)}</p>
    </div>
  </div>`

  const client = resendClient()
  const { error } = await client.emails.send({
    from: ABSENDER,
    to: empfaenger,
    subject: 'Ihre Kontaktanfrage bei DPSS Management',
    html,
  })
  if (error) {
    throw new Error(`Resend-Versand der Kontakt-Bestätigung fehlgeschlagen: ${error.message}`)
  }
}
