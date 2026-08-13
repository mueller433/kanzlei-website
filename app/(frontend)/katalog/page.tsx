import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import React from 'react'

import { KatalogFilter } from '@/components/katalog-filter'
import { KontaktCta } from '@/components/kontakt-cta'
import {
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

/**
 * Platzhalter für die Karten-Komponente einer einzelnen Position.
 * Wird in Prompt 4 durch die eigentliche Karten-Komponente ersetzt.
 */
function PostenKartePlatzhalter({ posten }: { posten: Posten }) {
  return (
    <Link
      href={`/katalog/${posten.id}`}
      className="group flex min-h-44 flex-col justify-between gap-6 border border-border bg-background p-6 transition-colors hover:bg-card focus:outline-none focus-visible:border-accent"
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
    </Link>
  )
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

  const filterAktiv = Boolean(
    q || selectedKategorien.length || selectedZustaende.length || preisRange,
  )

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
      {/* HERO – gleiche full-width Kopf-Konvention wie die übrigen Unterseiten */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-10 md:py-32">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Verwertung · Katalog
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
              {totalDocs} {totalDocs === 1 ? 'Position' : 'Positionen'}{' '}
              {filterAktiv
                ? totalDocs === 1
                  ? 'entspricht Ihrer Auswahl'
                  : 'entsprechen Ihrer Auswahl'
                : 'im aktuellen Bestand'}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Der Katalog ist Teil unserer Verwertungsarbeit: Jede Position stammt aus einem
              laufenden Insolvenz- oder Auflösungsverfahren und wird sorgfältig bewertet,
              dokumentiert und nachvollziehbar zur Verwertung angeboten. Interessenten erhalten so
              einen transparenten Überblick über den verfügbaren Bestand.
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

      {/* BESTAND – Filter/Suche/Sortierung als GET-Formular (kombinierbar & teilbar) */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <form
            method="get"
            className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16"
          >
            <KatalogFilter
              q={q}
              selectedKategorien={selectedKategorien}
              selectedZustaende={selectedZustaende}
              selectedPreis={selectedPreis}
              kategorieCounts={kategorieCounts}
              totalDocs={totalDocs}
            />

            <div>
              {/* Ergebniszähler + Sortierung */}
              <div className="mb-10 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{totalDocs}</span>{' '}
                  {totalDocs === 1 ? 'Position' : 'Positionen'}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="sort"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Sortierung
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    defaultValue={selectedSort}
                    className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none sm:flex-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="shrink-0 border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Anwenden
                  </button>
                </div>
              </div>

              {totalDocs === 0 ? (
                <div className="ergebnis-fade border border-border bg-card px-6 py-16 text-center">
                  <p className="text-base text-foreground">
                    Keine Positionen entsprechen Ihrer Auswahl.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Passen Sie die Filter an oder{' '}
                    <a href="/katalog" className="text-accent underline underline-offset-4">
                      setzen Sie sie zurück
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div className="ergebnis-fade flex flex-col gap-16 md:gap-20">
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

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {gruppe.posten.map((eintrag) => (
                          <PostenKartePlatzhalter key={eintrag.id} posten={eintrag} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </form>
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
