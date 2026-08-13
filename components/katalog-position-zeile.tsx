import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { STATUS_LABELS } from '@/lib/katalog'
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
 * Nutzt ausschließlich bestehende Felder der Collection `posten`. Die
 * gesamte Zeile ist klickbar und führt zur unveränderten Asset-Detailseite
 * (`/katalog/[id]`).
 */
export function KatalogPositionZeile({ posten }: { posten: Posten }) {
  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? `ab ${formatiertePreis(posten.preis)}`
      : '—'

  const nebeninfo = [posten.insolvenzverfahren, posten.standort].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/katalog/${posten.id}`}
      className="group flex flex-col gap-3 border-b border-border bg-background px-4 py-4 transition-colors hover:bg-card focus:outline-none focus-visible:border-accent sm:flex-row sm:items-center sm:gap-6 sm:px-5"
      data-posten-id={posten.id}
    >
      <span
        className={`inline-flex w-fit shrink-0 items-center border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] sm:w-24 sm:justify-center ${STATUS_BADGE_KLASSE[posten.status]}`}
      >
        {STATUS_LABELS[posten.status]}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="truncate font-serif text-lg leading-snug text-foreground sm:text-xl">
          {posten.titel}
        </h3>
        {(nebeninfo || posten.kurzspezifikation) && (
          <p className="truncate text-sm text-muted-foreground">
            {nebeninfo || posten.kurzspezifikation}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:shrink-0 sm:justify-end sm:gap-8">
        <span className="whitespace-nowrap font-medium text-foreground">{preisText}</span>
        <ArrowRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
