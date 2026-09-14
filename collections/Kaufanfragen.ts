import type { CollectionConfig } from 'payload'

/**
 * Speichert eingehende Sofortkauf-Anfragen aus dem öffentlichen Katalog.
 *
 * Sicherheitshinweis: Identifikationsdokumente (Ausweiskopien, Firmennachweis
 * etc.) werden HIER BEWUSST NICHT gespeichert — weder als Payload-Upload
 * noch als Relation/Metadaten, und auch nicht in Vercel Blob. Die Dokumente
 * werden ausschließlich serverseitig im Speicher der Server Action gelesen,
 * als E-Mail-Anhang per Resend direkt an DPSS Management gesendet und
 * anschließend verworfen. Diese Collection enthält daher nur die reinen
 * Käufer- und Produktangaben zur Nachverfolgung im Admin.
 *
 * Zugriff: Anfragen werden ausschließlich serverseitig über die Payload
 * Local API angelegt (server action), die die Access-Control standardmäßig
 * umgeht. Die REST/GraphQL-API bleibt für "create" gesperrt, damit niemand
 * von außen direkt Anfragen einschleusen kann. Lesen/Ändern ist nur
 * eingeloggten DPSS-Mitarbeitenden vorbehalten.
 */
export const Kaufanfragen: CollectionConfig = {
  slug: 'kaufanfragen',
  admin: {
    useAsTitle: 'produktTitel',
    defaultColumns: ['produktTitel', 'kaeuferTyp', 'nachname', 'status', 'createdAt'],
    description: 'Eingehende Sofortkauf-Anfragen aus dem öffentlichen Katalog.',
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'produkt',
      type: 'relationship',
      relationTo: 'posten',
      required: true,
    },
    {
      name: 'produktTitel',
      type: 'text',
      required: true,
      admin: { description: 'Schnappschuss des Produkttitels zum Zeitpunkt der Anfrage.' },
    },
    {
      name: 'produktKategorie',
      type: 'text',
    },
    {
      name: 'produktStandort',
      type: 'text',
    },
    {
      name: 'preis',
      type: 'number',
      admin: { description: 'Serverseitig geprüfter, auf volle 100 € aufgerundeter Bruttopreis zum Zeitpunkt der Anfrage. Leer = Preis auf Anfrage.' },
    },
    {
      name: 'kaeuferTyp',
      type: 'select',
      required: true,
      options: [
        { label: 'Privatperson', value: 'privatperson' },
        { label: 'Unternehmen / Gewerbe', value: 'unternehmen' },
      ],
    },
    { name: 'vorname', type: 'text', required: true },
    { name: 'nachname', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telefon', type: 'text', required: true },
    {
      name: 'adresse',
      type: 'group',
      fields: [
        { name: 'strasse', type: 'text', required: true },
        { name: 'hausnummer', type: 'text', required: true },
        { name: 'plz', type: 'text', required: true },
        { name: 'ort', type: 'text', required: true },
        { name: 'land', type: 'text', required: true },
      ],
    },
    { name: 'firma', type: 'text', admin: { description: 'Optionale, allgemeine Firmenangabe (unabhängig vom Käufertyp).' } },
    { name: 'firmenname', type: 'text', admin: { description: 'Nur bei Käufertyp "Unternehmen / Gewerbe".' } },
    { name: 'handelsregisternummer', type: 'text' },
    { name: 'ustIdNr', type: 'text', label: 'USt-IdNr.' },
    {
      name: 'eingereichteDokumente',
      type: 'array',
      label: 'Eingereichte Dokumente (nur Bezeichnung, keine Dateien)',
      admin: {
        description:
          'Nur die Bezeichnung der eingereichten Dokumente zur Nachverfolgung. Die eigentlichen Dateien wurden ausschließlich per E-Mail an DPSS Management gesendet und nirgends gespeichert.',
      },
      fields: [
        { name: 'bezeichnung', type: 'text', required: true },
        { name: 'dateiname', type: 'text', required: true },
      ],
    },
    {
      name: 'identifikationsstatus',
      type: 'select',
      required: true,
      defaultValue: 'eingegangen',
      admin: {
        description: 'Die Dokumente selbst liegen nur als E-Mail-Anhang bei DPSS Management vor, nicht im Admin.',
      },
      options: [
        { label: 'Eingegangen', value: 'eingegangen' },
        { label: 'Unvollständig', value: 'unvollstaendig' },
        { label: 'Geprüft', value: 'geprueft' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'neu',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Neu', value: 'neu' },
        { label: 'Identifikation ausstehend', value: 'identifikation_ausstehend' },
        { label: 'Geprüft', value: 'geprueft' },
        { label: 'Abgelehnt', value: 'abgelehnt' },
        { label: 'Abgeschlossen', value: 'abgeschlossen' },
      ],
    },
  ],
}
