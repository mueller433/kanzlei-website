import { CheckCircle2 } from 'lucide-react'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'

export const metadata = {
  title: 'Leistungen',
  description:
    'Leistungen der DPSS Management GmbH: Erfassung, Bewertung, Vermarktung und transparente Abwicklung von Vermögenswerten.',
}

const LEISTUNGEN = [
  {
    titel: 'Erfassung',
    text: 'Wir nehmen Vermögenswerte strukturiert auf, prüfen vorhandene Informationen und schaffen einen belastbaren Überblick über den Bestand.',
    punkte: ['Vor-Ort-Inventarisierung', 'Fotodokumentation', 'Zustandsaufnahme'],
  },
  {
    titel: 'Bewertung',
    text: 'Wir ordnen Positionen ein und ermitteln marktgerechte Grundlagen für die weitere Vermarktung – nachvollziehbar und mit Blick auf den jeweiligen Markt.',
    punkte: ['Marktgerechte Wertansätze', 'Fortführungs- und Liquidationswert', 'Nachvollziehbare Dokumentation'],
  },
  {
    titel: 'Vermarktung',
    text: 'Wir entwickeln passende Vermarktungswege, sprechen potenzielle Käufer an und stellen Positionen im öffentlichen Verwertungskatalog bereit.',
    punkte: ['Zielgruppengenaue Ansprache', 'Öffentlicher Verwertungskatalog', 'Branchennetzwerk & Reichweite'],
  },
  {
    titel: 'Verkauf & Abwicklung',
    text: 'Wir koordinieren Angebote, Verkäufe, Übergaben und die Kommunikation mit Interessenten bis zum Abschluss.',
    punkte: ['Angebots- & Verkaufskoordination', 'Abstimmung mit Interessenten', 'Geordnete Übergabe'],
  },
  {
    titel: 'Berichterstattung',
    text: 'Auftraggeber erhalten eine klare Dokumentation der Maßnahmen, Interessenten, Verkäufe, Erlöse und Abrechnung.',
    punkte: ['Laufender Verfahrensbericht', 'Erlös- & Abrechnungsübersicht', 'Vollständige Nachweisführung'],
  },
] as const

export default function LeistungenSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Leistungen
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Professionelle Verwertung mit klarer Verantwortung.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            DPSS übernimmt die operative Arbeit rund um Vermögenswerte aus laufenden Verfahren –
            von der ersten Erfassung bis zur transparenten Berichterstattung an den Auftraggeber.
          </p>
        </div>
      </section>

      {/* LEISTUNGEN 01–05 — Service-Cards im 2-spaltigen Grid, letzte Karte über volle Breite */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {LEISTUNGEN.map((leistung, index) => {
              const istFeatureCard = index === LEISTUNGEN.length - 1
              return (
                <div
                  key={leistung.titel}
                  className={`flex flex-col gap-6 border border-border bg-card p-8 md:p-10 ${
                    istFeatureCard ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-serif text-2xl text-card-foreground md:text-3xl">
                      {leistung.titel}
                    </h2>
                    <span className="shrink-0 text-sm font-medium uppercase tracking-[0.18em] text-accent">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                    {leistung.text}
                  </p>

                  <ul
                    className={`mt-auto flex flex-col gap-3 border-t border-border pt-6 ${
                      istFeatureCard ? 'sm:flex-row sm:gap-8' : ''
                    }`}
                  >
                    {leistung.punkte.map((punkt) => (
                      <li
                        key={punkt}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN — Split-Layout aus zwei nutzenfokussierten Cards */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Zielgruppen
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Für Auftraggeber und Käufer
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6 border border-border bg-card p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Auftraggeber &amp; Verwalter
              </p>
              <h3 className="font-serif text-2xl text-card-foreground md:text-3xl">
                Für Auftraggeber &amp; Verwalter
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                Insolvenzverwalter und Verfahrensbeteiligte erhalten einen verlässlichen Partner
                für die operative Verwertung.
              </p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {['Erlösoptimierung durch strukturierte Vermarktung', 'Rechtssicherheit im gesamten Verfahren', 'Lückenlose Dokumentation aller Schritte'].map(
                  (punkt) => (
                    <li key={punkt} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {punkt}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-6 border border-border bg-card p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Käufer &amp; Investoren
              </p>
              <h3 className="font-serif text-2xl text-card-foreground md:text-3xl">
                Für Käufer &amp; Investoren
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                Käufer erhalten Zugang zu übersichtlich aufbereiteten Positionen und einen klaren
                Ablauf für Anfragen und Angebote.
              </p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {['Transparente, aktuelle Kataloge', 'Verifizierte Zustands- und Standortangaben', 'Reibungslose Übergabe nach Kauf'].map(
                  (punkt) => (
                    <li key={punkt} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {punkt}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <KontaktCta
        eyebrow="Kontakt"
        titel="Sie benötigen Unterstützung bei der Verwertung?"
        text="Lassen Sie uns über Ihr Verfahren oder Ihr Anliegen sprechen."
        buttonLabel="Jetzt Beratung anfragen"
      />
    </div>
  )
}
