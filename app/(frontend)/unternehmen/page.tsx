import { Eye, Handshake, ShieldCheck } from 'lucide-react'
import { getPayload } from 'payload'

import { KontaktCta } from '@/components/kontakt-cta'
import { TeamKarte } from '@/components/team-karte'
import { TEAM } from '@/lib/kanzlei-daten'
import config from '@/payload.config'

export const metadata = {
  title: 'Unternehmen',
  description:
    'DPSS Management GmbH begleitet die strukturierte Bewertung, Vermarktung und Verwertung von Vermögenswerten.',
}

const WERTE = [
  {
    titel: 'Sorgfalt',
    icon: ShieldCheck,
    beschreibung:
      'Bestände werden strukturiert erfasst, nachvollziehbar eingeordnet und für die Vermarktung aufbereitet.',
  },
  {
    titel: 'Transparenz',
    icon: Eye,
    beschreibung:
      'Auftraggeber erhalten klare Informationen über Bestand, Maßnahmen, Interessenten und Ergebnisse.',
  },
  {
    titel: 'Verbindlichkeit',
    icon: Handshake,
    beschreibung:
      'Zuständigkeiten und Abläufe bleiben von der Beauftragung bis zur Abrechnung nachvollziehbar.',
  },
] as const

const ABLAUF = [
  {
    nummer: '01',
    titel: 'Erfassen und einordnen',
    text: 'Vermögenswerte, Unterlagen und Rahmenbedingungen werden strukturiert aufgenommen.',
  },
  {
    nummer: '02',
    titel: 'Bewerten und aufbereiten',
    text: 'Bestände werden marktgerecht eingeordnet und für eine verständliche Präsentation vorbereitet.',
  },
  {
    nummer: '03',
    titel: 'Vermarkten und verkaufen',
    text: 'Geeignete Käufer werden über den Katalog und weitere Vermarktungswege angesprochen.',
  },
  {
    nummer: '04',
    titel: 'Dokumentieren und abrechnen',
    text: 'Maßnahmen, Verkäufe und Ergebnisse werden transparent zusammengeführt.',
  },
] as const

export default async function UnternehmenSeite() {
  const payload = await getPayload({ config: await config })
  const { totalDocs: katalogAnzahl } = await payload.find({
    collection: 'posten',
    where: { veroeffentlicht: { equals: true } },
    limit: 0,
    depth: 0,
  })

  const kennzahlen = [
    {
      wert: katalogAnzahl > 0 ? `${katalogAnzahl}+` : 'Laufend',
      label: 'Aktuelle Katalogpositionen',
    },
    { wert: '4', label: 'Klare Schritte bis zur Abrechnung' },
    { wert: 'Göttingen', label: 'Unternehmensstandort' },
  ] as const

  return (
    <div>
      <section className="border-b border-accent/20 bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Über DPSS Management
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(2.55rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-balance">
              Vermögenswerte erfassen. Märkte erreichen. Ergebnisse dokumentieren.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              DPSS Management begleitet Insolvenzverwalter, Verfahrensbeteiligte und Unternehmen
              bei der strukturierten Bewertung und Verwertung betrieblicher Vermögenswerte.
            </p>
          </div>

          <div className="border-l-2 border-white/70 bg-white/10 px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              Unser Fokus
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug text-white">
              Ein nachvollziehbarer Prozess für Auftraggeber und Käufer.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-10">
          {kennzahlen.map((kennzahl) => (
            <div key={kennzahl.label} className="flex flex-col gap-1.5 py-6 sm:px-6 sm:py-8 first:sm:pl-0 last:sm:pr-0">
              <span className="font-serif text-3xl text-accent sm:text-4xl">{kennzahl.wert}</span>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {kennzahl.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="reveal mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10 lg:py-20">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Unser Auftrag
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
              Eine belastbare Grundlage für jede Verwertung
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Von der ersten Bestandsaufnahme bis zur Abrechnung halten wir Informationen,
              Zuständigkeiten und Ergebnisse in einem klaren Ablauf zusammen.
            </p>
          </div>

          <ol className="border-t border-border">
            {ABLAUF.map((schritt) => (
              <li
                key={schritt.nummer}
                className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-border py-6 sm:grid-cols-[3.5rem_0.75fr_1.25fr] sm:gap-6 sm:py-7"
              >
                <span className="font-serif text-xl text-accent">{schritt.nummer}</span>
                <h3 className="font-serif text-xl leading-snug text-foreground">{schritt.titel}</h3>
                <p className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-3">
                  {schritt.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-muted/35">
        <div className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Unser Anspruch
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Klarheit in jeder Phase
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {WERTE.map((wert) => {
              const Icon = wert.icon
              return (
                <article key={wert.titel} className="border border-border bg-card p-6 sm:p-7">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl text-foreground">{wert.titel}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {wert.beschreibung}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Team</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Ihre Ansprechpartner bei DPSS
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Direkte Zuständigkeiten und persönliche Erreichbarkeit für Auftraggeber und Käufer.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TEAM.map((person) => (
              <TeamKarte key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      <KontaktCta
        eyebrow="Persönlicher Austausch"
        titel="Besprechen wir Ihre Verwertungsaufgabe."
        text="Wir beantworten Ihre Fragen zu Bewertung, Vermarktung und dem weiteren Ablauf."
        buttonLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
