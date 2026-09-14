import React from 'react'

import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'
import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Impressum | DPSS Management GmbH',
  description: 'Anbieterkennzeichnung und rechtliche Angaben der DPSS Management GmbH in Göttingen.',
}

const IMPRESSUM = {
  geschaeftsfuehrer: ['Dirk Schymura', 'Phillip Schaper', 'Monika Schymura'],
  registergericht: 'Amtsgericht Göttingen',
  handelsregisternummer: 'HRB 207736',
  ustId: 'DE452777224',
} as const

function Feld({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <div className="break-words text-base leading-relaxed text-foreground">{children}</div>
    </div>
  )
}

export default function ImpressumSeite() {
  return (
    <LegalPageLayout
      titel="Impressum"
      beschreibung="Anbieterkennzeichnung und rechtliche Informationen zur DPSS Management GmbH."
      current="impressum"
      stand="14. September 2026"
    >
      <LegalSections>
        <LegalSection nummer="01" titel="Anbieter und Anschrift">
          <address className="not-italic">
            <strong className="block">{KANZLEI.name}</strong>
            <span className="block">{KANZLEI.adresse.strasse}</span>
            <span className="block">{KANZLEI_ORT}</span>
            <span className="block">Deutschland</span>
          </address>
          <p className="text-sm text-muted-foreground">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>
        </LegalSection>

        <LegalSection nummer="02" titel="Vertretungsberechtigte Geschäftsführung">
          <div className="grid gap-2 sm:grid-cols-2">
            {IMPRESSUM.geschaeftsfuehrer.map((name) => (
              <span key={name} className="border border-border bg-muted/25 px-4 py-3">
                {name}
              </span>
            ))}
          </div>
        </LegalSection>

        <LegalSection nummer="03" titel="Kontakt">
          <div className="grid gap-6 sm:grid-cols-2">
            <Feld label="E-Mail">
              <a href={KANZLEI.email.href}>{KANZLEI.email.anzeige}</a>
            </Feld>
            <Feld label="Telefon">
              <a href={KANZLEI.telefon.href}>{KANZLEI.telefon.anzeige}</a>
            </Feld>
          </div>
        </LegalSection>

        <LegalSection nummer="04" titel="Register und Umsatzsteuer">
          <div className="grid gap-6 sm:grid-cols-2">
            <Feld label="Registergericht">{IMPRESSUM.registergericht}</Feld>
            <Feld label="Handelsregister">{IMPRESSUM.handelsregisternummer}</Feld>
            <Feld label="Umsatzsteuer-Identifikationsnummer">
              {IMPRESSUM.ustId}
            </Feld>
          </div>
          <p className="text-sm text-muted-foreground">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz.
          </p>
        </LegalSection>

        <LegalSection nummer="05" titel="Verantwortlich für redaktionelle Inhalte">
          <p>
            Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2
            Medienstaatsvertrag sind die oben genannten Geschäftsführer der DPSS Management GmbH.
          </p>
          <address className="not-italic">
            {KANZLEI.adresse.strasse}
            <br />
            {KANZLEI_ORT}
            <br />
            Deutschland
          </address>
        </LegalSection>

        <LegalSection nummer="06" titel="Verbraucherstreitbeilegung">
          <p>
            Die DPSS Management GmbH ist nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </LegalSection>

        <LegalSection nummer="07" titel="Externe Links">
          <p>
            Diese Website kann Links zu externen Angeboten enthalten. Für deren Inhalte sind die
            jeweiligen Anbieter verantwortlich. Rechtswidrige Inhalte werden nach Kenntniserlangung
            und Prüfung des Einzelfalls entfernt.
          </p>
        </LegalSection>
      </LegalSections>
    </LegalPageLayout>
  )
}
