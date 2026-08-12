import React from 'react'

export const metadata = {
  title: 'Aktuelles',
  description:
    'Fachbeiträge, Meldungen und Entwicklungen aus dem Insolvenz- und Sanierungsrecht von Müller & Partner.',
}

const BEITRAEGE = [
  {
    kategorie: 'Fachbeitrag',
    datum: 'Datum folgt',
    titel: 'Eigenverwaltung als Chance für den Mittelstand',
    anriss:
      'Wann sich das Eigenverwaltungsverfahren für Unternehmen eignet und welche Voraussetzungen erfüllt sein müssen – ein Überblick über Möglichkeiten und Grenzen.',
  },
  {
    kategorie: 'Meldung',
    datum: 'Datum folgt',
    titel: 'Neue Positionen im Verwertungskatalog',
    anriss:
      'In unserem Verwertungskatalog stehen regelmäßig neue Vermögenswerte aus laufenden Verfahren zur Verfügung. Ein Blick auf die aktuellen Kategorien lohnt sich.',
  },
  {
    kategorie: 'Fachbeitrag',
    datum: 'Datum folgt',
    titel: 'Fristen im Insolvenzverfahren richtig einordnen',
    anriss:
      'Von der Antragspflicht bis zur Forderungsanmeldung: Welche Fristen für Geschäftsführung und Gläubiger besonders relevant sind – und warum frühes Handeln zählt.',
  },
  {
    kategorie: 'Meldung',
    datum: 'Datum folgt',
    titel: 'Restrukturierung: Frühzeitigkeit entscheidet',
    anriss:
      'Warum der Handlungsspielraum bei Sanierungen mit jeder Woche schrumpft und wie eine strukturierte Vorbereitung die Erfolgsaussichten deutlich erhöht.',
  },
] as const

export default function AktuellesSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Aktuelles
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Neuigkeiten &amp; Fachbeiträge
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Hier informieren wir künftig über aktuelle Verfahren, neue Verwertungsangebote und
            Entwicklungen im Insolvenz- und Sanierungsrecht. Die folgenden Einträge sind
            Beispielinhalte und werden durch echte Beiträge ersetzt.
          </p>
        </div>
      </section>

      {/* BEITRÄGE */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {BEITRAEGE.map((beitrag, i) => (
              <article
                key={i}
                className="flex flex-col gap-4 border border-dashed border-border bg-card p-8 md:p-10"
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
                <span className="mt-2 text-sm text-muted-foreground">Beispielinhalt</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
