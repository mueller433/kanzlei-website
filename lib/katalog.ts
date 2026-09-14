import type { Media, Posten } from '@/payload-types'

/**
 * Gemeinsame Konstanten und Helfer für die Katalog-Filterung.
 * Bewusst ohne neue Felder/DB – alle Werte entsprechen den bestehenden
 * `select`-Optionen der Collection `posten` (collections/Posten.ts).
 */

export const KATEGORIE_REIHENFOLGE = [
  'smartphones',
  'maschinen',
  'fahrzeuge',
  'it-bueroelektronik',
  'sonstiges',
  'gastronomie',
  'moebel-einrichtung',
  'energie-gebaeudetechnik',
  'lager-logistik-reinigung',
] as const

export type Kategorie = (typeof KATEGORIE_REIHENFOLGE)[number]

export const KATEGORIE_LABELS: Record<Kategorie, string> = {
  smartphones: 'Smartphones & Mobilgeräte',
  maschinen: 'Maschinen',
  fahrzeuge: 'Fahrzeuge',
  'it-bueroelektronik': 'IT & Büroelektronik',
  sonstiges: 'Sonstiges',
  gastronomie: 'Gastronomie',
  'moebel-einrichtung': 'Möbel & Einrichtung',
  'energie-gebaeudetechnik': 'Energie & Gebäudetechnik',
  'lager-logistik-reinigung': 'Lager, Logistik & Reinigung',
}

export const ZUSTAND_REIHENFOLGE = ['neu', 'gebraucht', 'restbestand'] as const

export type Zustand = (typeof ZUSTAND_REIHENFOLGE)[number]

export const ZUSTAND_LABELS: Record<Zustand, string> = {
  neu: 'Neu',
  gebraucht: 'Gebraucht',
  restbestand: 'Restbestand',
}

export type PreisRange = {
  key: string
  label: string
  min: number | null
  max: number | null
}

/**
 * Preisspannen für den Filter. `min`/`max` in Euro; `null` = offene Grenze.
 * Werden in der Payload-where-Klausel zu greater_than_equal / less_than_equal.
 */
export const PREIS_RANGES: PreisRange[] = [
  { key: 'bis-500', label: 'bis 500 €', min: null, max: 500 },
  { key: '500-2000', label: '500 – 2.000 €', min: 500, max: 2000 },
  { key: '2000-10000', label: '2.000 – 10.000 €', min: 2000, max: 10000 },
  { key: 'ab-10000', label: 'über 10.000 €', min: 10000, max: null },
]

export type SortOption = {
  key: string
  label: string
  /** Wert für den `sort`-Parameter von payload.find() */
  sort: string
}

export const SORT_OPTIONS: SortOption[] = [
  { key: 'neu', label: 'Neueste zuerst', sort: '-createdAt' },
  { key: 'preis-auf', label: 'Preis: aufsteigend', sort: 'preis' },
  { key: 'preis-ab', label: 'Preis: absteigend', sort: '-preis' },
  { key: 'titel', label: 'Titel: A–Z', sort: 'titel' },
]

/** Normalisiert einen searchParam-Wert (string | string[] | undefined) zu string[]. */
export function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const UMSATZSTEUER_SATZ = 0.19

/**
 * Berechnet aus dem im CMS gepflegten Nettopreis den Bruttopreis und rundet
 * erst das Endergebnis auf den nächsten vollen 100-Euro-Betrag auf.
 */
export function gerundeterBruttopreis(preisNetto: number): number {
  const bruttoInCent = Math.round(preisNetto * 100 * (1 + UMSATZSTEUER_SATZ))
  return Math.ceil(bruttoInCent / 10_000) * 100
}

/** Einheitliche, kaufmännische Preisausgabe für alle öffentlichen Ansichten. */
export function formatierterBruttopreis(preisNetto: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(gerundeterBruttopreis(preisNetto))
}

export type Status = 'verfuegbar' | 'reserviert' | 'verkauft'

export const STATUS_LABELS: Record<Status, string> = {
  verfuegbar: 'Verfügbar',
  reserviert: 'Reserviert',
  verkauft: 'Verkauft',
}

/** Darstellungsvariante der Ergebnisliste. Rein clientseitige Präsentation – keine Datenlogik. */
export const ANSICHT_REIHENFOLGE = ['liste', 'karten'] as const
export type Ansicht = (typeof ANSICHT_REIHENFOLGE)[number]

export const ANSICHT_LABELS: Record<Ansicht, string> = {
  liste: 'Liste',
  karten: 'Karten',
}

/**
 * Baut einen Katalog-Query-String aus den aktuellen searchParams, wobei
 * einzelne Schlüssel gezielt überschrieben werden können. `null` entfernt
 * den Schlüssel vollständig (z. B. Kategorie-Pill "Alle"), `undefined`
 * übernimmt den bestehenden Wert unverändert. Dient ausschließlich der
 * Navigation zwischen Filterzuständen – die Filterlogik selbst bleibt in
 * der Katalogseite unverändert.
 */
/**
 * Liefert die URL des ersten hinterlegten Bildes eines Postens, sofern
 * vorhanden und als aufgelöstes Media-Objekt vorliegt (erfordert `depth: 1`
 * in der Payload-Abfrage). Verwendet ausschließlich das bestehende
 * Upload-Feld `bilder` der Collection `posten` – keine neue Datenstruktur.
 */
export function ersteBildUrl(bilder: Posten['bilder']): string | null {
  const erste = bilder?.find(
    (eintrag): eintrag is Media => typeof eintrag === 'object' && eintrag !== null,
  )
  return typeof erste?.url === 'string' ? erste.url : null
}

export function buildKatalogQuery(
  sp: { [key: string]: string | string[] | undefined },
  overrides: Record<string, string | string[] | null | undefined> = {},
): string {
  const params = new URLSearchParams()
  const schluessel = ['q', 'kategorie', 'zustand', 'preis', 'sort', 'ansicht']

  for (const key of schluessel) {
    const override = overrides[key]
    const wert = key in overrides ? override : sp[key]
    if (wert === null || wert === undefined) continue
    const liste = Array.isArray(wert) ? wert : [wert]
    for (const eintrag of liste) {
      if (eintrag) params.append(key, eintrag)
    }
  }

  return params.toString()
}
