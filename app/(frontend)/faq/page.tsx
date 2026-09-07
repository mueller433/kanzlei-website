import React from 'react'

import { FaqSection } from '@/components/faq-section'
import { KontaktCta } from '@/components/kontakt-cta'
import { FAQ_KATEGORIEN } from '@/lib/faq-daten'

export const metadata = {
  title: 'Häufige Fragen',
  description:
    'Antworten auf häufige Fragen zu Katalog, Verwertung, Sofortkauf, Preisen, Zahlung und Abholung bei der DPSS Management GmbH.',
}

export default function FaqSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Häufige Fragen
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Antworten rund um Katalog, Verwertung und Sofortkauf.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Die wichtigsten Fragen zu unserem Verwertungskatalog, dem Ablauf eines Kaufs und der
            Sofortkauf-Abwicklung – kompakt zusammengefasst. Für alles Weitere kontaktieren Sie
            uns gerne direkt.
          </p>
        </div>
      </section>

      {/* KATEGORIEN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col gap-16 md:gap-20">
            {FAQ_KATEGORIEN.map((kategorie, index) => (
              <div key={kategorie.slug} id={kategorie.slug}>
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-serif text-sm text-accent">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-2xl leading-tight text-foreground text-balance md:text-3xl">
                    {kategorie.titel}
                  </h2>
                </div>
                <FaqSection eintraege={kategorie.eintraege} idPrefix={`${kategorie.slug}-`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <KontaktCta
        eyebrow="Weitere Fragen?"
        titel="Ihre Frage war nicht dabei?"
        text="Nehmen Sie direkt Kontakt mit uns auf – wir beantworten Ihr Anliegen gerne persönlich."
        buttonLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
