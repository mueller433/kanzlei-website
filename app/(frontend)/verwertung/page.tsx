import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { ProzessSchritte, type Schritt } from '@/components/prozess-schritte'
import { SeitenHero } from '@/components/seiten-hero'

export const metadata = {
  title: 'Verwertung',
  description:
    'Der Verwertungsprozess der DPSS Management GmbH: Vermögenswerte werden identifiziert, bewertet, marktgerecht verwertet und transparent dokumentiert.',
}

const KATEGORIEN = [
  {
    titel: 'Immobilien',
    beschreibung:
      'Betriebs- und Wohnimmobilien, Grundstücke und Sonderobjekte aus laufenden Verfahren.',
  },
  {
    titel: 'Maschinen',
    beschreibung: 'Produktions-, Fertigungs- und Sondermaschinen unterschiedlichster Branchen.',
  },
  {
    titel: 'Fahrzeuge',
    beschreibung: 'Nutzfahrzeuge, Fuhrparks und Spezialfahrzeuge in verschiedenen Zuständen.',
  },
  {
    titel: 'Inventar',
    beschreibung: 'Betriebs- und Geschäftsausstattung, Warenbestände und sonstige Wirtschaftsgüter.',
  },
] as const

const ZIELGRUPPEN = [
  {
    titel: 'Für Interessenten',
    beschreibung:
      'Käufer und Investoren, die verwertbare Vermögenswerte suchen und eine nachvollziehbare, marktgerechte Preisbildung erwarten.',
  },
  {
    titel: 'Für Gläubiger & Gerichte',
    beschreibung:
      'Beteiligte, die eine transparente, dokumentierte Verwertung und einen bestmöglichen Erlös zur Masse benötigen.',
  },
] as const

const PROZESS: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Identifikation',
    beschreibung:
      'Zu Beginn erfassen wir sämtliche verwertbaren Vermögenswerte des Verfahrens – von Immobilien über Maschinen und Fahrzeuge bis zu Inventar.',
  },
  {
    schritt: '02',
    titel: 'Bewertung',
    beschreibung:
      'Jede Position wird geprüft und – wo erforderlich mit Sachverständigen – marktgerecht bewertet, um einen realistischen Verwertungswert zu ermitteln.',
  },
  {
    schritt: '03',
    titel: 'Verwertung',
    beschreibung:
      'Die Positionen werden über geeignete Kanäle angeboten, darunter unser öffentlicher Verwertungskatalog, um den bestmöglichen Erlös zu erzielen.',
  },
  {
    schritt: '04',
    titel: 'Dokumentation',
    beschreibung:
      'Erlöse, Käufe und Verfahrensschritte werden vollständig dokumentiert und den Beteiligten nachvollziehbar offengelegt.',
  },
]

export default function VerwertungSeite() {
  return (
    <div>
      <SeitenHero
        eyebrow="Verwertung"
        titel="Geordnete Verwertung von Vermögenswerten"
        lead="Im Auftrag von Insolvenzverwaltern und Verfahrensbeteiligten verwerten wir Immobilien, Maschinen, Fahrzeuge und Inventar – strukturiert, marktgerecht und nachvollziehbar."
      />

      {/* EINORDNUNG – Transparenz als Kernversprechen, zweispaltig */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Transparenz als Kernversprechen
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Verwertung schafft nur dann Vertrauen, wenn sie nachvollziehbar ist. Deshalb
                dokumentieren wir jeden Schritt – von der Bewertung über das Angebot bis zum
                erzielten Erlös – und legen die Ergebnisse den Beteiligten offen.
              </p>
              <p>
                Unser öffentlicher Verwertungskatalog macht aktuelle Positionen für Interessenten
                unmittelbar einsehbar. So verbinden wir marktgerechte Erlöse mit größtmöglicher
                Transparenz gegenüber Gläubigern und Gerichten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN IM DETAIL – was wir verwerten, 4er Tile-Grid */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Was wir verwerten
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Vier Kategorien im Bestand
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {KATEGORIEN.map((kategorie) => (
              <div key={kategorie.titel} className="flex flex-col gap-4 bg-background p-8">
                <h3 className="font-serif text-2xl text-foreground">{kategorie.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {kategorie.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN – zwei Bordered-Cards */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Für wen relevant
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wem die Verwertung dient
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ZIELGRUPPEN.map((gruppe) => (
              <div
                key={gruppe.titel}
                className="border border-border bg-card p-8 transition-colors hover:border-accent md:p-10"
              >
                <h3 className="font-serif text-2xl text-card-foreground">{gruppe.titel}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {gruppe.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORGEHENSWEISE – vier nummerierte Prozessschritte */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Der Prozess
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Von der Erfassung bis zum Erlös
            </h2>
          </div>
          <ProzessSchritte schritte={PROZESS} />
        </div>
      </section>

      {/* KATALOG-TEASER – markanter Übergang zum Katalog (Alleinstellung) */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="border border-border bg-card p-10 md:p-16">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Verwertungskatalog
                </p>
                <h2 className="font-serif text-3xl leading-tight text-card-foreground text-balance md:text-4xl">
                  Aktuelle Positionen direkt einsehen
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                  Immobilien, Maschinen, Fahrzeuge und Inventar aus laufenden Verfahren – geordnet
                  nach Kategorie und mit Preisangabe.
                </p>
              </div>
              <Link
                href="/katalog"
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Zum Verwertungskatalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KontaktCta
        titel="Interesse an einer Position?"
        text="Sie möchten eine Position genauer prüfen oder ein Angebot abgeben? Sprechen Sie uns an – wir begleiten die Verwertung transparent und beantworten Ihre Fragen zum Bestand."
        buttonLabel="Anfrage stellen"
      />
    </div>
  )
}
