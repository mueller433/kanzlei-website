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
    <Link href="/" onClick={onClick} className="flex items-center" aria-label="Zur Startseite">
      <Image
        src="/dpss-logo-transparent.png"
        alt="DPSS Management GmbH"
        width={1999}
        height={553}
        priority
        className="h-9 w-auto object-contain"
      />
    </Link>
  )
}

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

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        kompakt
          ? 'border-b border-border bg-background/90 shadow-sm backdrop-blur'
          : 'border-b border-transparent bg-background/0'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 transition-[padding] duration-300 md:px-10 ${
          kompakt ? 'py-3' : 'py-5'
        }`}
      >
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const aktiv = istAktiv(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={aktiv ? 'page' : undefined}
                    className={`text-sm transition-colors hover:text-accent ${
                      aktiv ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt"
            className="hidden bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-block"
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
