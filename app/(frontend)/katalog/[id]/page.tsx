import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AssetGalerie, type GalerieBild } from '@/components/asset-galerie'
import { KontaktCta } from '@/components/kontakt-cta'
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
    .map((m) => ({ url: m.url as string, alt: m.alt || posten.titel }))

  const dokumente = medienObjekte(posten.dokumente).filter((m) => typeof m.url === 'string')

  const preisText = posten.preisAufAnfrage
    ? 'Preis auf Anfrage'
    : typeof posten.preis === 'number'
      ? formatiertePreis(posten.preis)
      : 'Preis auf Anfrage'

  // Dokumentarische Metadaten (Aktenvermerk-Charakter) – nur befüllte Felder
  const aktenvermerk = [
    { label: 'Aktenzeichen / Verfahren', wert: posten.insolvenzverfahren },
    { label: 'Standort', wert: posten.standort },
    { label: 'Kategorie', wert: KATEGORIE_LABELS[posten.kategorie] },
    { label: 'Zustand', wert: ZUSTAND_LABELS[posten.zustand] },
  ].filter((eintrag) => Boolean(eintrag.wert))

  return (
    <div>
      <section>
        <div className="mx-auto max-w-6xl px-6 pt-12 md:px-10 md:pt-16">
          <a
            href="/katalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück zum Katalog
          </a>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Bildergalerie */}
            <AssetGalerie bilder={bilder} />

            {/* Kopf-Informationen */}
            <div className="flex flex-col">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Verwertung · Katalog · {KATEGORIE_LABELS[posten.kategorie]}
              </p>

              <h1 className="font-serif text-4xl leading-tight text-foreground text-balance md:text-5xl">
                {posten.titel}
              </h1>

              {posten.kurzspezifikation && (
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                  {posten.kurzspezifikation}
                </p>
              )}

              {/* Dezente Badges */}
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {KATEGORIE_LABELS[posten.kategorie]}
                </span>
                <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {ZUSTAND_LABELS[posten.zustand]}
                </span>
                <span className="border border-accent px-3 py-1 text-xs uppercase tracking-[0.15em] text-accent">
                  {STATUS_LABELS[posten.status]}
                </span>
              </div>

              {/* Preis / Stückzahl / Status – ruhig integriert, kein Preisschild */}
              <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                <div className="bg-background p-5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Preis</dt>
                  <dd className="mt-2 font-serif text-2xl text-foreground">{preisText}</dd>
                </div>
                <div className="bg-background p-5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Stückzahl
                  </dt>
                  <dd className="mt-2 font-serif text-2xl text-foreground tabular-nums">
                    {posten.stueckzahl}
                  </dd>
                </div>
                <div className="bg-background p-5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Status
                  </dt>
                  <dd className="mt-2 font-serif text-2xl text-foreground">
                    {STATUS_LABELS[posten.status]}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Beschreibung + Aktenvermerk */}
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

            {/* Aktenvermerk / dokumentarische Metadaten */}
            <aside>
              <h2 className="mb-6 font-serif text-2xl text-foreground md:text-3xl">Aktenvermerk</h2>
              {aktenvermerk.length > 0 ? (
                <dl className="border-t border-border">
                  {aktenvermerk.map((eintrag) => (
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
