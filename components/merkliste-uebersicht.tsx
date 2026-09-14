'use client'

import { ArrowRight, Bookmark, MapPin, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useMerkliste } from '@/lib/use-merkliste'

export function MerklisteUebersicht() {
  const { bereit, positionen, entfernen } = useMerkliste()

  if (!bereit) {
    return <div className="h-48 animate-pulse border border-border bg-card" aria-label="Merkliste wird geladen" />
  }

  if (positionen.length === 0) {
    return (
      <div className="border border-border bg-card px-5 py-12 text-center sm:px-8 sm:py-16">
        <Bookmark className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
        <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">
          Ihre Merkliste ist noch leer
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Speichern Sie interessante Fahrzeuge, Maschinen und weitere Positionen und fragen Sie
          diese anschließend gemeinsam an.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          Katalog ansehen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  const betreff = `Sammelanfrage zu ${positionen.length} ${positionen.length === 1 ? 'Position' : 'Positionen'}`
  const nachricht = [
    'Guten Tag,',
    '',
    'ich interessiere mich für folgende Positionen:',
    '',
    ...positionen.map((position) => `• Pos. ${position.id}: ${position.titel}`),
    '',
    'Bitte senden Sie mir weitere Informationen zur aktuellen Verfügbarkeit und Kaufabwicklung.',
  ].join('\n')

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
      <ul className="grid gap-4">
        {positionen.map((position) => (
          <li key={position.id} className="relative grid min-w-0 grid-cols-[88px_1fr] gap-4 border border-border bg-card p-3 pr-12 sm:grid-cols-[140px_1fr] sm:p-4 sm:pr-16">
            <Link
              href={`/katalog/${position.id}`}
              className="relative aspect-square overflow-hidden bg-muted sm:aspect-[4/3]"
              aria-label={`${position.titel} öffnen`}
            >
              {position.bildUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={position.bildUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full items-center justify-center font-serif text-xl text-accent">
                  §
                </span>
              )}
            </Link>

            <div className="min-w-0 py-1">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                Position {position.id}
              </p>
              <Link href={`/katalog/${position.id}`} className="mt-1 block">
                <h2 className="line-clamp-2 font-serif text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {position.titel}
                </h2>
              </Link>
              {position.standort && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{position.standort}</span>
                </p>
              )}
              {position.preisText && (
                <p className="mt-3 text-base font-semibold text-foreground">{position.preisText}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => entfernen(position.id)}
              aria-label={`${position.titel} von der Merkliste entfernen`}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <aside className="border border-border bg-card p-5 shadow-sm sm:p-6 lg:sticky lg:top-32">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Gemeinsame Anfrage
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
          {positionen.length} {positionen.length === 1 ? 'Position' : 'Positionen'} ausgewählt
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Senden Sie eine Anfrage für alle gemerkten Positionen. Verfügbarkeit und Preis werden
          anschließend von DPSS bestätigt.
        </p>
        <Link
          href={{ pathname: '/kontakt', query: { betreff, nachricht } }}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Sammelanfrage stellen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Die Merkliste wird nur in diesem Browser gespeichert.
        </p>
      </aside>
    </div>
  )
}
