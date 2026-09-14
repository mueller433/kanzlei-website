import Link from 'next/link'

import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'

export const metadata = {
  title: 'AGB | DPSS Management GmbH',
  description:
    'Allgemeine Geschäftsbedingungen der DPSS Management GmbH für Kaufanfragen und die Verwertung von Vermögenswerten.',
}

const sections = [
  {
    title: 'Geltungsbereich',
    paragraphs: [
      'Diese Allgemeinen Geschäftsbedingungen gelten für Verträge und vorvertragliche Anfragen über die Verwertung und den Verkauf von Maschinen, technischen Anlagen, Betriebsausstattung, Warenbeständen, Fahrzeugen und sonstigen Vermögenswerten durch die DPSS Management GmbH, Herzberger Landstr. 63, 37085 Göttingen.',
      'DPSS kann je nach Angebot selbst Verkäuferin sein oder im Auftrag eines Dritten handeln. Die konkrete Verkäuferrolle und etwaige Zustimmungsvorbehalte ergeben sich aus dem individuellen Angebot, der Auftragsbestätigung oder dem Kaufvertrag.',
      'Individuelle Vereinbarungen haben Vorrang. Zwingende gesetzliche Rechte, insbesondere von Verbrauchern, bleiben unberührt.',
    ],
  },
  {
    title: 'Katalogangaben und Verfügbarkeit',
    paragraphs: [
      'Darstellungen im Online-Katalog, Fotos, Beschreibungen, technische Daten, Mengen- und Preisangaben dienen zunächst der Information. Sie stellen kein verbindliches Angebot dar, soweit sie nicht ausdrücklich als solches bezeichnet sind.',
      'Positionen können zwischenzeitlich reserviert, anderweitig verwertet oder verkauft werden. DPSS prüft die Verfügbarkeit nach Eingang einer Anfrage. Irrtümer und Aktualisierungsverzögerungen bleiben vorbehalten, soweit gesetzlich zulässig.',
    ],
  },
  {
    title: 'Kaufanfrage und Vertragsschluss',
    paragraphs: [
      'Der Button „Sofort kaufen“ öffnet ein Formular zur Übermittlung einer Kaufanfrage. Das Absenden des Formulars und die automatische Eingangsbestätigung führen noch nicht zum Abschluss eines Kaufvertrags.',
      'Ein Vertrag kommt erst durch eine ausdrückliche Auftragsbestätigung, die Annahme eines Kaufangebots oder eine andere im konkreten Angebot bestimmte Erklärung zustande. DPSS ist berechtigt, Anfragen insbesondere im Hinblick auf Verfügbarkeit, Käuferdaten und Verwertungsbedingungen zu prüfen.',
    ],
  },
  {
    title: 'Identifikation und Nachweise',
    paragraphs: [
      'Zur Prüfung einer Kaufanfrage kann DPSS erforderliche Identitäts- und bei gewerblichen Käufern Unternehmensnachweise verlangen. Die Angaben müssen vollständig, richtig und aktuell sein.',
      'Nicht erforderliche Angaben auf Nachweisen sollen – soweit rechtlich und für die Prüfung möglich – geschwärzt werden. Einzelheiten zur Datenverarbeitung ergeben sich aus der Datenschutzerklärung.',
    ],
    link: { href: '/datenschutz', label: 'Zur Datenschutzerklärung' },
  },
  {
    title: 'Beschreibung und Zustand',
    paragraphs: [
      'Beschreibungen, Fotos und technische Angaben werden nach bestem Wissen erstellt. Bei gebrauchten Vermögenswerten sind alters-, gebrauchs- und standortbedingte Spuren sowie Abweichungen möglich.',
      'Maßgeblich für eine vereinbarte Beschaffenheit sind ausschließlich die ausdrücklichen Angaben im individuellen Angebot oder Vertrag. Der Käufer ist dafür verantwortlich, die Eignung des Vermögenswerts für seinen vorgesehenen Zweck zu prüfen.',
    ],
  },
  {
    title: 'Preise, Umsatzsteuer und Nebenkosten',
    paragraphs: [
      'Maßgeblich ist der im jeweiligen Angebot oder Vertrag ausgewiesene Preis. Ob Umsatzsteuer enthalten ist oder gesondert ausgewiesen wird, ergibt sich aus der konkreten Preisangabe und der Rechnung.',
      'Provisionen, Aufgelder, Demontage-, Verlade-, Transport- oder sonstige Nebenkosten fallen nur an, wenn sie im Angebot oder Vertrag ausgewiesen beziehungsweise vereinbart sind.',
    ],
  },
  {
    title: 'Zahlung',
    paragraphs: [
      'Soweit im Angebot oder Vertrag nichts anderes vereinbart ist, ist der Rechnungsbetrag unmittelbar nach Erhalt der Rechnung ohne Abzug per Überweisung auf das angegebene Konto zu zahlen. Barzahlungen werden nicht angenommen.',
      'Eine Zahlung gilt erst mit vollständiger Gutschrift auf dem angegebenen Konto als erfolgt. Bei Zahlungsverzug gelten die gesetzlichen Vorschriften.',
    ],
  },
  {
    title: 'Besichtigung, Termin und Abholung',
    paragraphs: [
      'Besichtigung und Abholung sind erst nach vollständigem Zahlungseingang und ausschließlich nach vorheriger Terminvereinbarung möglich, soweit im individuellen Vertrag nichts Abweichendes festgelegt ist.',
      'Der Käufer organisiert und trägt die Kosten von Demontage, Verladung und Transport, sofern nichts anderes vereinbart wurde. Er hat geeignetes Personal, Fahrzeuge, Hilfsmittel, Genehmigungen und Versicherungen bereitzustellen sowie die Zugangs- und Sicherheitsvorgaben am Standort einzuhalten.',
    ],
  },
  {
    title: 'Übergabe und Gefahrübergang',
    paragraphs: [
      'Übergabeort und Abholzeitraum ergeben sich aus dem Angebot oder Vertrag. Die Gefahr geht nach den gesetzlichen Vorschriften und den im konkreten Vertrag getroffenen Vereinbarungen auf den Käufer über.',
      'Verzögert der Käufer eine vereinbarte Abholung, können nach vorheriger Mitteilung angemessene Stand-, Lager- oder zusätzliche Bearbeitungskosten berechnet werden, soweit die gesetzlichen Voraussetzungen vorliegen.',
    ],
  },
  {
    title: 'Eigentumsvorbehalt',
    paragraphs: [
      'Soweit wirksam vereinbart, bleibt der Vermögenswert bis zur vollständigen Zahlung des Kaufpreises und aller vereinbarten Nebenforderungen im Eigentum des jeweiligen Verkäufers.',
      'Vor Eigentumsübergang darf der Käufer den Vermögenswert ohne Zustimmung weder verpfänden noch sicherungsübereignen oder anderweitig darüber verfügen.',
    ],
  },
  {
    title: 'Sachmängel und Gewährleistung',
    paragraphs: [
      'Für Sach- und Rechtsmängel gelten die gesetzlichen Vorschriften, soweit im individuellen Vertrag keine gesetzlich zulässige abweichende Vereinbarung getroffen wird.',
      'Gegenüber Unternehmern kann die Haftung für Sachmängel bei gebrauchten Vermögenswerten im konkreten Vertrag beschränkt oder ausgeschlossen werden. Gegenüber Verbrauchern bleiben zwingende Gewährleistungsrechte unberührt.',
    ],
  },
  {
    title: 'Haftung',
    paragraphs: [
      'DPSS haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie in Fällen zwingender gesetzlicher Haftung.',
      'Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht ist die Haftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Vertragsdurchführung erst ermöglicht und auf deren Einhaltung die andere Partei regelmäßig vertrauen darf.',
    ],
  },
  {
    title: 'Zahlungsverzug und Nichtabnahme',
    paragraphs: [
      'Bei Zahlungsverzug, Nichtabnahme oder einer sonstigen erheblichen Pflichtverletzung stehen der berechtigten Vertragspartei die gesetzlichen Rechte zu. Hierzu können insbesondere Rücktritt und Schadensersatz gehören.',
      'Nach wirksamem Rücktritt kann der Vermögenswert anderweitig verwertet werden. Die Abrechnung bereits geleisteter Zahlungen und eines nachweisbaren Schadens richtet sich nach den gesetzlichen Vorschriften.',
    ],
  },
  {
    title: 'Verbraucher und Widerrufsrecht',
    paragraphs: [
      'Verbraucher im Sinne des § 13 BGB erhalten die gesetzlich erforderlichen Informationen, wenn ein Vertrag unter ausschließlicher Verwendung von Fernkommunikationsmitteln oder außerhalb von Geschäftsräumen geschlossen wird.',
      'Soweit ein gesetzliches Widerrufsrecht besteht, wird hierüber einschließlich Muster-Widerrufsformular gesondert belehrt. Gesetzliche Ausnahmen vom Widerrufsrecht bleiben unberührt. Diese AGB ersetzen keine im Einzelfall erforderliche Widerrufsbelehrung.',
    ],
  },
  {
    title: 'Technische Verfügbarkeit',
    paragraphs: [
      'Wir betreiben die Website mit angemessener Sorgfalt, schulden jedoch keine jederzeit unterbrechungsfreie Verfügbarkeit. Wartung, technische Störungen, höhere Gewalt oder Störungen außerhalb unseres Einflussbereichs können den Zugriff vorübergehend beeinträchtigen.',
      'Ist eine elektronische Übermittlung nicht möglich, kann DPSS über die im Impressum genannten Kontaktdaten erreicht werden.',
    ],
  },
  {
    title: 'Datenschutz',
    paragraphs: [
      'Informationen zur Verarbeitung personenbezogener Daten, insbesondere bei Kontakt- und Kaufanfragen sowie beim Hochladen von Nachweisen, finden Sie in unserer Datenschutzerklärung.',
    ],
    link: { href: '/datenschutz', label: 'Datenschutzerklärung öffnen' },
  },
  {
    title: 'Verbraucherstreitbeilegung',
    paragraphs: [
      'Die DPSS Management GmbH ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    title: 'Rechtswahl, Gerichtsstand und Schlussbestimmungen',
    paragraphs: [
      'Es gilt deutsches Recht. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht der Schutz zwingender Vorschriften des Staates eingeschränkt wird, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat.',
      'Für Unternehmer ist, soweit gesetzlich zulässig, der Sitz der DPSS Management GmbH Gerichtsstand. Im Übrigen gelten die gesetzlichen Gerichtsstände.',
      'Sollte eine Bestimmung unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften. Vertragssprache ist Deutsch, soweit nichts anderes vereinbart ist.',
    ],
  },
] as const

export default function AGBPage() {
  return (
    <LegalPageLayout
      titel="Allgemeine Geschäftsbedingungen"
      beschreibung="Regelungen für Kaufanfragen, Vertragsschluss, Zahlung und Abholung von Vermögenswerten."
      current="agb"
      stand="14. September 2026"
    >
      <div className="mb-10 border border-border bg-muted/35 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Das Wichtigste vorab
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground sm:text-base">
          <li>„Sofort kaufen“ übermittelt zunächst eine Kaufanfrage – noch keinen Kaufvertrag.</li>
          <li>Die Zahlung erfolgt ausschließlich per Überweisung.</li>
          <li>Besichtigung und Abholung erfolgen erst nach Zahlungseingang und Terminvereinbarung.</li>
        </ul>
      </div>

      <LegalSections>
        {sections.map((section, index) => (
          <LegalSection
            key={section.title}
            nummer={String(index + 1).padStart(2, '0')}
            titel={section.title}
          >
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {'link' in section && section.link ? (
              <Link href={section.link.href}>{section.link.label}</Link>
            ) : null}
          </LegalSection>
        ))}
      </LegalSections>
    </LegalPageLayout>
  )
}
