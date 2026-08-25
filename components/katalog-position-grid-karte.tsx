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
  verfuegbar: 'border-accent/40 bg-accent/10 text-accent',
  reserviert: 'border-border bg-muted text-muted-foreground',
  verkauft: 'border-border bg-muted text-muted-foreground',
}

/**
 * Hochwertige Grid-Karte für "Aktuelle Positionen" auf der Startseite.
 * Bild im 16:9-Format oben, Status- und Kategorie-Badges, Serif-Titel,
 * Metadaten und Preis unten rechts. Nutzt ausschließlich bestehende Felder
 * der Collection `posten` – keine erfundenen Daten (z. B. kein Baujahr).
 */
export function KatalogPositionGridKarte({ posten }: { posten: Posten }) {
  const bildUrl = ersteBildUrl(posten.bilder)

  const preisText = posten.preisAufAnfrage
    ? 'Auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(Math.round(posten.preis * 1.19))
      : '—'

  return (
    <Link
      href={`/katalog/${posten.id}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      data-posten-id={posten.id}
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted">
        {bildUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bildUrl || '/placeholder.svg'}
            alt={posten.titel}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="font-serif text-2xl leading-none text-accent">§</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${STATUS_BADGE_KLASSE[posten.status]}`}
          >
            {STATUS_LABELS[posten.status]}
          </span>
          <span className="inline-flex items-center border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {KATEGORIE_LABELS[posten.kategorie]}
          </span>
        </div>

        <h3 className="font-serif text-xl leading-snug text-card-foreground text-balance">
          {posten.titel}
        </h3>

        {posten.standort && (
          <p className="text-sm text-muted-foreground">Standort: {posten.standort}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <span className="text-sm text-muted-foreground">
            {posten.zustand === 'neu'
              ? 'Neu'
              : posten.zustand === 'gebraucht'
                ? 'Gebraucht'
                : 'Restbestand'}
          </span>
          <span className="text-base font-medium text-foreground">{preisText}</span>
        </div>
      </div>
    </Link>
  )
}
