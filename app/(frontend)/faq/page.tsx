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
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Häufige Fragen
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.55rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-foreground text-balance">
            Antworten rund um Katalog, Verwertung und Sofortkauf.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Die wichtigsten Fragen zu unserem Verwertungskatalog, dem Ablauf eines Kaufs und der
            Sofortkauf-Abwicklung – kompakt zusammengefasst. Für alles Weitere kontaktieren Sie
            uns gerne direkt.
          </p>
        </div>
      </section>

      {/* KATEGORIEN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-12 sm:gap-16">
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
