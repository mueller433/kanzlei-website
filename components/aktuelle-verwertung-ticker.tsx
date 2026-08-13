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
    <div className="mt-10 border-t border-border pt-6" aria-live="polite">
      <p className="mb-4 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span className="ticker-punkt inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Aktuelle Verwertung
      </p>
      <div key={index} className="ticker-eintrag min-h-[2.75rem]">
        <p className="text-sm font-medium text-foreground">{aktuelle.label}</p>
        <p className="text-sm text-muted-foreground">{aktuelle.sub}</p>
      </div>
    </div>
  )
}
