'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NAV_LINKS = [
  { href: '/kanzlei', label: 'Kanzlei' },
  { href: '/insolvenzrecht', label: 'Insolvenzrecht' },
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
      className="flex items-center gap-3"
      aria-label="Zur Startseite"
    >
      <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-sm font-semibold text-accent-foreground">
        MP
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
          Müller &amp; Partner
        </span>
        <span className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Insolvenzverwaltung
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [offen, setOffen] = React.useState(false)

  // Menü bei Navigationswechsel schließen
  React.useEffect(() => {
    setOffen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
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
