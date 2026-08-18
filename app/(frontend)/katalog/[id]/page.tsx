import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AssetGalerie, type GalerieBild } from '@/components/asset-galerie'
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

  const bilder: GalerieBild[] = medienObjekte(posten.bilder)
    .filter((m) => typeof m.url === 'string')
    .map((m) => ({ url: m.url as string, alt: posten.titel }))

  const dokumente = medienObjekte(posten.dokumente).filter((m) => typeof m.url === 'string')

  const hatNettoPreis = !posten.preisAufAnfrage && typeof posten.preis === 'number'

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(posten.preis)
      : 'Preis auf Anfrage'

  // Kompakte Kerninformationen im Hero – nur befüllte Felder (Sektion 5 der Vorgabe)
  const kerninfo = [
    { label: 'Preis', wert: preisText },
    { label: 'Stückzahl', wert: `${posten.stueckzahl} Stück` },
    { label: 'MwSt.', wert: '19 %' },
    posten.standort ? { label: 'Standort', wert: posten.standort } : null,
  ].filter((eintrag): eintrag is { label: string; wert: string } => Boolean(eintrag))

  // Eckdaten-Tabelle: echte Verwertungs-Details ohne Dopplungen zu Titel-Block/Kacheln
  const eckdaten = [
    { label: 'MwSt.-Satz', wert: '19 % (zzgl. USt.)' },
    hatNettoPreis
      ? { label: 'Preis (netto)', wert: formatiertePreis(posten.preis as number) }
      : null,
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
      <section>
        <div className="mx-auto max-w-6xl px-6 pt-8 md:px-10 md:pt-10">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück zum Katalog
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-8">
          {/*
            Layout: flex-col auf Mobile (DOM-Reihenfolge = visuelle Reihenfolge:
            Titel/Status vor Bildgalerie), ab lg: 2-spaltiges Grid mit Bild links
            über die volle Höhe und Titel/Kerninfo rechts gestapelt.
          */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
            {/* Titel-Block */}
            <div className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Verwertung · Katalog · {KATEGORIE_LABELS[posten.kategorie]}
              </p>

              <h1 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                {posten.titel}
              </h1>

              {posten.kurzspezifikation && (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
                  {posten.kurzspezifikation}
                </p>
              )}

              {/* Status + Zustand – Kategorie steht bereits in der Eyebrow-Zeile */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="whitespace-nowrap border border-accent px-3 py-1 text-xs uppercase tracking-[0.15em] text-accent">
                  {STATUS_LABELS[posten.status]}
                </span>
                <span className="whitespace-nowrap border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {ZUSTAND_LABELS[posten.zustand]}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Fragen?
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {posten.status === 'verfuegbar' && (
                  <SofortkaufDialog
                    produktId={String(posten.id)}
                    produktTitel={posten.titel}
                    preisText={preisText}
                    standort={posten.standort}
                  />
                )}
              </div>
            </div>

            {/* Bildergalerie */}
            <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2">
              <AssetGalerie bilder={bilder} />
            </div>

            {/* Kerninformationen */}
            <div className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2">
              <dl
                className={`grid grid-cols-2 gap-px overflow-hidden border border-border bg-border ${
                  kerninfo.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
                }`}
              >
                {kerninfo.map((eintrag) => (
                  <div key={eintrag.label} className="bg-background p-4">
                    <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {eintrag.label}
                    </dt>
                    <dd className="mt-1.5 break-words font-serif text-lg leading-snug text-foreground text-balance md:text-xl">
                      {eintrag.wert}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Beschreibung + Eckdaten */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
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
                          <span className="flex-1">{dok.alt || dok.filename || 'Dokument'}</span>
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

      <KontaktCta
        titel="Interesse an dieser Position?"
        text={`Sie möchten „${posten.titel}“ genauer prüfen oder ein Angebot abgeben? Sprechen Sie uns an – wir begleiten die Verwertung transparent und beantworten Ihre Fragen.`}
        buttonLabel="Anfrage stellen"
      />
    </div>
  )
}
