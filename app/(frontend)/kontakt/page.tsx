import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie Müller & Partner – Insolvenzverwaltung und Restrukturierung.',
}

export default function KontaktSeite() {
  return (
    <PlatzhalterSeite eyebrow="Kontakt" titel="Sprechen Sie uns an">
      <p>
        Ob Anfrage zu einer Verwertungsposition, Mandatsanbahnung oder allgemeine Frage –
        wir sind für Sie erreichbar.
      </p>
      <p>
        Müller &amp; Partner · Musterstraße 12 · 10115 Berlin
        <br />
        Telefon:{' '}
        <a href="tel:+493000000000" className="text-accent underline underline-offset-4">
          +49 30 000 000 00
        </a>
        <br />
        E-Mail:{' '}
        <a
          href="mailto:kontakt@mueller-partner.de"
          className="text-accent underline underline-offset-4"
        >
          kontakt@mueller-partner.de
        </a>
      </p>
      <p>Ein Anfrageformular mit direkter Zuordnung folgt in einem späteren Schritt.</p>
    </PlatzhalterSeite>
  )
}
