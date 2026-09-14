import type { ReactNode } from 'react'
import { ArrowLeft, CalendarDays, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export type LegalPageKey = 'impressum' | 'datenschutz' | 'agb'

const RECHT_LINKS: { href: string; label: string; key: LegalPageKey }[] = [
  { href: '/impressum', label: 'Impressum', key: 'impressum' },
  { href: '/datenschutz', label: 'Datenschutz', key: 'datenschutz' },
  { href: '/agb', label: 'AGB', key: 'agb' },
]

export function LegalPageLayout({
  titel,
  beschreibung,
  current,
  stand,
  children,
}: {
  titel: string
  beschreibung?: string
  current: LegalPageKey
  stand: string
  children: ReactNode
}) {
  return (
    <main>
      <header className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück zur Website
          </Link>

          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Rechtliches
            </p>
            <h1 className="mt-3 break-words font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              {titel}
            </h1>
            {beschreibung ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                {beschreibung}
              </p>
            ) : null}
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
              Stand: {stand}
            </p>
          </div>

          <nav className="mt-8 overflow-x-auto pb-1" aria-label="Rechtliche Seiten">
            <ul className="flex min-w-max gap-2">
              {RECHT_LINKS.map((link) => {
                const aktiv = link.key === current
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      aria-current={aktiv ? 'page' : undefined}
                      className={`inline-flex min-h-11 items-center border px-4 py-2.5 text-sm font-medium transition-colors ${
                        aktiv
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border bg-card text-foreground hover:border-accent hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-l-2 border-accent bg-muted/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Schnellzugriff
              </p>
              <nav className="mt-4" aria-label="Weitere rechtliche Seiten">
                <ul className="flex flex-col gap-1">
                  {RECHT_LINKS.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        aria-current={link.key === current ? 'page' : undefined}
                        className={`block border-l px-3 py-2 text-sm transition-colors ${
                          link.key === current
                            ? 'border-accent font-semibold text-accent'
                            : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 border-t border-border pt-5">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  Übersichtlich, mobil lesbar und auf den aktuellen Website-Ablauf abgestimmt.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">{children}</div>
        </div>
      </section>
    </main>
  )
}

export function LegalSection({
  nummer,
  titel,
  children,
}: {
  nummer: string
  titel: string
  children: ReactNode
}) {
  return (
    <section className="scroll-mt-32 border-t border-border pt-8 first:border-t-0 first:pt-0 sm:pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{nummer}</p>
      <h2 className="mt-3 break-words font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
        {titel}
      </h2>
      <div className="mt-5 max-w-3xl space-y-4 break-words text-base leading-relaxed text-foreground text-pretty [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 hover:[&_a]:decoration-accent [&_li]:pl-1 [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  )
}

export function LegalSections({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-10 sm:gap-12">{children}</div>
}
