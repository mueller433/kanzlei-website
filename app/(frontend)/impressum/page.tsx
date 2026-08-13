import React from 'react'

import { PlatzhalterSeite } from '@/components/platzhalter-seite'

export const metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung der DPSS Management GmbH.',
}

export default function ImpressumSeite() {
  return (
    <PlatzhalterSeite eyebrow="Rechtliches" titel="Impressum">
      <p>
        DPSS Management GmbH · Herzberger Landstr. 63 · D-37085 Göttingen.
        Registergericht: Amtsgericht Göttingen, HRB 207736.
        Geschäftsführer: <strong>[noch zu ergänzen]</strong>. USt-IdNr.: <strong>[noch zu ergänzen]</strong>.
        Verantwortlich nach § 18 MStV: <strong>[noch zu ergänzen]</strong>.
      </p>
    </PlatzhalterSeite>
  )
}
