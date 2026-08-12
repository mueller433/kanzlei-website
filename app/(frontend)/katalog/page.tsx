import { ArrowRight } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import config from '@/payload.config'
import type { Posten } from '@/payload-types'
import '../styles.css'

/**
 * Feste Reihenfolge der Kategorien für die Gruppierung.
 * Entspricht den `options` des `kategorie`-Feldes in collections/Posten.ts.
 */
const KATEGORIE_REIHENFOLGE = [
  'immobilien',
  'maschinen',
  'fahrzeuge',
  'inventar',
  'sonstiges',
] as const

const KATEGORIE_LABELS: Record<(typeof KATEGORIE_REIHENFOLGE)[number], string> = {
  immobilien: 'Immobilien',
  maschinen: 'Maschinen',
  fahrzeuge: 'Fahrzeuge',
  inventar: 'Inventar',
  sonstiges: 'Sonstiges',
}

type KategorieGruppe = {
  kategorie: (typeof KATEGORIE_REIHENFOLGE)[number]
  label: string
  posten: Posten[]
  anzahl: number
  minimalpreis: number | null
}

/**
 * Gruppiert veröffentlichte Posten nach Kategorie und ermittelt je Gruppe
 * die Anzahl der Positionen sowie den niedrigsten bekannten Preis
 * (Posten mit "Preis auf Anfrage" fließen nicht in die Preisberechnung ein).
 */
function gruppiereNachKategorie(posten: Posten[]): KategorieGruppe[] {
  const gruppen = new Map<string, Posten[]>()

  for (const eintrag of posten) {
    const liste = gruppen.get(eintrag.kategorie) ?? []
    liste.push(eintrag)
    gruppen.set(eintrag.kategorie, liste)
  }

  return KATEGORIE_REIHENFOLGE.filter((kategorie) => gruppen.has(kategorie)).map((kategorie) => {
    const eintraege = gruppen.get(kategorie) ?? []

    const preise = eintraege
      .filter((eintrag) => !eintrag.preisAufAnfrage && typeof eintrag.preis === 'number')
      .map((eintrag) => eintrag.preis as number)

    return {
      kategorie,
      label: KATEGORIE_LABELS[kategorie],
      posten: eintraege,
      anzahl: eintraege.length,
      minimalpreis: preise.length > 0 ? Math.min(...preise) : null,
    }
  })
}

function formatiertePreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(preis)
}

/**
 * Platzhalter für die Karten-Komponente einer einzelnen Position.
 * Wird in Prompt 4 durch die eigentliche Karten-Komponente ersetzt.
 */
function PostenKartePlatzhalter({ posten }: { posten: Posten }) {
  return (
    <article
      className="group flex min-h-44 flex-col justify-between gap-6 border border-border bg-background p-6 transition-colors hover:bg-card"
      data-posten-id={posten.id}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {KATEGORIE_LABELS[posten.kategorie]}
        </span>
        <h3 className="font-serif text-xl leading-snug text-foreground text-balance">
          {posten.titel}
        </h3>
      </div>
      <div className="flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-base text-foreground">
          {posten.preisAufAnfrage
            ? 'Preis auf Anfrage'
            : typeof posten.preis === 'number'
              ? formatiertePreis(posten.preis)
              : '—'}
        </span>
        <ArrowRight
          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent"
          aria-hidden="true"
        />
      </div>
    </article>
  )
}

export default async function KatalogSeite() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: veroeffentlichtePosten, totalDocs } = await payload.find({
    collection: 'posten',
    where: {
      veroeffentlicht: {
        equals: true,
      },
    },
    sort: '-createdAt',
    depth: 1,
    limit: 0,
  })

  const kategorieGruppen = gruppiereNachKategorie(veroeffentlichtePosten)

  return (
    <div>
      {/* HERO – gleiche full-width Kopf-Konvention wie die übrigen Unterseiten */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-10 md:py-32">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Verwertung · Katalog
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
              {totalDocs} {totalDocs === 1 ? 'Position' : 'Positionen'} im aktuellen Bestand
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Der Katalog ist Teil unserer Verwertungsarbeit: Jede Position stammt aus einem von
              der Kanzlei betreuten Insolvenz- oder Auflösungsverfahren und wird sorgfältig
              bewertet, dokumentiert und nachvollziehbar zur Verwertung angeboten. Interessenten
              erhalten so einen transparenten Überblick über den verfügbaren Bestand.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-card md:aspect-[3/4]"
          >
            {/* Ruhige, neutrale Fläche: Bordeaux nur als kleiner Akzent */}
            <div className="absolute inset-4 border border-border" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-foreground md:p-10">
              <span className="flex h-10 w-10 items-center justify-center bg-accent font-serif text-xl leading-none text-accent-foreground">
                §
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-accent">
                  Geordnete Verwertung
                </span>
                <span className="font-serif text-2xl leading-tight text-foreground text-balance">
                  Assets aus Insolvenz- &amp; Auflösungsverfahren
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESTAND */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          {/* Platzhalter: Filterleiste (folgt in Prompt 3) – reserviert noch keinen Raum */}
          <section aria-label="Filter" className="empty:hidden" data-slot="filterleiste" />

          {/* Platzhalter: Suche (folgt in Prompt 3) – reserviert noch keinen Raum */}
          <section aria-label="Suche" className="mb-14 empty:hidden md:mb-16" data-slot="suche" />

          {totalDocs === 0 ? (
            <p className="text-base text-muted-foreground">
              Derzeit sind keine Positionen veröffentlicht.
            </p>
          ) : (
            <div className="flex flex-col gap-20 md:gap-28">
              {kategorieGruppen.map((gruppe) => (
                <section key={gruppe.kategorie} data-kategorie={gruppe.kategorie}>
                  <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-5">
                    <h2 className="font-serif text-3xl text-foreground">{gruppe.label}</h2>
                    <div className="flex items-baseline gap-5 text-sm">
                      <span className="text-muted-foreground">
                        {gruppe.anzahl} {gruppe.anzahl === 1 ? 'Position' : 'Positionen'}
                      </span>
                      {gruppe.minimalpreis !== null && (
                        <span className="font-medium text-accent">
                          ab {formatiertePreis(gruppe.minimalpreis)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gruppe.posten.map((eintrag) => (
                      <PostenKartePlatzhalter key={eintrag.id} posten={eintrag} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* KONTAKT – ruhiger Abschluss für Anfragen statt Online-Kauf */}
      <KontaktCta
        titel="Interesse an einer Position?"
        text="Sie möchten eine Position genauer prüfen oder ein Angebot abgeben? Sprechen Sie uns an – wir begleiten die Verwertung transparent und beantworten Ihre Fragen zum Bestand."
        buttonLabel="Anfrage stellen"
      />
    </div>
  )
}
