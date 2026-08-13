import type { Schritt } from '@/components/prozess-schritte'

export function EditorialProzess({ schritte }: { schritte: readonly Schritt[] }) {
  return (
    <ol className="editorial-prozess border-t border-border">
      {schritte.map((schritt) => (
        <li
          key={schritt.schritt}
          className="editorial-prozess-schritt grid grid-cols-[3.5rem_1fr] gap-5 border-b border-border py-8 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-start md:gap-8 md:py-10"
        >
          <span className="font-serif text-4xl leading-none text-accent/70 md:text-6xl">
            {schritt.schritt}
          </span>
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Schritt {schritt.schritt}
            </p>
            <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              {schritt.titel}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              {schritt.beschreibung}
            </p>
          </div>
          <span className="hidden self-center font-serif text-2xl text-accent/50 md:block" aria-hidden="true">
            →
          </span>
        </li>
      ))}
    </ol>
  )
}
