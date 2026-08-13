import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { ProzessSchritte, type Schritt } from '@/components/prozess-schritte'
import { VertrauensBereich } from '@/components/vertrauens-bereich'
import config from '@/payload.config'
import type { Posten } from '@/payload-types'
import './styles.css'

export const metadata = {
  title: 'Verwertung von Vermögenswerten',
  description:
    'DPSS Management GmbH verwertet Vermögenswerte im Auftrag von Insolvenzverwaltern und bietet Käufern einen transparenten Katalog aktueller Positionen.',
}

const KATEGORIE_LABELS: Record<Posten['kategorie'], string> = {
  immobilien: 'Immobilien',
  maschinen: 'Maschinen',
  fahrzeuge: 'Fahrzeuge',
  inventar: 'Inventar',
  sonstiges: 'Sonstiges',
}

const PROZESS: readonly Schritt[] = [
  { schritt: '01', titel: 'Beauftragung', beschreibung: 'Wir klären Bestand, Zielsetzung und Ablauf gemeinsam mit dem Auftraggeber.' },
  { schritt: '02', titel: 'Erfassung & Bewertung', beschreibung: 'Vermögenswerte werden aufgenommen, eingeordnet und marktgerecht bewertet.' },
  { schritt: '03', titel: 'Vermarktung', beschreibung: 'Positionen werden zielgerichtet über passende Kanäle und den Katalog angeboten.' },
  { schritt: '04', titel: 'Verkauf', beschreibung: 'Wir koordinieren Interessenten, Angebote und die nachvollziehbare Abwicklung.' },
  { schritt: '05', titel: 'Abrechnung & Dokumentation', beschreibung: 'Erlöse, Vorgänge und Abrechnung werden transparent dokumentiert.' },
]

function formatPreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(preis)
}

function KatalogKarte({ posten }: { posten: Posten }) {
  return (
    <Link href={`/katalog/${posten.id}`} className="group flex flex-col justify-between gap-6 border border-border bg-card p-6 transition-colors hover:border-accent">
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.16em] text-accent">{KATEGORIE_LABELS[posten.kategorie]}</span>
        <span className="font-serif text-xl leading-snug text-card-foreground text-balance">{posten.titel}</span>
      </div>
      <span className="text-sm text-muted-foreground">{posten.preisAufAnfrage ? 'Preis auf Anfrage' : typeof posten.preis === 'number' ? formatPreis(posten.preis) : 'Preis auf Anfrage'}</span>
    </Link>
  )
}

export default async function Startseite() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'posten', where: { veroeffentlicht: { equals: true } }, sort: '-createdAt', depth: 1, limit: 3 })

  return (
    <div>
      <section className="overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-32">
          <div className="hero-einblenden">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">DPSS Management GmbH · Verwertung</p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance md:text-6xl">Vermögenswerte professionell verwerten. Ergebnisse transparent dokumentieren.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">Wir unterstützen Insolvenzverwalter und Verfahrensbeteiligte bei Erfassung, Bewertung, Vermarktung und Verkauf von Vermögenswerten. Käufer finden aktuelle Positionen übersichtlich in unserem Verwertungskatalog.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/katalog" className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">Aktuelle Positionen <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent">Verwertung anfragen</Link>
            </div>
          </div>
          <div className="hidden border border-border bg-card p-8 md:block">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Für Auftraggeber und Käufer</p>
            <p className="mt-8 font-serif text-3xl leading-tight text-card-foreground">Struktur im Bestand. Klarheit im Prozess. Nachvollziehbarkeit im Ergebnis.</p>
            <div className="mt-12 flex items-center gap-4"><span className="h-px flex-1 bg-accent" /><span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Göttingen</span></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border"><div className="reveal mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-28 md:gap-16"><h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">Verwertung aus einer Hand</h2><div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty"><p>DPSS übernimmt die operative Verwertung von Vermögenswerten im Auftrag von Insolvenzverwaltern und anderen Verfahrensbeteiligten.</p><p>Von der Bestandsaufnahme bis zur Abrechnung schaffen wir einen geordneten Ablauf, realistische Marktansprache und belastbare Berichte.</p></div></div></section>

      <VertrauensBereich />

      <section className="border-b border-border"><div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><div className="mb-12 max-w-2xl"><p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Leistungen</p><h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">Vom Vermögenswert zum dokumentierten Ergebnis</h2></div><div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">{['Erfassung & Bewertung','Marktgerechte Vermarktung','Abwicklung & Berichterstattung'].map((titel) => <div key={titel} className="flex flex-col gap-4 bg-background p-8 md:p-10"><h3 className="font-serif text-2xl text-foreground">{titel}</h3><p className="text-base leading-relaxed text-muted-foreground">Wir schaffen klare Grundlagen für Entscheidungen, Angebote, Verkäufe und die abschließende Dokumentation.</p></div>)}</div></div></section>

      <section className="border-b border-border"><div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Verwertungskatalog</p><h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">Aktuelle Positionen direkt einsehen</h2></div><Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-medium text-accent">Zum vollständigen Katalog <ArrowRight className="h-4 w-4" /></Link></div>{docs.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{docs.map((posten) => <KatalogKarte key={posten.id} posten={posten} />)}</div> : <p className="border border-border bg-card p-8 text-muted-foreground">Aktuell sind keine veröffentlichten Positionen verfügbar.</p>}</div></section>

      <section className="border-b border-border"><div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><div className="mb-12 max-w-2xl"><p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Arbeitsweise</p><h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">Fünf Schritte, klar dokumentiert</h2></div><ProzessSchritte schritte={PROZESS} /></div></section>

      <KontaktCta titel="Sie möchten Vermögenswerte verwerten lassen?" text="Sprechen Sie uns an, wenn Sie eine Verwertung beauftragen oder eine Position aus dem Katalog näher prüfen möchten." buttonLabel="Kontakt aufnehmen" />
    </div>
  )
}
