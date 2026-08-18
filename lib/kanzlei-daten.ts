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
    anzeige: '+4932212243813',
    href: 'tel:+4932212243813',
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
    email: 'p.schaper@dpss-management.com',
  },
  {
    name: 'Dirk Schymura',
    rolle: 'Geschäftsführung',
    bild: '/team/dirk-schymura.jpg',
    initialen: 'DS',
    email: 'd.schymura@dpss-management.com',
  },
  {
    name: 'Andreas Schmidt',
    rolle: 'Insolvenzsachbearbeiter',
    bild: '/team/andreas-schmidt.jpg',
    initialen: 'AS',
    email: 'a.schmidt@dpss-management.com',
  },
  {
    name: 'Andrea Kloser',
    rolle: 'Insolvenzsachbearbeiterin',
    bild: '/team/andrea-kloser.jpg',
    initialen: 'AK',
    email: 'a.kloser@dpss-management.com',
  },
  {
    name: 'Christine Meier',
    rolle: 'Buchhaltung & Rechnungswesen',
    bild: '/team/christine-meier.jpg',
    initialen: 'CM',
    email: 'c.meier@dpss-management.com',
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
      { ueberschrift: 'Nicht nur Gläubiger müssen Fristen beachten', text: 'Auch für Unternehmen und andere Verfahrensbeteiligte können zahlreiche zeitliche Vorgaben relevant sein. Gerade in einer wirtschaftlichen Krise müssen operative Entscheidungen, rechtliche Anforderungen und wirtschaftliche Ma��nahmen häufig parallel vorbereitet werden.\n\nEine frühzeitige strukturierte Erfassung der relevanten Informationen kann dabei helfen, Prioritäten zu setzen und notwendige Schritte rechtzeitig einzuleiten.' },
      { ueberschrift: 'Vermögenswerte frühzeitig erfassen', text: 'Neben rechtlichen und finanziellen Fragestellungen spielt auch die Übersicht über die vorhandenen Vermögenswerte eine wichtige Rolle.\n\nMaschinen, Fahrzeuge, technische Anlagen, Betriebsausstattung und Inventar sollten möglichst frühzeitig erfasst und hinsichtlich Zustand, Standort und Verwertbarkeit dokumentiert werden.\n\nEine solche strukturierte Datengrundlage erleichtert spätere Bewertungs- und Vermarktungsprozesse und schafft Transparenz für die weitere Abwicklung.' },
      { ueberschrift: 'Struktur statt Zeitdruck', text: 'In einem dynamischen Insolvenzverfahren kann sich der verfügbare Handlungsspielraum schnell verändern. Eine frühzeitige Vorbereitung ermöglicht es, notwendige Informationen zusammenzutragen, Vermögenswerte zu dokumentieren und mögliche Verwertungswege rechtzeitig zu prüfen.' },
      { ueberschrift: 'Fazit', text: 'Fristen sind ein wesentlicher Bestandteil jedes Insolvenzverfahrens. Für alle Beteiligten gilt deshalb: Verfahrensinformationen frühzeitig prüfen, relevante Termine dokumentieren und notwendige Maßnahmen rechtzeitig vorbereiten.\n\nEine strukturierte Erfassung und Dokumentation von Vermögenswerten kann dabei eine wichtige Grundlage für die weitere Verwertung und Abwicklung bilden.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
  {
    slug: 'wertermittlung-im-insolvenzverfahren-fortfuehrungswert-vs-liquidationswert',
    kategorie: 'Fachbeitrag',
    datum: '20.02.2026',
    titel: 'Wertermittlung im Insolvenzverfahren: Fortführungswert vs. Liquidationswert',
    anriss:
      'Warum eine präzise und marktgerechte Bewertung von Maschinen und technischen Anlagen entscheidend für die Insolvenzmasse ist und welche Wertansätze wann greifen.',
    einleitung:
      'Die realistische Bewertung von Vermögenswerten gehört zu den ersten und wichtigsten Schritten in einem Insolvenz- oder Restrukturierungsverfahren. Für Insolvenzverwalter und Gläubiger bildet sie die Entscheidungsgrundlage dafür, ob ein Unternehmen fortgeführt, im Paket veräußert oder einzeln verwertet werden sollte.\n\nBesonders bei industriellen Vermögenswerten – wie Produktionsstraßen, Maschinenpark oder Fuhrpark – stehen dabei zwei wesentliche Wertansätze im Mittelpunkt: der Fortführungswert (Going-Concern-Wert) und der Zerschlagungs- bzw. Liquidationswert.',
    abschnitte: [
      { ueberschrift: 'Fortführungswert: Wenn die Struktur erhalten bleibt', text: 'Der Fortführungswert geht davon aus, dass der Betrieb oder ein abgrenzbarer Betriebsteil im Rahmen einer übertragenden Sanierung oder eines Insolvenzplans aufrechterhalten wird.\n\nMaschinen und Anlagen verbleiben an ihrem Standort und im gewohnten Produktionskontext. Der Wert bemisst sich hierbei nicht nur nach dem reinen Sachwert der Anlage, sondern auch nach ihrer funktionellen Einbindung, dem aktuellen Zustand und ihrer Ertragskraft im laufenden Betrieb.' },
      { ueberschrift: 'Liquidationswert: Verwertung unter Zeit- und Marktdruck', text: 'Lässt sich eine Fortführung nicht realisieren, rückt der Liquidationswert in den Fokus. Dieser Wert spiegelt den Erlös wider, der bei einer zügigen Einzelverwertung der Gegenstände am freien Markt erzielt werden kann.\n\nHierbei müssen Demontagekosten, Transportaufwände, der Zustand der Güter sowie die aktuelle Marktnachfrage realistisch einkalkuliert werden. Ein zu hoch angesetzter Liquidationswert birgt das Risiko von Fehleinschätzungen im Verfahren, während eine zu vorsichtige Bewertung Verhandlungspotenzial verschenkt.' },
      { ueberschrift: 'Transparenz schützt die Insolvenzmasse', text: 'Eine fachgerechte, standortnahe Aufnahme und Bewertung vor Ort schafft Rechtssicherheit für alle Verfahrensbeteiligten. Sie dient als verlässliche Verhandlungsbasis gegenüber potenziellen Erwerbern, Banken und Sicherungsgutgläubigern.' },
      { ueberschrift: 'Fazit', text: 'Die Wahl und fundierte Ermittlung des richtigen Wertansatzes ist der Schlüssel für eine optimale Verwertungsquote. Eine strukturierte Inventarisierung und Wertermittlung durch erfahrene Spezialisten schützt die Masse und sichert nachvollziehbare Verwertungsergebnisse.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
  {
    slug: 'standkosten-minimieren-effizientes-standortmanagement',
    kategorie: 'Fachbeitrag',
    datum: '27.02.2026',
    titel: 'Standkosten minimieren: Effizientes Standortmanagement bei der Unternehmensabwicklung',
    anriss:
      'Laufende Miet-, Pacht- und Sicherungskosten können die Insolvenzmasse stark belasten. Wie eine strukturierte Räumung und Verwertung Werte schützt und Kosten senkt.',
    einleitung:
      'Nach der Eröffnung eines Insolvenzverfahrens oder bei der Entscheidung zur Betriebseinstellung läuft die Uhr: Gewerbemieten, Pachtverträge, Energie- und Bewachungskosten fallen fortlaufend an und zehren an der vorhandenen Liquidität der Masse.\n\nEin zielgerichtetes Standort- und Verwertungsmanagement ist daher essenziell, um Objekte zeitnah, geordnet und wirtschaftlich an den Vermieter oder Eigentümer zurückzugeben.',
    abschnitte: [
      { ueberschrift: 'Die Herausforderung: Komplexität an den Standorten', text: 'Oftmals stehen Verwerter und Insolvenzverwalter vor unübersichtlichen Betriebsgeländen. Eingebaute Schwerlastmaschinen, gefahrstoffhaltige Betriebe oder eine unvollständige Dokumentation erschweren die schnelle Freizügigkeit der Immobilien.\n\nEine unsortierte Räumung birgt zudem die Gefahr, dass werthaltige Betriebsmittel beschädigt, unter Wert veräußert oder vorschnell verschrottet werden.' },
      { ueberschrift: 'Der strukturierte Ablauf zum Werterhalt', text: 'Um Standkosten zu minimieren und gleichzeitig den maximalen Erlös zu sichern, hat sich ein phasenorientiertes Vorgehen bewährt:\n\nSchnelle Bestandserfassung: Lückenlose Erfassung aller mobilen und immobilen Wirtschaftsgüter vor Ort.\n\nSicherung & Zutrittskontrolle: Schutz werthaltiger Wirtschaftsgüter vor unbefugtem Zugriff oder Entwendung.\n\nParallele Vermarktung: Gezielte Ansprache potenzieller Käufer noch während der Vorbereitungsphase.\n\nKoordinierte Demontage: Fachgerechter Rückbau und termingerechte Übergabe der Besenreinheit an den Eigentümer.' },
      { ueberschrift: 'Entlastung für Insolvenzverwalter und Eigentümer', text: 'Wird die Verwertung aus einer Hand koordiniert, reduzieren sich die Schnittstellen für die Verfahrensbeteiligten erheblich. Verwertungs- und Räumungsprozesse greifen nahtlos ineinander, was die Verfahrensdauer verkürzt und Kosten einspart.' },
      { ueberschrift: 'Fazit', text: 'Schnelligkeit und Sorgfalt schließen sich bei der Verwertung nicht aus. Durch ein professionelles Standortmanagement lassen sich laufende Betriebskosten drastisch senken und der Wert des Inventars optimal realisieren.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
  {
    slug: 'fremdrechte-im-blick-aussonderung-und-absonderung-rechtssicher-handhaben',
    kategorie: 'Fachbeitrag',
    datum: '06.03.2026',
    titel: 'Fremdrechte im Blick: Aussonderung und Absonderung rechtssicher handhaben',
    anriss:
      'Eigentumsvorbehalte, Sicherungseigentum der Banken und Leasingkontrakte verkomplizieren die Verwertung. Warum eine lückenlose Inventarisierung Streitigkeiten vermeidet.',
    einleitung:
      'In der Praxis eines Insolvenzverfahrens gehören Güter selten uneingeschränkt dem Schuldnerunternehmen. Maschinen sind leasingsicherungsübereignet, Rohstoffe unter verlängertem Eigentumsvorbehalt geliefert und der Fuhrpark fremdfinanziert.\n\nFür den Insolvenzverwalter ist die saubere Trennung von Aussonderungsrechten (Dritt-Eigentum) und Absonderungsrechten (Pfandrechte/Sicherungseigentum) eine der anspruchsvollsten Aufgaben zu Verfahrensbeginn.',
    abschnitte: [
      { ueberschrift: 'Aussonderung vs. Absonderung: Die Unterschiede', text: 'Aussonderungsberechtigte (z. B. Leasinggeber oder Lieferanten mit einfachem Eigentumsvorbehalt) verlangen die Herausgabe ihres Eigentums. Die Gegenstände gehören nicht zur Insolvenzmasse.\n\nAbsonderungsberechtigte (z. B. finanzierende Banken mit Sicherungseigentum an Maschinen) haben vorrangigen Anspruch auf den Verwertungserlös des jeweiligen Objekts.\n\nWerden Gegenstände fehlerhaft zugeordnet oder ohne Klärung der Rechte verwertet, drohen langwierige Schadensersatzansprüche und Streitigkeiten mit Gläubigern.' },
      { ueberschrift: 'Transparenz durch präzise Seriennummern- und Vertragserfassung', text: 'Eine effiziente Verwertung setzt voraus, dass bereits bei der ersten Bestandsaufnahme vor Ort alle relevanten Daten erfasst werden: Typenschilder, Seriennummern, Fahrgestellnummern und der konkrete Standort innerhalb des Betriebes.\n\nNur so lassen sich Inventarlisten eindeutig mit den Verträgen der Banken, Leasinggesellschaften und Lieferanten abgleichen.' },
      { ueberschrift: 'Verwertung im Einvernehmen mit den Gläubigern', text: 'Oftmals ist es auch im Interesse der Sicherungsgutgläubigen (z. B. Kreditinstitute), die Verwertung nicht selbst durchzuführen, sondern den Verwalter oder spezialisierte Dienstleister damit zu beauftragen. Durch Bündelung der Güter lassen sich meist deutlich höhere Erlöse erzielen als bei einzelnen Notverkäufen.' },
      { ueberschrift: 'Fazit', text: 'Die lückenlose Aufarbeitung von Fremdrechten schützt vor rechtlichen Risiken und schafft die Voraussetzung für eine zügige, einvernehmliche und ertragreiche Verwertung aller Vermögenswerte.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
  {
    slug: 'uebertragende-sanierung-wie-zielgerichtete-vermarktung-industriestandorte-sichert',
    kategorie: 'Fachbeitrag',
    datum: '13.03.2026',
    titel: 'Übertragende Sanierung: Wie zielgerichtete Vermarktung Industriestandorte sichert',
    anriss:
      'Der Verkauf von Vermögenswerten im Rahmen einer übertragenden Sanierung ermöglicht den Erhalt von Arbeitsplätzen. Wie ein strukturierter M&A- und Verwertungsprozess abläuft.',
    einleitung:
      'Wenn eine Sanierung des Rechtsträgers über einen Insolvenzplan nicht möglich oder nicht sinnvoll ist, bietet die übertragende Sanierung (Distressed M&A) oft den besten Ausweg.\n\nDabei werden die werthaltigen Wirtschaftsgüter – von den Produktionsanlagen über Verträge bis zum Kundenstamm – auf einen neuen Investor übertragen, während die Schulden beim bisherigen Rechtsträger verbleiben.',
    abschnitte: [
      { ueberschrift: 'Die Bündelung von Anlagevermögen und Know-how', text: 'Damit ein Investor einen Betriebsteil oder Standort übernimmt, muss das Gesamtpaket stimmen. Die technischen Anlagen, Maschinen und Fahrzeuge müssen einsatzbereit, rechtlich geklärt und transparent bewertet sein.\n\nEine professionelle Aufbereitung der Dokumentation erhöht das Vertrauen potenzieller Käufer und beschleunigt den Prüfungsprozess (Due Diligence) erheblich.' },
      { ueberschrift: 'Internationale und zielgruppengenaue Vermarktung', text: 'Die Zeiten, in denen eine Sanierung nur regional ausgeschrieben wurde, sind vorbei. Moderne Verwertungsprozesse sprechen gezielt Branchenteilnehmer, Mitbewerber und strategische Investoren auf nationaler und internationaler Ebene an.\n\nEine strukturierte Ansprache sorgt für Wettbewerb unter den Bietern, was sich positiv auf die Verwertungsquote und somit auf die Gläubigerbefriedigung auswirkt.' },
      { ueberschrift: 'Nachvollziehbarkeit für Gläubigerausschuss und Gericht', text: 'Jeder Schritt im Vermarktungsprozess muss nachvollziehbar dokumentiert werden. Der Insolvenzverwalter muss gegenüber dem Gericht und dem Gläubigerausschuss belegen können, dass der gewählte Verwertungsweg das bestmögliche Ergebnis erzielt hat.' },
      { ueberschrift: 'Fazit', text: 'Die übertragende Sanierung verbindet den Erhalt industrieller Substanz mit optimaler Gläubigerbefriedigung. Ein strukturierter, hochgradig transparenter Vermarktungsprozess bildet hierfür das Fundament.' },
    ],
    hinweis: 'Dieser Beitrag dient ausschließlich der allgemeinen Information und ersetzt keine individuelle rechtliche oder wirtschaftliche Beratung.',
  },
] as const

/** Zusammengesetzte Adresszeile "PLZ Ort" – Komfort-Helfer. */
export const KANZLEI_ORT = `${KANZLEI.adresse.plz} ${KANZLEI.adresse.ort}`
