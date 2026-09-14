'use client'

import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useMerkliste } from '@/lib/use-merkliste'

export function MerklisteLink() {
  const { bereit, positionen } = useMerkliste()
  const anzahl = bereit ? positionen.length : 0

  return (
    <Link
      href="/merkliste"
      aria-label={anzahl === 1 ? 'Merkliste mit einer Position' : `Merkliste mit ${anzahl} Positionen`}
      className="relative inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-border px-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Bookmark className="h-4 w-4" aria-hidden="true" />
      <span className="hidden 2xl:inline">Merkliste</span>
      {anzahl > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center bg-accent px-1 text-[11px] font-semibold tabular-nums text-accent-foreground">
          {anzahl}
        </span>
      )}
    </Link>
  )
}
