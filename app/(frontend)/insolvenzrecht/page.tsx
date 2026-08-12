import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'

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

const ABLAUF = [
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
] as const

export default function InsolvenzrechtSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Fachgebiet
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Insolvenzrecht mit Weitblick
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Vom Eröffnungsantrag bis zur Verfahrensbeendigung: Wir kennen die rechtlichen
            Anforderungen und wirtschaftlichen Zusammenhänge insolvenzrechtlicher Verfahren und
            begleiten alle Beteiligten sicher durch jede Phase.
          </p>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
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

      {/* ZIELGRUPPEN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
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
              <div key={gruppe.titel} className="border border-border bg-card p-8 md:p-10">
                <h3 className="font-serif text-2xl text-card-foreground">{gruppe.titel}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                  {gruppe.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Grober Ablauf
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Wie ein Verfahren verläuft
            </h2>
          </div>
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {ABLAUF.map((schritt) => (
              <li key={schritt.schritt} className="flex flex-col gap-3">
                <span className="font-serif text-2xl text-accent">{schritt.schritt}</span>
                <span className="border-t border-border pt-4 font-serif text-xl text-foreground">
                  {schritt.titel}
                </span>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {schritt.beschreibung}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <KontaktCta
        titel="Fragen zu einem Insolvenzverfahren?"
        text="Ob als Unternehmen oder Gläubiger – wir klären Ihre Ausgangslage und die möglichen nächsten Schritte, vertraulich und unverbindlich."
      />
    </div>
  )
}
