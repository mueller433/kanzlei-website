import React from 'react'

export type Schritt = {
  schritt: string
  titel: string
  beschreibung: string
}

/**
 * Nummerierte Vorgehensweise (01–0n) im etablierten Muster:
 * Bordeaux-Ziffer, Serif-Titel über Trennlinie, gedämpfter Fließtext.
 * Wird auf Startseite und Leistungsseiten wiederverwendet, damit die
 * "Vorgehensweise" überall dieselbe Formensprache hat.
 */
export function ProzessSchritte({ schritte }: { schritte: readonly Schritt[] }) {
  const spalten =
    schritte.length === 3 ? 'lg:grid-cols-3' : schritte.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
  return (
    <ol className={`grid grid-cols-1 gap-10 sm:grid-cols-2 ${spalten}`}>
      {schritte.map((s) => (
        <li key={s.schritt} className="flex flex-col gap-3">
          <span className="font-serif text-2xl text-accent">{s.schritt}</span>
          <span className="border-t border-border pt-4 font-serif text-xl text-foreground">
            {s.titel}
          </span>
          <p className="text-base leading-relaxed text-muted-foreground text-pretty">
            {s.beschreibung}
          </p>
        </li>
      ))}
    </ol>
  )
}
