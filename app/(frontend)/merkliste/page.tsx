import type { Metadata } from 'next'
import React from 'react'

import { MerklisteUebersicht } from '@/components/merkliste-uebersicht'

export const metadata: Metadata = {
  title: 'Merkliste',
  description: 'Gemerkte Positionen aus dem DPSS-Verwertungskatalog gemeinsam anfragen.',
}

export default function MerklisteSeite() {
  return (
    <div>
      <section className="border-b border-border bg-[#f4f0e8]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Verwertungskatalog
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Ihre Merkliste
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Interessante Positionen sammeln, vergleichen und mit einer gemeinsamen Anfrage an DPSS
            übermitteln.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <MerklisteUebersicht />
        </div>
      </section>
    </div>
  )
}
