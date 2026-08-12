'use client'

import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import React from 'react'

import {
  KATEGORIE_LABELS,
  KATEGORIE_REIHENFOLGE,
  PREIS_RANGES,
  ZUSTAND_LABELS,
  ZUSTAND_REIHENFOLGE,
} from '@/lib/katalog'

/**
 * Filter-Sidebar der Katalogseite. Die Steuerelemente sind native
 * Formularfelder innerhalb eines <form method="get"> (im übergeordneten
 * Seiten-Layout), sodass die Auswahl kombinierbar und als URL teilbar bleibt –
 * es gibt bewusst keinen Filter-Zustand im Client, nur ein Auf-/Zuklappen.
 *
 * Auf kleinen Viewports ist die Leiste eingeklappt und wird über einen
 * "Filter"-Button mit aktueller Trefferzahl geöffnet; ab lg ist sie dauerhaft
 * als Sidebar sichtbar.
 */
export function KatalogFilter({
  q,
  selectedKategorien,
  selectedZustaende,
  selectedPreis,
  kategorieCounts,
  totalDocs,
}: {
  q: string
  selectedKategorien: string[]
  selectedZustaende: string[]
  selectedPreis: string
  kategorieCounts: Record<string, number>
  totalDocs: number
}) {
  const [offen, setOffen] = React.useState(false)

  // Gemeinsame Klassen für ausreichend große Touch-Zielflächen (~44px auf Mobile)
  const optionKlasse =
    'flex min-h-11 items-center gap-3 text-sm text-foreground lg:min-h-0 lg:py-0.5'

  return (
    <div className="border border-border lg:sticky lg:top-24 lg:self-start lg:border-0">
      {/* Mobiler Umschalter – zeigt aktuelle Trefferzahl, ab lg ausgeblendet */}
      <button
        type="button"
        onClick={() => setOffen((v) => !v)}
        aria-expanded={offen}
        aria-controls="katalog-filter-panel"
        className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 px-4 lg:hidden"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden="true" />
          Filter &amp; Suche
        </span>
        <span className="flex items-center gap-3">
          <span className="text-xs tabular-nums text-muted-foreground">{totalDocs} Treffer</span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              offen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id="katalog-filter-panel"
        className={`flex-col gap-9 border-t border-border p-4 lg:flex lg:border-0 lg:p-0 ${
          offen ? 'flex' : 'hidden'
        }`}
      >
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
            className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
        </div>

        {/* Kategorie – Mehrfachauswahl mit Trefferzahl je Kategorie */}
        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Kategorie
          </legend>
          <div className="flex flex-col gap-1 lg:gap-2">
            {KATEGORIE_REIHENFOLGE.map((kategorie) => (
              <label
                key={kategorie}
                className="flex min-h-11 items-center justify-between gap-3 text-sm text-foreground lg:min-h-0 lg:py-0.5"
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
          <div className="flex flex-col gap-1 lg:gap-2">
            {ZUSTAND_REIHENFOLGE.map((zustand) => (
              <label key={zustand} className={optionKlasse}>
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
          <div className="flex flex-col gap-1 lg:gap-2">
            <label className={optionKlasse}>
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
              <label key={range.key} className={optionKlasse}>
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
            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Filter anwenden
          </button>
          <a
            href="/katalog"
            className="inline-flex min-h-11 items-center justify-center text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            Zurücksetzen
          </a>
        </div>
      </div>
    </div>
  )
}
