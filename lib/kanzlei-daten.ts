/**
 * ============================================================================
 *  ZENTRALE PLATZHALTERDATEN – VOR VERÖFFENTLICHUNG ERSETZEN
 * ============================================================================
 *
 * ACHTUNG: Sämtliche hier hinterlegten Angaben – Kanzleiname, Anschrift,
 * Telefon, E-Mail, die Ansprechpartner-Profile sowie die Beispiel-Beiträge
 * auf /aktuelles – sind FREI ERFUNDENE PLATZHALTER.
 *
 * Sie sind bewusst an genau EINER Stelle gebündelt, damit sie später an
 * einem einzigen Ort durch die echten, verifizierten Kanzleidaten ersetzt
 * werden können. Header, Footer, Startseite, /kontakt und /aktuelles beziehen
 * ihre Angaben ausschließlich aus dieser Datei.
 *
 * NICHT durch andere erfundene Daten ersetzen – ausschließlich durch echte,
 * von der Kanzlei bestätigte Angaben.
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
 * Ansprechpartner-Profile (Platzhalter).
 * `beschreibung` wird auf der Startseite genutzt, auf /kontakt nur Name + Rolle.
 */
export const ANSPRECHPARTNER = [
  {
    initialen: 'NN',
    name: 'Name folgt',
    rolle: 'Insolvenzverwalter · Rechtsanwalt',
    beschreibung:
      'Platzhalterprofil – die tatsächlichen Angaben zu Ausbildung, Schwerpunkten und Werdegang werden zu einem späteren Zeitpunkt ergänzt.',
  },
  {
    initialen: 'NN',
    name: 'Name folgt',
    rolle: 'Fachanwältin für Insolvenz- und Sanierungsrecht',
    beschreibung:
      'Platzhalterprofil – die tatsächlichen Angaben zu Ausbildung, Schwerpunkten und Werdegang werden zu einem späteren Zeitpunkt ergänzt.',
  },
] as const

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
