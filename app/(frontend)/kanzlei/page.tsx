import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Kanzlei',
  description:
    'Müller & Partner – eine auf Insolvenzverwaltung, Sanierung und Restrukturierung spezialisierte Kanzlei. Werdegang, Selbstverständnis und Werte.',
}

const WERTE = [
  {
    titel: 'Sorgfalt',
    beschreibung:
      'Jedes Verfahren beginnt mit einer gründlichen Analyse der wirtschaftlichen und rechtlichen Lage. Wir treffen Entscheidungen auf einer belastbaren Grundlage – nicht unter Zeitdruck, sondern mit der gebotenen Genauigkeit.',
  },
  {
    titel: 'Transparenz',
    beschreibung:
      'Gläubiger, Schuldner und Gerichte werden nachvollziehbar über jeden Schritt informiert. Verwertungserlöse, Kostenpositionen und Verfahrensstände dokumentieren wir vollständig und offen.',
  },
  {
    titel: 'Verbindlichkeit',
    beschreibung:
      'Zusagen halten wir ein. Alle Beteiligten begegnen wir mit derselben Verlässlichkeit – unabhängig davon, ob es um ein Kleinstverfahren oder eine komplexe Unternehmensinsolvenz geht.',
  },
] as const

export default function KanzleiSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Über uns
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Eine Kanzlei mit klarem Fokus
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Müller &amp; Partner ist auf Insolvenzverwaltung, Sanierung und Restrukturierung
            spezialisiert. Wir verbinden juristische Präzision mit betriebswirtschaftlichem
            Verständnis und einer geordneten, transparenten Verwertung von Vermögenswerten.
          </p>
        </div>
      </section>

      {/* SELBSTVERSTÄNDNIS / WERDEGANG */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Aus der Praxis gewachsen
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Was als kleine, spezialisierte Einheit begann, hat sich über viele Jahre zu einer
                etablierten Adresse für Insolvenz- und Sanierungsverfahren entwickelt. In dieser
                Zeit haben wir Verfahren jeder Größenordnung betreut – vom mittelständischen
                Produktionsbetrieb bis zur regional verwurzelten Handelsgesellschaft.
              </p>
              <p>
                Wir verstehen Insolvenzverwaltung nicht als reine Abwicklung, sondern als Chance,
                Werte zu erhalten, Gläubigerinteressen zu wahren und – wo möglich – Unternehmen und
                Arbeitsplätze zu sichern. Diese Haltung prägt jedes Mandat, das wir übernehmen.
              </p>
              <p>
                Die hier gezeigten Angaben sind vorläufig und werden zu einem späteren Zeitpunkt
                durch die tatsächlichen Kanzleitexte ersetzt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WERTE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unsere Werte
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Woran wir uns messen lassen
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {WERTE.map((wert) => (
              <div key={wert.titel} className="flex flex-col gap-4 bg-background p-8 md:p-10">
                <h3 className="font-serif text-2xl text-foreground">{wert.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {wert.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM-VERWEIS */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Menschen, die Verantwortung übernehmen
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                Hinter jedem Verfahren stehen erfahrene Insolvenzverwalter und Fachanwälte, die
                persönlich ansprechbar sind. Die Vorstellung unserer Ansprechpartner finden Sie auf
                der Kontaktseite.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Zu den Ansprechpartnern
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
