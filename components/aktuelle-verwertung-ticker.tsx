'use client'

import { useEffect, useState } from 'react'

export type TickerEintrag = {
  label: string
  sub: string
}

/**
 * Sehr zurückhaltende "Live"-Anzeige laufender Verwertungen im Hero.
 * Nutzt ausschließlich die vom Server übergebenen, echten Katalogdaten
 * (keine erfundenen Inhalte). Wechselt alle 6 Sekunden zum nächsten
 * Eintrag; das eigentliche Ein-/Ausblenden erfolgt rein per CSS-Animation
 * (siehe styles.css `.ticker-eintrag`), synchron zur Intervall-Dauer.
 */
export function AktuelleVerwertungTicker({ eintraege }: { eintraege: TickerEintrag[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (eintraege.length <= 1) return
    const intervall = setInterval(() => {
      setIndex((aktuell) => (aktuell + 1) % eintraege.length)
    }, 6000)
    return () => clearInterval(intervall)
  }, [eintraege.length])

  if (eintraege.length === 0) return null

  const aktuelle = eintraege[index]

  return (
    <div className="mt-9 flex items-center gap-4" aria-live="polite">
      <span className="ticker-punkt inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <div key={index} className="ticker-eintrag flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Aktuelle Verwertung
        </span>
        <span className="text-sm font-medium text-foreground">{aktuelle.label}</span>
        <span className="text-sm text-muted-foreground">· {aktuelle.sub}</span>
      </div>
    </div>
  )
}
