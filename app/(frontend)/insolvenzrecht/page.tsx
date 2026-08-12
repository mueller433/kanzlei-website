import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { ProzessSchritte, type Schritt } from '@/components/prozess-schritte'
import { SeitenHero } from '@/components/seiten-hero'

export const metadata = {
  title: 'Insolvenzrecht',
  description:
    'Insolvenzrecht bei Müller & Partner – Regelinsolvenz, Eigenverwaltung und Gläubigervertretung. Für wen es relevant ist und wie der Ablauf aussieht.',
}

const LEISTUNGEN = [
  {
    titel: 'Regelinsolvenz',
    beschreibung:
      'Als gerichtlich bestellte Insolvenzverwalter sichern wir die Masse, führen den Betrieb – soweit sinnvoll – fort und wickeln das Verfahren geordnet ab.',
  },
  {
    titel: 'Eigenverwaltung',
    beschreibung:
      'Bei geeigneten Voraussetzungen begleiten wir Unternehmen in der Eigenverwaltung, sodass die Geschäftsführung unter Aufsicht handlungsfähig bleibt.',
  },
  {
    titel: 'Gläubigervertretung',
    beschreibung:
      'Wir vertreten Gläubiger bei der Anmeldung und Durchsetzung ihrer Forderungen und wahren ihre Interessen im gesamten Verfahren.',
  },
] as const

const ZIELGRUPPEN = [
  {
    titel: 'Für Unternehmen',
    beschreibung:
      'Geschäftsführungen, die mit drohender oder eingetretener Zahlungsunfähigkeit konfrontiert sind und einen geordneten, rechtssicheren Weg benötigen.',
  },
  {
    titel: 'Für Gläubiger',
    beschreibung:
      'Lieferanten, Kreditgeber und Geschäftspartner, die ihre Forderungen im Verfahren wirksam anmelden und durchsetzen möchten.',
  },
] as const

const ABLAUF: readonly Schritt[] = [
  {
    schritt: '01',
    titel: 'Antrag & Prüfung',
    beschreibung: 'Prüfung der Insolvenzgründe und Stellung bzw. Begleitung des Antrags.',
  },
  {
    schritt: '02',
    titel: 'Eröffnung',
    beschreibung: 'Bestellung des Verwalters, Sicherung der Masse und Information der Gläubiger.',
  },
  {
    schritt: '03',
    titel: 'Verwaltung',
    beschreibung: 'Fortführung oder Stilllegung, Forderungsprüfung und Verwertung des Vermögens.',
  },
  {
    schritt: '04',
    titel: 'Verteilung',
    beschreibung: 'Verteilung der Erlöse an die Gläubiger und Beendigung des Verfahrens.',
  },
]

export default function InsolvenzrechtSeite() {
  return (
    <div>
      <SeitenHero
        eyebrow="Fachgebiet"
        titel="Insolvenzrecht mit Weitblick"
        lead="Vom Eröffnungsantrag bis zur Verfahrensbeendigung: Wir kennen die rechtlichen Anforderungen und wirtschaftlichen Zusammenhänge insolvenzrechtlicher Verfahren und begleiten alle Beteiligten sicher durch jede Phase."
      />

      {/* EINORDNUNG – zweispaltig: Überschrift links, kurze Einordnung rechts */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Worum es im Insolvenzrecht geht
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Ein Insolvenzverfahren ordnet eine wirtschaftliche Krise rechtlich – es sichert das
                vorhandene Vermögen, behandelt alle Gläubiger nach klaren Regeln und schafft einen
                verbindlichen Rahmen für das weitere Vorgehen.
              </p>
              <p>
                Ob Fortführung, Sanierung oder geordnete Abwicklung: Entscheidend ist, früh die
                richtigen Weichen zu stellen. Wir bringen die rechtliche und wirtschaftliche
                Perspektive zusammen und behalten dabei die Interessen aller Beteiligten im Blick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN IM DETAIL – 3-spaltiges Tile-Grid */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unsere Rolle
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Verfahren, die wir übernehmen
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {LEISTUNGEN.map((leistung) => (
              <div key={leistung.titel} className="flex flex-col gap-4 bg-background p-8 md:p-10">
                <h3 className="font-serif text-2xl text-foreground">{leistung.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {leistung.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIELGRUPPEN – zwei Bordered-Cards */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Für wen relevant
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wen wir begleiten
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ZIELGRUPPEN.map((gruppe) => (
              <div
                key={gruppe.titel}
                className="border border-border bg-card p-8 transition-colors hover:border-accent md:p-10"
              >
                <h3 className="font-serif text-2xl text-card-foreground">{gruppe.titel}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {gruppe.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORGEHENSWEISE – vier nummerierte Schritte */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Grober Ablauf
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wie ein Verfahren verläuft
            </h2>
          </div>
          <ProzessSchritte schritte={ABLAUF} />
        </div>
      </section>

      <KontaktCta
        titel="Fragen zu einem Insolvenzverfahren?"
        text="Ob als Unternehmen oder Gläubiger – wir klären Ihre Ausgangslage und die möglichen nächsten Schritte, vertraulich und unverbindlich."
      />
    </div>
  )
}
