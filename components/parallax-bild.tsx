'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Sehr dezenter Parallax-Effekt für große Editorial-Bildsektionen.
 * Verschiebt das Bild beim Scrollen um maximal ±28px per translate3d
 * (nur `transform`, kein Layout-Reflow). Überstand oben/unten sorgt
 * dafür, dass beim Verschieben keine Kante sichtbar wird. Deaktiviert
 * sich vollständig bei `prefers-reduced-motion: reduce`.
 */
export function ParallaxBild({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const element = ref.current
    if (!element) return

    let angefordert = false

    function aktualisieren() {
      angefordert = false
      if (!element) return
      const rect = element.getBoundingClientRect()
      const mitteViewport = window.innerHeight / 2
      const mitteElement = rect.top + rect.height / 2
      const abstand = mitteElement - mitteViewport
      const versatz = Math.max(-28, Math.min(28, abstand * -0.04))
      element.style.transform = `translate3d(0, ${versatz}px, 0)`
    }

    function beiScroll() {
      if (!angefordert) {
        angefordert = true
        requestAnimationFrame(aktualisieren)
      }
    }

    aktualisieren()
    window.addEventListener('scroll', beiScroll, { passive: true })
    window.addEventListener('resize', beiScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', beiScroll)
      window.removeEventListener('resize', beiScroll)
    }
  }, [])

  return (
    <div ref={ref} className="absolute -top-10 -bottom-10 left-0 right-0 will-change-transform">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  )
}
