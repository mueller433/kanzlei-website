import { Eye, Handshake, ShieldCheck } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'

import { KontaktCta } from '@/components/kontakt-cta'
import { TeamKarte } from '@/components/team-karte'
import { TEAM } from '@/lib/kanzlei-daten'
import config from '@/payload.config'

export const metadata = {
  title: 'Unternehmen',
  description:
    'DPSS Management GmbH ist Verwertungsdienstleister für Insolvenzverwalter, Verfahrensbeteiligte und Käufer.',
}

const WERTE = [
  {
    titel: 'Sorgfalt',
    icon: ShieldCheck,
    beschreibung:
      'Vermögenswerte werden vollständig erfasst, eingeordnet und mit der gebotenen Genauigkeit bewertet.',
  },
  {
    titel: 'Transparenz',
    icon: Eye,
    beschreibung:
      'Auftraggeber und Verfahrensbeteiligte erhalten nachvollziehbare Informationen zu Bestand, Vermarktung und Erlösen.',
  },
  {
    titel: 'Verbindlichkeit',
    icon: Handshake,
    beschreibung:
      'Wir halten Abläufe, Zuständigkeiten und Abrechnungen klar – von der Beauftragung bis zur Dokumentation.',
  },
] as const

export default async function UnternehmenSeite() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { totalDocs: katalogAnzahl } = await payload.find({
    collection: 'posten',
    where: { veroeffentlicht: { equals: true } },
    limit: 0,
    depth: 0,
  })

  const KPIS = [
    {
      wert: katalogAnzahl > 0 ? `${katalogAnzahl}+` : 'Laufend',
      label: 'Aktuelle Katalog-Positionen',
    },
    { wert: '100%', label: 'Gerichtsfeste Dokumentation' },
    { wert: 'Göttingen', label: 'Zentraler Standort & Region' },
  ] as const

  return (
    <div>
      {/* HERO — volle Breite, ohne Gruppenfoto; stattdessen KPI-Leiste darunter */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 pb-0 pt-24 md:px-10 md:pt-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Über DPSS
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
            Verwertung, die Vermögenswerte sichtbar und Ergebnisse nachvollziehbar macht.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Die DPSS Management GmbH unterstützt Insolvenzverwalter und Verfahrensbeteiligte bei
            der professionellen Verwertung von Vermögenswerten. Käufer finden im Katalog klar
            dokumentierte Positionen aus laufenden Verfahren.
          </p>
        </div>

        {/* KPI-Leiste: 3-spaltige Trust Indicators */}
        <div className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="flex flex-col gap-2 px-0 py-8 sm:px-8 md:px-10">
                <span className="font-serif text-4xl text-accent md:text-5xl">{kpi.wert}</span>
                <span className="text-sm uppercase tracking-[0.12em] text-muted-foreground">
                  {kpi.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNSER AUFTRAG — als Key-Message-Box mit bordeauxroter linker Border */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unser Auftrag
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Eine belastbare Grundlage für jede Verwertung
            </h2>
          </div>

          <div className="mt-10 border-l-2 border-accent bg-card px-8 py-8 md:px-12 md:py-10">
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-card-foreground text-pretty md:text-xl">
              <p>
                Wir schaffen eine belastbare Grundlage für die Verwertung: Vermögenswerte werden
                erfasst, bewertet, professionell vermarktet und in einem klaren Ablauf verkauft.
              </p>
              <p className="text-muted-foreground">
                Unser Auftraggeber erhält eine strukturierte Berichterstattung über Maßnahmen,
                Interessenten, Verkäufe und Abrechnung. Käufer erhalten verständliche Angaben zu
                den angebotenen Positionen und einen verlässlichen Ansprechpartner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KLARE ABLÄUFE — Icons + Bordeaux-Top-Border je Karte */}
      <section className="border-b border-border">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Unser Anspruch
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">
              Klare Abläufe für sensible Vermögenswerte
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WERTE.map((wert) => {
              const Icon = wert.icon
              return (
                <div
                  key={wert.titel}
                  className="flex flex-col gap-4 border-t-2 border-accent bg-card p-8 md:p-10"
                >
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-serif text-2xl text-foreground">{wert.titel}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                    {wert.beschreibung}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM — Karten mit E-Mail-Link und Hover-Anhebung */}
      <section>
        <div className="reveal mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
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

      {/* ABSCHLIESSENDER CTA-BANNER */}
      <KontaktCta
        titel="Lernen Sie uns persönlich kennen."
        text="Wir beraten Sie gerne zu allen Fragen rund um Bewertung und Verwertung."
        buttonLabel="Ansprechpartner kontaktieren"
      />
    </div>
  )
}
