import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Leistungen',
  description:
    'Unsere Leistungen im Insolvenz- und Sanierungsrecht – von der Insolvenzverwaltung bis zur Restrukturierung.',
}

export default function LeistungenSeite() {
  return (
    <PlatzhalterSeite eyebrow="Leistungen" titel="Was wir für Sie übernehmen">
      <p>
        Wir übernehmen Insolvenzverwaltungen, beraten bei drohender Zahlungsunfähigkeit
        und entwickeln tragfähige Sanierungskonzepte. Dabei behalten wir die Interessen
        aller Beteiligten im Blick und sorgen für ein geordnetes Verfahren.
      </p>
      <p>Eine detaillierte Übersicht unserer Leistungsbereiche folgt in Kürze.</p>
    </PlatzhalterSeite>
  )
}
