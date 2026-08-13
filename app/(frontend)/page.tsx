import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { EditorialProzess } from '@/components/editorial-prozess'
import { KatalogPositionKarte } from '@/components/katalog-position-karte'
import { KontaktCta } from '@/components/kontakt-cta'
import { ParallaxBild } from '@/components/parallax-bild'
import type { Schritt } from '@/components/prozess-schritte'
import config from '@/payload.config'
import './styles.css'

export const metadata = {
  title: 'Verwertung von Vermögenswerten',
  description:
    'DPSS Management GmbH verwertet Vermögenswerte im Auftrag von Insolvenzverwaltern und bietet Käufern einen transparenten Katalog aktueller Positionen.',
}

const ABLAUF: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Auftrag & Zielsetzung',
    beschreibung: 'Gemeinsame Klärung des Bestands, der Zielsetzung und des vorgesehenen Verwertungswegs.',
  },
  {
    schritt: '02',
    titel: 'Erfassung & Einordnung',
    beschreibung: 'Systematische Aufnahme und marktgerechte Einordnung der vorhandenen Vermögenswerte.',
  },
  {
    schritt: '03',
    titel: 'Verwertung',
    beschreibung: 'Gezielte Vermarktung und Ansprache geeigneter Interessenten.',
  },
  {
    schritt: '04',
    titel: 'Abwicklung',
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
            <div className="mt-6 flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Wir unterstützen Insolvenzverwalter und Verfahrensbeteiligte bei Erfassung, Bewertung,
                Vermarktung und Verkauf von Vermögenswerten. Käufer finden aktuelle Positionen
                übersichtlich in unserem Verwertungskatalog.
              </p>
              <p>
                DPSS Management unterstützt Insolvenzverwalter, Verfahrensbeteiligte und Unternehmen
                bei der strukturierten Erfassung, Bewertung, Vermarktung und Verwertung von
                Vermögenswerten. Von Maschinen und technischen Anlagen bis hin zu Fahrzeugen,
                Betriebsausstattung und weiteren Vermögenswerten begleiten wir den gesamten
                Verwertungsprozess.
              </p>
            </div>
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
              In unserem Katalog finden Sie ausgewählte Vermögenswerte aus laufenden Verwertungs- und
              Auflösungsverfahren. Die Positionen werden erfasst, eingeordnet und gezielt über
              geeignete Kanäle angeboten. So schaffen wir einen übersichtlichen Zugang zu Maschinen,
              Anlagen, Fahrzeugen, Betriebsausstattung und weiteren Vermögenswerten.
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
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Verwertung aus einer Hand
            </h2>
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
            </div>
          </div>

          <div className="mt-16 grid border-t border-border md:grid-cols-3 md:divide-x md:divide-border">
            {[
              {
                nummer: '01',
                titel: 'Erfassung & Bewertung',
                text: 'Vermögenswerte werden strukturiert aufgenommen, dokumentiert und marktgerecht eingeordnet.',
              },
              {
                nummer: '02',
                titel: 'Vermarktung & Verkauf',
                text: 'Geeignete Vermögenswerte werden gezielt angeboten und potenziellen Interessenten zugänglich gemacht.',
              },
              {
                nummer: '03',
                titel: 'Abrechnung & Dokumentation',
                text: 'Vorgänge, Verkäufe und Abrechnungen werden nachvollziehbar dokumentiert.',
              },
            ].map((kompetenz) => (
              <div key={kompetenz.nummer} className="flex flex-col gap-3 border-b border-border py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <span className="font-serif text-sm text-accent">{kompetenz.nummer}</span>
                <h3 className="font-serif text-xl text-foreground">{kompetenz.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">{kompetenz.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNSER ABLAUF */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unser Ablauf
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Strukturiert von der Beauftragung bis zum Abschluss.
            </h2>
          </div>
          <EditorialProzess schritte={ABLAUF} />
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
