import React from 'react'

export const metadata = {
  title: 'Impressum | DPSS Management GmbH',
  description: 'Impressum der DPSS Management GmbH in Göttingen.',
}

/**
 * Rechtsverbindliche Angaben – ausschließlich vom Auftraggeber bereitgestellte,
 * geprüfte Daten. Es werden bewusst KEINE zusätzlichen Angaben (Aufsichtsbehörde,
 * Kammer, Stammkapital, Haftungsausschlüsse o. Ä.) ergänzt. Die Telefonnummer
 * bleibt als Platzhalter stehen, bis sie vom Auftraggeber nachgereicht wird.
 */
const IMPRESSUM = {
  firma: 'DPSS Management GmbH',
  strasse: 'Herzberger Landstr. 63',
  plzOrt: '37085 Göttingen',
  land: 'Deutschland',
  geschaeftsfuehrer: ['Dirk Schymura', 'Phillip Schaper'],
  registergericht: 'Amtsgericht Göttingen',
  handelsregisternummer: 'HRB 207736',
  ustId: 'DE452777224',
  email: 'info@dpss-management.com',
  telefon: '[TELEFONNUMMER]',
} as const

/** Einheitliche Zeile aus Label + Wert für die Definitionslisten unten. */
function Feld({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <div className="text-base leading-relaxed text-foreground text-pretty break-words">
        {children}
      </div>
    </div>
  )
}

export default function ImpressumSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Rechtliches
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance md:text-5xl">
            Impressum
          </h1>
        </div>
      </section>

      {/* ANGABEN */}
      <section>
        <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:px-10 md:py-20">
          {/* Angaben gemäß § 5 DDG */}
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl text-foreground">Angaben gemäß § 5 DDG</h2>
            <Feld label="Unternehmen und Anschrift">
              <address className="not-italic">
                <span className="block">{IMPRESSUM.firma}</span>
                <span className="block">{IMPRESSUM.strasse}</span>
                <span className="block">{IMPRESSUM.plzOrt}</span>
                <span className="block">{IMPRESSUM.land}</span>
              </address>
            </Feld>
          </div>

          {/* Vertreten durch die Geschäftsführer */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">
              Vertreten durch die Geschäftsführer
            </h2>
            <div className="flex flex-col gap-1 text-base leading-relaxed text-foreground">
              {IMPRESSUM.geschaeftsfuehrer.map((name) => (
                <span key={name} className="block">
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">Kontakt</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Feld label="E-Mail">
                <a href={`mailto:${IMPRESSUM.email}`} className="hover:text-accent">
                  {IMPRESSUM.email}
                </a>
              </Feld>
              <Feld label="Telefon">
                <span>{IMPRESSUM.telefon}</span>
              </Feld>
            </div>
          </div>

          {/* Registereintrag */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">Registereintrag</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Feld label="Registergericht">{IMPRESSUM.registergericht}</Feld>
              <Feld label="Handelsregisternummer">{IMPRESSUM.handelsregisternummer}</Feld>
            </div>
          </div>

          {/* Umsatzsteuer-Identifikationsnummer */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <Feld label="Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG">
              {IMPRESSUM.ustId}
            </Feld>
          </div>

          {/* Verantwortlich für den Inhalt */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">Verantwortlich für den Inhalt</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Feld label="Unternehmen und Anschrift">
                <address className="not-italic">
                  <span className="block">{IMPRESSUM.firma}</span>
                  <span className="block">{IMPRESSUM.strasse}</span>
                  <span className="block">{IMPRESSUM.plzOrt}</span>
                  <span className="block">{IMPRESSUM.land}</span>
                </address>
              </Feld>
              <Feld label="Vertreten durch">
                <div className="flex flex-col gap-1">
                  {IMPRESSUM.geschaeftsfuehrer.map((name) => (
                    <span key={name} className="block">
                      {name}
                    </span>
                  ))}
                </div>
              </Feld>
            </div>
          </div>

          {/* Haftungshinweis */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">Haftungshinweis</h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground text-pretty">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
              Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
              deren Betreiber verantwortlich.
            </p>
          </div>

          {/* Online-Streitbeilegung */}
          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-serif text-2xl text-foreground">Online-Streitbeilegung</h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground text-pretty">
              Die EU-Kommission wird im ersten Quartal 2016 eine Internetplattform zur
              Online-Beilegung von Streitigkeiten (sog. „OS-Plattform&#8221;) bereitstellen. Die
              OS-Plattform soll als Anlaufstelle zur außergerichtlichen Beilegung von
              Streitigkeiten betreffend vertragliche Verpflichtungen, die aus
              Online-Kaufverträgen erwachsen, dienen. Die OS-Plattform wird unter folgendem Link
              erreichbar sein:{' '}
              <a
                href="http://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:text-accent"
              >
                http://ec.europa.eu/consumers/odr
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
