import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'
import React from 'react'

/**
 * Wiederkehrender Kontakt-Abschluss für die Detail-Unterseiten.
 * Übernimmt bewusst die Formensprache des Kontakt-CTA von der Startseite
 * (Serif-Überschrift, gedämpfter Fließtext, Bordeaux-Button mit Pfeil).
 */
export function KontaktCta({
  titel = 'Sprechen Sie mit uns',
  text = 'Wir ordnen Ihre Situation ein und zeigen Ihnen die möglichen nächsten Schritte – vertraulich und unverbindlich.',
  buttonLabel = 'Kontakt aufnehmen',
  eyebrow,
  href = '/kontakt',
}: {
  titel?: string
  text?: string
  buttonLabel?: string
  eyebrow?: string
  href?: LinkProps['href']
}) {
  return (
    <section className="border-t border-border">
      <div className="reveal mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              {titel}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{text}</p>
          </div>
          <Link
            href={href}
            className="cta-button-verzoegert group inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
