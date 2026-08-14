/**
 * ============================================================================
 *  ZENTRALE FIRMENDATEN – VOR VERÖFFENTLICHUNG PRÜFEN
 * ============================================================================
 *
 * DPSS Management GmbH ist ein Verwertungsdienstleister für
 * Insolvenzverwalter und Verfahrensbeteiligte.
 *
 * Die E-Mail-Adresse ist zentral hinterlegt und wird von allen Kontaktflächen
 * und dem Footer verwendet. Die Teamnamen und Porträtfotos sind bereitgestellte
 * echte Daten.
 * ============================================================================
 */

/** Stammdaten der DPSS Management GmbH. */
export const KANZLEI = {
  name: 'DPSS Management GmbH',
  kuerzel: 'DPSS',
  zusatz: 'Verwertungsdienstleister',
  taetigkeit: 'Vermögensbewertung · Verwertung · transparente Abwicklung',
  register: 'Amtsgericht Göttingen, HRB 207736',
  adresse: {
    strasse: 'Herzberger Landstr. 63',
    plz: 'D-37085',
    ort: 'Göttingen',
  },
  telefon: {
    /** Noch zu ersetzen – echte Telefonnummer liegt nicht vor. */
    anzeige: 'Telefon folgt',
    href: '#kontakt-telefon-folgt',
  },
  email: {
    anzeige: 'kontakt@dpss-management.com',
    href: 'mailto:kontakt@dpss-management.com',
  },
} as const

/**
 * Team – ECHTE Mitarbeiterdaten (keine Platzhalter).
 *
 * Name und Rolle sind unverändert aus den Dateinamen der bereitgestellten
 * Porträtfotos übernommen. Es werden bewusst KEINE zusätzlichen Titel,
 * Zusätzliche Qualifikationen oder Werdegänge/Biografien ergänzt.
 *
 * `bild` verweist auf das freigestellte Porträt unter public/team/.
 * Fehlt bei einem Eintrag der Bildpfad, greift in den Anzeige-Komponenten
 * die bisherige Platzhalter-Darstellung mit `initialen`.
 */
export const TEAM = [
  {
    name: 'Phillip Schaper',
    rolle: 'Geschäftsführung',
    bild: '/team/phillip-schaper.jpg',
    initialen: 'PS',
  },
  {
    name: 'Dirk Schymura',
    rolle: 'Geschäftsführung',
    bild: '/team/dirk-schymura.jpg',
    initialen: 'DS',
  },
  {
    name: 'Andreas Schmidt',
    rolle: 'Insolvenzsachbearbeiter',
    bild: '/team/andreas-schmidt.jpg',
    initialen: 'AS',
  },
  {
    name: 'Andrea Kloser',
    rolle: 'Insolvenzsachbearbeiterin',
    bild: '/team/andrea-kloser.jpg',
    initialen: 'AK',
  },
  {
    name: 'Christine Meier',
    rolle: 'Buchhaltung & Rechnungswesen',
    bild: '/team/christine-meier.jpg',
    initialen: 'CM',
  },
] as const

/**
 * Freigestellte Gruppenaufnahme des Teams – optional als atmosphärisches
 * Element in der Hero-Komposition der Startseite nutzbar.
 */
export const TEAM_GRUPPENFOTO = '/team/team-freigestellt.png'

export type NewsBeitrag = {
  slug: string
  kategorie: 'Fachbeitrag'
  datum: string
  titel: string
  anriss: string
  einleitung: string
  abschnitte: readonly { ueberschrift: string; text: string }[]
  hinweis: string
}

export const NEWS_BEITRAEGE: readonly NewsBeitrag[] = [
  {
    slug: 'eigenverwaltung-als-chance-fuer-den-mittelstand',
    kategorie: 'Fachbeitrag',
    datum: '14.02.2026',
    titel: 'Eigenverwaltung als Chance für den Mittelstand',
    anriss:
      'Wann sich ein Eigenverwaltungsverfahren für Unternehmen eignen kann, welche Voraussetzungen erfüllt sein müssen und warum eine frühzeitige Vorbereitung entscheidend ist.',
    einleitung:
      'Die Eigenverwaltung kann Unternehmen in einer wirtschaftlichen Krise die Möglichkeit geben, die Sanierung unter eigener Verantwortung aktiv zu gestalten. Anders als im klassischen Insolvenzverfahren bleibt die Geschäftsführung dabei grundsätzlich im Amt und führt das Unternehmen unter den besonderen Rahmenbedingungen des Insolvenzverfahrens weiter.\n\nFür mittelständische Unternehmen kann dieser Ansatz insbesondere dann interessant sein, wenn grundsätzlich tragfähige Strukturen vorhanden sind und frühzeitig auf die wirtschaftliche Situation reagiert wird.',
    abschnitte: [
      { ueberschrift: 'Was bedeutet Eigenverwaltung?', text: 'Bei einer Eigenverwaltung bleibt die Geschäftsführung für die operative Führung des Unternehmens verantwortlich. Das Verfahren wird dabei durch einen gerichtlich bestellten Sachwalter begleitet und überwacht.\n\nZiel ist es, die vorhandenen Sanierungsmöglichkeiten innerhalb eines geordneten insolvenzrechtlichen Rahmens zu nutzen und gleichzeitig den Geschäftsbetrieb möglichst stabil fortzuführen.' },
      { ueberschrift: 'Für welche Unternehmen kann sie interessant sein?', text: 'Die Eigenverwaltung ist kein allgemeines Sanierungsinstrument für jedes Unternehmen. Entscheidend sind unter anderem die wirtschaftliche Ausgangssituation, die vorhandenen Sanierungsperspektiven und die Fähigkeit des Unternehmens, die erforderlichen organisatorischen und finanziellen Maßnahmen umzusetzen.\n\nBesonders wichtig ist deshalb eine realistische Einschätzung der Situation vor Beginn des Verfahrens.' },
      { ueberschrift: 'Frühzeitige Vorbereitung schafft Handlungsspielraum', text: 'Je früher eine wirtschaftliche Krise erkannt wird, desto größer ist regelmäßig der Handlungsspielraum für die Beteiligten. Eine strukturierte Analyse der Vermögenswerte, Verbindlichkeiten, laufenden Verträge und betrieblichen Abläufe schafft die Grundlage für fundierte Entscheidungen.\n\nAuch die Frage, welche Vermögenswerte für eine Verwertung oder anderweitige Nutzung in Betracht kommen, kann Bestandteil einer solchen Betrachtung sein.' },
      { ueberschrift: 'Die Rolle einer strukturierten Vermögensverwertung', text: 'Im Rahmen einer Sanierung oder eines Insolvenzverfahrens kann die professionelle Erfassung und Bewertung vorhandener Vermögenswerte eine wichtige Grundlage für weitere Entscheidungen bilden.\n\nMaschinen, technische Anlagen, Fahrzeuge, Betriebsausstattung und sonstige industrielle Vermögenswerte sollten dabei möglichst vollständig erfasst, realistisch bewertet und zielgerichtet vermarktet werden.\n\nEine strukturierte Vermarktung kann dazu beitragen, potenzielle Käufer gezielt zu erreichen und Verwertungsprozesse nachvollziehbar zu organisieren.' },
      { ueberschrift: 'Fazit', text: 'Die Eigenverwaltung kann für geeignete mittelständische Unternehmen eine Möglichkeit sein, eine wirtschaftliche Krise strukturiert zu bewältigen und Sanierungsperspektiven aktiv zu verfolgen.\n\nVoraussetzung ist eine frühzeitige und professionelle Vorbereitung. Dazu gehört auch ein klarer Überblick über die vorhandenen Vermögenswerte und deren mögliche Verwertung.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
  {
    slug: 'fristen-im-insolvenzverfahren-richtig-einordnen',
    kategorie: 'Fachbeitrag',
    datum: '14.03.2026',
    titel: 'Fristen im Insolvenzverfahren richtig einordnen',
    anriss:
      'Von der Antragstellung bis zur Forderungsanmeldung: Welche Fristen im Insolvenzverfahren besonders relevant sind und warum frühzeitiges Handeln zählt.',
    einleitung:
      'In Insolvenzverfahren treffen unterschiedliche Fristen, Termine und organisatorische Anforderungen aufeinander. Für Unternehmen, Gläubiger und weitere Verfahrensbeteiligte kann es deshalb entscheidend sein, relevante Informationen frühzeitig zu erfassen und die jeweiligen Fristen im Blick zu behalten.',
    abschnitte: [
      { ueberschrift: 'Warum Fristen eine zentrale Rolle spielen', text: 'Ein Insolvenzverfahren folgt einem formal geregelten Ablauf. Je nach Verfahren und Beteiligten können unterschiedliche Fristen und Termine relevant sein.\n\nDazu gehören beispielsweise Fristen im Zusammenhang mit der Forderungsanmeldung, gerichtlichen Entscheidungen, Gläubigerversammlungen oder weiteren Verfahrensschritten.\n\nWer relevante Fristen übersieht, kann unter Umständen Handlungsmöglichkeiten verlieren oder wichtige Entscheidungen nicht rechtzeitig vorbereiten.' },
      { ueberschrift: 'Forderungsanmeldung', text: 'Für Gläubiger ist insbesondere die Anmeldung ihrer Forderungen von Bedeutung. Welche Forderungen in welcher Form anzumelden sind und welche Fristen dabei gelten, hängt vom jeweiligen Insolvenzverfahren und den entsprechenden gerichtlichen Vorgaben ab.\n\nDeshalb sollten die veröffentlichten Verfahrensinformationen sorgfältig geprüft und die jeweiligen Angaben des zuständigen Insolvenzgerichts beziehungsweise der Insolvenzverwaltung berücksichtigt werden.' },
      { ueberschrift: 'Nicht nur Gläubiger müssen Fristen beachten', text: 'Auch für Unternehmen und andere Verfahrensbeteiligte können zahlreiche zeitliche Vorgaben relevant sein. Gerade in einer wirtschaftlichen Krise müssen operative Entscheidungen, rechtliche Anforderungen und wirtschaftliche Maßnahmen häufig parallel vorbereitet werden.\n\nEine frühzeitige strukturierte Erfassung der relevanten Informationen kann dabei helfen, Prioritäten zu setzen und notwendige Schritte rechtzeitig einzuleiten.' },
      { ueberschrift: 'Vermögenswerte frühzeitig erfassen', text: 'Neben rechtlichen und finanziellen Fragestellungen spielt auch die Übersicht über die vorhandenen Vermögenswerte eine wichtige Rolle.\n\nMaschinen, Fahrzeuge, technische Anlagen, Betriebsausstattung und Inventar sollten möglichst frühzeitig erfasst und hinsichtlich Zustand, Standort und Verwertbarkeit dokumentiert werden.\n\nEine solche strukturierte Datengrundlage erleichtert spätere Bewertungs- und Vermarktungsprozesse und schafft Transparenz für die weitere Abwicklung.' },
      { ueberschrift: 'Struktur statt Zeitdruck', text: 'In einem dynamischen Insolvenzverfahren kann sich der verfügbare Handlungsspielraum schnell verändern. Eine frühzeitige Vorbereitung ermöglicht es, notwendige Informationen zusammenzutragen, Vermögenswerte zu dokumentieren und mögliche Verwertungswege rechtzeitig zu prüfen.' },
      { ueberschrift: 'Fazit', text: 'Fristen sind ein wesentlicher Bestandteil jedes Insolvenzverfahrens. Für alle Beteiligten gilt deshalb: Verfahrensinformationen frühzeitig prüfen, relevante Termine dokumentieren und notwendige Maßnahmen rechtzeitig vorbereiten.\n\nEine strukturierte Erfassung und Dokumentation von Vermögenswerten kann dabei eine wichtige Grundlage für die weitere Verwertung und Abwicklung bilden.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
] as const

/** Zusammengesetzte Adresszeile "PLZ Ort" – Komfort-Helfer. */
export const KANZLEI_ORT = `${KANZLEI.adresse.plz} ${KANZLEI.adresse.ort}`
