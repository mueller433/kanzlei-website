import { z } from 'zod'

/**
 * Zod-Schema für Schritt 1 (Käuferdaten) der Sofortkauf-Anfrage. Wird sowohl
 * client-seitig (Formularvalidierung im Wizard) als auch – maßgeblich für
 * die Sicherheit – server-seitig in der Server Action erneut angewendet.
 */
export const kaeuferTypSchema = z.enum(['privatperson', 'unternehmen'])
export type KaeuferTyp = z.infer<typeof kaeuferTypSchema>

const basisFelder = {
  vorname: z.string().trim().min(1, 'Vorname ist erforderlich.').max(120),
  nachname: z.string().trim().min(1, 'Nachname ist erforderlich.').max(120),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse an.').max(200),
  telefon: z.string().trim().min(3, 'Telefonnummer ist erforderlich.').max(60),
  strasse: z.string().trim().min(1, 'Straße ist erforderlich.').max(160),
  hausnummer: z.string().trim().min(1, 'Hausnummer ist erforderlich.').max(20),
  plz: z.string().trim().min(1, 'PLZ ist erforderlich.').max(20),
  ort: z.string().trim().min(1, 'Ort ist erforderlich.').max(120),
  land: z.string().trim().min(1, 'Land ist erforderlich.').max(120),
  firma: z.string().trim().max(200).optional().or(z.literal('')),
}

export const privatpersonSchema = z.object({
  ...basisFelder,
  kaeuferTyp: z.literal('privatperson'),
})

export const unternehmenSchema = z.object({
  ...basisFelder,
  kaeuferTyp: z.literal('unternehmen'),
  firmenname: z.string().trim().min(1, 'Firmenname ist erforderlich.').max(200),
  handelsregisternummer: z.string().trim().max(80).optional().or(z.literal('')),
  ustIdNr: z.string().trim().max(40).optional().or(z.literal('')),
})

export const kaeuferdatenSchema = z.discriminatedUnion('kaeuferTyp', [
  privatpersonSchema,
  unternehmenSchema,
])

export type Kaeuferdaten = z.infer<typeof kaeuferdatenSchema>

/**
 * Serverseitig erlaubte Dateitypen/-größen für Identifikationsdokumente.
 *
 * WICHTIG (Sicherheit/Datenschutz): Diese Dokumente werden NIEMALS dauerhaft
 * gespeichert – nicht in Vercel Blob, nicht als Payload-Media/-Relation.
 * Sie werden ausschließlich serverseitig im Speicher gelesen, als
 * E-Mail-Anhang per Resend an DPSS Management gesendet und danach verworfen.
 * Die Grenzen berücksichtigen insbesondere das 4,5-MB-Limit für Anfragen an
 * Vercel Functions. Große JPG-/PNG-Fotos werden vor dem Versand im Browser
 * verkleinert; PDFs bleiben unverändert und müssen die Grenzen bereits erfüllen.
 */
export const ERLAUBTE_DOKUMENT_TYPEN = ['image/jpeg', 'image/png', 'application/pdf']
export const MAX_DOKUMENT_GROESSE_BYTES = 2 * 1024 * 1024 // 2 MB je Datei
export const MAX_GESAMT_DOKUMENT_GROESSE_BYTES = Math.floor(3.5 * 1024 * 1024) // 3,5 MB gesamt
export const ZIEL_BILD_GROESSE_BYTES = Math.floor(1.2 * 1024 * 1024) // automatische Foto-Optimierung

export type DokumentSlot = {
  key: string
  label: string
}

export const DOKUMENT_SLOTS_PRIVATPERSON: DokumentSlot[] = [
  { key: 'ausweisVorderseite', label: 'Personalausweis Vorderseite' },
  { key: 'ausweisRueckseite', label: 'Personalausweis Rückseite' },
]

export const DOKUMENT_SLOTS_UNTERNEHMEN: DokumentSlot[] = [
  ...DOKUMENT_SLOTS_PRIVATPERSON,
  { key: 'firmennachweis', label: 'Handelsregisterauszug oder Firmennachweis' },
]

export function dokumentSlotsFuer(kaeuferTyp: KaeuferTyp): DokumentSlot[] {
  return kaeuferTyp === 'unternehmen' ? DOKUMENT_SLOTS_UNTERNEHMEN : DOKUMENT_SLOTS_PRIVATPERSON
}

export type SofortkaufErgebnis =
  | { erfolg: true; kaufanfrageId: string }
  | { erfolg: false; fehler: string; feldFehler?: Record<string, string> }
