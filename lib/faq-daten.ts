/**
 * Zentrale Inhaltsquelle für die FAQ-Funktion (Startseite-Teaser + /faq).
 * Reine statische Inhalte – keine Payload-Collection, keine Datenbankanbindung.
 */

export type FaqEintrag = {
  /** Eindeutige, projektweite ID (z. B. für Anchor-Links und React-Keys). */
  id: string
  frage: string
  /** Antwort als Liste von Absätzen, damit mehrteilige Antworten lesbar bleiben. */
  antwort: string[]
}

export type FaqKategorie = {
  slug: string
  titel: string
  eintraege: FaqEintrag[]
}

export const FAQ_KATEGORIEN: FaqKategorie[] = [
  {
    slug: 'allgemeine-fragen',
    titel: 'Allgemeine Fragen',
    eintraege: [
      {
        id: 'was-macht-dpss',
        frage: 'Was macht DPSS Management?',
        antwort: [
          'DPSS Management ist im Bereich der Verwertung und Vermarktung von Maschinen, Fahrzeugen, Betriebsausstattung, Warenbeständen und weiteren Wirtschaftsgütern tätig. Wir bieten ausgewählte Positionen über unseren Verwertungskatalog zum Kauf an und begleiten den Verkaufsprozess von der Anfrage bis zur Abwicklung und Abholung.',
        ],
      },
      {
        id: 'preise-inkl-mwst',
        frage: 'Sind die angegebenen Preise inklusive Mehrwertsteuer?',
        antwort: [
          'Die Preisangaben im Katalog werden entsprechend den jeweiligen Verkaufsbedingungen ausgewiesen. Bitte beachten Sie insbesondere die Angaben zur Mehrwertsteuer und Provision bei der jeweiligen Position.',
          'Der endgültige Rechnungsbetrag ergibt sich aus dem jeweiligen Angebot und der ausgestellten Rechnung.',
        ],
      },
      {
        id: 'zzgl-provision',
        frage: 'Was bedeutet „zzgl. Provision“?',
        antwort: [
          'Bei einigen Positionen wird zusätzlich zum angegebenen Kaufpreis eine Provision in Höhe von 10 % berechnet.',
          'Auf den Kaufpreis und die Provision kann zusätzlich die gesetzliche Mehrwertsteuer anfallen. Die genauen Kosten werden in der jeweiligen Angebots- bzw. Rechnungsstellung ausgewiesen.',
        ],
      },
      {
        id: 'zusaetzliche-kosten',
        frage: 'Welche zusätzlichen Kosten können beim Kauf entstehen?',
        antwort: [
          'Neben dem Kaufpreis können je nach Position beispielsweise Provision, gesetzliche Mehrwertsteuer sowie Kosten für Transport, Verladung oder weitere vereinbarte Leistungen entstehen.',
          'Welche Kosten konkret anfallen, hängt von der jeweiligen Position und den angegebenen Verkaufsbedingungen ab.',
        ],
      },
      {
        id: 'zahlungsarten',
        frage: 'Welche Zahlungsarten werden akzeptiert?',
        antwort: [
          'Die Zahlung erfolgt grundsätzlich per Überweisung.',
          'Eine Barzahlung ist nicht möglich. Die Zahlungsinformationen und der zu zahlende Gesamtbetrag werden mit der Rechnung mitgeteilt.',
        ],
      },
      {
        id: 'rechnung-faellig',
        frage: 'Wann ist die Rechnung fällig?',
        antwort: [
          'Der Rechnungsbetrag ist unmittelbar nach Erhalt der Rechnung vollständig zur Zahlung fällig.',
          'Die Ware wird erst nach vollständigem Zahlungseingang zur Abholung freigegeben.',
        ],
      },
      {
        id: 'rueckgaberecht',
        frage: 'Gibt es ein Rückgaberecht?',
        antwort: [
          'Die Rückgabe- bzw. Widerrufsmöglichkeiten richten sich nach den jeweils geltenden gesetzlichen Bestimmungen sowie den konkreten Verkaufsbedingungen.',
          'Da sich diese je nach Käufer, Position und Art des Geschäfts unterscheiden können, sollten die jeweiligen Bedingungen vor dem Kauf geprüft werden.',
        ],
      },
      {
        id: 'differenzbesteuerung',
        frage: 'Was bedeutet „Differenzbesteuerung: Nein“?',
        antwort: [
          'Die Mehrwertsteuer wird entsprechend den für die Position geltenden steuerlichen Vorgaben ausgewiesen. Die konkrete steuerliche Behandlung ist der jeweiligen Rechnung zu entnehmen.',
        ],
      },
    ],
  },
  {
    slug: 'verwertung-verkauf',
    titel: 'Verwertung & Verkauf',
    eintraege: [
      {
        id: 'besichtigung',
        frage: 'Kann ich eine Position besichtigen?',
        antwort: [
          'Ja. Eine Besichtigung ist nach vorheriger Terminvereinbarung grundsätzlich möglich, sofern dies bei der jeweiligen Position vorgesehen bzw. organisatorisch möglich ist.',
          'Gerade bei gebrauchten, ungeprüften oder beschädigten Artikeln empfehlen wir eine vorherige Besichtigung. So können Sie sich selbst einen Eindruck vom Zustand, Umfang und der Vollständigkeit der angebotenen Ware verschaffen.',
          'Bitte kontaktieren Sie uns zur Vereinbarung eines Besichtigungstermins.',
        ],
      },
      {
        id: 'position-reserviert-verkauft',
        frage: 'Was passiert, wenn eine Position bereits reserviert oder verkauft ist?',
        antwort: [
          'Ist eine Position bereits reserviert oder verkauft, steht sie grundsätzlich nicht mehr für einen regulären Kauf zur Verfügung.',
          'Sollte die Reservierung aufgehoben werden oder der Verkauf nicht zustande kommen, kann die Position gegebenenfalls wieder verfügbar werden. Bei Interesse können Sie uns daher gerne kontaktieren und sich über den aktuellen Status informieren.',
          'Eine verbindliche Reservierung oder Verfügbarkeit kann ausschließlich durch DPSS Management bestätigt werden.',
        ],
      },
      {
        id: 'zustand-artikel',
        frage: 'In welchem Zustand befinden sich die angebotenen Artikel?',
        antwort: [
          'Der Zustand kann je nach Position erheblich variieren. Im Katalog wird der jeweilige Zustand möglichst konkret beschrieben, beispielsweise als neu, ungenutzt, gebraucht, geprüft oder ungeprüft.',
          'Zusätzlich stellen wir, soweit vorhanden, Bilder und technische Informationen zur Verfügung.',
        ],
      },
      {
        id: 'maschinen-geprueft',
        frage: 'Sind die Maschinen geprüft und funktionsfähig?',
        antwort: [
          'Das hängt von der jeweiligen Position ab. Bei geprüften Maschinen wird dies ausdrücklich in der Beschreibung angegeben.',
          'Bei ungeprüften Artikeln kann keine Funktionsfähigkeit zugesichert werden. Wir empfehlen insbesondere bei gebrauchten oder ungeprüften Maschinen eine vorherige Besichtigung.',
        ],
      },
      {
        id: 'gebraucht-ungeprueft',
        frage: 'Was bedeutet „gebraucht und ungeprüft“?',
        antwort: [
          'Die Bezeichnung „gebraucht und ungeprüft“ bedeutet, dass die betreffende Maschine oder der Artikel nicht auf seine vollständige Funktionsfähigkeit geprüft wurde.',
          'Es können daher Gebrauchsspuren, Beschädigungen, fehlende Komponenten oder technische Mängel vorhanden sein.',
          'Eine Besichtigung vor dem Kauf wird bei solchen Positionen ausdrücklich empfohlen.',
        ],
      },
      {
        id: 'transport-verantwortung',
        frage: 'Wer ist für den Transport verantwortlich?',
        antwort: [
          'Sofern nicht ausdrücklich anders vereinbart, ist der Käufer für die Organisation und Durchführung des Transports verantwortlich.',
          'Dazu gehört auch die Auswahl eines geeigneten Transportmittels und die Einhaltung der erforderlichen Transportbedingungen.',
        ],
      },
      {
        id: 'verladung-vor-ort',
        frage: 'Wird die Ware vor Ort verladen?',
        antwort: [
          'Das hängt von der jeweiligen Position und den angegebenen Lieferbedingungen ab.',
          'Bei Artikeln mit dem Hinweis „Verladung auf LKW“ ist eine Verladung entsprechend den vor Ort vorhandenen Möglichkeiten vorgesehen. Die Details sollten vor der Abholung abgestimmt werden.',
        ],
      },
      {
        id: 'abholort',
        frage: 'Wo kann ich die gekaufte Position abholen?',
        antwort: [
          'Der genaue Abholort wird Ihnen im Rahmen der Kaufabwicklung mitgeteilt.',
          'Je nach Position kann sich der Standort unterscheiden. Bitte beachten Sie hierzu die Angaben in der jeweiligen Artikelbeschreibung und auf der Rechnung.',
        ],
      },
      {
        id: 'abholung-freigabe',
        frage: 'Wann wird die Ware zur Abholung freigegeben?',
        antwort: [
          'Die Abholung ist möglich, sobald der vollständige Rechnungsbetrag auf unserem Konto eingegangen und der Zahlungseingang bestätigt wurde.',
          'Zusätzlich muss vorab ein Abholtermin vereinbart werden.',
        ],
      },
      {
        id: 'verkauf-abgebildeter-zustand',
        frage: 'Was bedeutet „Verkauf im abgebildeten Zustand“?',
        antwort: [
          '„Verkauf im abgebildeten Zustand“ bedeutet, dass der Artikel entsprechend dem zum Zeitpunkt des Verkaufs vorhandenen Zustand angeboten wird.',
          'Bilder und Beschreibung sollen den Zustand möglichst transparent darstellen. Bei gebrauchten oder ungeprüften Artikeln können alters- und nutzungsbedingte Gebrauchsspuren sowie nicht erkennbare Mängel vorhanden sein.',
        ],
      },
      {
        id: 'reservierung-moeglich',
        frage: 'Kann ich eine Position reservieren lassen?',
        antwort: [
          'Eine Reservierung kann je nach Position und aktueller Verfügbarkeit auf Anfrage möglich sein.',
          'Eine Reservierung ist erst verbindlich, wenn sie von DPSS Management ausdrücklich bestätigt wurde.',
        ],
      },
      {
        id: 'reservierung-dauer',
        frage: 'Wie lange bleibt eine Reservierung bestehen?',
        antwort: [
          'Die Dauer einer Reservierung kann je nach Position und individueller Vereinbarung unterschiedlich sein.',
          'Die konkrete Reservierungsdauer wird Ihnen bei der Bestätigung der Reservierung mitgeteilt.',
        ],
      },
    ],
  },
  {
    slug: 'katalog',
    titel: 'Katalog',
    eintraege: [
      {
        id: 'kauf-aus-katalog',
        frage: 'Wie funktioniert der Kauf einer Position aus dem Katalog?',
        antwort: [
          'Wenn Sie sich für eine Position aus unserem Katalog interessieren, können Sie uns über die angegebenen Kontaktmöglichkeiten eine Anfrage senden. Bitte geben Sie dabei möglichst die Artikel- bzw. Positionsnummer des gewünschten Artikels an.',
          'Wir prüfen anschließend die Verfügbarkeit und teilen Ihnen die weiteren Schritte sowie den aktuellen Kaufpreis und die jeweiligen Zahlungs- und Abholbedingungen mit.',
          'Nach erfolgreicher Einigung und Rechnungsstellung erfolgt die Zahlung per Überweisung. Die Abholung ist nach vollständigem Zahlungseingang möglich.',
        ],
      },
      {
        id: 'preis-auf-anfrage',
        frage: 'Was bedeutet „Preis auf Anfrage“?',
        antwort: [
          'Bei der Kennzeichnung „Preis auf Anfrage“ ist für die jeweilige Position kein öffentlich angezeigter Festpreis hinterlegt.',
          'Bei Interesse können Sie uns direkt kontaktieren und die entsprechende Artikel- bzw. Positionsnummer angeben. Wir informieren Sie über den aktuellen Preis und die weiteren Kaufbedingungen.',
        ],
      },
      {
        id: 'verfuegbarkeit-pruefen',
        frage: 'Wie erfahre ich, ob eine Position noch verfügbar ist?',
        antwort: [
          'Am zuverlässigsten ist eine direkte Anfrage unter Angabe der Artikel- bzw. Positionsnummer.',
          'Wir prüfen anschließend den aktuellen Status und informieren Sie, ob die Position noch verfügbar, reserviert oder bereits verkauft ist.',
        ],
      },
    ],
  },
  {
    slug: 'sofortkauf',
    titel: 'Sofortkauf',
    eintraege: [
      {
        id: 'sofortkauf-ablauf',
        frage: 'Wie funktioniert der Sofortkauf?',
        antwort: [
          'Bei Artikeln, die mit einer Sofortkauf-Option angeboten werden, kann der Kauf direkt über den vorgesehenen Ablauf angefragt bzw. eingeleitet werden.',
          'Nach Eingang der Anfrage werden die erforderlichen Angaben und Unterlagen geprüft. Anschließend erhalten Sie die weiteren Informationen zur Kaufabwicklung und gegebenenfalls die Rechnung.',
          'Die Ware wird nach vollständiger Zahlung zur Abholung freigegeben.',
        ],
      },
      {
        id: 'sofortkauf-wer',
        frage: 'Wer kann einen Sofortkauf durchführen?',
        antwort: [
          'Ein Sofortkauf kann grundsätzlich von Privatpersonen sowie Unternehmen angefragt werden, sofern die jeweiligen Verkaufsbedingungen erfüllt sind.',
          'Bei bestimmten Positionen können zusätzliche Anforderungen oder Nachweise erforderlich sein.',
        ],
      },
      {
        id: 'sofortkauf-unterlagen',
        frage: 'Welche Unterlagen werden beim Sofortkauf benötigt?',
        antwort: [
          'Für die Abwicklung eines Sofortkaufs können je nach Käufer und Art der Position bestimmte Angaben und Unterlagen erforderlich sein.',
          'In der Regel benötigen wir die vollständigen Kontaktdaten des Käufers sowie einen geeigneten Identitäts- bzw. Unternehmensnachweis. Bei Unternehmen können beispielsweise Angaben zum Unternehmen und ein entsprechender Nachweis erforderlich sein.',
          'Welche Unterlagen im Einzelfall benötigt werden, teilen wir Ihnen im Rahmen der Kaufabwicklung mit.',
        ],
      },
      {
        id: 'identifikation-grund',
        frage: 'Warum ist eine Identifikation erforderlich?',
        antwort: [
          'Die Identifikation dient der sicheren und nachvollziehbaren Abwicklung des Verkaufs. Sie hilft dabei, die Identität des Käufers eindeutig festzustellen und Missbrauch sowie betrügerische Transaktionen zu vermeiden.',
          'Je nach Art des Geschäfts und Käufer können daher entsprechende Identitäts- oder Unternehmensnachweise erforderlich sein.',
        ],
      },
      {
        id: 'sofortkauf-pruefdauer',
        frage: 'Wie lange dauert die Prüfung meiner Unterlagen?',
        antwort: [
          'Die Bearbeitungsdauer hängt davon ab, ob alle erforderlichen Angaben und Unterlagen vollständig vorliegen.',
          'Sobald die Prüfung abgeschlossen ist, informieren wir Sie über die weiteren Schritte. Bei vollständigen Unterlagen kann die Bearbeitung entsprechend schneller erfolgen.',
        ],
      },
    ],
  },
]

/** Alle Einträge aus allen Kategorien, flach – Basis für Suche/Auswahl per ID. */
const ALLE_FAQ_EINTRAEGE: FaqEintrag[] = FAQ_KATEGORIEN.flatMap((kategorie) => kategorie.eintraege)

/** IDs der 5 Fragen, die als kompakter Teaser auf der Startseite erscheinen. */
export const STARTSEITE_FAQ_IDS = [
  'was-macht-dpss',
  'kauf-aus-katalog',
  'sofortkauf-ablauf',
  'besichtigung',
  'sofortkauf-unterlagen',
] as const

export function findeFaqEintraege(ids: readonly string[]): FaqEintrag[] {
  return ids
    .map((id) => ALLE_FAQ_EINTRAEGE.find((eintrag) => eintrag.id === id))
    .filter((eintrag): eintrag is FaqEintrag => Boolean(eintrag))
}
