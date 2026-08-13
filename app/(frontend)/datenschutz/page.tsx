import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzhinweise der DPSS Management GmbH.',
}

export default function DatenschutzSeite() {
  return (
    <PlatzhalterSeite eyebrow="Rechtliches" titel="Datenschutz">
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Die vollständige
        Datenschutzerklärung nach DSGVO wird hier in einem späteren Schritt ergänzt.
      </p>
    </PlatzhalterSeite>
  )
}
