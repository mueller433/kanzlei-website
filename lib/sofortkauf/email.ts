import { Resend } from 'resend'

import { KANZLEI } from '@/lib/kanzlei-daten'
import type { Kaeuferdaten } from '@/lib/sofortkauf/schema'

/**
 * WICHTIG (Sicherheit): Diese Datei läuft ausschließlich serverseitig
 * (Server Action / Node-Runtime). Der RESEND_API_KEY wird niemals an den
 * Client übertragen oder in Client-Komponenten importiert.
 */
function resendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY ist nicht konfiguriert.')
  }
  return new Resend(apiKey)
}

// Ohne verifizierte eigene Domain in Resend kann optional über
// RESEND_FROM_EMAIL eine geprüfte Absenderadresse gesetzt werden. Standard
// ist Resends Test-Absender, der ohne Domain-Verifizierung funktioniert.
const ABSENDER = process.env.RESEND_FROM_EMAIL || 'DPSS Sofortkauf <onboarding@resend.dev>'

function escapeHtml(wert: string): string {
  return wert
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

type InterneBenachrichtigungInput = {
  empfaenger: string
  produktTitel: string
  produktId: string
  preisText: string
  kategorie: string
  standort: string
  kaeuferTyp: 'privatperson' | 'unternehmen'
  kaeufer: Kaeuferdaten
  identifikationsstatus: string
  dokumente: { bezeichnung: string; dateiname: string }[]
  zeitstempel: Date
}

/** Sendet die interne Benachrichtigung an das DPSS-Postfach mit allen Details. */
export async function sendeInterneBenachrichtigung(input: InterneBenachrichtigungInput): Promise<void> {
  const {
    empfaenger,
    produktTitel,
    produktId,
    preisText,
    kategorie,
    standort,
    kaeuferTyp,
    kaeufer,
    identifikationsstatus,
    dokumente,
    zeitstempel,
  } = input

  const kaeuferZeilen = [
    zeile('Käufertyp', kaeuferTyp === 'unternehmen' ? 'Unternehmen / Gewerbe' : 'Privatperson'),
    zeile('Name', `${kaeufer.vorname} ${kaeufer.nachname}`),
    zeile('E-Mail', kaeufer.email),
    zeile('Telefon', kaeufer.telefon),
    zeile('Adresse', `${kaeufer.strasse} ${kaeufer.hausnummer}, ${kaeufer.plz} ${kaeufer.ort}, ${kaeufer.land}`),
  ]

  if (kaeufer.firma) kaeuferZeilen.push(zeile('Firma (allgemein)', kaeufer.firma))

  const firmenZeilen: string[] = []
  if (kaeufer.kaeuferTyp === 'unternehmen') {
    firmenZeilen.push(zeile('Firmenname', kaeufer.firmenname))
    if (kaeufer.handelsregisternummer) firmenZeilen.push(zeile('Handelsregisternummer', kaeufer.handelsregisternummer))
    if (kaeufer.ustIdNr) firmenZeilen.push(zeile('USt-IdNr.', kaeufer.ustIdNr))
  }

  const dokumenteListe =
    dokumente.length > 0
      ? `<ul style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#1a1a1a;">${dokumente
          .map((d) => `<li>${escapeHtml(d.bezeichnung)}: ${escapeHtml(d.dateiname)}</li>`)
          .join('')}</ul>`
      : '<p style="font-size:13px;color:#6b6b6b;margin:8px 0 0;">Keine Dokumente hochgeladen.</p>'

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
    <div style="background:#111111;color:#ffffff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a24b;">DPSS Management · Sofortkauf-Anfrage</p>
      <h1 style="margin:8px 0 0;font-size:20px;">Neue Sofortkauf-Anfrage eingegangen</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;">
      <h2 style="font-size:15px;margin:0 0 8px;color:#1a1a1a;">Produkt</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${zeile('Produktname', produktTitel)}
        ${zeile('Produkt-ID', produktId)}
        ${zeile('Preis', preisText)}
        ${zeile('Kategorie', kategorie)}
        ${zeile('Standort', standort)}
      </table>

      <h2 style="font-size:15px;margin:0 0 8px;color:#1a1a1a;">Käuferdaten</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${kaeuferZeilen.join('')}
      </table>

      ${
        firmenZeilen.length > 0
          ? `<h2 style="font-size:15px;margin:0 0 8px;color:#1a1a1a;">Firmendaten</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${firmenZeilen.join('')}
      </table>`
          : ''
      }

      <h2 style="font-size:15px;margin:0 0 8px;color:#1a1a1a;">Identifikation</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        ${zeile('Status', identifikationsstatus)}
      </table>
      ${dokumenteListe}

      <p style="margin-top:24px;font-size:12px;color:#6b6b6b;">
        Eingegangen am ${zeitstempel.toLocaleString('de-DE', { dateStyle: 'long', timeStyle: 'short' })} Uhr.<br />
        Die Dokumente wurden privat und nicht öffentlich zugänglich abgelegt. Prüfung bitte im Payload-Admin unter „Kaufanfragen“.
      </p>
    </div>
  </div>`

  const client = resendClient()
  await client.emails.send({
    from: ABSENDER,
    to: empfaenger,
    subject: `Neue Sofortkauf-Anfrage: ${produktTitel}`,
    html,
  })
}

type KaeuferBestaetigungInput = {
  empfaenger: string
  vorname: string
  produktTitel: string
  preisText: string
}

/**
 * Sendet die Bestätigungs-E-Mail an den Käufer. Enthält bewusst KEINE
 * sensiblen Identifikationsdokumente oder deren Inhalte.
 */
export async function sendeKaeuferBestaetigung(input: KaeuferBestaetigungInput): Promise<void> {
  const { empfaenger, vorname, produktTitel, preisText } = input

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#111111;color:#ffffff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a24b;">${escapeHtml(KANZLEI.name)}</p>
      <h1 style="margin:8px 0 0;font-size:20px;">Ihre Sofortkauf-Anfrage ist eingegangen</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;font-size:14px;color:#1a1a1a;line-height:1.6;">
      <p>Guten Tag ${escapeHtml(vorname)},</p>
      <p>vielen Dank für Ihre Sofortkauf-Anfrage zu folgender Position:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${zeile('Produkt', produktTitel)}
        ${zeile('Preis', preisText)}
      </table>
      <p>
        Wir prüfen Ihre Angaben und die eingereichten Unterlagen und melden uns in Kürze bei Ihnen,
        um die weiteren Schritte zum Kaufabschluss zu besprechen.
      </p>
      <p>
        Bei Rückfragen erreichen Sie uns unter
        <a href="${KANZLEI.email.href}" style="color:#c9a24b;">${escapeHtml(KANZLEI.email.anzeige)}</a>
        oder telefonisch unter ${escapeHtml(KANZLEI.telefon.anzeige)}.
      </p>
      <p style="margin-top:24px;">Mit freundlichen Grüßen<br />${escapeHtml(KANZLEI.name)}</p>
    </div>
  </div>`

  const client = resendClient()
  await client.emails.send({
    from: ABSENDER,
    to: empfaenger,
    subject: `Ihre Sofortkauf-Anfrage: ${produktTitel}`,
    html,
  })
}
