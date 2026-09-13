import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AssetGalerie, type GalerieBild } from '@/components/asset-galerie'
import { KatalogPositionGridKarte } from '@/components/katalog-position-grid-karte'
import { KontaktCta } from '@/components/kontakt-cta'
import { SofortkaufDialog } from '@/components/sofortkauf-dialog'
import { KATEGORIE_LABELS, ZUSTAND_LABELS } from '@/lib/katalog'
import config from '@/payload.config'
import type { Media, Posten } from '@/payload-types'
import '../../styles.css'

const STATUS_LABELS: Record<Posten['status'], string> = {
  verfuegbar: 'Verfügbar',
  reserviert: 'Reserviert',
  verkauft: 'Verkauft',
}

function formatiertePreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(preis)
}

/**
 * Erzeugt eine stabile, aus der Objekt-ID abgeleitete Positionsnummer im Format
 * "AB12345" (2 Buchstaben + 5 Ziffern) – deterministisch pro Posten, aber ohne
 * erkennbaren Bezug zur echten Datenbank-ID.
 */
function positionsnummer(id: string | number): string {
  const text = String(id)
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  }
  const buchstaben = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const buchstabe1 = buchstaben[hash % 26]
  const buchstabe2 = buchstaben[Math.floor(hash / 26) % 26]
  const ziffern = String(hash % 100000).padStart(5, '0')
  return `${buchstabe1}${buchstabe2}${ziffern}`
}

/** Extrahiert aus einem upload-Feld (string | Media)[] die vollständigen Media-Objekte. */
function medienObjekte(feld: Posten['bilder']): Media[] {
  if (!feld) return []
  return feld.filter((eintrag): eintrag is Media => typeof eintrag === 'object' && eintrag !== null)
}

/** Lädt das einzelne, veröffentlichte Dokument – oder null, wenn nicht vorhanden/nicht öffentlich. */
async function ladePosten(id: string): Promise<Posten | null> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const doc = await payload.findByID({
    collection: 'posten',
    id,
    depth: 2,
    disableErrors: true,
  })

  if (!doc || doc.veroeffentlicht !== true) return null
  return doc
}

/**
 * Lädt bis zu 3 weitere veröffentlichte Positionen als Vorschlag – bevorzugt
 * aus derselben Kategorie, sonst die neuesten übrigen Positionen. Schließt
 * die aktuell angezeigte Position aus.
 */
async function ladeAehnlichePositionen(posten: Posten): Promise<Posten[]> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: passende } = await payload.find({
    collection: 'posten',
    depth: 1,
    limit: 3,
    sort: '-createdAt',
    where: {
      and: [
        { veroeffentlicht: { equals: true } },
        { kategorie: { equals: posten.kategorie } },
        { id: { not_equals: posten.id } },
      ],
    },
  })

  if (passende.length >= 3) return passende

  const { docs: weitere } = await payload.find({
    collection: 'posten',
    depth: 1,
    limit: 3 - passende.length,
    sort: '-createdAt',
    where: {
      and: [
        { veroeffentlicht: { equals: true } },
        { id: { not_equals: posten.id } },
        { id: { not_in: passende.map((p) => p.id) } },
      ],
    },
  })

  return [...passende, ...weitere]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const posten = await ladePosten(id)

  if (!posten) return { title: 'Position nicht gefunden' }

  return {
    title: posten.titel,
    description:
      posten.kurzspezifikation ||
      `${KATEGORIE_LABELS[posten.kategorie]} aus einem laufenden Verwertungsverfahren.`,
  }
}

export default async function AssetDetailSeite({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const posten = await ladePosten(id)

  if (!posten) notFound()

  const aehnlichePositionen = await ladeAehnlichePositionen(posten)

  const bilder: GalerieBild[] = medienObjekte(posten.bilder)
    .filter((m) => typeof m.url === 'string')
    .map((m) => ({ url: m.url as string, alt: posten.titel }))

  const dokumente = medienObjekte(posten.dokumente).filter((m) => typeof m.url === 'string')

  const hatNettoPreis = !posten.preisAufAnfrage && typeof posten.preis === 'number'

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(Math.round(posten.preis * 1.19))
      : 'Preis auf Anfrage'

  // Kompakte Kerninformationen in der Kaufbox – nur befüllte Felder.
  const kerninfo = [
    { label: 'Stückzahl', wert: `${posten.stueckzahl} Stück` },
    { label: 'MwSt.', wert: '19 %' },
    posten.standort ? { label: 'Standort', wert: posten.standort } : null,
  ].filter((eintrag): eintrag is { label: string; wert: string } => Boolean(eintrag))

  // Eckdaten-Tabelle: echte Verwertungs-Details ohne Dopplungen zu Titel-Block/Kacheln
  const eckdaten = [
    hatNettoPreis
      ? {
          label: 'Preis (brutto, inkl. 19 % USt.)',
          wert: formatiertePreis(Math.round((posten.preis as number) * 1.19)),
        }
      : null,
    { label: 'Stückzahl', wert: `${posten.stueckzahl} Stück` },
    { label: 'Pos.-Nr.', wert: positionsnummer(posten.id) },
  ].filter((eintrag): eintrag is { label: string; wert: string } => Boolean(eintrag))

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück zum Katalog
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          {/*
            Layout: flex-col auf Mobile (DOM-Reihenfolge = visuelle Reihenfolge:
            Titel/Status vor Bildgalerie), ab lg: 2-spaltiges Grid mit Bild links
            über die volle Höhe und Titel/Kerninfo rechts gestapelt.
          */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10 xl:gap-14">
            {/* Kauf- und Informationsbox */}
            <aside className="order-1 border border-border bg-card p-4 shadow-sm sm:p-6 lg:order-2 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 xl:top-[7.5rem]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Verwertung · Katalog · {KATEGORIE_LABELS[posten.kategorie]}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="whitespace-nowrap border border-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {STATUS_LABELS[posten.status]}
                </span>
                <span className="whitespace-nowrap border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {ZUSTAND_LABELS[posten.zustand]}
                </span>
              </div>

              <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance sm:text-4xl">
                {posten.titel}
              </h1>

              {posten.kurzspezifikation && (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
                  {posten.kurzspezifikation}
                </p>
              )}

              <div className="mt-6 border-y border-border py-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {hatNettoPreis ? 'Kaufpreis inkl. 19 % USt.' : 'Kaufpreis'}
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  {preisText}
                </p>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-border border-b border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {kerninfo.map((eintrag) => (
                  <div key={eintrag.label} className="py-3 sm:px-4 sm:py-4 sm:first:pl-0 sm:last:pr-0">
                    <dt className="text-xs uppercase tracking-[0.13em] text-muted-foreground">
                      {eintrag.label}
                    </dt>
                    <dd className="mt-1 break-words text-sm font-medium text-foreground sm:text-base">
                      {eintrag.wert}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-3">
                {posten.status === 'verfuegbar' && (
                  <SofortkaufDialog
                    produktId={String(posten.id)}
                    produktTitel={posten.titel}
                    preisText={preisText}
                    standort={posten.standort}
                  />
                )}

                <Link
                  href="/kontakt"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Frage zur Position
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>

            {/* Bildergalerie */}
            <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1">
              <AssetGalerie bilder={bilder} />
            </div>
          </div>
        </div>
      </section>

      {/* Beschreibung + Eckdaten */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            {/* Beschreibung (richText) */}
            <div>
              <h2 className="mb-6 font-serif text-2xl text-foreground md:text-3xl">Beschreibung</h2>
              {posten.beschreibung ? (
                <div className="max-w-2xl leading-relaxed text-muted-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-foreground [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
                  <RichText data={posten.beschreibung} />
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Für diese Position liegt derzeit keine ausführliche Beschreibung vor. Sprechen Sie
                  uns für weitere Details gern an.
                </p>
              )}
            </div>

            {/* Eckdaten / dokumentarische Metadaten */}
            <aside>
              <h2 className="mb-6 font-serif text-2xl text-foreground md:text-3xl">Eckdaten</h2>
              {eckdaten.length > 0 ? (
                <dl className="border-t border-border">
                  {eckdaten.map((eintrag) => (
                    <div
                      key={eintrag.label}
                      className="flex flex-col gap-1 border-b border-border py-4"
                    >
                      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {eintrag.label}
                      </dt>
                      <dd className="text-base text-foreground">{eintrag.wert}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-muted-foreground">Keine weiteren Angaben hinterlegt.</p>
              )}

              {/* Verlinkte Dokumente */}
              {dokumente.length > 0 && (
                <div className="mt-10">
                  <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Dokumente
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {dokumente.map((dok) => (
                      <li key={dok.id}>
                        <a
                          href={dok.url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                        >
                          <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="flex-1">{dok.filename || posten.titel}</span>
                          <span className="text-muted-foreground transition-colors group-hover:text-accent">
                            ansehen ↓
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {aehnlichePositionen.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-2xl text-foreground md:text-3xl">
                Andere Positionen
              </h2>
              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                Zum gesamten Katalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aehnlichePositionen.map((eintrag) => (
                <KatalogPositionGridKarte key={eintrag.id} posten={eintrag} />
              ))}
            </div>
          </div>
        </section>
      )}

      <KontaktCta
        titel="Interesse an dieser Position?"
        text={`Sie möchten „${posten.titel}“ genauer prüfen oder ein Angebot abgeben? Sprechen Sie uns an – wir begleiten die Verwertung transparent und beantworten Ihre Fragen.`}
        buttonLabel="Anfrage stellen"
      />
    </div>
  )
}
