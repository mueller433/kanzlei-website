import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Insolvenzrecht',
  description:
    'Insolvenzrecht bei Müller & Partner – Verfahren, Fristen und Handlungsoptionen verständlich begleitet.',
}

export default function InsolvenzrechtSeite() {
  return (
    <PlatzhalterSeite eyebrow="Fachgebiet" titel="Insolvenzrecht mit Weitblick">
      <p>
        Vom Eröffnungsantrag bis zur Verfahrensbeendigung: Wir kennen die rechtlichen
        Anforderungen und wirtschaftlichen Zusammenhänge insolvenzrechtlicher Verfahren
        und begleiten Mandanten sicher durch jede Phase.
      </p>
      <p>
        Vertiefende Informationen zu Regelinsolvenz, Eigenverwaltung und Schutzschirm­verfahren
        ergänzen wir in einem späteren Schritt.
      </p>
    </PlatzhalterSeite>
  )
}
