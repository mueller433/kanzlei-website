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

/**
 * Beispiel-Beiträge für /aktuelles (Platzhalter).
 * Datum bewusst als "Datum folgt" – keine erfundenen Veröffentlichungsdaten.
 */
export const NEWS_BEITRAEGE = [
  {
    kategorie: 'Fachbeitrag',
    datum: 'Datum folgt',
    titel: 'Eigenverwaltung als Chance für den Mittelstand',
    anriss:
      'Wann sich das Eigenverwaltungsverfahren für Unternehmen eignet und welche Voraussetzungen erfüllt sein müssen – ein Überblick über Möglichkeiten und Grenzen.',
  },
  {
    kategorie: 'Meldung',
    datum: 'Datum folgt',
    titel: 'Neue Positionen im Verwertungskatalog',
    anriss:
      'In unserem Verwertungskatalog stehen regelmäßig neue Vermögenswerte aus laufenden Verfahren zur Verfügung. Ein Blick auf die aktuellen Kategorien lohnt sich.',
  },
  {
    kategorie: 'Fachbeitrag',
    datum: 'Datum folgt',
    titel: 'Fristen im Insolvenzverfahren richtig einordnen',
    anriss:
      'Von der Antragspflicht bis zur Forderungsanmeldung: Welche Fristen für Geschäftsführung und Gläubiger besonders relevant sind – und warum frühes Handeln zählt.',
  },
  {
    kategorie: 'Meldung',
    datum: 'Datum folgt',
    titel: 'Restrukturierung: Frühzeitigkeit entscheidet',
    anriss:
      'Warum der Handlungsspielraum bei Sanierungen mit jeder Woche schrumpft und wie eine strukturierte Vorbereitung die Erfolgsaussichten deutlich erhöht.',
  },
] as const

/** Zusammengesetzte Adresszeile "PLZ Ort" – Komfort-Helfer. */
export const KANZLEI_ORT = `${KANZLEI.adresse.plz} ${KANZLEI.adresse.ort}`
