import type { CollectionConfig } from 'payload'

export const Posten: CollectionConfig = {
  slug: 'posten',
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'kategorie', 'status', 'preis', 'veroeffentlicht'],
  },
  access: {
    // Öffentlich lesbar, aber nur veröffentlichte Posten anzeigen
    read: ({ req }) => {
      // Eingeloggte Nutzer (DPSS-Mitarbeiter) sehen alles, auch Entwürfe
      if (req.user) return true
      // Öffentliche Besucher sehen nur veröffentlichte Posten
      return {
        veroeffentlicht: {
          equals: true,
        },
      }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'titel',
      type: 'text',
      required: true,
    },
    {
      name: 'beschreibung',
      type: 'richText',
    },
    {
      name: 'kategorie',
      type: 'select',
      required: true,
      options: [
        { label: 'Immobilien', value: 'immobilien' },
        { label: 'Maschinen', value: 'maschinen' },
        { label: 'Fahrzeuge', value: 'fahrzeuge' },
        { label: 'Inventar', value: 'inventar' },
        { label: 'Sonstiges', value: 'sonstiges' },
      ],
    },
    {
      name: 'preis',
      type: 'number',
      admin: {
        description: 'Preis in Euro. Leer lassen, wenn "Preis auf Anfrage" aktiv ist.',
        condition: (data) => !data?.preisAufAnfrage,
      },
    },
    {
      name: 'preisAufAnfrage',
      type: 'checkbox',
      label: 'Preis auf Anfrage',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'verfuegbar',
      options: [
        { label: 'Verfügbar', value: 'verfuegbar' },
        { label: 'Reserviert', value: 'reserviert' },
        { label: 'Verkauft', value: 'verkauft' },
      ],
    },
    {
      name: 'bilder',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'insolvenzverfahren',
      type: 'text',
      admin: {
        description: 'z.B. Aktenzeichen oder Bezeichnung des Verfahrens',
      },
    },
	{
  name: 'zustand',
  type: 'select',
  required: true,
  defaultValue: 'neu',
  options: [
    { label: 'Neu', value: 'neu' },
    { label: 'Gebraucht', value: 'gebraucht' },
    { label: 'Restbestand', value: 'restbestand' },
  ],
},
{
  name: 'kurzspezifikation',
  type: 'text',
  admin: {
    description: 'Ein Satz für die Kartenansicht, z.B. "45 MP Vollformat, 8K RAW Video"',
  },
},
{
  name: 'stueckzahl',
  type: 'number',
  required: true,
  defaultValue: 1,
  admin: {
    description: 'Verfügbare Menge dieser Position',
  },
},
{
  name: 'standort',
  type: 'text',
},
{
  name: 'dokumente',
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  admin: {
    description: 'z.B. Gutachten, Datenblätter, Zustandsprotokolle',
  },
},
    {
      name: 'veroeffentlicht',
      type: 'checkbox',
      label: 'Öffentlich sichtbar',
      defaultValue: false,
      admin: {
        description: 'Nur aktivierte Posten werden auf der öffentlichen Seite angezeigt.',
        position: 'sidebar',
      },
    },
  ],
}
