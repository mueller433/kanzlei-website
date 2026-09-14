export const MERKLISTE_SCHLUESSEL = 'dpss-merkliste-v1'
export const MERKLISTE_EREIGNIS = 'dpss-merkliste-aktualisiert'
export const MERKLISTE_MAXIMUM = 20

export type MerklistenPosition = {
  id: string
  titel: string
  bildUrl?: string
  preisText?: string
  standort?: string
}

export function leseMerkliste(): MerklistenPosition[] {
  if (typeof window === 'undefined') return []

  try {
    const gespeichert = window.localStorage.getItem(MERKLISTE_SCHLUESSEL)
    if (!gespeichert) return []

    const daten: unknown = JSON.parse(gespeichert)
    if (!Array.isArray(daten)) return []

    return daten
      .filter(
        (eintrag): eintrag is MerklistenPosition =>
          typeof eintrag === 'object' &&
          eintrag !== null &&
          typeof (eintrag as MerklistenPosition).id === 'string' &&
          typeof (eintrag as MerklistenPosition).titel === 'string',
      )
      .slice(0, MERKLISTE_MAXIMUM)
  } catch {
    return []
  }
}

export function speichereMerkliste(positionen: MerklistenPosition[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    MERKLISTE_SCHLUESSEL,
    JSON.stringify(positionen.slice(0, MERKLISTE_MAXIMUM)),
  )
  window.dispatchEvent(new Event(MERKLISTE_EREIGNIS))
}
