import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { MerklisteButton } from '@/components/merkliste-button'
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
 * Bildstarke Premium-Karte einer Position für den Katalog. Zeigt
 * Status, Kategorie, Titel, Standort, Preis und das erste hinterlegte Bild
 * zurückhaltend ohne Shop-Optik. Nutzt ausschließlich bestehende Felder der
 * Collection `posten`.
 */
export function KatalogPositionKarte({ posten }: { posten: Posten }) {
  const bildUrl = ersteBildUrl(posten.bilder)

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(Math.round(posten.preis * 1.19))
      : '—'

  const merklistenPosition = {
    id: String(posten.id),
    titel: posten.titel,
    bildUrl: bildUrl || undefined,
    preisText,
    standort: posten.standort || undefined,
  }

  return (
    <article className="relative h-full">
      <Link
      href={`/katalog/${posten.id}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:gap-5"
      data-posten-id={posten.id}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
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

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
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
          <h3 className="line-clamp-2 font-serif text-xl leading-snug text-foreground">
            {posten.titel}
          </h3>
          {posten.standort && <p className="mt-1 text-sm text-muted-foreground">{posten.standort}</p>}
        </div>

        <div className="mt-auto flex shrink-0 items-center justify-between gap-6 border-t border-border pt-4">
          <span className="text-base font-semibold text-foreground">{preisText}</span>
          <ArrowRight
            className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
      </div>
      </Link>
      <MerklisteButton
        position={merklistenPosition}
        className="absolute right-3 top-3 z-10"
      />
    </article>
  )
}
