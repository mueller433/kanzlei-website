import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import { TeamZeile } from '@/components/team-karte'
import { KANZLEI, KANZLEI_ORT, TEAM } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie DPSS Management GmbH zu einer Verwertungsposition, einem Auftrag oder einer allgemeinen Frage.',
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

export default async function KontaktSeite({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const betreffVorbelegung = typeof sp.betreff === 'string' ? sp.betreff : ''

  return (
    <div>
      {/* HERO */}
      {/* Großzügiges pt sorgt dafür, dass die Headline unter dem sticky Header
          immer vollständig sichtbar ist und nicht angeschnitten wirkt. */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Kontakt
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Sprechen Sie uns an
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Ob Anfrage zu einer Verwertungsposition, einem Verwertungsauftrag oder allgemeine Frage – wir
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
                <div className="flex flex-col gap-5">
                  {TEAM.map((person) => (
                    <TeamZeile key={person.name} person={person} />
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
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Ihr Name"
                    className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                    >
                      E-Mail <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="ihre@email.de"
                      className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="telefon"
                      className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                    >
                      Telefonnummer <span className="text-accent">*</span>
                    </label>
                    <input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+49 (0) 551 000 0000"
                      className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firma"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    Firma / Kanzlei
                  </label>
                  <input
                    id="firma"
                    name="firma"
                    type="text"
                    autoComplete="organization"
                    placeholder="Firma oder Kanzlei"
                    className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="betreff"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    Betreff / Aktenzeichen
                  </label>
                  <input
                    id="betreff"
                    name="betreff"
                    type="text"
                    defaultValue={betreffVorbelegung}
                    placeholder="z. B. Aktenzeichen oder Betreff Ihrer Anfrage"
                    className="border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nachricht"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  >
                    Nachricht <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    rows={5}
                    required
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
                  <span className="text-accent">*</span> Pflichtfelder. Dieses Formular dient
                  aktuell nur der Darstellung und versendet noch keine Nachrichten.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
