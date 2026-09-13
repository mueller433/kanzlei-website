import { ArrowRight, ScaleIcon, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaqSection } from '@/components/faq-section'
import { KatalogPositionGridKarte } from '@/components/katalog-position-grid-karte'
import { KontaktCta } from '@/components/kontakt-cta'
import { ParallaxBild } from '@/components/parallax-bild'
import { findeFaqEintraege, STARTSEITE_FAQ_IDS } from '@/lib/faq-daten'
import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'
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
    titel: 'Strukturierte Inventarisierung',
    text: 'Lückenlose Erfassung aller Vermögenswerte inklusive Zustand, Standort und Dokumentation.',
  },
  {
    titel: 'Marktgerechte Bewertung',
    text: 'Realistische Wertansätze auf Basis aktueller Marktdaten und langjähriger Erfahrung.',
  },
  {
    titel: 'Professionelle Vermarktung',
    text: 'Zielgerichtete Ansprache passender Käufer über geeignete Kanäle und Netzwerke.',
  },
  {
    titel: 'Transparente Verkaufsprozesse',
    text: 'Nachvollziehbare Abläufe und klare Kommunikation in jedem Schritt des Verfahrens.',
  },
  {
    titel: 'Dokumentierte Abwicklung',
    text: 'Vollständige Nachweisführung von der ersten Erfassung bis zur finalen Abrechnung.',
  },
  {
    titel: 'Persönlicher Ansprechpartner',
    text: 'Eine feste Kontaktperson begleitet Auftraggeber und Interessenten über das gesamte Verfahren.',
  },
] as const

const WARUM_DPSS_PUNKTE = [
  'Nachvollziehbare Herkunft',
  'Transparente Verwertung',
  'Verbindliche Abwicklung',
] as const

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
      {/* HERO */}
      {/* Full-Width Hintergrundbild über die gesamte Sektion, mit subtilem
          dunklem Verlauf von links für Lesbarkeit. Text in Off-White links
          platziert, Bild rechts bleibt ruhig sichtbar. */}
      <section className="relative flex min-h-[720px] items-center overflow-hidden md:min-h-[680px]">
        <Image
          src="/images/hero-industrie-modern.png"
          alt="Moderne, helle Industriehalle mit Präzisionsmaschinen und klarer, aufgeräumter Struktur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#141110]/88 from-0% via-[#141110]/45 via-48% to-[#141110]/5 to-85%"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-[560px]">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#f7f5f0]">
              DPSS MANAGEMENT
            </p>
            <h1 className="font-serif text-[2.3rem] font-semibold leading-[1.05] tracking-tight text-[#f7f5f0] text-balance md:text-[3.6rem] lg:text-[4.1rem]">
              Vermögenswerte
              <br />
              professionell
              <br />
              verwerten.
            </h1>
            <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-[#e4e0d6] text-pretty">
              DPSS Management unterstützt Unternehmen, Insolvenzverwalter und Verfahrensbeteiligte
              bei der strukturierten Erfassung, Bewertung, Vermarktung und Verwertung von
              Vermögenswerten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Zum Verwertungskatalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 border border-[#f7f5f0]/45 bg-[#f7f5f0]/10 px-6 py-3 text-sm font-medium text-[#f7f5f0] backdrop-blur-sm transition-colors hover:border-[#f7f5f0]/70 hover:bg-[#f7f5f0]/18"
              >
                Verwertung anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AKTUELLE POSITIONEN / KATALOG — edles 3-spaltiges Card-Grid */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Verwertung · Katalog
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              Aktuelle Vermögenswerte
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              Entdecken Sie aktuell verfügbare Maschinen, Fahrzeuge, Betriebsausstattung und
              weitere Vermögenswerte aus laufenden Verwertungs- und Auflösungsverfahren.
            </p>
          </div>

          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((posten) => (
                <KatalogPositionGridKarte key={posten.id} posten={posten} />
              ))}
            </div>
          ) : (
            <div className="border-t border-border py-10">
              <p className="font-serif text-xl text-foreground">Derzeit keine Positionen verfügbar.</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Schauen Sie später wieder vorbei oder nehmen Sie direkt Kontakt mit uns auf.
              </p>
            </div>
          )}

          <div className="mt-14 flex justify-center">
            <Link
              href="/katalog"
              className="group inline-flex items-center justify-center gap-2 border border-accent/40 bg-accent/5 px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/10"
            >
              Alle Positionen ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ZWEI WEGE, EIN PARTNER — Zielgruppen-Split direkt nach dem Produkt-Grid */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Zwei Wege, ein Partner
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              Für Auftraggeber und Käufer
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1: Für Unternehmen & Insolvenzverwalter */}
            <div className="flex flex-col gap-8 border border-border bg-card p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/5">
                <ScaleIcon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-tight text-card-foreground text-balance md:text-[1.7rem]">
                  Für Unternehmen &amp; Insolvenzverwalter
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
                  Professionelle Unterstützung bei Inventarisierung, Bewertung, Vermarktung und
                  Verwertung von Maschinen, Fahrzeugen, Betriebsausstattung und Warenbeständen.
                </p>
              </div>
              <Link
                href="/leistungen"
                className="group mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Unsere Leistungen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Card 2: Für Käufer & Investoren */}
            <div className="flex flex-col gap-8 border border-border bg-card p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/5">
                <Search className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-tight text-card-foreground text-balance md:text-[1.7rem]">
                  Für Käufer &amp; Investoren
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
                  Entdecken Sie aktuelle Maschinen, Fahrzeuge, Betriebsausstattung und weitere
                  Vermögenswerte im DPSS Verwertungskatalog.
                </p>
              </div>
              <Link
                href="/katalog"
                className="group mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Katalog ansehen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WARUM DPSS — sechs Kernpunkte als ruhiges Kartenraster */}
      <section className="border-b border-border bg-background">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Warum DPSS
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Verlässliche Verwertung mit Struktur und Transparenz.
            </h2>
          </div>

          <div className="karten-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WARUM_DPSS.map((punkt) => (
              <div key={punkt.titel} className="flex flex-col gap-3 border border-border bg-card p-7">
                <h3 className="font-serif text-xl text-card-foreground text-balance">{punkt.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {punkt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÜBER DPSS MANAGEMENT */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Über DPSS
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Verwertung aus einer Hand
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                DPSS Management übernimmt die operative Verwertung von Vermögenswerten im Auftrag
                von Insolvenzverwaltern, Unternehmen und weiteren Verfahrensbeteiligten.
              </p>
              <p>
                Dabei verbinden wir eine strukturierte Bestandsaufnahme und Bewertung mit einer
                zielgerichteten Vermarktung. Vermögenswerte werden erfasst, dokumentiert,
                marktgerecht eingeordnet und über passende Kanäle potenziellen Interessenten
                angeboten.
              </p>
              <p>
                Von der ersten Aufnahme bis zur erfolgreichen Abwicklung behalten wir den gesamten
                Prozess im Blick. Dadurch entstehen nachvollziehbare Abläufe, klare Zuständigkeiten
                und eine transparente Dokumentation.
              </p>
              <Link
                href="/unternehmen"
                className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Mehr über DPSS Management
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UNSER ABLAUF — kompaktes, horizontales 3-Spalten-Grid statt langer vertikaler Zeilen */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Ablauf
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              So funktioniert die Verwertung.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
            {ABLAUF.map((schritt) => (
              <div key={schritt.nummer} className="flex flex-col gap-3 border border-border bg-card p-7">
                <span className="font-serif text-3xl leading-none text-accent">{schritt.nummer}</span>
                <h3 className="font-serif text-xl text-card-foreground">{schritt.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {schritt.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL / INDUSTRIE */}
      <section className="border-b border-border">
        <div className="reveal mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10 md:py-28">
          <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
            Vermögenswerte gezielt in den Markt bringen.
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Nicht jeder Vermögenswert erreicht seinen passenden Käufer über denselben Weg.
                Deshalb verbinden wir eine strukturierte Erfassung mit einer gezielten
                Vermarktungsstrategie.
              </p>
              <p>
                Wir analysieren die vorhandenen Positionen, bereiten relevante Informationen auf
                und wählen geeignete Kanäle für die Ansprache potenzieller Interessenten.
              </p>
            </div>
            <Link
              href="/verwertung"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Mehr über die Verwertung
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WARUM DPSS — grosse Editorial-Bildsektion mit sehr dezentem Parallax */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="warum-bild-fade absolute inset-0">
          <ParallaxBild
            src="/warum-dpss-editorial.png"
            alt="Industrielagerhalle mit hohen Palettenregalen in warmem Licht"
          />
        </div>
        <div className="warum-overlay-reveal absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/75 to-foreground/50" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:gap-16 md:px-10 md:py-32">
          <div className="warum-text-reveal">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-background/70">
              Herkunft &amp; Vertrauen
            </p>
            <h2 className="max-w-xl font-serif text-3xl leading-tight text-background text-balance md:text-4xl">
              Keine anonyme Restware, sondern Vermögenswerte mit Herkunft.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-background/85 text-pretty">
              Jede Position stammt aus einem konkreten Verfahren, ist dokumentiert und bewertet.
              So bleibt für Auftraggeber und Käufer jederzeit nachvollziehbar, woher ein
              Vermögenswert stammt und wie mit ihm verfahren wird.
            </p>
          </div>

          <div className="warum-punkte flex flex-col gap-7 self-end">
            <ul className="flex flex-col gap-7">
              {WARUM_DPSS_PUNKTE.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent ring-1 ring-background/40"
                    aria-hidden="true"
                  />
                  <span className="text-base font-medium text-background text-pretty">{punkt}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Jetzt Kontakt aufnehmen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FACHBEITRÄGE / AKTUELLES */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Aktuelles
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
                Fachbeiträge &amp; Einblicke
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                Fundierte Einordnungen zu Wertermittlung, Standortmanagement, Fremdrechten und
                übertragender Sanierung – aus der Praxis für Verfahrensbeteiligte.
              </p>
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

      {/* FAQ — kompakter Teaser mit 5 ausgewählten Fragen */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Häufige Fragen
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
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

      {/* KONTAKT-CTA */}
      <KontaktCta
        eyebrow="Kontakt"
        titel="Sie möchten Vermögenswerte professionell verwerten?"
        text="Sprechen Sie mit DPSS Management über Ihr Vorhaben."
        buttonLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
