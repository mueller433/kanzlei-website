import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { ProzessSchritte } from '@/components/prozess-schritte'
import { TeamKarte } from '@/components/team-karte'
import { VertrauensBereich } from '@/components/vertrauens-bereich'
import { TEAM, TEAM_GRUPPENFOTO } from '@/lib/kanzlei-daten'
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

const KOMPETENZBEREICHE = [
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
    titel: 'Wirtschaftsrecht',
    href: '/leistungen',
    beschreibung:
      'Wirtschaftsrechtliche Fragestellungen im Umfeld von Krisensituationen, Verfahren und unternehmerischen Entscheidungen – eingebettet in unsere Verfahrenspraxis.',
  },
  {
    titel: 'Verwertung',
    href: '/verwertung',
    beschreibung:
      'Transparente, marktgerechte Verwertung von Vermögenswerten aus laufenden Verfahren – dokumentiert und nachvollziehbar.',
  },
] as const

// Bewusst nur so weit ausdifferenziert, wie es zu den bestehenden Abläufen
// auf /insolvenzrecht (Antrag & Prüfung, Eröffnung, Verwaltung, Verteilung)
// und /verwertung (Identifikation, Bewertung, Verwertung, Dokumentation) passt.
const ABLAUF_SCHRITTE = [
  {
    schritt: '01',
    titel: 'Prüfung',
    beschreibung:
      'Einordnung der wirtschaftlichen und rechtlichen Lage sowie Prüfung der Insolvenzgründe und der geeigneten Verfahrensart.',
  },
  {
    schritt: '02',
    titel: 'Verfahren',
    beschreibung:
      'Eröffnung des Verfahrens, Bestellung des Verwalters und Sicherung der vorhandenen Masse.',
  },
  {
    schritt: '03',
    titel: 'Verwaltung',
    beschreibung:
      'Fortführung oder Stilllegung, Forderungsprüfung und laufende Verwaltung der Insolvenzmasse.',
  },
  {
    schritt: '04',
    titel: 'Verwertung',
    beschreibung:
      'Identifikation, Bewertung und marktgerechte Verwertung der vorhandenen Vermögenswerte.',
  },
  {
    schritt: '05',
    titel: 'Abschluss',
    beschreibung:
      'Verteilung der Erlöse an die Gläubiger, vollständige Dokumentation und Beendigung des Verfahrens.',
  },
] as const

function KatalogTeaserKarte({ posten }: { posten: Posten }) {
  return (
    <Link
      href={`/katalog/${posten.id}`}
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
      {/* HERO */}
      <section className="overflow-hidden border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            {/* Textspalte */}
            <div className="hero-einblenden">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Insolvenzrecht &middot; Restrukturierung &middot; Wirtschaftsrecht &middot; Verwertung
              </p>
              <h1 className="max-w-xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Wirtschaftliche Krisen ordnen. Werte sichern. Verfahren verantworten.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                Müller &amp; Partner begleitet Unternehmen, Gläubiger und Beteiligte durch
                Insolvenz- und Sanierungsverfahren sowie die anschließende Verwertung von
                Vermögenswerten – mit klarer Struktur, wirtschaftlichem Augenmaß und
                nachvollziehbarer Dokumentation.
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

            {/* Gestalterische Fläche: gestaffelte Ebenen aus dem Designsystem,
                das freigestellte Teamfoto als geerdetes, atmosphärisches
                Element – bewusst kein Stock-Foto-Hero. */}
            <div
              className="hero-einblenden relative hidden md:block"
              style={{ animationDelay: '140ms' }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-x-5 translate-y-5 border border-border" />
              <div className="relative flex min-h-[26rem] flex-col justify-between border border-border bg-card p-8">
                <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Müller &amp; Partner
                  </span>
                </div>
                <div className="relative mx-auto -mb-8 h-72 w-full max-w-[19rem]">
                  <Image
                    src={TEAM_GRUPPENFOTO || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="19rem"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 KANZLEI / POSITIONIERUNG */}
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

      {/* 02 KOMPETENZBEREICHE */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Kompetenzbereiche
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Vier Bereiche, ein Anspruch
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {KOMPETENZBEREICHE.map((bereich) => (
              <Link
                key={bereich.href}
                href={bereich.href}
                className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-card"
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

      {/* 03 WARUM DIESE KANZLEI – qualitative Aussagen, bewusst ohne Zahlen */}
      <VertrauensBereich />

      {/* 04 INSOLVENZRECHT */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Fachgebiet
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Insolvenzrecht
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Ein Insolvenzverfahren ordnet eine wirtschaftliche Krise rechtlich – es sichert das
                vorhandene Vermögen, behandelt Gläubiger nach klaren Regeln und schafft einen
                verbindlichen Rahmen für das weitere Vorgehen. Wir begleiten Regel- und
                Eigenverwaltungsverfahren ebenso wie die Vertretung von Gläubigern.
              </p>
              <Link
                href="/insolvenzrecht"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                Insolvenzrecht im Detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 VERWERTUNG mit expliziter Überleitung zu 06 AKTUELLE POSITIONEN */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Verwertung
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Verwertung schafft nur dann Vertrauen, wenn sie nachvollziehbar ist. Wir
                identifizieren, bewerten und verwerten Vermögenswerte aus laufenden Verfahren –
                dokumentiert und für alle Beteiligten nachvollziehbar offengelegt.
              </p>
              <p>
                Einen aktuellen Ausschnitt aus unserem Bestand finden Sie direkt im Anschluss – der
                vollständige Verwertungskatalog ist jederzeit einsehbar.
              </p>
              <Link
                href="/verwertung"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                Verwertung im Detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 06 AKTUELLE POSITIONEN – dynamisch aus der posten-Collection */}
          {neuestePosten.length > 0 && (
            <div className="mt-16 border-t border-border pt-16">
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    Verwertungskatalog
                  </p>
                  <h3 className="font-serif text-2xl leading-tight text-foreground text-balance md:text-3xl">
                    Aktuelle Positionen aus laufenden Verfahren
                  </h3>
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
          )}
        </div>
      </section>

      {/* 07 ARBEITSWEISE / ABLAUF */}
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

      {/* 08 TEAM – echte Mitarbeiterfotos aus lib/kanzlei-daten.ts */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Team</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wer für Sie tätig wird
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TEAM.map((person) => (
              <TeamKarte key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* 09 KONTAKT */}
      <KontaktCta
        titel="Sie stehen vor einer schwierigen wirtschaftlichen Entscheidung?"
        text="Sprechen Sie uns an. Wir ordnen Ihre Situation ein und zeigen Ihnen die möglichen nächsten Schritte – vertraulich und unverbindlich."
      />
    </div>
  )
}
