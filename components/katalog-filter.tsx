import React from 'react'

import {
  KATEGORIE_LABELS,
  KATEGORIE_REIHENFOLGE,
  PREIS_RANGES,
  ZUSTAND_LABELS,
  ZUSTAND_REIHENFOLGE,
} from '@/lib/katalog'

/**
 * Filter-Sidebar der Katalogseite. Reine Server-Component ohne Client-State:
 * Alle Steuerelemente sind native Formularfelder innerhalb eines
 * <form method="get"> (im übergeordneten Seiten-Layout), sodass die Auswahl
 * kombinierbar und als URL teilbar ist.
 */
export function KatalogFilter({
  q,
  selectedKategorien,
  selectedZustaende,
  selectedPreis,
  kategorieCounts,
}: {
  q: string
  selectedKategorien: string[]
  selectedZustaende: string[]
  selectedPreis: string
  kategorieCounts: Record<string, number>
}) {
  return (
    <aside className="flex flex-col gap-9 lg:sticky lg:top-24 lg:self-start">
      {/* Freitextsuche über den Titel */}
      <div>
        <label
          htmlFor="q"
          className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          Suche
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Titel durchsuchen …"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      {/* Kategorie – Mehrfachauswahl mit Trefferzahl je Kategorie */}
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Kategorie
        </legend>
        <div className="flex flex-col gap-2.5">
          {KATEGORIE_REIHENFOLGE.map((kategorie) => (
            <label
              key={kategorie}
              className="flex items-center justify-between gap-3 text-sm text-foreground"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  name="kategorie"
                  value={kategorie}
                  defaultChecked={selectedKategorien.includes(kategorie)}
                  className="h-4 w-4 shrink-0 accent-accent"
                />
                {KATEGORIE_LABELS[kategorie]}
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {kategorieCounts[kategorie] ?? 0}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Zustand – Mehrfachauswahl */}
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Zustand
        </legend>
        <div className="flex flex-col gap-2.5">
          {ZUSTAND_REIHENFOLGE.map((zustand) => (
            <label key={zustand} className="flex items-center gap-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                name="zustand"
                value={zustand}
                defaultChecked={selectedZustaende.includes(zustand)}
                className="h-4 w-4 shrink-0 accent-accent"
              />
              {ZUSTAND_LABELS[zustand]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Preisspanne – Einfachauswahl */}
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Preisspanne
        </legend>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <input
              type="radio"
              name="preis"
              value=""
              defaultChecked={selectedPreis === ''}
              className="h-4 w-4 shrink-0 accent-accent"
            />
            Alle Preise
          </label>
          {PREIS_RANGES.map((range) => (
            <label key={range.key} className="flex items-center gap-2.5 text-sm text-foreground">
              <input
                type="radio"
                name="preis"
                value={range.key}
                defaultChecked={selectedPreis === range.key}
                className="h-4 w-4 shrink-0 accent-accent"
              />
              {range.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Aktionen */}
      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Filter anwenden
        </button>
        <a
          href="/katalog"
          className="text-center text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
        >
          Zurücksetzen
        </a>
      </div>
    </aside>
  )
}
