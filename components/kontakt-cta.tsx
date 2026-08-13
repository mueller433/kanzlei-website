import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
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
}: {
  titel?: string
  text?: string
  buttonLabel?: string
}) {
  return (
    <section className="border-t border-border">
      <div className="reveal mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              {titel}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{text}</p>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
