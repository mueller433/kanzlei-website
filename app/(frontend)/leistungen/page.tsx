import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Leistungen',
  description:
    'Die drei Schwerpunkte von Müller & Partner: Insolvenzrecht, Restrukturierung und Verwertung – im Überblick.',
}

const BEREICHE = [
  {
    titel: 'Insolvenzrecht',
    href: '/insolvenzrecht',
    einleitung:
      'Begleitung von Regel- und Eigenverwaltungsverfahren sowie die Vertretung von Gläubigern.',
    punkte: [
      'Regelinsolvenz und Eigenverwaltung',
      'Sicherung und Verwaltung der Insolvenzmasse',
      'Gläubigervertretung und Forderungsprüfung',
    ],
  },
  {
    titel: 'Restrukturierung',
    href: '/restrukturierung',
    einleitung:
      'Sanierungskonzepte außerhalb und innerhalb der Insolvenz, um Unternehmen tragfähig neu aufzustellen.',
    punkte: [
      'Außergerichtliche Sanierung',
      'Sanierung im Schutzschirm- und Eigenverwaltungsverfahren',
      'Fortführungs- und Liquiditätsplanung',
    ],
  },
  {
    titel: 'Verwertung',
    href: '/verwertung',
    einleitung:
      'Marktgerechte, dokumentierte Verwertung von Vermögenswerten aus laufenden Verfahren.',
    punkte: [
      'Identifikation und Bewertung von Vermögenswerten',
      'Transparente, nachvollziehbare Verwertung',
      'Öffentlicher Verwertungskatalog',
    ],
  },
] as const

export default function LeistungenSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Leistungen
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Drei Schwerpunkte, ein Anspruch
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Unsere Arbeit gliedert sich in drei eng verzahnte Bereiche. Ob es um die Verwaltung
            eines Verfahrens, die Sanierung eines Unternehmens oder die Verwertung von Vermögen
            geht – wir handeln strukturiert, wirtschaftlich und transparent.
          </p>
        </div>
      </section>

      {/* BEREICHE */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col gap-px overflow-hidden border border-border bg-border">
            {BEREICHE.map((bereich) => (
              <div
                key={bereich.href}
                className="grid grid-cols-1 gap-8 bg-background p-8 md:grid-cols-[1fr_1.4fr] md:gap-16 md:p-12"
              >
                <div>
                  <h2 className="font-serif text-3xl text-foreground">{bereich.titel}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                    {bereich.einleitung}
                  </p>
                  <Link
                    href={bereich.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    Zum Detailbereich
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <ul className="flex flex-col gap-3 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-16 md:pt-0">
                  {bereich.punkte.map((punkt) => (
                    <li
                      key={punkt}
                      className="flex items-baseline gap-3 text-base leading-relaxed text-foreground"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      {punkt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
