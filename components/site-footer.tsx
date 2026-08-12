import Link from 'next/link'
import React from 'react'

type FooterSpalte = {
  titel: string
  links: { href: string; label: string }[]
}

const FOOTER_SPALTEN: FooterSpalte[] = [
  {
    titel: 'Kanzlei',
    links: [
      { href: '/kanzlei', label: 'Über uns' },
      { href: '/leistungen', label: 'Leistungen' },
      { href: '/insolvenzrecht', label: 'Insolvenzrecht' },
      { href: '/restrukturierung', label: 'Restrukturierung' },
    ],
  },
  {
    titel: 'Verwertung',
    links: [
      { href: '/verwertung', label: 'Verwertung' },
      { href: '/katalog', label: 'Katalog' },
      { href: '/katalog', label: 'Aktuelle Angebote' },
    ],
  },
  {
    titel: 'Informationen',
    links: [
      { href: '/aktuelles', label: 'Aktuelles' },
      { href: '/kontakt', label: 'Kontakt' },
      { href: '/kontakt', label: 'Ansprechpartner' },
    ],
  },
  {
    titel: 'Rechtliches',
    links: [
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Kanzlei-Identität & Kontaktdaten */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-sm font-semibold text-accent-foreground">
                MP
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                Müller &amp; Partner
              </span>
            </div>
            <address className="mt-5 flex flex-col gap-1 text-sm not-italic leading-relaxed text-muted-foreground">
              <span>Musterstraße 12</span>
              <span>10115 Berlin</span>
              <span className="mt-3">
                Telefon:{' '}
                <a href="tel:+493000000000" className="hover:text-accent">
                  +49 30 000 000 00
                </a>
              </span>
              <span>
                E-Mail:{' '}
                <a href="mailto:kontakt@mueller-partner.de" className="hover:text-accent">
                  kontakt@mueller-partner.de
                </a>
              </span>
            </address>
          </div>

          {FOOTER_SPALTEN.map((spalte) => (
            <nav key={spalte.titel} aria-label={spalte.titel}>
              <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">
                {spalte.titel}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {spalte.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Müller &amp; Partner Insolvenzverwaltung</p>
          <p>Rechtsanwaltskanzlei · Insolvenzverwaltung · Restrukturierung</p>
        </div>
      </div>
    </footer>
  )
}
