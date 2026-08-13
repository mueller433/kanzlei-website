import React from 'react'

/**
 * Einheitlicher Hero-Kopf für die Unterseiten (Eyebrow → Titel → Lead).
 * Bündelt die zuvor auf jeder Leistungsseite dupliziert gepflegte
 * Hero-Struktur, damit Typografie und Abstände seitenübergreifend
 * konsistent bleiben.
 */
export function SeitenHero({
  eyebrow,
  titel,
  lead,
}: {
  eyebrow: string
  titel: string
  lead: string
}) {
  return (
    <section className="border-b border-border">
      <div className="reveal mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
          {titel}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {lead}
        </p>
      </div>
    </section>
  )
}
