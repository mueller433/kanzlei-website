import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { openCookieSettings } from '@/components/cookie-consent'

import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

type FooterSpalte = {
  titel: string
  links: { href: string; label: string }[]
}

const FOOTER_SPALTEN: FooterSpalte[] = [
  {
    titel: 'Unternehmen',
    links: [
      { href: '/unternehmen', label: 'Über DPSS' },
      { href: '/leistungen', label: 'Leistungen' },
    ],
  },
  {
    titel: 'Verwertung',
    links: [
      { href: '/verwertung', label: 'Verwertung' },
      { href: '/katalog', label: 'Katalog' },
    ],
  },
  {
    titel: 'Informationen',
    links: [
      { href: '/aktuelles', label: 'Aktuelles' },
      { href: '/faq', label: 'FAQ' },
      { href: '/kontakt', label: 'Kontakt' },
      { href: '/kontakt', label: 'Ansprechpartner' },
    ],
  },
  {
    titel: 'Rechtliches',
    links: [
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
      { href: '/agb', label: 'AGB' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Unternehmensidentität & Kontaktdaten */}
          <div className="max-w-xs">
            <Image
              src="/dpss-logo-horizontal.svg"
              alt="DPSS Management GmbH"
              width={800}
              height={400}
              className="h-auto w-36 object-contain lg:w-48"
            />
            <address className="mt-5 flex flex-col gap-1 text-sm not-italic leading-relaxed text-muted-foreground">
              <span>{KANZLEI.adresse.strasse}</span>
              <span>{KANZLEI_ORT}</span>
              <span className="mt-3">
                Telefon:{' '}
                <a href={KANZLEI.telefon.href} className="transition-colors hover:text-accent">
                  {KANZLEI.telefon.anzeige}
                </a>
              </span>
              <span>
                E-Mail:{' '}
                <a href={KANZLEI.email.href} className="transition-colors hover:text-accent">
                  {KANZLEI.email.anzeige}
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
          <div className="md:col-span-2 lg:col-span-1">
            <button type="button" onClick={openCookieSettings} className="text-left text-sm text-muted-foreground transition-colors hover:text-accent">
              Cookie-Einstellungen
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {KANZLEI.name} {KANZLEI.zusatz}
          </p>
          <p>{KANZLEI.taetigkeit}</p>
        </div>
      </div>
    </footer>
  )
}
