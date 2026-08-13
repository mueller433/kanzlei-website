import Link from 'next/link'
import React from 'react'

import { buildKatalogQuery, KATEGORIE_LABELS, KATEGORIE_REIHENFOLGE } from '@/lib/katalog'

/**
 * Horizontale Kategorie-Navigation der Katalogseite ("Alle" + eine Pille je
 * Kategorie mit Trefferzahl). Reine Navigation per <Link> – die eigentliche
 * Filterlogik bleibt vollständig in der Katalogseite (Payload-where-Klausel).
 * Ein Klick ersetzt ausschließlich den `kategorie`-Parameter, alle übrigen
 * aktiven Filter (Suche, Zustand, Preis, Sortierung, Ansicht) bleiben erhalten.
 *
 * Auf Mobile horizontal scrollbar, auf Desktop als Pill-Leiste nebeneinander.
 */
export function KatalogKategorieNav({
  sp,
  selectedKategorien,
  kategorieCounts,
  alleAnzahl,
}: {
  sp: { [key: string]: string | string[] | undefined }
  selectedKategorien: string[]
  kategorieCounts: Record<string, number>
  alleAnzahl: number
}) {
  const alleAktiv = selectedKategorien.length === 0

  const pillKlasse = (aktiv: boolean) =>
    `inline-flex shrink-0 items-center gap-2 whitespace-nowrap border px-4 py-2 text-sm transition-colors ${
      aktiv
        ? 'border-accent bg-accent text-accent-foreground'
        : 'border-border bg-background text-foreground hover:border-accent hover:text-accent'
    }`

  return (
    <nav
      aria-label="Kategorien"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:thin] md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
    >
      <Link href={`/katalog?${buildKatalogQuery(sp, { kategorie: null })}`} className={pillKlasse(alleAktiv)}>
        Alle
        <span className={`text-xs tabular-nums ${alleAktiv ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
          {alleAnzahl}
        </span>
      </Link>
      {KATEGORIE_REIHENFOLGE.map((kategorie) => {
        const aktiv = selectedKategorien.length === 1 && selectedKategorien[0] === kategorie
        return (
          <Link
            key={kategorie}
            href={`/katalog?${buildKatalogQuery(sp, { kategorie })}`}
            className={pillKlasse(aktiv)}
          >
            {KATEGORIE_LABELS[kategorie]}
            <span className={`text-xs tabular-nums ${aktiv ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
              {kategorieCounts[kategorie] ?? 0}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
