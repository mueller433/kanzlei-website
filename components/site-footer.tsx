'use client'

import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { openCookieSettings } from '@/components/cookie-consent'
import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

type FooterSpalte = {
  titel: string
  links: { href: string; label: string }[]
}

const FOOTER_SPALTEN: FooterSpalte[] = [
  {
    titel: 'DPSS Management',
    links: [
      { href: '/unternehmen', label: 'Unternehmen' },
      { href: '/leistungen', label: 'Leistungen' },
      { href: '/verwertung', label: 'Verwertung' },
    ],
  },
  {
    titel: 'Marktplatz',
    links: [
      { href: '/katalog', label: 'Verwertungskatalog' },
      { href: '/kontakt?betreff=Kataloganfrage', label: 'Kataloganfrage stellen' },
      { href: '/faq', label: 'Häufige Fragen' },
    ],
  },
  {
    titel: 'Informationen',
    links: [
      { href: '/aktuelles', label: 'Aktuelles' },
      { href: '/kontakt', label: 'Kontakt' },
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
      { href: '/agb', label: 'AGB' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#17130f] text-white sm:mt-20">
      <div className="border-b border-white/12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:px-6 sm:py-11 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-white/50">
              Kaufen oder verwerten
            </p>
            <h2 className="mt-2 max-w-2xl font-serif text-2xl leading-tight text-white sm:text-3xl">
              Vermögenswerte professionell in den Markt bringen.
            </h2>
          </div>
          <div className="grid gap-3 sm:flex">
            <Link
              href="/katalog"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Katalog ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt?betreff=Verwertungsauftrag"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/5"
            >
              Verwertung anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.35fr_repeat(3,0.75fr)] lg:gap-10">
          <div className="col-span-2 max-w-sm md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              aria-label="Zur Startseite"
              className="inline-flex bg-[#f7f5f0] px-3 py-2"
            >
              <Image
                src="/dpss-logo-horizontal.svg"
                alt="DPSS Management GmbH"
                width={800}
                height={400}
                className="h-auto w-40 object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/58">
              Bewertung, Vermarktung und strukturierte Verwertung von Fahrzeugen, Maschinen und
              betrieblichem Anlagevermögen.
            </p>
            <address className="mt-5 flex flex-col gap-2.5 text-sm not-italic text-white/70">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{KANZLEI.adresse.strasse}, {KANZLEI_ORT}</span>
              </span>
              <a href={KANZLEI.telefon.href} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {KANZLEI.telefon.anzeige}
              </a>
              <a
                href={KANZLEI.email.href}
                className="flex items-center gap-2.5 break-all hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {KANZLEI.email.anzeige}
              </a>
              <span className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                Mo–Fr · 8:00–17:00 Uhr
              </span>
            </address>
          </div>

          {FOOTER_SPALTEN.map((spalte) => (
            <nav key={spalte.titel} aria-label={spalte.titel}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {spalte.titel}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {spalte.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/58 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} {KANZLEI.name}</p>
            <p>{KANZLEI.taetigkeit}</p>
          </div>
          <button
            type="button"
            onClick={openCookieSettings}
            className="min-h-11 self-start text-left transition-colors hover:text-white sm:min-h-0 sm:self-auto"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  )
}
