import Link from 'next/link'
import { NEWS_BEITRAEGE } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Aktuelles',
  description:
    'Meldungen und Einblicke rund um Verwertung, Vermögenswerte und den Verwertungskatalog der DPSS Management GmbH.',
}

export default function AktuellesSeite() {
  return (
    <div>
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Aktuelles
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.55rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-foreground text-balance">
            Einblicke aus Bewertung und Verwertung
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Fachliche Einblicke und aktuelle Meldungen rund um Insolvenzverfahren, Restrukturierung
            und die strukturierte Verwertung von Vermögenswerten.
          </p>
        </div>
      </section>

      {/* BEITRÄGE */}
      <section>
        <div className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {NEWS_BEITRAEGE.map((beitrag) => (
              <Link
                key={beitrag.slug}
                href={`/aktuelles/${beitrag.slug}`}
                className="group flex h-full flex-col gap-5 border-t-2 border-accent bg-card p-6 transition-colors hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-8"
              >
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em]">
                  <span className="text-accent">{beitrag.kategorie}</span>
                  <span className="text-muted-foreground">{beitrag.datum}</span>
                </div>
                <h2 className="font-serif text-2xl leading-snug text-card-foreground text-balance">
                  {beitrag.titel}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {beitrag.anriss}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  Beitrag lesen <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
