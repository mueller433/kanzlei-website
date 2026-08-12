import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'

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

export default function RestrukturierungSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Fachgebiet
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Restrukturierung, die Perspektiven schafft
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Nicht jede Krise muss in der Abwicklung enden. Mit fundierten Sanierungskonzepten
            helfen wir Unternehmen, wirtschaftliche Schieflagen zu überwinden und sich tragfähig
            neu aufzustellen – außergerichtlich oder im geschützten Verfahren.
          </p>
        </div>
      </section>

      {/* WEGE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
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
              <div key={weg.titel} className="border border-border bg-card p-8 md:p-10">
                <h3 className="font-serif text-2xl text-card-foreground">{weg.titel}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {weg.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANLÄSSE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Wann sinnvoll
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
                Anzeichen, bei denen Sie handeln sollten
              </h2>
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

      <KontaktCta
        titel="Je früher, desto mehr Handlungsspielraum"
        text="Eine Restrukturierung gelingt am besten, bevor der Druck zu groß wird. Sprechen Sie uns frühzeitig an – wir bewerten Ihre Optionen vertraulich."
      />
    </div>
  )
}
