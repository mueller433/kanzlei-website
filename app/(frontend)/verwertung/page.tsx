import Link from 'next/link'
import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Verwertung',
  description:
    'Geordnete Verwertung von Vermögenswerten aus Insolvenz- und Auflösungsverfahren.',
}

export default function VerwertungSeite() {
  return (
    <PlatzhalterSeite eyebrow="Verwertung" titel="Geordnete Verwertung von Vermögenswerten">
      <p>
        Aus laufenden Verfahren verwerten wir Immobilien, Maschinen, Fahrzeuge und Inventar
        transparent und marktgerecht. Aktuelle Positionen finden Sie in unserem{' '}
        <Link href="/" className="text-accent underline underline-offset-4">
          Verwertungskatalog
        </Link>
        .
      </p>
      <p>Der Ablauf einer Verwertung und Ansprechpartner werden hier bald ergänzt.</p>
    </PlatzhalterSeite>
  )
}
