import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { MerklisteButton } from '@/components/merkliste-button'
import { ersteBildUrl, STATUS_LABELS } from '@/lib/katalog'
import type { Posten } from '@/payload-types'

function formatiertePreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(preis)
}

const STATUS_BADGE_KLASSE: Record<Posten['status'], string> = {
  verfuegbar: 'border-accent text-accent',
  reserviert: 'border-border text-muted-foreground',
  verkauft: 'border-border text-muted-foreground',
}

/**
 * Kompakte, horizontale Positionszeile für die Listenansicht des Katalogs.
 * Nutzt ausschließlich bestehende Felder der Collection `posten` – inkl.
 * des ersten Bildes aus dem vorhandenen Upload-Feld `bilder` als kleines
 * Thumbnail. Die gesamte Zeile ist klickbar und führt zur unveränderten
 * Asset-Detailseite (`/katalog/[id]`).
 */
export function KatalogPositionZeile({ posten }: { posten: Posten }) {
  const bildUrl = ersteBildUrl(posten.bilder)

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(Math.round(posten.preis * 1.19))
      : '—'

  const mengeText =
    typeof posten.stueckzahl === 'number' ? `${posten.stueckzahl} Stück` : null
  const nebeninfo = [posten.standort, mengeText].filter(Boolean).join(' · ')

  const merklistenPosition = {
    id: String(posten.id),
    titel: posten.titel,
    bildUrl: bildUrl || undefined,
    preisText,
    standort: posten.standort || undefined,
  }

  return (
    <div className="relative">
      <Link
      href={`/katalog/${posten.id}`}
      className="group flex gap-3 border-b border-border bg-background py-4 pr-14 transition-colors hover:bg-card focus:outline-none focus-visible:border-accent sm:items-center sm:gap-5 sm:px-5 sm:pr-20"
      data-posten-id={posten.id}
    >
      {/* Thumbnail – erstes Bild aus dem bestehenden Upload-Feld, sonst dezenter Platzhalter */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-border bg-card sm:h-20 sm:w-20">
        {bildUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bildUrl || '/placeholder.svg'}
            alt={posten.titel}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-base leading-none text-muted-foreground/50">§</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-5">
        <span
          className={`inline-flex w-fit shrink-0 items-center border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] sm:w-24 sm:justify-center ${STATUS_BADGE_KLASSE[posten.status]}`}
        >
          {STATUS_LABELS[posten.status]}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="line-clamp-2 font-serif text-base leading-snug text-foreground sm:truncate sm:text-xl">
            {posten.titel}
          </h3>
          {(nebeninfo || posten.kurzspezifikation) && (
            <p className="line-clamp-1 text-xs text-muted-foreground sm:text-sm">
              {nebeninfo || posten.kurzspezifikation}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 sm:shrink-0 sm:justify-end sm:gap-8">
          <span className="whitespace-nowrap text-sm font-semibold text-foreground sm:text-base sm:font-medium">{preisText}</span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
      </div>
      </Link>
      <MerklisteButton
        position={merklistenPosition}
        className="absolute right-0 top-4 z-10 sm:right-4"
      />
    </div>
  )
}
