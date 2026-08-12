/**
 * ============================================================================
 *  ZENTRALE PLATZHALTERDATEN – VOR VERÖFFENTLICHUNG ERSETZEN
 * ============================================================================
 *
 * ACHTUNG: Kanzleiname, Anschrift, Telefon, E-Mail sowie die Beispiel-
 * Beiträge auf /aktuelles sind FREI ERFUNDENE PLATZHALTER.
 *
 * Sie sind bewusst an genau EINER Stelle gebündelt, damit sie später an
 * einem einzigen Ort durch die echten, verifizierten Kanzleidaten ersetzt
 * werden können. Header, Footer, Startseite, /kontakt und /aktuelles beziehen
 * ihre Angaben ausschließlich aus dieser Datei.
 *
 * NICHT durch andere erfundene Daten ersetzen – ausschließlich durch echte,
 * von der Kanzlei bestätigte Angaben.
 *
 * Das TEAM (siehe unten) ist davon ausgenommen: Namen, Rollen und
 * Porträtfotos sind ECHTE, bereitgestellte Daten – keine Platzhalter.
 * ============================================================================
 */

/** Stammdaten der Kanzlei (Platzhalter). */
export const KANZLEI = {
  /** Vollständiger Kanzleiname. */
  name: 'Müller & Partner',
  /** Kürzel für das Logo-Signet. */
  kuerzel: 'MP',
  /** Ergänzender Tätigkeitszusatz unter dem Namen. */
  zusatz: 'Insolvenzverwaltung',
  /** Kurzbeschreibung der Tätigkeitsfelder (für Footer-Zeile). */
  taetigkeit: 'Rechtsanwaltskanzlei · Insolvenzverwaltung · Restrukturierung',
  adresse: {
    strasse: 'Musterstraße 12',
    plz: '10115',
    ort: 'Berlin',
  },
  telefon: {
    /** Anzeigeform der Telefonnummer. */
    anzeige: '+49 30 000 000 00',
    /** tel:-Link (ohne Leerzeichen). */
    href: 'tel:+493000000000',
  },
  email: {
    anzeige: 'kontakt@mueller-partner.de',
    href: 'mailto:kontakt@mueller-partner.de',
  },
} as const

/**
 * Team – ECHTE Mitarbeiterdaten (keine Platzhalter).
 *
 * Name und Rolle sind unverändert aus den Dateinamen der bereitgestellten
 * Porträtfotos übernommen. Es werden bewusst KEINE zusätzlichen Titel,
 * Fachanwaltsbezeichnungen oder Werdegänge/Biografien ergänzt.
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
    rolle: 'Rechtsanwalt Insolvenzverfahren',
    bild: '/team/andreas-schmidt.jpg',
    initialen: 'AS',
  },
  {
    name: 'Andrea Kloser',
    rolle: 'Rechtsanwältin',
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
