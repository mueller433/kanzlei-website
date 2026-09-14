'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import type { FaqEintrag } from '@/lib/faq-daten'

/**
 * Wiederverwendbares FAQ-Accordion im bestehenden DPSS-Design.
 * - Frage bleibt sichtbar, Antwort klappt per Klick auf.
 * - Mehrere Einträge dürfen gleichzeitig geöffnet sein (unabhängige States).
 * - Vollständig per Tastatur bedienbar (button + aria-expanded/aria-controls),
 *   auf Mobilgeräten durch großzügige Tap-Fläche (py-6) sauber nutzbar.
 */
export function FaqSection({
  eintraege,
  idPrefix = '',
}: {
  eintraege: FaqEintrag[]
  idPrefix?: string
}) {
  const [offeneIds, setOffeneIds] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setOffeneIds((vorher) => {
      const naechste = new Set(vorher)
      if (naechste.has(id)) {
        naechste.delete(id)
      } else {
        naechste.add(id)
      }
      return naechste
    })
  }

  return (
    <div className="divide-y divide-border border-t border-border">
      {eintraege.map((eintrag) => {
        const offen = offeneIds.has(eintrag.id)
        const antwortId = `${idPrefix}faq-antwort-${eintrag.id}`
        const fragId = `${idPrefix}faq-frage-${eintrag.id}`

        return (
          <div key={eintrag.id}>
            <h3 className="text-base">
              <button
                type="button"
                id={fragId}
                onClick={() => toggle(eintrag.id)}
                aria-expanded={offen}
                aria-controls={antwortId}
                className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-6"
              >
                <span className="font-serif text-lg leading-snug text-foreground text-pretty md:text-xl">
                  {eintrag.frage}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent/30 bg-accent/5">
                  <Plus
                    className={`h-4 w-4 text-accent transition-transform duration-300 ${
                      offen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <div
              id={antwortId}
              role="region"
              aria-labelledby={fragId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                offen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3 pb-6 pr-2 text-sm leading-relaxed text-muted-foreground text-pretty sm:pr-12 sm:text-base md:pr-16">
                  {eintrag.antwort.map((absatz, index) => (
                    <p key={index}>{absatz}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
