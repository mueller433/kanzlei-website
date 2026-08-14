import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return NEWS_BEITRAEGE.map((beitrag) => ({ slug: beitrag.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const beitrag = NEWS_BEITRAEGE.find((eintrag) => eintrag.slug === slug)
  if (!beitrag) return { title: 'Fachbeitrag nicht gefunden' }
  return { title: beitrag.titel, description: beitrag.anriss }
}

export default async function FachbeitragDetailseite({ params }: Props) {
  const { slug } = await params
  const beitrag = NEWS_BEITRAEGE.find((eintrag) => eintrag.slug === slug)
  if (!beitrag) notFound()

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
          <Link href="/aktuelles" className="text-xs font-medium uppercase tracking-[0.2em] text-accent hover:underline">
            ← Fachbeiträge / Meldungen
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.16em]">
            <span className="text-accent">{beitrag.kategorie}</span>
            <span className="text-muted-foreground">{beitrag.datum}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance md:text-6xl">
            {beitrag.titel}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground text-pretty">
            {beitrag.anriss}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <div className="space-y-6 text-lg leading-[1.8] text-foreground/85">
          {beitrag.einleitung.split('\n\n').map((absatz) => (
            <p key={absatz}>{absatz}</p>
          ))}
        </div>

        <div className="mt-16 space-y-14">
          {beitrag.abschnitte.map((abschnitt) => (
            <section key={abschnitt.ueberschrift}>
              <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
                {abschnitt.ueberschrift}
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-[1.8] text-foreground/85">
                {abschnitt.text.split('\n\n').map((absatz) => (
                  <p key={absatz}>{absatz}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-16 border-l-2 border-accent pl-6 text-base leading-relaxed text-muted-foreground">
          {beitrag.hinweis}
        </aside>

        <div className="mt-16 border-t border-border pt-12">
          <p className="font-serif text-2xl text-foreground">Sie möchten eine Vermögensverwertung besprechen?</p>
          <Link
            href="/kontakt"
            className="mt-6 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Kontakt aufnehmen <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
