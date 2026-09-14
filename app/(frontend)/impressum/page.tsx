import React from 'react'

import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'
import { KANZLEI } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Impressum | DPSS Management GmbH',
  description: 'Impressum der DPSS Management GmbH in Göttingen.',
}

const IMPRESSUM = {
  firma: 'DPSS Management GmbH',
  strasse: 'Herzberger Landstr. 63',
  plzOrt: '37085 Göttingen',
  land: 'Deutschland',
  geschaeftsfuehrer: ['Dirk Schymura', 'Phillip Schaper', 'Monika Schymura'],
  registergericht: 'Amtsgericht Göttingen',
  handelsregisternummer: 'HRB 207736',
  ustId: 'DE452777224',
  email: KANZLEI.email.anzeige,
  telefon: '+4932212243813',
} as const

function Feld({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="text-base leading-relaxed text-foreground text-pretty break-words">{children}</div>
    </div>
  )
}

export default function ImpressumSeite() {
  return (
    <LegalPageLayout titel="Impressum" beschreibung="Angaben gemäß § 5 DDG">
      <LegalSections>
        <LegalSection nummer="01" titel="Unternehmen und Anschrift">
          <address className="not-italic">
            <span className="block">{IMPRESSUM.firma}</span>
            <span className="block">{IMPRESSUM.strasse}</span>
            <span className="block">{IMPRESSUM.plzOrt}</span>
            <span className="block">{IMPRESSUM.land}</span>
          </address>
        </LegalSection>

        <LegalSection nummer="02" titel="Vertreten durch die Geschäftsführer">
          <div className="flex flex-col gap-1">
            {IMPRESSUM.geschaeftsfuehrer.map((name) => <span key={name}>{name}</span>)}
          </div>
        </LegalSection>

        <LegalSection nummer="03" titel="Kontakt">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Feld label="E-Mail"><a href={`mailto:${IMPRESSUM.email}`} className="hover:text-accent">{IMPRESSUM.email}</a></Feld>
            <Feld label="Telefon">{IMPRESSUM.telefon}</Feld>
          </div>
        </LegalSection>

        <LegalSection nummer="04" titel="Registereintrag">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Feld label="Registergericht">{IMPRESSUM.registergericht}</Feld>
            <Feld label="Handelsregisternummer">{IMPRESSUM.handelsregisternummer}</Feld>
          </div>
        </LegalSection>

        <LegalSection nummer="05" titel="Umsatzsteuer-Identifikationsnummer">
          <Feld label="Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG">{IMPRESSUM.ustId}</Feld>
        </LegalSection>

        <LegalSection nummer="06" titel="Verantwortlich für den Inhalt">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Feld label="Unternehmen und Anschrift">
              <address className="not-italic"><span className="block">{IMPRESSUM.firma}</span><span className="block">{IMPRESSUM.strasse}</span><span className="block">{IMPRESSUM.plzOrt}</span><span className="block">{IMPRESSUM.land}</span></address>
            </Feld>
            <Feld label="Vertreten durch"><div className="flex flex-col gap-1">{IMPRESSUM.geschaeftsfuehrer.map((name) => <span key={name}>{name}</span>)}</div></Feld>
          </div>
        </LegalSection>

        <LegalSection nummer="07" titel="Haftungshinweis">
          <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
        </LegalSection>

      </LegalSections>
    </LegalPageLayout>
  )
}
