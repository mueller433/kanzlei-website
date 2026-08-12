import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import { ANSPRECHPARTNER, KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie Müller & Partner – Insolvenzverwaltung und Restrukturierung. Adresse, Telefon, E-Mail und Anfrageformular.',
}

// Kontaktkanäle – Werte stammen zentral aus lib/kanzlei-daten.ts (Platzhalter),
// nur Icon und Beschriftung werden hier als Darstellung ergänzt.
const KONTAKTDATEN = [
  {
    Icon: MapPin,
    label: 'Anschrift',
    zeilen: [KANZLEI.name, KANZLEI.adresse.strasse, KANZLEI_ORT],
    href: undefined,
  },
  {
    Icon: Phone,
    label: 'Telefon',
    zeilen: [KANZLEI.telefon.anzeige],
    href: KANZLEI.telefon.href,
  },
  {
    Icon: Mail,
    label: 'E-Mail',
    zeilen: [KANZLEI.email.anzeige],
    href: KANZLEI.email.href,
  },
] as const

export default function KontaktSeite() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Kontakt
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Sprechen Sie uns an
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Ob Anfrage zu einer Verwertungsposition, Mandatsanbahnung oder allgemeine Frage – wir
            sind für Sie erreichbar und melden uns kurzfristig zurück.
          </p>
        </div>
      </section>

      {/* KONTAKTDATEN + FORMULAR */}
      <section>
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            {/* Kontaktdaten */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                {KONTAKTDATEN.map(({ Icon, label, zeilen, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-accent"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-base leading-relaxed text-foreground hover:text-accent"
                        >
                          {zeilen[0]}
                        </a>
                      ) : (
                        <address className="text-base not-italic leading-relaxed text-foreground">
                          {zeilen.map((zeile) => (
                            <span key={zeile} className="block">
                              {zeile}
                            </span>
                          ))}
                        </address>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ansprechpartner */}
              <div className="border-t border-border pt-8">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Ansprechpartner
                </p>
                <div className="flex flex-col gap-4">
                  {ANSPRECHPARTNER.map((person, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-muted font-serif text-base text-muted-foreground">
                        {person.initialen}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-foreground">{person.name}</span>
                        <span className="text-sm text-muted-foreground">{person.rolle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formular (Layout ohne Backend-Funktion) */}
            <div className="border border-border bg-card p-8 md:p-10">
              <h2 className="font-serif text-2xl text-card-foreground">Anfrage senden</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Füllen Sie das Formular aus – wir setzen uns zeitnah mit Ihnen in Verbindung.
              </p>
              <form className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ihr Name"
                    className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ihre@email.de"
                    className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nachricht"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    rows={5}
                    placeholder="Ihre Nachricht an uns"
                    className="resize-y border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Nachricht senden
                </button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Dieses Formular dient aktuell nur der Darstellung und versendet noch keine
                  Nachrichten.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
