import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { ersteBildUrl, KATEGORIE_LABELS, STATUS_LABELS } from '@/lib/katalog'
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
 * Horizontale Premium-Listenzeile einer Position für den Katalog. Zeigt
 * Status, Kategorie, Titel, Standort, Preis und das erste hinterlegte Bild
 * zurückhaltend ohne Shop-Optik. Nutzt ausschließlich bestehende Felder der
 * Collection `posten`.
 */
export function KatalogPositionKarte({ posten }: { posten: Posten }) {
  const bildUrl = ersteBildUrl(posten.bilder)

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? `ab ${formatiertePreis(posten.preis)}`
      : '—'

  return (
    <Link
      href={`/katalog/${posten.id}`}
      className="group flex flex-col gap-5 border-b border-border py-6 transition-colors hover:bg-muted/35 focus:outline-none focus-visible:bg-muted/35 md:flex-row md:items-center md:gap-8 md:py-7"
      data-posten-id={posten.id}
    >
      <div className="relative h-28 w-full shrink-0 overflow-hidden bg-card md:h-24 md:w-36">
        {bildUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bildUrl || '/placeholder.svg'}
            alt={posten.titel}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="font-serif text-xl leading-none text-accent">§</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${STATUS_BADGE_KLASSE[posten.status]}`}
            >
              {STATUS_LABELS[posten.status]}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {KATEGORIE_LABELS[posten.kategorie]}
            </span>
          </div>
          <h3 className="truncate font-serif text-xl leading-snug text-foreground md:text-2xl">
            {posten.titel}
          </h3>
          {posten.standort && <p className="mt-1 text-sm text-muted-foreground">{posten.standort}</p>}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-8 md:justify-end">
          <span className="text-base font-medium text-foreground">{preisText}</span>
          <ArrowRight
            className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
