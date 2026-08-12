import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Verwertung',
  description:
    'Der Verwertungsprozess bei Müller & Partner: wie Vermögenswerte identifiziert, geprüft und marktgerecht verwertet werden – transparent und dokumentiert.',
}

const PROZESS = [
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
] as const

export default function VerwertungSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Verwertung
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Geordnete Verwertung von Vermögenswerten
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Aus laufenden Insolvenz- und Auflösungsverfahren verwerten wir Immobilien, Maschinen,
            Fahrzeuge und Inventar – strukturiert, marktgerecht und für alle Beteiligten
            nachvollziehbar.
          </p>
        </div>
      </section>

      {/* PROZESS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Der Prozess
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Von der Erfassung bis zum Erlös
            </h2>
          </div>
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROZESS.map((schritt) => (
              <li key={schritt.schritt} className="flex flex-col gap-3">
                <span className="font-serif text-2xl text-accent">{schritt.schritt}</span>
                <span className="border-t border-border pt-4 font-serif text-xl text-foreground">
                  {schritt.titel}
                </span>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {schritt.beschreibung}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRANSPARENZ-VERSPRECHEN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
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

      {/* KATALOG-TEASER */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
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
                  Immobilien, Maschinen, Fahrzeuge und Inventar aus laufenden Verfahren –
                  geordnet nach Kategorie und mit Preisangabe.
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
    </div>
  )
}
