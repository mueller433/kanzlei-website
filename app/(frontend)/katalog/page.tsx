import { getPayload } from 'payload'
import React from 'react'

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
      className="flex flex-col justify-between gap-3 border border-border p-5"
      data-posten-id={posten.id}
    >
      <p className="font-serif text-lg leading-snug text-foreground text-balance">{posten.titel}</p>
      <p className="text-sm text-muted-foreground">
        {posten.preisAufAnfrage
          ? 'Preis auf Anfrage'
          : typeof posten.preis === 'number'
            ? formatiertePreis(posten.preis)
            : '—'}
      </p>
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
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <header className="mb-14 grid grid-cols-1 items-center gap-12 md:mb-20 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <div>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Verwertungskatalog der Kanzlei
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
            {totalDocs} {totalDocs === 1 ? 'Position' : 'Positionen'} im aktuellen Bestand
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Sämtliche hier gelisteten Vermögenswerte stammen aus von der Kanzlei betreuten
            Insolvenz- und Auflösungsverfahren. Sie werden geordnet zur Verwertung angeboten –
            von Immobilien über Maschinen und Fahrzeuge bis hin zu Inventar.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-card md:aspect-[3/4]"
        >
          {/* Ruhige, neutrale Fläche: Bordeaux nur noch als kleiner Akzent */}
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
      </header>

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
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
                <h2 className="font-serif text-2xl text-foreground md:text-3xl">{gruppe.label}</h2>
                <div className="flex items-baseline gap-4 text-sm text-muted-foreground">
                  <span>
                    {gruppe.anzahl} {gruppe.anzahl === 1 ? 'Position' : 'Positionen'}
                  </span>
                  {gruppe.minimalpreis !== null && (
                    <span className="text-accent">
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
  )
}
