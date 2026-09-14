import { CheckCircle2 } from 'lucide-react'
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
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Leistungen
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.55rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-foreground text-balance">
            Ein klarer Prozess für jeden Vermögenswert.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            DPSS übernimmt die operative Arbeit rund um Vermögenswerte aus laufenden Verfahren –
            von der ersten Erfassung bis zur transparenten Berichterstattung an den Auftraggeber.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.55fr_1.45fr] lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Leistungsumfang
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Von der Aufnahme bis zur Abrechnung
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Alle Schritte greifen ineinander und bleiben für den Auftraggeber nachvollziehbar.
            </p>
          </div>

          <div className="border-t border-border">
            {LEISTUNGEN.map((leistung, index) => {
              return (
                <article
                  key={leistung.titel}
                  className="grid gap-4 border-b border-border py-6 sm:grid-cols-[3rem_0.8fr_1.2fr] sm:gap-6 sm:py-8"
                >
                  <span className="font-serif text-xl text-accent">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">{leistung.titel}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {leistung.text}
                    </p>
                  </div>
                  <ul className="col-start-1 flex flex-col gap-2.5 sm:col-start-3">
                    {leistung.punkte.map((punkt) => (
                      <li key={punkt} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Zielgruppen
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
              Für Auftraggeber und Käufer
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-5 border-t-2 border-accent bg-card p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Auftraggeber &amp; Verwalter
              </p>
              <h3 className="font-serif text-2xl text-card-foreground md:text-3xl">
                Für Auftraggeber &amp; Verwalter
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                Insolvenzverwalter und Verfahrensbeteiligte erhalten einen verlässlichen Partner
                für die operative Verwertung.
              </p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {['Strukturierte, marktorientierte Vermarktung', 'Klare Zuständigkeiten im Ablauf', 'Nachvollziehbare Dokumentation der Schritte'].map(
                  (punkt) => (
                    <li key={punkt} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {punkt}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-5 border-t-2 border-accent bg-card p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Käufer &amp; Investoren
              </p>
              <h3 className="font-serif text-2xl text-card-foreground md:text-3xl">
                Für Käufer &amp; Investoren
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                Käufer erhalten Zugang zu übersichtlich aufbereiteten Positionen und einen klaren
                Ablauf für Anfragen und Angebote.
              </p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {['Übersichtlich aufbereitete Katalogpositionen', 'Verfügbare Zustands- und Standortangaben', 'Koordinierte Übergabe nach dem Kauf'].map(
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
