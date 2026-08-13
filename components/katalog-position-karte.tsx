import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { KATEGORIE_LABELS, STATUS_LABELS } from '@/lib/katalog'
import type { Media, Posten } from '@/payload-types'

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

/** Erstes Bild als vollständiges Media-Objekt, falls vorhanden (depth: 1 in der Abfrage). */
function ersteBildUrl(bilder: Posten['bilder']): string | null {
  const erste = bilder?.find((eintrag): eintrag is Media => typeof eintrag === 'object' && eintrag !== null)
  return typeof erste?.url === 'string' ? erste.url : null
}

/**
 * Kartenansicht einer Position für den Katalog. Orientiert sich visuell an
 * der Listenzeile (gleiche Statusfarben, gleiche Typografie), zeigt aber
 * zusätzlich das erste hinterlegte Bild – bewusst zurückhaltend, keine
 * Shop-Optik. Nutzt ausschließlich bestehende Felder der Collection `posten`.
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
      className="group flex flex-col overflow-hidden border border-border bg-background transition-colors hover:border-accent focus:outline-none focus-visible:border-accent"
      data-posten-id={posten.id}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-card">
        {bildUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bildUrl || '/placeholder.svg'}
            alt={posten.titel}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex h-10 w-10 items-center justify-center bg-accent font-serif text-xl leading-none text-accent-foreground">
              §
            </span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 inline-flex items-center border bg-background px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${STATUS_BADGE_KLASSE[posten.status]}`}
        >
          {STATUS_LABELS[posten.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {KATEGORIE_LABELS[posten.kategorie]}
          </span>
          <h3 className="font-serif text-xl leading-snug text-foreground text-balance">
            {posten.titel}
          </h3>
          {(posten.standort || posten.kurzspezifikation) && (
            <p className="truncate text-sm text-muted-foreground">
              {posten.standort || posten.kurzspezifikation}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-base font-medium text-foreground">{preisText}</span>
          <ArrowRight
            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
