import type { ReactNode } from 'react'

export function LegalPageLayout({
  titel,
  beschreibung,
  children,
}: {
  titel: string
  beschreibung?: string
  children: ReactNode
}) {
  return (
    <main>
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Rechtliches</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance md:text-6xl">
            {titel}
          </h1>
          {beschreibung ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {beschreibung}
            </p>
          ) : null}
        </div>
      </header>
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">{children}</div>
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
    <section className="border-t border-border pt-8 first:border-t-0 first:pt-0 md:pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{nummer}</p>
      <h2 className="mt-3 font-serif text-2xl leading-tight text-foreground text-balance md:text-3xl">
        {titel}
      </h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-foreground text-pretty">
        {children}
      </div>
    </section>
  )
}

export function LegalSections({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-10 md:gap-12">{children}</div>
}
