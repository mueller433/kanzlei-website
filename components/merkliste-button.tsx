'use client'

import { Bookmark, Check } from 'lucide-react'
import React from 'react'

import type { MerklistenPosition } from '@/lib/merkliste'
import { useMerkliste } from '@/lib/use-merkliste'

export function MerklisteButton({
  position,
  variante = 'karte',
  className = '',
}: {
  position: MerklistenPosition
  variante?: 'karte' | 'detail'
  className?: string
}) {
  const { bereit, istGemerkt, umschalten } = useMerkliste()
  const gemerkt = bereit && istGemerkt(position.id)
  const beschriftung = gemerkt ? 'Von der Merkliste entfernen' : 'Zur Merkliste hinzufügen'

  return (
    <button
      type="button"
      aria-label={beschriftung}
      aria-pressed={gemerkt}
      title={beschriftung}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        umschalten(position)
      }}
      className={
        variante === 'detail'
          ? `inline-flex min-h-12 w-full items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-semibold transition-colors ${
              gemerkt
                ? 'border-accent bg-accent/10 text-accent'
                : 'text-foreground hover:border-accent hover:text-accent'
            } ${className}`
          : `inline-flex h-11 w-11 items-center justify-center border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              gemerkt ? 'border-accent bg-accent text-accent-foreground' : ''
            } ${className}`
      }
    >
      {gemerkt ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
      {variante === 'detail' && <span>{gemerkt ? 'Gemerkt' : 'Zur Merkliste'}</span>}
    </button>
  )
}
