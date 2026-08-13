'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export type GalerieBild = {
  url: string
  alt: string
}

/**
 * Ruhige Bildergalerie für die Asset-Detailseite.
 * Ein großes Bild, dezente Vor/Zurück-Navigation und – bei mehreren Bildern –
 * eine schlichte Thumbnail-Leiste. Bewusst kein automatisches/verspieltes Karussell.
 */
export function AssetGalerie({ bilder }: { bilder: GalerieBild[] }) {
  const [aktiv, setAktiv] = React.useState(0)
  // Touch-Swipe auf Mobile: horizontale Wischgeste wechselt das Bild.
  // Muss vor jedem bedingten `return` stehen (Rules of Hooks).
  const touchStartX = React.useRef<number | null>(null)

  if (bilder.length === 0) {
    return (
      <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden border border-border bg-card">
        <div className="absolute inset-4 border border-border" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center bg-accent font-serif text-2xl leading-none text-accent-foreground"
        >
          §
        </span>
        <p className="text-sm text-muted-foreground">Keine Abbildung vorhanden</p>
      </div>
    )
  }

  const anzahl = bilder.length
  const zeigeNavigation = anzahl > 1
  const aktuelles = bilder[aktiv]

  const zeige = (index: number) => setAktiv((index + anzahl) % anzahl)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      zeige(delta < 0 ? aktiv + 1 : aktiv - 1)
    }
    touchStartX.current = null
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden border border-border bg-card"
        onTouchStart={zeigeNavigation ? onTouchStart : undefined}
        onTouchEnd={zeigeNavigation ? onTouchEnd : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aktuelles.url || '/placeholder.svg'}
          alt={aktuelles.alt}
          draggable={false}
          className="h-full w-full object-cover"
        />

        {zeigeNavigation && (
          <>
            <button
              type="button"
              onClick={() => zeige(aktiv - 1)}
              aria-label="Vorheriges Bild"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => zeige(aktiv + 1)}
              aria-label="Nächstes Bild"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 text-xs tabular-nums text-muted-foreground">
              {aktiv + 1} / {anzahl}
            </span>
          </>
        )}
      </div>

      {zeigeNavigation && (
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
          {bilder.map((bild, index) => (
            <button
              key={bild.url}
              type="button"
              onClick={() => zeige(index)}
              aria-label={`Bild ${index + 1} anzeigen`}
              aria-current={index === aktiv}
              className={`h-16 w-16 shrink-0 overflow-hidden border transition-colors ${
                index === aktiv ? 'border-accent' : 'border-border hover:border-muted-foreground'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bild.url || '/placeholder.svg'} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
