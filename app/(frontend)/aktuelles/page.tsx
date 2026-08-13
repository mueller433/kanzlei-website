import React from 'react'

import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Aktuelles',
  description:
    'Meldungen und Einblicke rund um Verwertung, Vermögenswerte und den Verwertungskatalog der DPSS Management GmbH.',
}

export default function AktuellesSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Aktuelles
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Neuigkeiten &amp; Fachbeiträge
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Hier informieren wir künftig über neue Verwertungsangebote, Unternehmensmeldungen und
            Entwicklungen rund um die professionelle Verwertung. Die folgenden Einträge sind
            Beispielinhalte und werden durch echte Beiträge ersetzt.
          </p>
        </div>
      </section>

      {/* BEITRÄGE */}
      <section>
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {NEWS_BEITRAEGE.map((beitrag, i) => (
              <article
                key={i}
                className="flex flex-col gap-4 border border-dashed border-border bg-card p-8 md:p-10"
              >
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em]">
                  <span className="text-accent">{beitrag.kategorie}</span>
                  <span className="text-muted-foreground">{beitrag.datum}</span>
                </div>
                <h2 className="font-serif text-2xl leading-snug text-card-foreground text-balance">
                  {beitrag.titel}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {beitrag.anriss}
                </p>
                <span className="mt-2 text-sm text-muted-foreground">Beispielinhalt</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
