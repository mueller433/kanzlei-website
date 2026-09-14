'use client'

import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
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
  const [vorschauOffen, setVorschauOffen] = React.useState(false)
  // Touch-Swipe auf Mobile: horizontale Wischgeste wechselt das Bild.
  // Muss vor jedem bedingten `return` stehen (Rules of Hooks).
  const touchStartX = React.useRef<number | null>(null)
  const oeffnerRef = React.useRef<HTMLButtonElement>(null)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const schliessenRef = React.useRef<HTMLButtonElement>(null)
  const anzahl = bilder.length
  const zeigeNavigation = anzahl > 1
  const aktuelles = bilder[aktiv]

  const zeige = React.useCallback(
    (index: number) => {
      if (anzahl === 0) return
      setAktiv((index + anzahl) % anzahl)
    },
    [anzahl],
  )

  const schliesseVorschau = React.useCallback(() => {
    setVorschauOffen(false)
    requestAnimationFrame(() => oeffnerRef.current?.focus())
  }, [])

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

  React.useEffect(() => {
    if (!vorschauOffen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') schliesseVorschau()
      if (event.key === 'ArrowLeft' && zeigeNavigation) zeige(aktiv - 1)
      if (event.key === 'ArrowRight' && zeigeNavigation) zeige(aktiv + 1)
      if (event.key === 'Tab' && dialogRef.current) {
        const fokussierbar = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href]'),
        )
        if (fokussierbar.length === 0) return
        const erstes = fokussierbar[0]
        const letztes = fokussierbar[fokussierbar.length - 1]
        if (event.shiftKey && document.activeElement === erstes) {
          event.preventDefault()
          letztes.focus()
        } else if (!event.shiftKey && document.activeElement === letztes) {
          event.preventDefault()
          erstes.focus()
        }
      }
    }

    const vorherigerOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => schliessenRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = vorherigerOverflow
    }
  }, [aktiv, schliesseVorschau, vorschauOffen, zeige, zeigeNavigation])

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

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-hidden">
      <div
        className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden border border-border bg-[#efede7]"
        onTouchStart={zeigeNavigation ? onTouchStart : undefined}
        onTouchEnd={zeigeNavigation ? onTouchEnd : undefined}
      >
        <button
          ref={oeffnerRef}
          type="button"
          onClick={() => setVorschauOffen(true)}
          aria-label="Bild vergrößert ansehen"
          className="group absolute inset-0 h-full w-full cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aktuelles.url || '/placeholder.svg'}
            alt={aktuelles.alt}
            draggable={false}
            className="h-full w-full min-w-0 max-w-full object-contain object-center"
          />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-background/90 px-3 py-2 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Vergrößern
          </span>
        </button>

        {zeigeNavigation && (
          <>
            <button
              type="button"
              onClick={() => zeige(aktiv - 1)}
              aria-label="Vorheriges Bild"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => zeige(aktiv + 1)}
              aria-label="Nächstes Bild"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-accent hover:text-accent"
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
              <img
                src={bild.url || '/placeholder.svg'}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {vorschauOffen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Bildvorschau: ${aktuelles.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 md:p-10"
          onClick={schliesseVorschau}
        >
          <button
            ref={schliessenRef}
            type="button"
            onClick={schliesseVorschau}
            aria-label="Bildvorschau schließen"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-background/30 bg-background/90 text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {zeigeNavigation && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                zeige(aktiv - 1)
              }}
              aria-label="Vorheriges Bild in der Vorschau"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/30 bg-background/90 text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background md:left-8"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <div
            className="relative flex max-h-full max-w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aktuelles.url || '/placeholder.svg'}
              alt={aktuelles.alt}
              className="max-h-[calc(100vh-5rem)] max-w-[calc(100vw-2rem)] object-contain md:max-h-[calc(100vh-6rem)] md:max-w-[calc(100vw-10rem)]"
            />
            <span className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 text-xs tabular-nums text-foreground">
              {aktiv + 1} / {anzahl}
            </span>
          </div>

          {zeigeNavigation && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                zeige(aktiv + 1)
              }}
              aria-label="Nächstes Bild in der Vorschau"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/30 bg-background/90 text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background md:right-8"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
