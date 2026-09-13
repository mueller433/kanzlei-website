import { ArrowRight, MapPin, Package, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaqSection } from '@/components/faq-section'
import { KontaktCta } from '@/components/kontakt-cta'
import { findeFaqEintraege, STARTSEITE_FAQ_IDS } from '@/lib/faq-daten'
import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'
import { type Kategorie, ersteBildUrl, KATEGORIE_LABELS, PREIS_RANGES, STATUS_LABELS, ZUSTAND_LABELS, ZUSTAND_REIHENFOLGE } from '@/lib/katalog'
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
  return (
    <div>
      <section className="relative border-b border-border bg-[#17130f]">
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-[540px]">
          <Image
            src="/images/hero-marketplace.png"
            alt="Industriehalle mit Maschinen, Fahrzeugen und weiteren Vermögenswerten"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/95 via-[#17130f]/60 to-[#17130f]/25 lg:hidden" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 hidden w-[60%] bg-[#7a1f32]/94 [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)] lg:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-r from-transparent to-[#4d1020]/45 lg:block" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid min-h-[500px] max-w-7xl items-end px-4 pb-28 pt-14 sm:px-6 lg:min-h-[540px] lg:grid-cols-2 lg:items-center lg:px-24 lg:pb-24 lg:pt-20">
            <div className="lg:col-start-2 lg:pl-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                DPSS Management · Verwertung
              </p>
              <h1 className="max-w-xl font-serif text-[clamp(2.25rem,4.2vw,4rem)] font-semibold leading-[1.03] tracking-tight text-white">
                Vermögenswerte professionell verwerten.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                Aktuelle Fahrzeuge, Maschinen und Betriebsausstattung kaufen – oder eigene
                Vermögenswerte strukturiert und professionell verwerten lassen.
              </p>
              <div className="mt-7 grid gap-3 sm:flex">
                <Link
                  href="/katalog"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17130f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Vermögenswerte kaufen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/kontakt?betreff=Verwertungsauftrag"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/70 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Vermögenswerte verwerten <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 pb-8 sm:px-6 lg:-mt-20 lg:px-10 lg:pb-10">
          <form action="/katalog" method="get" className="border border-border bg-card p-4 shadow-[0_18px_50px_-30px_rgba(23,19,15,0.55)] sm:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Verwertungskatalog</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Passenden Bestand finden</h2>
              </div>
              <Link href="/katalog" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent">
                Alle Positionen <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <label htmlFor="hero-suche" className="sr-only">Schnellsuche im Verwertungskatalog</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id="hero-suche"
                type="search"
                name="q"
                placeholder="Zum Beispiel Fahrzeug, Minibagger oder Büroausstattung"
                className="h-14 w-full border border-border bg-background pl-12 pr-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
              <label className="min-w-0">
                <span className="sr-only">Kategorie</span>
                <select name="kategorie" defaultValue="" className="h-12 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent">
                  <option value="">Alle Kategorien</option>
                  {KATEGORIE_ANZEIGE.map((key) => <option key={key} value={key}>{KATEGORIE_LABELS[key]}</option>)}
                </select>
              </label>
              <label className="hidden min-w-0 sm:block">
                <span className="sr-only">Zustand</span>
                <select name="zustand" defaultValue="" className="h-12 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent">
                  <option value="">Alle Zustände</option>
                  {ZUSTAND_REIHENFOLGE.map((key) => <option key={key} value={key}>{ZUSTAND_LABELS[key]}</option>)}
                </select>
              </label>
              <label className="hidden min-w-0 sm:block">
                <span className="sr-only">Preisbereich</span>
                <select name="preis" defaultValue="" className="h-12 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent">
                  <option value="">Alle Preise</option>
                  {PREIS_RANGES.map((range) => <option key={range.key} value={range.key}>{range.label}</option>)}
                </select>
              </label>
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <Search className="h-4 w-4" aria-hidden="true" /> Suchen
              </button>
            </div>
          </form>
        </div>
      </section>

      <section aria-labelledby="homepage-kategorien" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Kategorien
              </p>
              <h2 id="homepage-kategorien" className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Vermögenswerte entdecken
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Direkt zu den verfügbaren Fahrzeugen, Maschinen und weiteren Vermögenswerten.
              </p>
            </div>
            <Link href="/katalog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent">
              Alle Kategorien <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {kategorien.filter((kategorie) => kategorie.anzahl > 0).map(({ key, anzahl, bild }, index) => {
              const hervorgehoben = index < 2
              return (
                <Link
                  key={key}
                  href={`/katalog?kategorie=${key}`}
                  className={`group relative aspect-[4/3] w-[78vw] max-w-[310px] shrink-0 snap-start overflow-hidden border border-border bg-[#24201b] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:w-[44vw] lg:w-auto lg:max-w-none ${hervorgehoben ? 'lg:col-span-6 lg:aspect-[16/8]' : 'lg:col-span-3 lg:aspect-[4/3]'}`}
                >
                  {bild ? (
                    // Das Bild ist dekorativ; Kategorie und Anzahl stehen als Text darüber.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bild}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#24201b]">
                      <Package className="h-10 w-10 text-white/35" aria-hidden="true" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5 transition-colors group-hover:from-black/90" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <div className="min-w-0">
                      <h3 className={`break-words font-serif font-semibold leading-tight text-white ${hervorgehoben ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                        {KATEGORIE_LABELS[key]}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/75">
                        {anzahl} {anzahl === 1 ? 'Position' : 'Positionen'}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 bg-black/15 text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-foreground">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground lg:hidden">
            Seitlich wischen, um weitere Kategorien zu sehen.
          </p>
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
