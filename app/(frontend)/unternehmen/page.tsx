import Image from 'next/image'
import React from 'react'

import { TeamKarte } from '@/components/team-karte'
import { TEAM, TEAM_GRUPPENFOTO } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Unternehmen',
  description:
    'DPSS Management GmbH ist Verwertungsdienstleister für Insolvenzverwalter, Verfahrensbeteiligte und Käufer.',
}

const WERTE = [
  {
    titel: 'Sorgfalt',
    beschreibung:
      'Vermögenswerte werden vollständig erfasst, eingeordnet und mit der gebotenen Genauigkeit bewertet.',
  },
  {
    titel: 'Transparenz',
    beschreibung:
      'Auftraggeber und Verfahrensbeteiligte erhalten nachvollziehbare Informationen zu Bestand, Vermarktung und Erlösen.',
  },
  {
    titel: 'Verbindlichkeit',
    beschreibung:
      'Wir halten Abläufe, Zuständigkeiten und Abrechnungen klar – von der Beauftragung bis zur Dokumentation.',
  },
] as const

export default function UnternehmenSeite() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-14 md:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Über DPSS
              </p>
              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
                Verwertung, die Vermögenswerte sichtbar und Ergebnisse nachvollziehbar macht.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
                Die DPSS Management GmbH unterstützt Insolvenzverwalter und Verfahrensbeteiligte
                bei der professionellen Verwertung von Vermögenswerten. Käufer finden im Katalog
                klar dokumentierte Positionen aus laufenden Verfahren.
              </p>
            </div>
            <div className="relative hidden min-h-[18rem] border border-border bg-card md:block">
              <Image
                src={TEAM_GRUPPENFOTO}
                alt="Das Team der DPSS Management GmbH"
                fill
                sizes="28rem"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Unser Auftrag
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              <p>
                Wir schaffen eine belastbare Grundlage für die Verwertung: Vermögenswerte werden
                erfasst, bewertet, professionell vermarktet und in einem klaren Ablauf verkauft.
              </p>
              <p>
                Unser Auftraggeber erhält eine strukturierte Berichterstattung über Maßnahmen,
                Interessenten, Verkäufe und Abrechnung. Käufer erhalten verständliche Angaben zu
                den angebotenen Positionen und einen verlässlichen Ansprechpartner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Unser Anspruch</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Klare Abläufe für sensible Vermögenswerte
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {WERTE.map((wert) => (
              <div key={wert.titel} className="flex flex-col gap-4 bg-background p-8 md:p-10">
                <h3 className="font-serif text-2xl text-foreground">{wert.titel}</h3>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {wert.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Team</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Menschen hinter der Verwertung
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TEAM.map((person) => (
              <TeamKarte key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
