import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import { KontaktFormular } from '@/components/kontakt-formular'
import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

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
                  Ansprechpartnerin
                </p>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-lg text-foreground">Monika Schymura</span>
                  <span className="text-sm text-muted-foreground">Ihre Kontaktperson</span>
                </div>
              </div>
            </div>

            {/* Formular */}
            <div className="border border-border bg-card p-8 md:p-10">
              <h2 className="font-serif text-2xl text-card-foreground">Anfrage senden</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Füllen Sie das Formular aus – wir setzen uns zeitnah mit Ihnen in Verbindung.
              </p>
              <KontaktFormular betreffVorbelegung={betreffVorbelegung} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
