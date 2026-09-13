import {
  Armchair,
  ArrowRight,
  Cog,
  type LucideIcon,
  Monitor,
  Package,
  Search,
  Smartphone,
  Truck,
  UtensilsCrossed,
  Warehouse,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaqSection } from '@/components/faq-section'
import { KatalogPositionGridKarte } from '@/components/katalog-position-grid-karte'
import { KontaktCta } from '@/components/kontakt-cta'
import { findeFaqEintraege, STARTSEITE_FAQ_IDS } from '@/lib/faq-daten'
import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'
import { type Kategorie, KATEGORIE_LABELS } from '@/lib/katalog'
import config from '@/payload.config'
import { getPayload } from 'payload'
import './styles.css'

export const metadata = {
  title: 'Verwertung von Vermögenswerten',
  description:
    'DPSS Management GmbH verwertet Vermögenswerte im Auftrag von Insolvenzverwaltern und bietet Käufern einen transparenten Katalog aktueller Positionen.',
}

const ABLAUF = [
  {
    nummer: '01',
    titel: 'Inventarisierung',
    beschreibung: 'Vermögenswerte werden vor Ort strukturiert erfasst, fotografiert und dokumentiert.',
  },
  {
    nummer: '02',
    titel: 'Bewertung',
    beschreibung: 'Positionen werden marktgerecht eingeordnet und nachvollziehbar bewertet.',
  },
  {
    nummer: '03',
    titel: 'Vermarktung',
    beschreibung: 'Passende Interessenten werden über geeignete Kanäle gezielt angesprochen.',
  },
  {
    nummer: '04',
    titel: 'Verkauf',
    beschreibung: 'Angebote, Verhandlungen und Verkäufe werden koordiniert abgewickelt.',
  },
  {
    nummer: '05',
    titel: 'Abwicklung',
    beschreibung: 'Übergabe, Abrechnung und Dokumentation erfolgen geordnet und transparent.',
  },
] as const

const WARUM_DPSS = [
  {
    nummer: '01',
    titel: 'Strukturierte Inventarisierung',
    text: 'Lückenlose Erfassung aller Vermögenswerte inklusive Zustand, Standort und Dokumentation.',
  },
  {
    nummer: '02',
    titel: 'Marktgerechte Bewertung',
    text: 'Realistische Wertansätze auf Basis aktueller Marktdaten und langjähriger Erfahrung.',
  },
  {
    nummer: '03',
    titel: 'Professionelle Vermarktung',
    text: 'Zielgerichtete Ansprache passender Käufer über geeignete Kanäle und Netzwerke.',
  },
  {
    nummer: '04',
    titel: 'Transparente Verkaufsprozesse',
    text: 'Nachvollziehbare Abläufe und klare Kommunikation in jedem Schritt des Verfahrens.',
  },
  {
    nummer: '05',
    titel: 'Dokumentierte Abwicklung',
    text: 'Vollständige Nachweisführung von der ersten Erfassung bis zur finalen Abrechnung.',
  },
  {
    nummer: '06',
    titel: 'Persönlicher Ansprechpartner',
    text: 'Eine feste Kontaktperson begleitet Auftraggeber und Interessenten über das gesamte Verfahren.',
  },
] as const

// Kurze Vertrauens-Marker im Hero. Rein textlich, keine erfundenen Kennzahlen.
const HERO_MARKER = ['Strukturierte Erfassung', 'Marktgerechte Bewertung', 'Transparente Abwicklung'] as const

// Schnellzugriff-Kategorien unter der Suche – verweisen auf die bestehende
// Katalog-Filterlogik (/katalog?kategorie=…), keine neue Suchlogik.
const SCHNELL_KATEGORIEN: Kategorie[] = [
  'fahrzeuge',
  'maschinen',
  'it-bueroelektronik',
  'gastronomie',
  'sonstiges',
]

// Anzeigereihenfolge im Kategorienraster (marketplace-typisch: Fahrzeuge und
// Maschinen zuerst). Alle Werte entsprechen bestehenden Katalog-Kategorien.
const KATEGORIE_ANZEIGE: Kategorie[] = [
  'fahrzeuge',
  'maschinen',
  'it-bueroelektronik',
  'smartphones',
  'gastronomie',
  'moebel-einrichtung',
  'energie-gebaeudetechnik',
  'lager-logistik-reinigung',
]

const KATEGORIE_ICONS: Record<Kategorie, LucideIcon> = {
  smartphones: Smartphone,
  maschinen: Cog,
  fahrzeuge: Truck,
  'it-bueroelektronik': Monitor,
  sonstiges: Package,
  gastronomie: UtensilsCrossed,
  'moebel-einrichtung': Armchair,
  'energie-gebaeudetechnik': Zap,
  'lager-logistik-reinigung': Warehouse,
}

export default async function Startseite() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'posten',
    where: { veroeffentlicht: { equals: true } },
    sort: '-createdAt',
    depth: 1,
    limit: 6,
  })

  return (
    <div>
      {/* ============================================================= */}
      {/* HERO — grosses Vollbild mit Marktplatz-Anmutung */}
      {/* ============================================================= */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden md:min-h-[720px]">
        <Image
          src="/images/hero-marketplace.png"
          alt="Grosse, helle Industriehalle mit professionellen Maschinen, Staplern und einem Nutzfahrzeug"
          fill
          priority
          sizes="100vw"
          className="hero-bild-scale object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#141110]/92 from-0% via-[#141110]/60 via-45% to-[#141110]/15 to-90%"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141110]/70 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-16 md:py-28 lg:px-24">
          <div className="hero-einblenden max-w-[640px]">
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[#f7f5f0]">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              DPSS Management
            </p>
            <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-[#f7f5f0] text-balance md:text-[4rem] lg:text-[4.6rem]">
              Vermögenswerte professionell verwerten.
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-relaxed text-[#e4e0d6] text-pretty">
              DPSS Management unterstützt Unternehmen, Insolvenzverwalter und Verfahrensbeteiligte
              bei der strukturierten Erfassung, Bewertung, Vermarktung und Verwertung von
              Vermögenswerten.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Verwertungskatalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/kontakt?betreff=Verwertungsauftrag"
                className="inline-flex items-center justify-center gap-2 border border-[#f7f5f0]/45 bg-[#f7f5f0]/10 px-7 py-3.5 text-sm font-medium text-[#f7f5f0] backdrop-blur-sm transition-colors hover:border-[#f7f5f0]/70 hover:bg-[#f7f5f0]/20"
              >
                Verwertung anfragen
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {HERO_MARKER.map((marker) => (
                <li key={marker} className="flex items-center gap-2 text-sm text-[#e4e0d6]">
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {marker}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* SUCHE / DISCOVERY — schwebendes Panel, das den Hero überlappt.
          Nutzt die bestehende /katalog-Filterlogik (GET q=…), keine neue
          Suchlogik. */}
      {/* ============================================================= */}
      <section className="relative z-20 border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <div className="-mt-12 border border-border bg-card p-6 shadow-[0_24px_60px_-30px_rgba(20,17,16,0.5)] md:-mt-20 md:p-10">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Verwertungskatalog durchsuchen
              </p>
              <h2 className="font-serif text-2xl leading-tight text-card-foreground text-balance md:text-3xl">
                Was suchen Sie?
              </h2>
            </div>

            <form action="/katalog" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <label htmlFor="startseite-suche" className="sr-only">
                  Vermögenswerte durchsuchen
                </label>
                <input
                  id="startseite-suche"
                  type="search"
                  name="q"
                  placeholder="Maschinen, Fahrzeuge, Betriebsausstattung ..."
                  className="h-14 w-full border border-border bg-background pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 bg-accent px-8 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Suchen
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Beliebt:</span>
              {SCHNELL_KATEGORIEN.map((key) => (
                <Link
                  key={key}
                  href={`/katalog?kategorie=${key}`}
                  className="inline-flex items-center border border-border bg-background px-3.5 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {KATEGORIE_LABELS[key]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* KATEGORIEN — grosse, ruhige Kacheln, 2 Spalten mobil / 4 Desktop.
          Verlinken auf die bestehende Katalog-Filterlogik. */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Kategorien
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Vermögenswerte entdecken
              </h2>
            </div>
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent md:shrink-0"
            >
              Gesamten Katalog ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="karten-grid grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {KATEGORIE_ANZEIGE.map((key) => {
              const Icon = KATEGORIE_ICONS[key]
              return (
                <Link
                  key={key}
                  href={`/katalog?kategorie=${key}`}
                  className="group flex min-h-[132px] flex-col justify-between border border-border bg-card p-5 transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:min-h-[168px] md:p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/5 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="mt-6 flex items-center justify-between gap-2">
                    <span className="font-serif text-base leading-snug text-card-foreground text-pretty md:text-lg">
                      {KATEGORIE_LABELS[key]}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* AKTUELLE VERMÖGENSWERTE — grosse Produktkarten aus echten Daten */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-muted/40">
        <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Marktplatz
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
                Aktuelle Vermögenswerte
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                Entdecken Sie aktuell verfügbare Fahrzeuge, Maschinen und weitere Vermögenswerte aus
                laufenden Verwertungs- und Auflösungsverfahren.
              </p>
            </div>
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent md:shrink-0"
            >
              Alle Positionen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((posten) => (
                <KatalogPositionGridKarte key={posten.id} posten={posten} />
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-10">
              <p className="font-serif text-xl text-card-foreground">
                Derzeit keine Positionen verfügbar.
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Schauen Sie später wieder vorbei oder nehmen Sie direkt Kontakt mit uns auf.
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/katalog"
              className="group inline-flex items-center justify-center gap-2 border border-accent/40 bg-card px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5"
            >
              Alle Positionen ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* PROFESSIONELLE VERWERTUNG — dunkles Kontrastband, 6 Kernpunkte */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-[#16130f]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#f7f5f0]/70">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              Leistung
            </p>
            <h2 className="font-serif text-3xl leading-tight text-[#f7f5f0] text-balance md:text-5xl">
              Professionelle Verwertung aus einer Hand
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#c9c3b8] text-pretty">
              DPSS ist mehr als ein Katalog: Wir begleiten den gesamten Verwertungsprozess – von der
              ersten Erfassung bis zur dokumentierten Abwicklung.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {WARUM_DPSS.map((punkt) => (
              <div key={punkt.nummer} className="flex flex-col gap-4 bg-[#16130f] p-8 md:p-10">
                <span className="font-serif text-2xl leading-none text-accent">{punkt.nummer}</span>
                <h3 className="font-serif text-xl text-[#f7f5f0] text-balance">{punkt.titel}</h3>
                <p className="text-base leading-relaxed text-[#c9c3b8] text-pretty">{punkt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* SO FUNKTIONIERT ES — 5-stufige Timeline */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Ablauf</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              So funktioniert es
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {ABLAUF.map((schritt) => (
              <li key={schritt.nummer} className="flex flex-col gap-4 border-t-2 border-accent pt-6">
                <span className="font-serif text-4xl leading-none text-foreground">
                  {schritt.nummer}
                </span>
                <h3 className="font-serif text-xl text-foreground">{schritt.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {schritt.beschreibung}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================= */}
      {/* ÜBER DPSS — Teaser mit Bild */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto grid max-w-6xl items-stretch gap-0 px-6 py-16 md:grid-cols-2 md:gap-14 md:px-10 md:py-24">
          <div className="relative order-last min-h-[280px] overflow-hidden border border-border md:order-first md:min-h-full">
            <Image
              src="/warum-dpss-editorial.png"
              alt="Industrielagerhalle mit hohen Palettenregalen in warmem Licht"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-10 md:py-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Über DPSS</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Verwertung aus einer Hand
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                DPSS Management übernimmt die operative Verwertung von Vermögenswerten im Auftrag von
                Insolvenzverwaltern, Unternehmen und weiteren Verfahrensbeteiligten.
              </p>
              <p>
                Wir verbinden eine strukturierte Bestandsaufnahme und Bewertung mit einer
                zielgerichteten Vermarktung – von der ersten Aufnahme bis zur transparent
                dokumentierten Abwicklung.
              </p>
            </div>
            <Link
              href="/unternehmen"
              className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Mehr über DPSS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* FACHBEITRÄGE — bestehende Inhalte, erhalten */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-muted/40">
        <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Aktuelles
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Fachbeiträge &amp; Einblicke
              </h2>
            </div>
            <Link
              href="/aktuelles"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent md:shrink-0"
            >
              Alle Fachbeiträge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NEWS_BEITRAEGE.slice(-3)
              .reverse()
              .map((beitrag) => (
                <Link
                  key={beitrag.slug}
                  href={`/aktuelles/${beitrag.slug}`}
                  className="group flex h-full flex-col gap-4 border border-border bg-card p-7 transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em]">
                    <span className="text-accent">{beitrag.kategorie}</span>
                    <span className="text-muted-foreground">{beitrag.datum}</span>
                  </div>
                  <h3 className="font-serif text-xl leading-snug text-card-foreground text-balance">
                    {beitrag.titel}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                    {beitrag.anriss}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    Beitrag lesen <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* FAQ — kompakter Teaser, bestehende Inhalte erhalten */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Häufige Fragen
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Antworten auf die wichtigsten Fragen
            </h2>
          </div>

          <FaqSection eintraege={findeFaqEintraege(STARTSEITE_FAQ_IDS)} idPrefix="start-" />

          <div className="mt-10 flex justify-center">
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Alle häufigen Fragen ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* ABSCHLUSS-CTA */}
      {/* ============================================================= */}
      <KontaktCta
        eyebrow="Kontakt"
        titel="Sie möchten Vermögenswerte professionell verwerten?"
        text="Sprechen Sie mit DPSS Management über Ihr Vorhaben."
        buttonLabel="Verwertung anfragen"
      />
    </div>
  )
}
