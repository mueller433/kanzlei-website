import { ChevronDown, LayoutGrid, List, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
  ANSICHT_LABELS,
  ANSICHT_REIHENFOLGE,
  buildKatalogQuery,
  PREIS_RANGES,
  SORT_OPTIONS,
  type Ansicht,
  ZUSTAND_LABELS,
  ZUSTAND_REIHENFOLGE,
} from '@/lib/katalog'

/**
 * Horizontale Filterleiste der Katalogseite: Suche, Zustand, Preis,
 * Sortierung und die Karten-/Listenansicht. Die Steuerelemente sind native
 * Formularfelder innerhalb des umgebenden <form method="get"> der Seite,
 * sodass die Auswahl kombinierbar und als URL teilbar bleibt – es gibt
 * bewusst keinen Filter-Zustand im Client. Zustand/Preis nutzen native
 * <details>-Aufklapper statt eigenem JS-State.
 *
 * Kategorie und Ansicht werden außerhalb dieses Formulars über <Link>
 * gesteuert (siehe KatalogKategorieNav / Ansicht-Umschalter); damit ihre
 * Auswahl beim Absenden dieses Formulars nicht verloren geht, werden sie
 * hier als verstecke Felder mitgeführt.
 */
export function KatalogFilter({
  sp,
  q,
  selectedKategorien,
  selectedZustaende,
  selectedPreis,
  selectedSort,
  ansicht,
  totalDocs,
}: {
  sp: { [key: string]: string | string[] | undefined }
  q: string
  selectedKategorien: string[]
  selectedZustaende: string[]
  selectedPreis: string
  selectedSort: string
  ansicht: Ansicht
  totalDocs: number
}) {
  const zustandLabel =
    selectedZustaende.length === 0
      ? 'Zustand'
      : selectedZustaende.length === 1
        ? ZUSTAND_LABELS[selectedZustaende[0] as keyof typeof ZUSTAND_LABELS]
        : `Zustand (${selectedZustaende.length})`

  const preisLabel = selectedPreis
    ? PREIS_RANGES.find((r) => r.key === selectedPreis)?.label ?? 'Preis'
    : 'Preis'

  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-3 sm:p-4 md:p-5">
      {/* Kategorie + Ansicht bleiben beim Absenden dieses Formulars erhalten */}
      {selectedKategorien.map((k) => (
        <input key={k} type="hidden" name="kategorie" value={k} />
      ))}
      <input type="hidden" name="ansicht" value={ansicht} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        {/* Prominente Suche */}
        <label className="relative block w-full min-w-0 lg:min-w-[220px] lg:flex-1">
          <span className="sr-only">Suche</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Position oder Detail suchen …"
            className="h-12 w-full border border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none lg:h-11"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          {/* Zustand – kompakter Aufklapper, native <details> ohne Client-JS */}
          <details className="group relative min-w-0 sm:min-w-fit">
            <summary className="flex h-11 w-full min-w-0 cursor-pointer list-none items-center justify-between gap-2 border border-border bg-background px-3 text-sm text-foreground sm:w-auto sm:px-4 [&::-webkit-details-marker]:hidden">
              {zustandLabel}
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute left-0 top-[calc(100%+0.5rem)] z-10 flex w-56 flex-col gap-3 border border-border bg-card p-4 shadow-sm">
              {ZUSTAND_REIHENFOLGE.map((zustand) => (
                <label key={zustand} className="flex min-h-6 items-center gap-3 text-sm text-foreground">
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
          </details>

          {/* Preis – kompakter Aufklapper */}
          <details className="group relative min-w-0 sm:min-w-fit">
            <summary className="flex h-11 w-full min-w-0 cursor-pointer list-none items-center justify-between gap-2 border border-border bg-background px-3 text-sm text-foreground sm:w-auto sm:px-4 [&::-webkit-details-marker]:hidden">
              {preisLabel}
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-10 flex w-56 flex-col gap-3 border border-border bg-card p-4 shadow-sm sm:left-0 sm:right-auto">
              <label className="flex min-h-6 items-center gap-3 text-sm text-foreground">
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
                <label key={range.key} className="flex min-h-6 items-center gap-3 text-sm text-foreground">
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
          </details>

          {/* Sortierung */}
          <label className="relative col-span-2 sm:col-span-1">
            <span className="sr-only">Sortierung</span>
            <select
              name="sort"
              defaultValue={selectedSort}
              className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:outline-none sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="col-span-2 inline-flex h-12 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:col-span-1 sm:h-11"
          >
            Anwenden
          </button>

          <Link
            href="/katalog"
            className="col-span-2 inline-flex h-11 items-center justify-center px-2 text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline sm:col-span-1"
          >
            Zurücksetzen
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{totalDocs}</span>{' '}
          {totalDocs === 1 ? 'Position' : 'Positionen'}
        </p>

        {/* Karten-/Listenansicht – reine Präsentation, per Link gesteuert */}
        <div className="inline-flex border border-border" role="group" aria-label="Ansicht">
          {ANSICHT_REIHENFOLGE.map((option) => {
            const aktiv = ansicht === option
            const Icon = option === 'liste' ? List : LayoutGrid
            return (
              <Link
                key={option}
                href={`/katalog?${buildKatalogQuery(sp, { ansicht: option })}`}
                aria-current={aktiv}
                className={`inline-flex h-11 items-center gap-2 px-3 text-sm transition-colors ${
                  aktiv
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {ANSICHT_LABELS[option]}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
