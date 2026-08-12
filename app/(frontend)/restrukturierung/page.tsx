import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { ProzessSchritte, type Schritt } from '@/components/prozess-schritte'
import { SeitenHero } from '@/components/seiten-hero'

export const metadata = {
  title: 'Restrukturierung',
  description:
    'Sanierungs- und Restrukturierungskonzepte bei Müller & Partner – außergerichtlich und im Insolvenzverfahren. Wann eine Restrukturierung sinnvoll ist.',
}

const WEGE = [
  {
    titel: 'Außergerichtliche Sanierung',
    beschreibung:
      'Wo eine Insolvenz noch abwendbar ist, entwickeln wir gemeinsam mit Geschäftsführung, Banken und Gläubigern ein tragfähiges Sanierungskonzept – ohne den Gang zum Insolvenzgericht.',
  },
  {
    titel: 'Sanierung im Verfahren',
    beschreibung:
      'Reichen außergerichtliche Maßnahmen nicht aus, nutzen wir die Instrumente des Schutzschirm- und Eigenverwaltungsverfahrens, um das Unternehmen unter gerichtlichem Schutz neu aufzustellen.',
  },
] as const

const ANLAESSE = [
  'Anhaltende Liquiditätsengpässe trotz gefüllter Auftragsbücher',
  'Drohende Zahlungsunfähigkeit oder Überschuldung',
  'Wegbrechende Erträge durch veränderte Marktbedingungen',
  'Belastende Finanzierungs- oder Vertragsstrukturen',
] as const

const BETEILIGTE = [
  {
    titel: 'Geschäftsführung',
    beschreibung:
      'Verantwortliche, die das Unternehmen erhalten wollen und einen klaren, rechtssicheren Fahrplan für die Sanierung benötigen.',
  },
  {
    titel: 'Gesellschafter',
    beschreibung:
      'Eigentümer, die tragfähige Perspektiven für ihr Investment suchen und die Weichen frühzeitig richtig stellen möchten.',
  },
  {
    titel: 'Banken & Gläubiger',
    beschreibung:
      'Finanzierungspartner, die auf ein belastbares Konzept und eine nachvollziehbare Umsetzung angewiesen sind.',
  },
] as const

const VORGEHEN: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Analyse',
    beschreibung:
      'Wir erfassen die wirtschaftliche und rechtliche Lage und bewerten den verbleibenden Handlungsspielraum.',
  },
  {
    schritt: '02',
    titel: 'Konzept',
    beschreibung:
      'Gemeinsam mit den Beteiligten entwickeln wir ein Sanierungskonzept mit klaren Maßnahmen und Zuständigkeiten.',
  },
  {
    schritt: '03',
    titel: 'Umsetzung',
    beschreibung:
      'Wir begleiten die Umsetzung, steuern die Verhandlungen und halten das Unternehmen auf Kurs.',
  },
]

export default function RestrukturierungSeite() {
  return (
    <div>
      <SeitenHero
        eyebrow="Fachgebiet"
        titel="Restrukturierung, die Perspektiven schafft"
        lead="Nicht jede Krise muss in der Abwicklung enden. Mit fundierten Sanierungskonzepten helfen wir Unternehmen, wirtschaftliche Schieflagen zu überwinden und sich tragfähig neu aufzustellen – außergerichtlich oder im geschützten Verfahren."
      />

      {/* EINORDNUNG – Lead-Absatz plus prägnante Anlässe-Liste als Blickfang */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Wann sinnvoll
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Anzeichen, bei denen Sie handeln sollten
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Je früher eine Schieflage erkannt wird, desto größer ist der Spielraum für eine
                erfolgreiche Sanierung. Diese Signale sind ein Anlass, das Gespräch zu suchen.
              </p>
            </div>
            <ul className="flex flex-col divide-y divide-border border-t border-border">
              {ANLAESSE.map((anlass) => (
                <li
                  key={anlass}
                  className="flex items-baseline gap-4 py-5 text-lg leading-relaxed text-foreground text-pretty"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  {anlass}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN IM DETAIL – zwei großformatige Wege-Cards */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Zwei Wege
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Sanierung mit und ohne Gericht
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WEGE.map((weg) => (
              <div
                key={weg.titel}
                className="border border-border bg-card p-8 transition-colors hover:border-accent md:p-10"
              >
                <h3 className="font-serif text-2xl text-card-foreground">{weg.titel}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {weg.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN – 3-spaltiges Tile-Grid (bewusst anders als Insolvenzrecht) */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Für wen relevant
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wen eine Restrukturierung betrifft
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {BETEILIGTE.map((gruppe) => (
              <div key={gruppe.titel} className="flex flex-col gap-4 bg-background p-8 md:p-10">
                <h3 className="font-serif text-2xl text-foreground">{gruppe.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {gruppe.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORGEHENSWEISE – drei nummerierte Schritte */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Vorgehensweise
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              In drei Schritten zum tragfähigen Konzept
            </h2>
          </div>
          <ProzessSchritte schritte={VORGEHEN} />
        </div>
      </section>

      <KontaktCta
        titel="Je früher, desto mehr Handlungsspielraum"
        text="Eine Restrukturierung gelingt am besten, bevor der Druck zu groß wird. Sprechen Sie uns frühzeitig an – wir bewerten Ihre Optionen vertraulich."
      />
    </div>
  )
}
