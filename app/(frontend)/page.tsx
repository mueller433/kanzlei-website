import { ArrowRight, MapPin, Package, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaqSection } from '@/components/faq-section'
import { KontaktCta } from '@/components/kontakt-cta'
import { findeFaqEintraege, STARTSEITE_FAQ_IDS } from '@/lib/faq-daten'
import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'
import { type Kategorie, ersteBildUrl, KATEGORIE_LABELS, STATUS_LABELS, ZUSTAND_LABELS } from '@/lib/katalog'
import type { Posten } from '@/payload-types'
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

const KATEGORIE_ANZEIGE: Kategorie[] = [
  'fahrzeuge', 'maschinen', 'lager-logistik-reinigung',
  'it-bueroelektronik', 'gastronomie', 'moebel-einrichtung',
  'smartphones', 'energie-gebaeudetechnik', 'sonstiges',
]

// Bestehende Berechnung unverändert. Fachliche Preis-/Provisionsklärung separat.
function homepagePreis(posten: Posten) {
  if (posten.preisAufAnfrage) return 'Preis auf Anfrage'
  if (typeof posten.preis !== 'number') return '—'
  return new Intl.NumberFormat('de-DE', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(Math.round(posten.preis * 1.19))
}

function HomepageAsset({ posten }: { posten: Posten }) {
  const bild = ersteBildUrl(posten.bilder)
  return (
    <Link href={`/katalog/${posten.id}`}
      className="group flex min-w-0 flex-col overflow-hidden border border-border bg-card transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {bild ? (
          // Payload-Bilder behalten ihre bestehenden URLs.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bild} alt={posten.titel} loading="lazy" decoding="async"
            className="h-full w-full object-contain p-3" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Package className="h-8 w-8" aria-hidden="true" />
            <span className="text-sm">Keine Abbildung vorhanden</span>
          </div>
        )}
        <span className="absolute left-3 top-3 border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground">
          {STATUS_LABELS[posten.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs text-muted-foreground">{KATEGORIE_LABELS[posten.kategorie]}</p>
        <h3 className="mt-2 break-words text-lg font-semibold leading-snug text-foreground">{posten.titel}</h3>
        {posten.kurzspezifikation && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{posten.kurzspezifikation}</p>}
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{ZUSTAND_LABELS[posten.zustand]}</span>
          {posten.standort && <span className="inline-flex min-w-0 items-start gap-1"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="break-words">{posten.standort}</span></span>}
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
          <p className="mt-4 text-xl font-semibold tracking-tight text-foreground">{homepagePreis(posten)}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">Details <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  )
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

  // Pro Kategorie nur ein veröffentlichtes Vorschaudokument, keine Vollbestands-Abfrage.
  const kategorien = await Promise.all(KATEGORIE_ANZEIGE.map(async (key) => {
    const ergebnis = await payload.find({
      collection: 'posten',
      where: { and: [
        { veroeffentlicht: { equals: true } },
        { kategorie: { equals: key } },
      ] },
      sort: '-createdAt',
      depth: 1,
      limit: 1,
      select: { bilder: true },
    })
    return { key, anzahl: ergebnis.totalDocs, bild: ersteBildUrl(ergebnis.docs[0]?.bilder) }
  }))
  const titelbild = docs.map((posten) => ({ posten, bild: ersteBildUrl(posten.bilder) })).find((eintrag) => eintrag.bild)
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:py-12">
          <div className="min-w-0 self-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-accent">DPSS Management · Verwertungskatalog</p>
            <h1 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-foreground">
              Vermögenswerte<br className="hidden sm:block" /> professionell verwerten.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Fahrzeuge, Maschinen und Betriebsausstattung entdecken.
              Oder die Verwertung Ihrer Vermögenswerte mit DPSS organisieren.
            </p>
            <form action="/katalog" method="get" className="mt-6 flex min-w-0 border border-border bg-card p-1.5">
              <label htmlFor="startseite-suche" className="sr-only">Vermögenswerte durchsuchen</label>
              <input id="startseite-suche" type="search" name="q" placeholder="Was suchen Sie?"
                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" />
              <button type="submit" className="inline-flex h-12 min-w-12 shrink-0 items-center justify-center gap-2 bg-accent px-3 text-sm font-medium text-accent-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <Search className="h-5 w-5" aria-hidden="true" /><span className="sr-only sm:not-sr-only">Suchen</span>
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {(['fahrzeuge', 'maschinen', 'it-bueroelektronik'] as Kategorie[]).map((key) => (
                <Link key={key} href={`/katalog?kategorie=${key}`} className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline">{KATEGORIE_LABELS[key]}</Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3">
              <Link href="/katalog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent">Verwertungskatalog <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/kontakt?betreff=Verwertungsauftrag" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground">Verwertung anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
          {titelbild && (
            <Link href={`/katalog/${titelbild.posten.id}`} className="group relative hidden min-w-0 overflow-hidden border border-border bg-card lg:flex lg:flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 text-xs">
                <span className="font-medium uppercase tracking-[0.14em] text-accent">Einblick in den Bestand</span>
                <span className="text-muted-foreground">{STATUS_LABELS[titelbild.posten.status]}</span>
              </div>
              <div className="relative min-h-64 flex-1 bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={titelbild.bild!} alt={titelbild.posten.titel} fetchPriority="high" className="absolute inset-0 h-full w-full object-contain p-5" />
              </div>
              <div className="flex flex-wrap items-end justify-between gap-3 p-5">
                <div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">{KATEGORIE_LABELS[titelbild.posten.kategorie]}</p><h2 className="mt-1 text-lg font-semibold leading-snug">{titelbild.posten.titel}</h2></div>
                <span className="text-xl font-semibold">{homepagePreis(titelbild.posten)}</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="homepage-kategorien" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 id="homepage-kategorien" className="text-lg font-semibold tracking-tight sm:text-xl">Nach Kategorie entdecken</h2>
            <Link href="/katalog" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent">Alle Positionen <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {kategorien.filter((kategorie) => kategorie.anzahl > 0).map(({ key, anzahl, bild }, index) => (
              <Link key={key} href={`/katalog?kategorie=${key}`} className={`group min-w-0 overflow-hidden border border-border bg-background transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${index >= 4 ? 'hidden sm:block' : 'block'}`}>
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  {bild ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={bild} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-2" />
                  ) : <div className="flex h-full items-center justify-center"><Package className="h-7 w-7 text-muted-foreground" aria-hidden="true" /></div>}
                </div>
                <div className="p-3">
                  <h3 className="break-words text-sm font-semibold leading-snug">{KATEGORIE_LABELS[key]}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{anzahl} {anzahl === 1 ? 'Position' : 'Positionen'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="homepage-assets" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-10 lg:py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">Neu im Katalog</p><h2 id="homepage-assets" className="font-serif text-3xl leading-tight sm:text-4xl">Aktuelle Vermögenswerte</h2></div>
            <Link href="/katalog" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent">Gesamten Bestand ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {docs.map((posten) => <HomepageAsset key={posten.id} posten={posten} />)}
            </div>
          ) : (
            <div className="border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Derzeit keine veröffentlichten Positionen.</h3>
              <p className="mt-2 text-sm text-muted-foreground">Schauen Sie später wieder vorbei oder nehmen Sie Kontakt mit uns auf.</p>
              <Link href="/kontakt" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent">Kontakt aufnehmen</Link>
            </div>
          )}
          <div className="mt-6 flex flex-col justify-between gap-4 border border-border bg-card p-5 sm:flex-row sm:items-center">
            <div><h3 className="font-semibold">Gezielt zum passenden Vermögenswert</h3><p className="mt-1 text-sm text-muted-foreground">Bestand nach Kategorie, Zustand und Preis filtern.</p></div>
            <Link href="/katalog" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-accent px-5 text-sm font-medium text-accent-foreground">Katalog öffnen <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* PROFESSIONELLE VERWERTUNG — dunkles Kontrastband, 6 Kernpunkte */}
      {/* ============================================================= */}
      <section className="border-b border-border bg-[#16130f]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
          <div className="mb-8 max-w-2xl">
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
              <div key={punkt.nummer} className="flex flex-col gap-4 bg-[#16130f] p-5 md:p-6">
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
        <div className="reveal mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
          <div className="mb-8 max-w-2xl">
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
        <div className="reveal mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
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
        <div className="reveal mx-auto max-w-4xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
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
