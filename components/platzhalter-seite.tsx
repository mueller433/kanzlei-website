import React from 'react'

/**
 * Einheitliches Grundgerüst für die noch inhaltsarmen Unterseiten.
 * Die eigentlichen Inhalte folgen in späteren Schritten – hier stehen
 * bewusst nur kurze, statische Platzhaltertexte (keine Payload-Collection).
 */
export function PlatzhalterSeite({
  eyebrow,
  titel,
  children,
}: {
  eyebrow: string
  titel: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance md:text-5xl">
        {titel}
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
        {children}
      </div>
    </div>
  )
}
