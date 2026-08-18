import { z } from 'zod'

/**
 * Zod-Schema für das Kontaktformular. Wird sowohl client-seitig (optionale
 * Vorabprüfung im Formular) als auch – maßgeblich für die Sicherheit –
 * server-seitig in der API-Route erneut angewendet.
 */
export const kontaktSchema = z.object({
  vorname: z.string().trim().min(1, 'Vorname ist erforderlich.').max(120),
  nachname: z.string().trim().min(1, 'Nachname ist erforderlich.').max(120),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse an.').max(200),
  telefon: z.string().trim().min(3, 'Telefonnummer ist erforderlich.').max(60),
  firma: z.string().trim().max(200).optional().or(z.literal('')),
  betreff: z.string().trim().min(1, 'Betreff ist erforderlich.').max(200),
  nachricht: z.string().trim().min(1, 'Nachricht ist erforderlich.').max(5000),
})

export type Kontaktdaten = z.infer<typeof kontaktSchema>

export type KontaktErgebnis =
  | { erfolg: true }
  | { erfolg: false; fehler: string; feldFehler?: Record<string, string> }
