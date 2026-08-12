import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Aktuelles',
  description: 'Aktuelle Meldungen, Verfahren und Angebote von Müller & Partner.',
}

export default function AktuellesSeite() {
  return (
    <PlatzhalterSeite eyebrow="Aktuelles" titel="Neuigkeiten & Verfahren">
      <p>
        An dieser Stelle informieren wir künftig über aktuelle Verfahren, neue
        Verwertungsangebote und Entwicklungen im Insolvenz- und Sanierungsrecht.
      </p>
      <p>Die Inhalte dieser Seite folgen in einem späteren Schritt.</p>
    </PlatzhalterSeite>
  )
}
