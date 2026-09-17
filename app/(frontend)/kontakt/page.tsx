import { ArrowRight, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import React from 'react'

import { KontaktFormular } from '@/components/kontakt-formular'
import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie DPSS Management GmbH zu einer Verwertungsposition, einem Auftrag oder einer allgemeinen Frage.',
}

// Kontaktdaten stammen zentral aus lib/kanzlei-daten.ts.
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
    Icon: Phone,
    label: 'Büro Berlin',
    zeilen: ['+493075434877'],
    href: 'tel:+493075434877',
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
  const nachrichtVorbelegung = typeof sp.nachricht === 'string' ? sp.nachricht : ''

  return (
    <div>
      <section className="border-b border-accent/20 bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
              Kontakt · DPSS Management
            </p>
            <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-balance">
              Wie können wir Sie unterstützen?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              Fragen Sie eine Katalogposition an oder sprechen Sie mit uns über die strukturierte
              Verwertung Ihrer Vermögenswerte.
            </p>
          </div>

          <div className="border-l-2 border-white/70 bg-white/10 px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              Direkter Kontakt
            </p>
            <a
              href={KANZLEI.telefon.href}
              className="mt-3 block font-serif text-2xl text-white transition-colors hover:text-white/75"
            >
              {KANZLEI.telefon.anzeige}
            </a>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/65">
              <Clock className="h-4 w-4 text-white/80" aria-hidden="true" />
              Montag bis Freitag · 8:00–17:00 Uhr
            </p>
          </div>
        </div>
      </section>

      {/* KONTAKTDATEN + FORMULAR */}
      <section>
        <div className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            {/* Kontaktdaten */}
            <aside className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Erreichbarkeit
                </p>
                <h2 className="mt-2 font-serif text-3xl text-foreground">Direkt zu DPSS</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Wählen Sie den passenden Kontaktweg. Für Katalogpositionen können Sie den Titel
                  oder die Positionsnummer direkt im Betreff nennen.
                </p>
              </div>

              <div className="flex flex-col border border-border bg-card">
                {KONTAKTDATEN.map(({ Icon, label, zeilen, href }) => (
                  <div key={label} className="flex items-start gap-4 border-b border-border p-5 last:border-b-0">
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
                          className="break-all text-base leading-relaxed text-foreground transition-colors hover:text-accent"
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

              <div className="border-l-2 border-accent bg-card px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Ansprechpartnerin
                </p>
                <p className="mt-2 font-serif text-xl text-foreground">Monika Schymura</p>
                <p className="mt-1 text-sm text-muted-foreground">Ihre Kontaktperson</p>
              </div>

              <div className="border border-border bg-muted/45 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                  Persönlich und vertraulich bearbeitet
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ihre Anfrage wird direkt an das zuständige Team von DPSS Management übermittelt.
                </p>
              </div>
            </aside>

            {/* Formular */}
            <div className="min-w-0 border border-border bg-card p-5 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Online-Anfrage
              </p>
              <h2 className="mt-2 font-serif text-3xl text-card-foreground">Anfrage senden</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Beschreiben Sie kurz Ihr Anliegen. Die mit einem Stern markierten Angaben benötigen
                wir für die Bearbeitung.
              </p>
              <KontaktFormular
                betreffVorbelegung={betreffVorbelegung}
                nachrichtVorbelegung={nachrichtVorbelegung}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/35">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-10">
          <div>
            <p className="font-serif text-xl text-foreground">Sie möchten Vermögenswerte verwerten?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Senden Sie uns direkt eine Anfrage mit dem passenden Betreff.
            </p>
          </div>
          <a
            href="/kontakt?betreff=Verwertungsauftrag"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Verwertung anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  )
}
