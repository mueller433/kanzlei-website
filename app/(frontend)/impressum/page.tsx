import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von Müller & Partner.',
}

export default function ImpressumSeite() {
  return (
    <PlatzhalterSeite eyebrow="Rechtliches" titel="Impressum">
      <p>
        Müller &amp; Partner Insolvenzverwaltung · Musterstraße 12 · 10115 Berlin.
        Angaben gemäß § 5 DDG sowie die berufsrechtlichen Pflichtangaben werden hier
        in einem späteren Schritt vollständig ergänzt.
      </p>
    </PlatzhalterSeite>
  )
}
