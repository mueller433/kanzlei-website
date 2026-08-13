'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NAV_LINKS = [
  { href: '/unternehmen', label: 'Unternehmen' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/verwertung', label: 'Verwertung' },
  { href: '/katalog', label: 'Katalog' },
  { href: '/aktuelles', label: 'Aktuelles' },
  { href: '/kontakt', label: 'Kontakt' },
] as const

function istAktiv(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center"
      aria-label="Zur Startseite"
    >
      {/* Ausschließlich das originale Logo – schwarze Schrift/Symbol, roter
          "GMBH"-Akzent. Keine Filter, keine Invertierung, kein Hintergrund. */}
      <Image
        src="/dpss-logo-horizontal.svg"
        alt="DPSS Management GmbH – Verwertungsdienstleister"
        width={800}
        height={400}
        priority
        className="h-auto w-[184px] object-contain md:w-[232px]"
      />
    </Link>
  )
}

// Feste Header-Höhe. Der Header ist durchgängig sehr hell/transparent und
// liegt daher im normalen Seitenfluss über dem Hero (kein Overlay-Trick
// nötig, da das Logo immer auf hellem Grund steht).
export const HEADER_HOEHE_KLASSE = 'h-20 md:h-[104px]'

export function SiteHeader() {
  const pathname = usePathname()
  const [offen, setOffen] = React.useState(false)
  const [gescrollt, setGescrollt] = React.useState(false)

  // Menü bei Navigationswechsel schließen
  React.useEffect(() => {
    setOffen(false)
  }, [pathname])

  // Ruhiges Scrollverhalten: am Seitenanfang transparent & ohne Trennlinie,
  // ab einer kleinen Scrolldistanz kompakter mit dezenter Border/Backdrop.
  // Kein Ein-/Ausblenden je nach Richtung – nur ein sanfter Zustandswechsel.
  React.useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sobald das mobile Menü offen ist, braucht der Header eine deckende Fläche.
  const kompakt = gescrollt || offen

  // Der Header ist durchgängig sehr hell/cremefarben (nie dunkel eingefärbt),
  // damit Logo und Navigation immer in ihren Originalfarben lesbar bleiben –
  // unabhängig davon, ob er über dem Hero-Bild oder über hellem Inhalt liegt.
  return (
    <header
      className={`sticky top-0 z-50 bg-background/85 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
        kompakt ? 'border-b border-border shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div
        className={`mx-auto grid ${HEADER_HOEHE_KLASSE} w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-8 px-8 md:px-16 lg:px-24`}
      >
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-14">
            {NAV_LINKS.map((link) => {
              const aktiv = istAktiv(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={aktiv ? 'page' : undefined}
                    className={`text-[15px] transition-colors ${
                      aktiv ? 'text-accent' : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/kontakt"
            className="hidden bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Anfrage stellen
          </Link>

          <button
            type="button"
            onClick={() => setOffen((v) => !v)}
            aria-expanded={offen}
            aria-controls="mobile-navigation"
            aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
            className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground lg:hidden"
          >
            {offen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {offen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2 md:px-10">
            {NAV_LINKS.map((link) => {
              const aktiv = istAktiv(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={aktiv ? 'page' : undefined}
                    className={`block border-b border-border py-3 text-base transition-colors hover:text-accent ${
                      aktiv ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="py-3">
              <Link
                href="/kontakt"
                className="inline-block bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
              >
                Anfrage stellen
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
