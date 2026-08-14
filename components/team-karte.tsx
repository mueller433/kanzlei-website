import Image from 'next/image'
import React from 'react'

export type TeamMitglied = {
  name: string
  rolle: string
  /** Pfad zum freigestellten Porträt unter public/team/. Optional – ohne Bildpfad greift der Initialen-Fallback. */
  bild?: string
  /** Fallback-Kürzel, falls (noch) kein Bildpfad hinterlegt ist. */
  initialen: string
  /** Direkte E-Mail-Adresse der Person, optional in der Listenansicht angezeigt. */
  email?: string
}

/**
 * Ruhiges, leicht hochformatiges Porträt mit dezenter Border –
 * bewusst kein Kreis-Avatar und kein starker Schatten.
 * Wird von TeamKarte (Grid) und TeamZeile (Liste) gemeinsam genutzt.
 */
function TeamPortraet({
  person,
  groesse,
}: {
  person: TeamMitglied
  groesse: 'karte' | 'zeile'
}) {
  const rahmen = groesse === 'karte' ? 'aspect-[4/5] w-full' : 'h-16 w-14 shrink-0'
  return (
    <div className={`relative overflow-hidden border border-border bg-muted ${rahmen}`}>
      {person.bild ? (
        <Image
          src={person.bild}
          alt={person.name}
          fill
          sizes={groesse === 'karte' ? '(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw' : '56px'}
          className="object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center font-serif text-muted-foreground ${
            groesse === 'karte' ? 'text-3xl' : 'text-base'
          }`}
        >
          {person.initialen}
        </div>
      )}
    </div>
  )
}

/** Team-Karte im Grid-Format (Startseite, Abschnitt "Team"). */
export function TeamKarte({ person }: { person: TeamMitglied }) {
  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-6 transition-colors hover:border-accent">
      <TeamPortraet person={person} groesse="karte" />
      <div className="flex flex-col gap-1">
        <span className="font-serif text-lg leading-snug text-card-foreground">{person.name}</span>
        <span className="text-sm text-accent">{person.rolle}</span>
      </div>
    </div>
  )
}

/** Team-Zeile im Listen-Format (Ansprechpartner auf /kontakt). */
export function TeamZeile({ person }: { person: TeamMitglied }) {
  return (
    <div className="flex items-center gap-4">
      <TeamPortraet person={person} groesse="zeile" />
      <div className="flex flex-col">
        <span className="font-serif text-lg text-foreground">{person.name}</span>
        <span className="text-sm text-muted-foreground">{person.rolle}</span>
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="text-sm text-muted-foreground/80 transition-colors hover:text-accent"
          >
            {person.email}
          </a>
        )}
      </div>
    </div>
  )
}
