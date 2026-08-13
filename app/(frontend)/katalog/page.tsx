import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import React from 'react'

import { KatalogFilter } from '@/components/katalog-filter'
import { KatalogKategorieNav } from '@/components/katalog-kategorie-nav'
import { KatalogPositionKarte } from '@/components/katalog-position-karte'
import { KatalogPositionZeile } from '@/components/katalog-position-zeile'
import { KontaktCta } from '@/components/kontakt-cta'
import {
  type Ansicht,
  KATEGORIE_LABELS,
  KATEGORIE_REIHENFOLGE,
  PREIS_RANGES,
  SORT_OPTIONS,
  ZUSTAND_REIHENFOLGE,
  toArray,
} from '@/lib/katalog'
import config from '@/payload.config'
import type { Posten } from '@/payload-types'
import '../styles.css'

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

export default async function KatalogSeite({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams

  // Filter-/Sortier-Auswahl aus den URL-Suchparametern lesen (kein Client-State)
  const q = typeof sp.q === 'string' ? sp.q.trim() : ''
  const gueltigeKategorien = KATEGORIE_REIHENFOLGE as readonly string[]
  const gueltigeZustaende = ZUSTAND_REIHENFOLGE as readonly string[]
  const selectedKategorien = toArray(sp.kategorie).filter((k) => gueltigeKategorien.includes(k))
  const selectedZustaende = toArray(sp.zustand).filter((z) => gueltigeZustaende.includes(z))
  const selectedPreis = typeof sp.preis === 'string' ? sp.preis : ''
  const preisRange = PREIS_RANGES.find((r) => r.key === selectedPreis) ?? null
  const selectedSort = typeof sp.sort === 'string' ? sp.sort : SORT_OPTIONS[0].key
  const sortOption = SORT_OPTIONS.find((s) => s.key === selectedSort) ?? SORT_OPTIONS[0]
  const ansicht: Ansicht = sp.ansicht === 'karten' ? 'karten' : 'liste'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Basis-where OHNE Kategorie – Grundlage für die Facetten-Zählung je Kategorie,
  // damit Kategorie-Trefferzahlen die übrigen aktiven Filter berücksichtigen.
  const basisBedingungen: Where[] = [{ veroeffentlicht: { equals: true } }]
  if (q) basisBedingungen.push({ titel: { like: q } })
  if (selectedZustaende.length) basisBedingungen.push({ zustand: { in: selectedZustaende } })
  if (preisRange) {
    const preisBedingung: Record<string, number> = {}
    if (preisRange.min !== null) preisBedingung.greater_than_equal = preisRange.min
    if (preisRange.max !== null) preisBedingung.less_than_equal = preisRange.max
    basisBedingungen.push({ preis: preisBedingung })
  }
  const basisWhere: Where = { and: basisBedingungen }

  // Trefferzahl je Kategorie (respektiert Suche/Zustand/Preis, nicht die Kategorie-Auswahl)
  const { docs: facetDocs } = await payload.find({
    collection: 'posten',
    where: basisWhere,
    select: { kategorie: true },
    depth: 0,
    limit: 0,
  })

  const kategorieCounts: Record<string, number> = Object.fromEntries(
    KATEGORIE_REIHENFOLGE.map((k) => [k, 0]),
  )
  for (const doc of facetDocs) {
    if (doc.kategorie in kategorieCounts) kategorieCounts[doc.kategorie] += 1
  }
  const alleAnzahl = facetDocs.length

  // Endgültige Ergebnis-Abfrage: Basis-where + Kategorie-Auswahl, sortiert
  const finalWhere: Where = selectedKategorien.length
    ? { and: [...basisBedingungen, { kategorie: { in: selectedKategorien } }] }
    : basisWhere

  const { docs: veroeffentlichtePosten, totalDocs } = await payload.find({
    collection: 'posten',
    where: finalWhere,
    sort: sortOption.sort,
    depth: 1,
    limit: 0,
  })

  const kategorieGruppen = gruppiereNachKategorie(veroeffentlichtePosten)

  return (
    <div>
      {/* HERO – Katalog-Kopfzeile mit dynamischer Bestandsanzeige */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:gap-16 md:px-10 md:py-28">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Verwertung · Katalog
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-5xl">
              Aktueller Bestand:{' '}
              <span className="tabular-nums">
                {totalDocs} {totalDocs === 1 ? 'Position' : 'Positionen'}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Der Katalog zeigt aktuell verfügbare Vermögenswerte aus laufenden Insolvenz- und
              Auflösungsverfahren. Alle Positionen werden strukturiert erfasst, dokumentiert und
              nachvollziehbar zur Verwertung angeboten.
            </p>
          </div>

          {/* Kompakte Informations-/CTA-Fläche */}
          <div className="flex flex-col justify-between gap-8 border border-border bg-card p-8">
            <div className="flex flex-col gap-1">
              <span className="flex h-10 w-10 items-center justify-center bg-accent font-serif text-xl leading-none text-accent-foreground">
                §
              </span>
              <span className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">
                Geordnete Verwertung
              </span>
              <span className="font-serif text-2xl leading-tight text-foreground text-balance">
                Assets aus Insolvenz- &amp; Auflösungsverfahren
              </span>
            </div>
            <Link
              href="/verwertung"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              So funktioniert die Verwertung
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* BESTAND – Kategorien, Filterleiste, Ergebnisse */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <KatalogKategorieNav
            sp={sp}
            selectedKategorien={selectedKategorien}
            kategorieCounts={kategorieCounts}
            alleAnzahl={alleAnzahl}
          />

          <form method="get" className="mt-6">
            <KatalogFilter
              sp={sp}
              q={q}
              selectedKategorien={selectedKategorien}
              selectedZustaende={selectedZustaende}
              selectedPreis={selectedPreis}
              selectedSort={selectedSort}
              ansicht={ansicht}
              totalDocs={totalDocs}
            />
          </form>

          <div className="mt-12">
            {totalDocs === 0 ? (
              <div className="ergebnis-fade border border-border bg-card px-6 py-16 text-center">
                <p className="text-base text-foreground">
                  Keine Positionen entsprechen Ihrer Auswahl.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Passen Sie die Filter an oder{' '}
                  <Link href="/katalog" className="text-accent underline underline-offset-4">
                    setzen Sie sie zurück
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="ergebnis-fade flex flex-col gap-16 md:gap-20">
                {kategorieGruppen.map((gruppe, index) => (
                  <section key={gruppe.kategorie} data-kategorie={gruppe.kategorie}>
                    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-5">
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h2 className="font-serif text-3xl text-foreground">{gruppe.label}</h2>
                      </div>
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

                    {ansicht === 'liste' ? (
                      <div className="flex flex-col border-t border-border">
                        {gruppe.posten.map((eintrag) => (
                          <KatalogPositionZeile key={eintrag.id} posten={eintrag} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {gruppe.posten.map((eintrag) => (
                          <KatalogPositionKarte key={eintrag.id} posten={eintrag} />
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}
          </div>
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
