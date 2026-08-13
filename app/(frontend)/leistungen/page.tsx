import React from 'react'

export const metadata = {
  title: 'Leistungen',
  description: 'Leistungen der DPSS Management GmbH: Erfassung, Bewertung, Vermarktung und transparente Abwicklung von Vermögenswerten.',
}

const LEISTUNGEN = [
  ['Erfassung', 'Wir nehmen Vermögenswerte strukturiert auf, prüfen vorhandene Informationen und schaffen einen belastbaren Überblick über den Bestand.'],
  ['Bewertung', 'Wir ordnen Positionen ein und ermitteln marktgerechte Grundlagen für die weitere Vermarktung – nachvollziehbar und mit Blick auf den jeweiligen Markt.'],
  ['Vermarktung', 'Wir entwickeln passende Vermarktungswege, sprechen potenzielle Käufer an und stellen Positionen im öffentlichen Verwertungskatalog bereit.'],
  ['Verkauf & Abwicklung', 'Wir koordinieren Angebote, Verkäufe, Übergaben und die Kommunikation mit Interessenten bis zum Abschluss.'],
  ['Berichterstattung', 'Auftraggeber erhalten eine klare Dokumentation der Maßnahmen, Interessenten, Verkäufe, Erlöse und Abrechnung.'],
] as const

export default function LeistungenSeite() {
  return <div>
    <section className="border-b border-border"><div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"><p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">Leistungen</p><h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">Professionelle Verwertung mit klarer Verantwortung.</h1><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">DPSS übernimmt die operative Arbeit rund um Vermögenswerte aus laufenden Verfahren – von der ersten Erfassung bis zur transparenten Berichterstattung an den Auftraggeber.</p></div></section>
    <section className="border-b border-border"><div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><div className="flex flex-col gap-px overflow-hidden border border-border bg-border">{LEISTUNGEN.map(([titel, text], index) => <div key={titel} className="grid gap-8 bg-background p-8 md:grid-cols-[0.35fr_1fr] md:gap-16 md:p-12"><div><span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">0{index + 1}</span><h2 className="mt-4 font-serif text-3xl text-foreground">{titel}</h2></div><p className="text-lg leading-relaxed text-muted-foreground text-pretty">{text}</p></div>)}</div></div></section>
    <section><div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><div className="grid gap-12 md:grid-cols-2 md:gap-16"><div><p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">Zielgruppen</p><h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-4xl">Für Auftraggeber und Käufer</h2></div><div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground text-pretty"><p>Insolvenzverwalter und Verfahrensbeteiligte erhalten einen verlässlichen Partner für die operative Verwertung.</p><p>Käufer erhalten Zugang zu übersichtlich aufbereiteten Positionen und einen klaren Ablauf für Anfragen und Angebote.</p></div></div></div></section>
  </div>
}
