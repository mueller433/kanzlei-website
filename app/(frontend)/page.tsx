import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import type { Posten } from '@/payload-types'
import './styles.css'

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
    <article className="katalog-karte-platzhalter" data-posten-id={posten.id}>
      <p className="katalog-karte-platzhalter__titel">{posten.titel}</p>
      <p className="katalog-karte-platzhalter__meta">
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
    <div className="katalog">
      <header className="katalog-kopf">
        <h1>Aktueller Bestand</h1>
        <p className="katalog-kopf__anzahl">
          {totalDocs} veröffentlichte {totalDocs === 1 ? 'Position' : 'Positionen'}
        </p>
      </header>

      {/* Platzhalter: Filterleiste (folgt in Prompt 3) */}
      <section aria-label="Filter" className="katalog-filterleiste-platzhalter" data-slot="filterleiste" />

      {/* Platzhalter: Suche (folgt in Prompt 3) */}
      <section aria-label="Suche" className="katalog-suche-platzhalter" data-slot="suche" />

      {totalDocs === 0 ? (
        <p className="katalog-leer">Derzeit sind keine Positionen veröffentlicht.</p>
      ) : (
        <div className="katalog-kategorien">
          {kategorieGruppen.map((gruppe) => (
            <section key={gruppe.kategorie} className="katalog-kategorie" data-kategorie={gruppe.kategorie}>
              <div className="katalog-kategorie__kopf">
                <h2>{gruppe.label}</h2>
                <span className="katalog-kategorie__anzahl">
                  {gruppe.anzahl} {gruppe.anzahl === 1 ? 'Position' : 'Positionen'}
                </span>
                {gruppe.minimalpreis !== null && (
                  <span className="katalog-kategorie__ab-preis">
                    ab {formatiertePreis(gruppe.minimalpreis)}
                  </span>
                )}
              </div>

              <div className="katalog-grid">
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
