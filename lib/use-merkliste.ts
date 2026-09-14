'use client'

import React from 'react'

import {
  leseMerkliste,
  MERKLISTE_EREIGNIS,
  MERKLISTE_MAXIMUM,
  type MerklistenPosition,
  speichereMerkliste,
} from '@/lib/merkliste'

export function useMerkliste() {
  const [positionen, setPositionen] = React.useState<MerklistenPosition[]>([])
  const [bereit, setBereit] = React.useState(false)

  React.useEffect(() => {
    const synchronisieren = () => {
      setPositionen(leseMerkliste())
      setBereit(true)
    }

    synchronisieren()
    window.addEventListener(MERKLISTE_EREIGNIS, synchronisieren)
    window.addEventListener('storage', synchronisieren)
    return () => {
      window.removeEventListener(MERKLISTE_EREIGNIS, synchronisieren)
      window.removeEventListener('storage', synchronisieren)
    }
  }, [])

  const istGemerkt = React.useCallback(
    (id: string | number) => positionen.some((position) => position.id === String(id)),
    [positionen],
  )

  const umschalten = React.useCallback((position: MerklistenPosition) => {
    const aktuell = leseMerkliste()
    const vorhanden = aktuell.some((eintrag) => eintrag.id === position.id)
    const naechste = vorhanden
      ? aktuell.filter((eintrag) => eintrag.id !== position.id)
      : [position, ...aktuell].slice(0, MERKLISTE_MAXIMUM)

    speichereMerkliste(naechste)
  }, [])

  const entfernen = React.useCallback((id: string) => {
    speichereMerkliste(leseMerkliste().filter((position) => position.id !== id))
  }, [])

  return { bereit, positionen, istGemerkt, umschalten, entfernen }
}
