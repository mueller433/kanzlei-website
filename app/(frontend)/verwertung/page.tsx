import { ArrowRight, Building2, PackageSearch, Search, Truck, Wrench } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { KATEGORIE_LABELS, KATEGORIE_REIHENFOLGE, type Kategorie } from '@/lib/katalog'
import config from '@/payload.config'
import { SeitenHero } from '@/components/seiten-hero'

export const metadata = {
  title: 'Verwertung',
  description:
    'Der Verwertungsprozess der DPSS Management GmbH: Vermögenswerte werden identifiziert, bewertet, marktgerecht verwertet und transparent dokumentiert.',
}

const KATEGORIE_ICONS: Record<Kategorie, typeof Building2> = {
  immobilien: Building2,
  maschinen: Wrench,
  fahrzeuge: Truck,
  inventar: PackageSearch,
  sonstiges: PackageSearch,
}

const KATEGORIEN: ReadonlyArray<{ kategorie: Kategorie; beschreibung: string }> = [
  {
    kategorie: 'immobilien',
    beschreibung:
      'Betriebs- und Wohnimmobilien, Grundstücke und Sonderobjekte aus laufenden Verfahren.',
  },
  {
    kategorie: 'maschinen',
    beschreibung: 'Produktions-, Fertigungs- und Sondermaschinen unterschiedlichster Branchen.',
  },
  {
    kategorie: 'fahrzeuge',
    beschreibung: 'Nutzfahrzeuge, Fuhrparks und Spezialfahrzeuge in verschiedenen Zuständen.',
  },
  {
    kategorie: 'inventar',
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

type ProzessSchritt = {
  schritt: string
  titel: string
  punkte: readonly string[]
}

const PROZESS: readonly ProzessSchritt[] = [
  {
    schritt: '01',
    titel: 'Identifikation',
    punkte: [
      'Vollständige Erfassung aller verwertbaren Vermögenswerte',
      'Immobilien, Maschinen, Fahrzeuge und Inventar',
      'Abstimmung mit dem Insolvenzverwalter vor Ort',
    ],
  },
  {
    schritt: '02',
    titel: 'Bewertung',
    punkte: [
      'Marktgerechte Einzel- und Paketbewertung',
      'Einbindung von Sachverständigen bei Bedarf',
      'Realistische Einschätzung des Verwertungswerts',
    ],
  },
  {
    schritt: '03',
    titel: 'Verwertung',
    punkte: [
      'Angebot über geeignete Vertriebskanäle',
      'Öffentlicher Verwertungskatalog als Schaufenster',
      'Ziel: bestmöglicher Erlös zur Masse',
    ],
  },
  {
    schritt: '04',
    titel: 'Dokumentation',
    punkte: [
      'Lückenlose Protokollierung aller Verfahrensschritte',
      'Nachvollziehbare Erlös- und Kaufübersicht',
      'Transparente Offenlegung gegenüber Beteiligten',
    ],
  },
]

export default async function VerwertungSeite() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'posten',
    where: { veroeffentlicht: { equals: true } },
    select: { kategorie: true },
    depth: 0,
    limit: 0,
  })

  const kategorieCounts: Record<string, number> = Object.fromEntries(
    KATEGORIE_REIHENFOLGE.map((k) => [k, 0]),
  )
  for (const doc of docs) {
    if (doc.kategorie in kategorieCounts) kategorieCounts[doc.kategorie] += 1
  }

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

      {/* LEISTUNGEN IM DETAIL – interaktive Kategorie-Cards mit Icon und Trefferzahl */}
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {KATEGORIEN.map(({ kategorie, beschreibung }) => {
              const Icon = KATEGORIE_ICONS[kategorie]
              const anzahl = kategorieCounts[kategorie] ?? 0
              return (
                <Link
                  key={kategorie}
                  href={`/katalog?kategorie=${kategorie}`}
                  className="group flex flex-col gap-5 border border-border bg-card p-8 transition-colors hover:border-accent"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-2xl text-card-foreground">
                      {KATEGORIE_LABELS[kategorie]}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {anzahl} {anzahl === 1 ? 'Position' : 'Positionen'} im Katalog
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                    {beschreibung}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    Kategorie im Katalog ansehen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
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

      {/* VORGEHENSWEISE – edles, horizontales Prozess-Band mit Stichpunkten */}
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
          <ol className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROZESS.map((s) => (
              <li key={s.schritt} className="flex flex-col gap-4 bg-card p-8">
                <span className="font-serif text-4xl text-accent">{s.schritt}</span>
                <span className="border-t border-border pt-4 font-serif text-xl text-card-foreground">
                  {s.titel}
                </span>
                <ul className="flex flex-col gap-2">
                  {s.punkte.map((punkt) => (
                    <li
                      key={punkt}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span className="text-pretty">{punkt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
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

      {/* B2B-BANNER – gezielt an Insolvenzverwalter und Verfahrensbeteiligte, dunkel abgesetzt */}
      <section className="border-b border-border bg-foreground">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Für Insolvenzverwalter
              </p>
              <h2 className="font-serif text-3xl leading-tight text-background text-balance md:text-4xl">
                Sie betreuen ein laufendes Verfahren?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-background/70 text-pretty">
                Wir übernehmen die strukturierte Erfassung, Bewertung und Verwertung von
                Vermögenswerten – rechtssicher, transparent und erlösoptimiert.
              </p>
            </div>
            <Link
              href="/kontakt?betreff=Verwertungsauftrag"
              className="group inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Verwertungsauftrag anfragen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
