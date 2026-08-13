import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { AktuelleVerwertungTicker, type TickerEintrag } from '@/components/aktuelle-verwertung-ticker'
import { KatalogPositionKarte } from '@/components/katalog-position-karte'
import { KontaktCta } from '@/components/kontakt-cta'
import { ParallaxBild } from '@/components/parallax-bild'
import { ProzessSchritte, type Schritt } from '@/components/prozess-schritte'
import { KATEGORIE_LABELS } from '@/lib/katalog'
import config from '@/payload.config'
import './styles.css'

export const metadata = {
  title: 'Verwertung von Vermögenswerten',
  description:
    'DPSS Management GmbH verwertet Vermögenswerte im Auftrag von Insolvenzverwaltern und bietet Käufern einen transparenten Katalog aktueller Positionen.',
}

const LEISTUNGEN: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Beauftragung',
    beschreibung: 'Wir klären Bestand, Zielsetzung und Ablauf gemeinsam mit dem Auftraggeber.',
  },
  {
    schritt: '02',
    titel: 'Erfassung & Bewertung',
    beschreibung: 'Vermögenswerte werden aufgenommen, eingeordnet und marktgerecht bewertet.',
  },
  {
    schritt: '03',
    titel: 'Vermarktung',
    beschreibung: 'Positionen werden zielgerichtet über passende Kanäle und den Katalog angeboten.',
  },
  {
    schritt: '04',
    titel: 'Verkauf',
    beschreibung: 'Wir koordinieren Interessenten, Angebote und die nachvollziehbare Abwicklung.',
  },
  {
    schritt: '05',
    titel: 'Abrechnung & Dokumentation',
    beschreibung: 'Erlöse, Vorgänge und Abrechnung werden transparent dokumentiert.',
  },
] as const

const ABLAUF: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Bestand erfassen',
    beschreibung: 'Wir verschaffen uns einen vollständigen Überblick über die vorhandenen Vermögenswerte.',
  },
  {
    schritt: '02',
    titel: 'Bewerten',
    beschreibung: 'Wir ordnen die Positionen ein und schaffen eine realistische Grundlage für die Vermarktung.',
  },
  {
    schritt: '03',
    titel: 'Vermarkten',
    beschreibung: 'Geeignete Vermögenswerte werden gezielt angeboten und Interessenten angesprochen.',
  },
  {
    schritt: '04',
    titel: 'Abwickeln',
    beschreibung: 'Verkauf, Dokumentation und Abrechnung werden nachvollziehbar abgeschlossen.',
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
    limit: 3,
  })

  // Ausschließlich aus echten, veröffentlichten Katalogdaten abgeleitet –
  // keine erfundenen Beispieleinträge. Ohne veröffentlichte Posten bleibt
  // der Ticker leer und die Komponente rendert nichts.
  const tickerEintraege: TickerEintrag[] = docs.map((posten, index) => {
    const label =
      posten.status === 'verkauft'
        ? 'Verwertung abgeschlossen'
        : posten.status === 'reserviert'
          ? 'Position reserviert'
          : index === 0
            ? 'Neue Position'
            : 'Position verfügbar'
    const kategorieLabel = KATEGORIE_LABELS[posten.kategorie]
    const sub = posten.standort ? `${kategorieLabel} · ${posten.standort}` : kategorieLabel
    return { label, sub }
  })

  return (
    <div>
      {/* HERO */}
      <section className="overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-10 md:pt-16 md:pb-20">
          <div className="hero-einblenden">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              DPSS Management GmbH · Verwertung
            </p>
            <h1 className="max-w-xl font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-foreground text-balance md:text-5xl">
              Vermögenswerte professionell verwerten.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Wir unterstützen Insolvenzverwalter und Verfahrensbeteiligte bei Erfassung, Bewertung,
              Vermarktung und Verkauf von Vermögenswerten. Käufer finden aktuelle Positionen
              übersichtlich in unserem Verwertungskatalog.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Aktuelle Positionen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Verwertung anfragen
              </Link>
            </div>
            <AktuelleVerwertungTicker eintraege={tickerEintraege} />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border md:aspect-[4/5]">
            <Image
              src="/hero-lagerhalle.jpg"
              alt="Lagerhalle mit Regalsystemen und Gabelstapler bei der Bestandsverwertung"
              fill
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="hero-bild-scale object-cover"
            />
          </div>
        </div>
      </section>

      {/* AKTUELLE POSITIONEN / KATALOG — direkt unter dem Hero */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Verwertung · Katalog
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Aktuelle Positionen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Aktuelle Vermögenswerte aus laufenden Verwertungs- und Auflösungsverfahren.
            </p>
          </div>

          {docs.length > 0 ? (
            <>
              <div className="karten-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((posten) => (
                  <KatalogPositionKarte key={posten.id} posten={posten} />
                ))}
              </div>
              <div className="mt-12">
                <Link
                  href="/katalog"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  Alle Positionen ansehen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="border border-border bg-card p-10 md:p-12">
              <p className="font-serif text-xl text-card-foreground">
                Derzeit keine Positionen verfügbar.
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Schauen Sie später wieder vorbei oder nehmen Sie direkt Kontakt mit uns auf.
              </p>
              <Link
                href="/kontakt"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* VERWERTUNG AUS EINER HAND */}
      <section className="border-b border-border">
        <div className="reveal mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10 md:py-28">
          <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
            Verwertung aus einer Hand
          </h2>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            <p>
              DPSS übernimmt die operative Verwertung von Vermögenswerten im Auftrag von
              Insolvenzverwaltern und anderen Verfahrensbeteiligten.
            </p>
            <p>
              Von der Bestandsaufnahme bis zur Abrechnung schaffen wir einen geordneten Ablauf,
              realistische Marktansprache und belastbare Berichte.
            </p>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Leistungen
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Von der Erfassung bis zur Abrechnung.
            </h2>
          </div>
          <ProzessSchritte schritte={LEISTUNGEN} />
        </div>
      </section>

      {/* UNSER ABLAUF */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unser Ablauf
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Strukturiert. Nachvollziehbar. Transparent.
            </h2>
          </div>
          <ProzessSchritte schritte={ABLAUF} />
        </div>
      </section>

      {/* EDITORIAL / INDUSTRIE */}
      <section className="border-b border-border">
        <div className="reveal mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10 md:py-28">
          <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
            Vermögenswerte gezielt in den Markt bringen.
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Wir verbinden strukturierte Erfassung und Bewertung mit einer zielgerichteten
              Vermarktung. So werden Vermögenswerte dort angeboten, wo sie die passenden
              Interessenten erreichen.
            </p>
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
              Warum DPSS
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

          <ul className="warum-punkte flex flex-col gap-7 self-end">
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
        </div>
      </section>

      {/* KONTAKT-CTA */}
      <KontaktCta
        titel="Sie möchten Vermögenswerte verwerten lassen?"
        text="Sprechen Sie uns an, wenn Sie eine Verwertung beauftragen oder eine Position aus dem Katalog näher prüfen möchten."
        buttonLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
