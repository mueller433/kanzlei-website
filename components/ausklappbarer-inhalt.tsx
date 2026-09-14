'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

/** Kürzt nur sehr lange Produktbeschreibungen; kurze Inhalte bleiben vollständig sichtbar. */
export function AusklappbarerInhalt({ children }: { children: React.ReactNode }) {
  const [offen, setOffen] = React.useState(false)
  const [kuerzbar, setKuerzbar] = React.useState(false)
  const inhaltRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const inhalt = inhaltRef.current
    if (!inhalt) return

    const pruefeHoehe = () => setKuerzbar(inhalt.scrollHeight > 1180)
    pruefeHoehe()

    const observer = new ResizeObserver(pruefeHoehe)
    observer.observe(inhalt)
    return () => observer.disconnect()
  }, [])

  function umschalten() {
    if (offen) {
      setOffen(false)
      requestAnimationFrame(() =>
        inhaltRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
      return
    }
    setOffen(true)
  }

  return (
    <div>
      <div
        ref={inhaltRef}
        className={`relative scroll-mt-28 ${!offen && kuerzbar ? 'max-h-[900px] overflow-hidden sm:max-h-[1100px]' : ''}`}
      >
        {children}
        {!offen && kuerzbar && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-card via-card/95 to-transparent"
          />
        )}
      </div>

      {kuerzbar && (
        <div className="relative mt-5 flex justify-center border-t border-border pt-5">
          <button
            type="button"
            aria-expanded={offen}
            onClick={umschalten}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {offen ? (
              <>
                Weniger anzeigen
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Alle Details anzeigen
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
