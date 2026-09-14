import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AssetGalerie, type GalerieBild } from '@/components/asset-galerie'
import { AusklappbarerInhalt } from '@/components/ausklappbarer-inhalt'
import { KatalogPositionGridKarte } from '@/components/katalog-position-grid-karte'
import { MerklisteButton } from '@/components/merkliste-button'
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

const KAUFABWICKLUNG = [
  {
    nummer: '01',
    titel: 'Kaufanfrage senden',
    beschreibung:
      'Bei verfügbaren Positionen Kontaktdaten und erforderliche Nachweise über „Sofort kaufen“ übermitteln.',
  },
  {
    nummer: '02',
    titel: 'Prüfung und Bestätigung',
    beschreibung:
      'DPSS prüft Verfügbarkeit, Käuferdaten und Verkaufsbedingungen und bestätigt den möglichen Verkauf.',
  },
  {
    nummer: '03',
    titel: 'Rechnung und Überweisung',
    beschreibung:
      'Sie erhalten die Rechnung. Die Zahlung erfolgt ausschließlich per Überweisung – keine Barzahlung.',
  },
  {
    nummer: '04',
    titel: 'Termin und Übergabe',
    beschreibung:
      'Besichtigung und Abholung erfolgen erst nach vollständigem Zahlungseingang und Terminvereinbarung.',
  },
] as const

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

function textAusLexicalKnoten(knoten: unknown): string {
  if (!knoten || typeof knoten !== 'object') return ''
  const objekt = knoten as Record<string, unknown>
  const eigenerText = typeof objekt.text === 'string' ? objekt.text : ''
  const kinderText = Array.isArray(objekt.children)
    ? objekt.children.map(textAusLexicalKnoten).join(' ')
    : ''
  return `${eigenerText} ${kinderText}`.trim()
}

/**
 * Normalisiert importierte CMS-Inhalte für die Produktseite. Vorhandene H1
 * werden zu H2, leere Überschriften entfallen. Zudem werden nur solche
 * Besichtigungs-/Probefahrt-Absätze entfernt, die eine Besichtigung ohne den
 * vorgeschriebenen Zahlungseingang in Aussicht stellen.
 */
function bereinigteBeschreibung(
  beschreibung: NonNullable<Posten['beschreibung']>,
): NonNullable<Posten['beschreibung']> {
  function bereinige(knoten: unknown): unknown | null {
    if (!knoten || typeof knoten !== 'object') return knoten
    const objekt = knoten as Record<string, unknown>
    const text = textAusLexicalKnoten(objekt).replace(/\s+/g, ' ').trim()

    if (objekt.type === 'heading' && !text) return null

    const nenntBesichtigung = /besichtigung|probefahrt/i.test(text)
    const erlaubtOhneZahlung = /nach (vorheriger )?absprache|möglich/i.test(text)
    const bindetAnZahlung = /zahlungseingang|bezahlt|bezahlung|vollständige zahlung/i.test(text)
    if (objekt.type === 'paragraph' && nenntBesichtigung && erlaubtOhneZahlung && !bindetAnZahlung) {
      return null
    }

    const kinder = Array.isArray(objekt.children)
      ? objekt.children.map(bereinige).filter((kind) => kind !== null)
      : objekt.children
    const wurzel = objekt.root && typeof objekt.root === 'object' ? bereinige(objekt.root) : objekt.root

    return {
      ...objekt,
      ...(objekt.type === 'heading' && objekt.tag === 'h1' ? { tag: 'h2' } : {}),
      ...(Array.isArray(objekt.children) ? { children: kinder } : {}),
      ...(objekt.root && typeof objekt.root === 'object' ? { root: wurzel } : {}),
    }
  }

  return bereinige(beschreibung) as NonNullable<Posten['beschreibung']>
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
 * aus derselben Kategorie, sonst die neuesten verfügbaren Positionen. Schließt
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
        { status: { equals: 'verfuegbar' } },
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
        { status: { equals: 'verfuegbar' } },
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
  const beschreibung = posten.beschreibung ? bereinigteBeschreibung(posten.beschreibung) : null

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

  // Ergänzende Eckdaten ohne Wiederholung von Kaufpreis und Stückzahl aus der Kaufbox.
  const eckdaten = [
    { label: 'Pos.-Nr.', wert: positionsnummer(posten.id) },
    { label: 'Kategorie', wert: KATEGORIE_LABELS[posten.kategorie] },
    posten.standort
      ? { label: 'Standort', wert: posten.standort }
      : { label: 'Zustand', wert: ZUSTAND_LABELS[posten.zustand] },
  ].filter((eintrag): eintrag is { label: string; wert: string } => Boolean(eintrag))

  const kontaktBetreff = `Frage zu ${positionsnummer(posten.id)} – ${posten.titel}`

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
          <div className="flex min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10 xl:gap-14">
            {/* Kauf- und Informationsbox */}
            <aside className="order-1 min-w-0 overflow-hidden border border-border bg-card p-4 shadow-sm sm:p-6 lg:order-2 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 xl:top-[7.5rem]">
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

              <h1 className="break-words font-serif text-3xl font-semibold leading-tight text-foreground text-balance [overflow-wrap:anywhere] sm:text-4xl">
                {posten.titel}
              </h1>

              {posten.kurzspezifikation && (
                <div className="mt-4">
                  <p className="line-clamp-3 break-words text-base leading-relaxed text-muted-foreground text-pretty [overflow-wrap:anywhere] md:text-lg">
                    {posten.kurzspezifikation}
                  </p>
                  <a
                    href="#produktbeschreibung"
                    className="mt-1 inline-flex min-h-8 items-center text-sm font-semibold text-accent hover:underline hover:underline-offset-4"
                  >
                    Vollständige Beschreibung ansehen
                  </a>
                </div>
              )}

              <div className="mt-6 border-y border-border py-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {hatNettoPreis ? 'Kaufpreis inkl. 19 % USt.' : 'Kaufpreis'}
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  {preisText}
                </p>
              </div>

              <dl className="grid grid-cols-2 border-b border-border">
                {kerninfo.map((eintrag) => (
                  <div
                    key={eintrag.label}
                    className={`py-4 ${
                      eintrag.label === 'Standort'
                        ? 'col-span-2 border-t border-border'
                        : 'pr-4 first:border-r first:border-border first:pr-4 [&:nth-child(2)]:pl-4'
                    }`}
                  >
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

                <MerklisteButton
                  variante="detail"
                  position={{
                    id: String(posten.id),
                    titel: posten.titel,
                    bildUrl: bilder[0]?.url,
                    preisText,
                    standort: posten.standort || undefined,
                  }}
                />

                {posten.status === 'verkauft' && aehnlichePositionen.length > 0 && (
                  <a
                    href="#aehnliche-positionen"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Ähnliche Positionen ansehen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                <Link
                  href={{ pathname: '/kontakt', query: { betreff: kontaktBetreff } }}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {posten.status === 'reserviert' ? 'Interesse vormerken' : 'Frage zur Position'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>

            {/* Bildergalerie */}
            <div className="order-2 min-w-0 lg:order-1 lg:col-start-1 lg:row-start-1">
              <AssetGalerie bilder={bilder} />
            </div>
          </div>
        </div>
      </section>

      {/* Kaufabwicklung direkt nach Galerie und Kaufbox */}
      <section aria-labelledby="kaufabwicklung" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mb-8 max-w-3xl sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Sicher und transparent
            </p>
            <h2
              id="kaufabwicklung"
              className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            >
              So funktioniert die Kaufabwicklung
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Von der Kaufanfrage bis zur vereinbarten Übergabe in vier klaren Schritten.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {KAUFABWICKLUNG.map((schritt) => (
              <li
                key={schritt.nummer}
                className="relative border border-border bg-background p-5 sm:p-6"
              >
                <span className="font-serif text-3xl font-semibold leading-none text-accent/35" aria-hidden="true">
                  {schritt.nummer}
                </span>
                <h3 className="mt-5 text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {schritt.titel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {schritt.beschreibung}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-l-4 border-accent bg-[#f4f0e8] px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-sm leading-relaxed text-foreground sm:text-base">
              <strong className="font-semibold">Wichtiger Hinweis:</strong>{' '}
              Die Katalogdarstellung ist kein verbindliches Angebot. Das Absenden der Kaufanfrage
              stellt noch keinen Kaufvertrag dar. Ein Verkauf erfolgt vorbehaltlich Verfügbarkeit,
              Prüfung und Bestätigung durch DPSS Management.
            </p>
          </div>
        </div>
      </section>

      {/* CMS-Beschreibung + kompakte Eckdaten */}
      <section id="produktbeschreibung" className="scroll-mt-28 border-t border-border bg-[#f4f0e8]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mb-7 sm:mb-9">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Details zur Position
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Produktbeschreibung
            </h2>
          </div>

          {eckdaten.length > 0 && (
            <dl className="mb-6 grid border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-border">
              {eckdaten.map((eintrag, index) => (
                <div
                  key={eintrag.label}
                  className={`px-4 py-4 sm:px-5 sm:py-5 ${index > 0 ? 'border-t border-border sm:border-t-0' : ''}`}
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {eintrag.label}
                  </dt>
                  <dd className="mt-1.5 break-words text-base font-semibold text-foreground sm:text-lg">
                    {eintrag.wert}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="border border-border bg-card p-5 shadow-[0_18px_50px_-42px_rgba(23,19,15,0.45)] sm:p-8 lg:p-10">
            {beschreibung ? (
              <AusklappbarerInhalt>
                <div className="max-w-5xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:border-b [&_h1]:border-border [&_h1]:pb-3 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2:first-child]:mt-0 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p:empty]:hidden [&_p:has(>_strong:only-child)]:mb-1 [&_p:has(>_strong:only-child)]:mt-5 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-6 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:pl-0 sm:[&_ul]:grid-cols-2 [&_ul_li]:relative [&_ul_li]:m-0 [&_ul_li]:border-l-2 [&_ul_li]:border-accent/35 [&_ul_li]:bg-[#f8f5ef] [&_ul_li]:px-4 [&_ul_li]:py-2.5 [&_ul_li]:leading-6">
                  <RichText data={beschreibung} />
                </div>
              </AusklappbarerInhalt>
            ) : (
              <p className="max-w-3xl leading-relaxed text-muted-foreground">
                Für diese Position liegt derzeit keine ausführliche Beschreibung vor. Sprechen Sie
                uns für weitere Details gern an.
              </p>
            )}
          </div>

          {/* Verlinkte Dokumente */}
          {dokumente.length > 0 && (
            <div className="mt-6 border border-border bg-card p-5 sm:p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Dokumente zur Position
              </h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {dokumente.map((dok) => (
                  <li key={dok.id}>
                    <a
                      href={dok.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-12 items-center gap-3 border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1 break-words">{dok.filename || posten.titel}</span>
                      <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent">
                        ansehen ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {aehnlichePositionen.length > 0 && (
        <section id="aehnliche-positionen" className="scroll-mt-28 border-t border-border">
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
        href={{ pathname: '/kontakt', query: { betreff: kontaktBetreff } }}
      />
    </div>
  )
}
