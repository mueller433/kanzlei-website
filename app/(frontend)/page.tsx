import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { ProzessSchritte } from '@/components/prozess-schritte'
import { VertrauensBereich } from '@/components/vertrauens-bereich'
import { ANSPRECHPARTNER } from '@/lib/kanzlei-daten'
import config from '@/payload.config'
import type { Posten } from '@/payload-types'
import './styles.css'

const KATEGORIE_LABELS: Record<Posten['kategorie'], string> = {
  immobilien: 'Immobilien',
  maschinen: 'Maschinen',
  fahrzeuge: 'Fahrzeuge',
  inventar: 'Inventar',
  sonstiges: 'Sonstiges',
}

function formatiertePreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(preis)
}

const LEISTUNGSBEREICHE = [
  {
    titel: 'Insolvenzrecht',
    href: '/insolvenzrecht',
    beschreibung:
      'Begleitung von Regel- und Eigenverwaltungsverfahren – von der Antragstellung über die Verwaltung bis zur geordneten Abwicklung.',
  },
  {
    titel: 'Restrukturierung',
    href: '/restrukturierung',
    beschreibung:
      'Sanierungskonzepte und Restrukturierung außerhalb und innerhalb der Insolvenz, um Unternehmen tragfähig neu aufzustellen.',
  },
  {
    titel: 'Verwertung',
    href: '/verwertung',
    beschreibung:
      'Transparente, marktgerechte Verwertung von Vermögenswerten aus laufenden Verfahren – dokumentiert und nachvollziehbar.',
  },
] as const

const ABLAUF_SCHRITTE = [
  {
    schritt: '01',
    titel: 'Erstkontakt',
    beschreibung:
      'Vertrauliches Erstgespräch zur Einordnung der Situation und der kurzfristig notwendigen Schritte.',
  },
  {
    schritt: '02',
    titel: 'Analyse',
    beschreibung:
      'Prüfung der wirtschaftlichen und rechtlichen Lage sowie Bewertung der Handlungsoptionen.',
  },
  {
    schritt: '03',
    titel: 'Umsetzung',
    beschreibung:
      'Einleitung des geeigneten Verfahrens, Sicherung der Masse und Steuerung aller Beteiligten.',
  },
  {
    schritt: '04',
    titel: 'Abschluss',
    beschreibung:
      'Geordnete Verwertung, Verteilung und Abschluss des Verfahrens mit vollständiger Dokumentation.',
  },
] as const

function KatalogTeaserKarte({ posten }: { posten: Posten }) {
  return (
    <Link
      href="/katalog"
      className="group flex flex-col justify-between gap-6 border border-border bg-card p-6 transition-colors hover:border-accent"
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.16em] text-accent">
          {KATEGORIE_LABELS[posten.kategorie]}
        </span>
        <span className="font-serif text-xl leading-snug text-card-foreground text-balance">
          {posten.titel}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">
        {posten.preisAufAnfrage
          ? 'Preis auf Anfrage'
          : typeof posten.preis === 'number'
            ? formatiertePreis(posten.preis)
            : 'Preis auf Anfrage'}
      </span>
    </Link>
  )
}

export default async function Startseite() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: neuestePosten } = await payload.find({
    collection: 'posten',
    where: {
      veroeffentlicht: {
        equals: true,
      },
    },
    sort: '-createdAt',
    depth: 1,
    limit: 3,
  })

  return (
    <div>
      {/* 1. HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Insolvenzverwaltung &amp; Restrukturierung
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
            Kompetenz im Insolvenzrecht. Werte sichern. Perspektiven schaffen.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Müller &amp; Partner begleitet Unternehmen, Gläubiger und Beteiligte durch Insolvenz-
            und Sanierungsverfahren. Mit klarer Struktur, wirtschaftlichem Augenmaß und einer
            geordneten Verwertung schaffen wir tragfähige Lösungen in schwierigen Lagen.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/leistungen"
              className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Unsere Leistungen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/katalog"
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Zum Verwertungskatalog
            </Link>
          </div>
        </div>
      </section>

      {/* 2. KANZLEI / KOMPETENZ */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Erfahrung, die in kritischen Situationen Halt gibt
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Seit vielen Jahren betreuen wir Insolvenz- und Sanierungsverfahren jeder
                Größenordnung. Unsere Arbeit ist geprägt von Sorgfalt, Transparenz und dem
                Anspruch, auch in wirtschaftlich angespannten Lagen verlässlich zu handeln.
              </p>
              <p>
                Wir verstehen Insolvenzverwaltung nicht als reine Abwicklung, sondern als Chance,
                Werte zu erhalten, Gläubigerinteressen zu wahren und – wo möglich – Unternehmen und
                Arbeitsplätze zu sichern. Dabei begegnen wir allen Beteiligten mit derselben
                Verbindlichkeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEISTUNGSBEREICHE */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Leistungsbereiche
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Drei Schwerpunkte, ein Anspruch
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {LEISTUNGSBEREICHE.map((bereich) => (
              <Link
                key={bereich.href}
                href={bereich.href}
                className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-card md:p-10"
              >
                <h3 className="font-serif text-2xl text-foreground">{bereich.titel}</h3>
                <p className="flex-1 text-base leading-relaxed text-muted-foreground text-pretty">
                  {bereich.beschreibung}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VERTRAUENSBEREICH – qualitative Aussagen, bewusst ohne Zahlen */}
      <VertrauensBereich />

      {/* 5. KATALOG-TEASER */}
      {neuestePosten.length > 0 && (
        <section className="border-b border-border">
          <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Verwertungskatalog
                </p>
                <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                  Aktuelle Positionen aus laufenden Verfahren
                </h2>
              </div>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                Zum vollständigen Katalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {neuestePosten.map((posten) => (
                <KatalogTeaserKarte key={posten.id} posten={posten} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. ARBEITSWEISE / ABLAUF */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Arbeitsweise
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              So verläuft die Zusammenarbeit
            </h2>
          </div>
          <ProzessSchritte schritte={ABLAUF_SCHRITTE} />
        </div>
      </section>

      {/* 7. ANSPRECHPARTNER */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Ansprechpartner
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Persönliche Betreuung
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ANSPRECHPARTNER.map((person, i) => (
              <div
                key={i}
                className="flex items-start gap-5 border border-dashed border-border bg-card p-6 md:p-8"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-muted font-serif text-lg text-muted-foreground">
                  {person.initialen}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-xl text-card-foreground">{person.name}</span>
                  <span className="text-sm text-accent">{person.rolle}</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {person.beschreibung}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. KONTAKT-CTA */}
      <section>
        <div className="reveal mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Sie stehen vor einer schwierigen wirtschaftlichen Entscheidung?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                Sprechen Sie uns an. Wir ordnen Ihre Situation ein und zeigen Ihnen die möglichen
                nächsten Schritte – vertraulich und unverbindlich.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
