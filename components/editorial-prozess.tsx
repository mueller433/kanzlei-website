import type { Schritt } from '@/components/prozess-schritte'

export function EditorialProzess({ schritte }: { schritte: readonly Schritt[] }) {
  return (
    <ol className="editorial-prozess grid grid-cols-1 gap-0 border-t border-border md:grid-cols-4 md:border-t-0">
      {schritte.map((schritt) => (
        <li
          key={schritt.schritt}
          className="editorial-prozess-schritt grid grid-cols-[4rem_1fr] gap-5 border-b border-border py-8 first:pt-0 md:block md:border-b-0 md:border-l md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0"
        >
          <span className="font-serif text-4xl leading-none text-accent md:mb-8 md:block md:text-5xl">
            {schritt.schritt}
          </span>
          <div>
            <h3 className="font-serif text-xl leading-tight text-foreground md:min-h-14">
              {schritt.titel}
            </h3>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground text-pretty">
              {schritt.beschreibung}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
