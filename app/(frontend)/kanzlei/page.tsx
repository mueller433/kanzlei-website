import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Kanzlei',
  description:
    'Müller & Partner – eine auf Insolvenzverwaltung, Sanierung und Restrukturierung spezialisierte Kanzlei.',
}

export default function KanzleiSeite() {
  return (
    <PlatzhalterSeite eyebrow="Über uns" titel="Eine Kanzlei mit klarem Fokus">
      <p>
        Müller &amp; Partner begleitet Unternehmen, Gläubiger und Gerichte in
        Insolvenz- und Sanierungsverfahren. Unser Team verbindet juristische Präzision
        mit betriebswirtschaftlichem Verständnis und einer geordneten, transparenten
        Verwertung von Vermögenswerten.
      </p>
      <p>
        Die ausführliche Vorstellung der Kanzlei, unserer Werte und unseres Teams folgt
        in einem der nächsten Schritte.
      </p>
    </PlatzhalterSeite>
  )
}
