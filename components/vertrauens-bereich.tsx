import { ClipboardCheck, Eye, Route, Phone } from 'lucide-react'
import React from 'react'

/**
 * Vertrauensbereich der Startseite. Trägt bewusst OHNE Zahlen, Jahres- oder
 * Auftragsangaben, Referenzen oder Auszeichnungen – ausschließlich qualitative
 * Aussagen zur Arbeitsweise im bestehenden Bordered-Tile-System.
 */
const VERTRAUENSPUNKTE = [
  {
    Icon: Route,
    titel: 'Klare Abläufe',
    beschreibung:
      'Von der Beauftragung bis zur Abrechnung sorgen wir für klare Zuständigkeiten und einen verlässlichen Ablauf.',
  },
  {
    Icon: Eye,
    titel: 'Transparenz',
    beschreibung:
      'Bewertungen, Angebote, Verkäufe und Erlöse machen wir für Auftraggeber und Beteiligte nachvollziehbar.',
  },
  {
    Icon: ClipboardCheck,
    titel: 'Dokumentation',
    beschreibung:
      'Bewertung, Angebot und Erlös werden vollständig dokumentiert – als belastbare Grundlage für jede spätere Prüfung.',
  },
  {
    Icon: Phone,
    titel: 'Erreichbarkeit',
    beschreibung:
      'Feste Ansprechpartner und kurze Wege: Auf Anfragen zu Aufträgen und Positionen reagieren wir verbindlich.',
  },
] as const

export function VertrauensBereich() {
  return (
    <section className="border-b border-border">
      <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Worauf Sie sich verlassen können
          </p>
          <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
            Haltung, die durch das ganze Verfahren trägt
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VERTRAUENSPUNKTE.map(({ Icon, titel, beschreibung }) => (
            <div key={titel} className="flex flex-col gap-4 bg-background p-8">
              <span
                className="flex h-11 w-11 items-center justify-center border border-border text-accent"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-xl text-foreground">{titel}</h3>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                {beschreibung}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
