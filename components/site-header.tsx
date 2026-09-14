'use client'

import { ArrowRight, Clock, Mail, Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { KANZLEI } from '@/lib/kanzlei-daten'

export const NAV_LINKS = [
  { href: '/unternehmen', label: 'Unternehmen' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/verwertung', label: 'Verwertung' },
  { href: '/aktuelles', label: 'Aktuelles' },
  { href: '/faq', label: 'FAQ' },
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
        className="h-auto w-[140px] object-contain sm:w-[172px] xl:w-[200px]"
      />
    </Link>
  )
}

// Feste Header-Höhe. Der Header ist durchgängig sehr hell/transparent und
// liegt daher im normalen Seitenfluss über dem Hero (kein Overlay-Trick
// nötig, da das Logo immer auf hellem Grund steht).
export const HEADER_HOEHE_KLASSE = 'h-16 sm:h-20 xl:h-[88px]'

/**
 * Schlanke Utility-Bar oberhalb der Hauptnavigation. Nur ab dem lg-Breakpoint
 * sichtbar, damit die Navigation auf kleinen Bildschirmen kompakt bleibt.
 * Sitzt zusammen mit dem Header im selben sticky-Wrapper, damit beide beim
 * Scrollen gemeinsam oben angeheftet bleiben.
 */
function UtilityTopBar() {
  return (
    <div className="hidden bg-topbar text-topbar-foreground xl:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-12 py-2 2xl:px-16">
        <div className="flex items-center gap-4 whitespace-nowrap text-xs font-medium tracking-wide text-topbar-foreground/90">
          <a
            href={KANZLEI.telefon.href}
            className="flex items-center gap-1.5 transition-colors hover:text-topbar-foreground"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-topbar-foreground/60" aria-hidden="true" />
            {KANZLEI.telefon.anzeige}
          </a>
          <span className="text-topbar-foreground/30" aria-hidden="true">
            ·
          </span>
          <a
            href={KANZLEI.email.href}
            className="flex items-center gap-1.5 transition-colors hover:text-topbar-foreground"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-topbar-foreground/60" aria-hidden="true" />
            {KANZLEI.email.anzeige}
          </a>
          <span className="text-topbar-foreground/30" aria-hidden="true">
            ·
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-topbar-foreground/60" aria-hidden="true" />
            Mo–Fr 8:00–17:00 Uhr
          </span>
        </div>
        <Link
          href="/kontakt?betreff=Verwertungsauftrag"
          className="group flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold tracking-wide text-topbar-highlight transition-opacity hover:opacity-80"
        >
          Verwertungsauftrag anfragen
          <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [offen, setOffen] = React.useState(false)
  const [gescrollt, setGescrollt] = React.useState(false)

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
    // TopBar und Header teilen sich einen sticky-Wrapper, damit die Utility-Bar
    // beim Scrollen zusammen mit der Hauptnavigation oben angeheftet bleibt,
    // statt separat wegzuscrollen.
    <div className="sticky top-0 z-50">
      <UtilityTopBar />
      <header
        className={`relative bg-background/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
          kompakt ? 'border-b border-border shadow-sm' : 'border-b border-transparent'
        }`}
      >
        <div
          className={`mx-auto grid ${HEADER_HOEHE_KLASSE} w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-10 xl:px-12 2xl:px-16`}
        >
          <Logo onClick={() => setOffen(false)} />

          <nav aria-label="Hauptnavigation" className="hidden h-full justify-center xl:flex">
            <ul className="flex h-full items-center gap-6 2xl:gap-9">
              {NAV_LINKS.map((link) => {
                const aktiv = istAktiv(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOffen(false)}
                      aria-current={aktiv ? 'page' : undefined}
                      className={`flex h-full items-center border-b-2 px-0.5 text-[15px] font-medium transition-colors ${
                        aktiv
                          ? 'border-accent text-accent'
                          : 'border-transparent text-foreground hover:border-border hover:text-accent'
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
              href="/katalog"
              aria-current={istAktiv(pathname, '/katalog') ? 'page' : undefined}
              className="hidden min-h-11 items-center justify-center bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex xl:px-5"
            >
              Verwertungskatalog
            </Link>

            <button
              type="button"
              onClick={() => setOffen((v) => !v)}
              aria-expanded={offen}
              aria-controls="mobile-navigation"
              aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
              className="inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent xl:hidden"
            >
              {offen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {offen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background shadow-xl sm:max-h-[calc(100dvh-5rem)] xl:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
              <Link
                href="/katalog"
                onClick={() => setOffen(false)}
                className="mb-2 inline-flex min-h-12 w-full items-center justify-between bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground sm:hidden"
              >
                Verwertungskatalog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const aktiv = istAktiv(pathname, link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOffen(false)}
                        aria-current={aktiv ? 'page' : undefined}
                        className={`flex min-h-12 items-center justify-between border-b border-border py-3 text-base font-medium transition-colors hover:text-accent ${
                          aktiv ? 'text-accent' : 'text-foreground'
                        }`}
                      >
                        {link.label}
                        {aktiv && <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
                <a
                  href={KANZLEI.telefon.href}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {KANZLEI.telefon.anzeige}
                </a>
                <a
                  href={KANZLEI.email.href}
                  className="inline-flex min-h-11 items-center gap-2 break-all text-sm font-medium text-foreground hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {KANZLEI.email.anzeige}
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>
    </div>
  )
}
