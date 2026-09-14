import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'


export const metadata = {
  title: 'AGB | DPSS Management GmbH',
  description:
    'Allgemeine Geschäftsbedingungen der DPSS Management GmbH für die Verwertung und den Verkauf von Vermögenswerten.',
}

const sections = [
  {
    title: '§ 1 Geltungsbereich und Allgemeines',
    paragraphs: [
      'Diese Allgemeinen Geschäftsbedingungen gelten für Verträge über die Verwertung und den Verkauf von Maschinen, technischen Anlagen, Betriebsausstattung, Warenbeständen, Fahrzeugen und sonstigen Vermögenswerten durch die DPSS Management GmbH, Herzberger Landstr. 63, 37085 Göttingen.',
      'Sie gelten gegenüber Käufern und Interessenten, soweit im jeweiligen Angebot oder Vertrag nichts Abweichendes vereinbart ist. Individuelle Vereinbarungen haben Vorrang. Rechtserhebliche Erklärungen bedürfen der Textform, soweit gesetzlich keine strengere Form vorgeschrieben ist.',
    ],
  },
  {
    title: '§ 2 Angebote und Vertragsschluss',
    paragraphs: [
      'Darstellungen im Online-Katalog, in Exposés, auf der Website oder in sonstigen Unterlagen dienen der Information und stellen nicht automatisch ein verbindliches Angebot dar. Maßgeblich sind die Angaben im jeweiligen Angebot und die dort beschriebene Vertragsmechanik.',
      'Ein Vertrag kommt durch die Annahme eines Kaufangebots, durch eine Auftragsbestätigung oder durch eine sonstige im jeweiligen Angebot bestimmte Erklärung zustande. Die Verkäuferrolle der DPSS Management GmbH sowie etwaige Zustimmungsvorbehalte werden im konkreten Angebot oder Vertrag festgelegt.',
    ],
  },
  {
    title: '§ 3 Beschreibung und Zustand der Vermögenswerte',
    paragraphs: [
      'Beschreibungen, Fotos, technische Angaben, Mengenangaben und sonstige Informationen werden nach bestem Wissen erstellt. Bei gebrauchten Vermögenswerten sind alters- und nutzungsbedingte Gebrauchsspuren sowie Abweichungen möglich.',
      'Der Käufer hat die Angaben und die Eignung des Vermögenswerts für seine Zwecke eigenverantwortlich zu prüfen. Beschaffenheitsvereinbarungen und bekannte Mängel ergeben sich ausschließlich aus dem jeweiligen Angebot, Vertrag und den ausdrücklich vereinbarten Unterlagen.',
    ],
  },
  {
    title: '§ 4 Besichtigung',
    paragraphs: [
      'Eine Besichtigung beziehungsweise Prüfung vor Ort ist erst nach vollständigem Zahlungseingang und nach vorheriger Terminvereinbarung möglich, soweit im jeweiligen Angebot nichts Abweichendes bestimmt ist. Bei Zutritt zum Standort sind die dort geltenden Zugangs- und Sicherheitsvorgaben einzuhalten.',
    ],
  },
  {
    title: '§ 5 Preise und Umsatzsteuer',
    paragraphs: [
      'Der im jeweiligen Angebot ausgewiesene Preis kann neben dem Kaufpreis weitere Kosten, eine Provision oder ein Aufgeld enthalten. Die jeweils anfallenden Beträge und die umsatzsteuerliche Behandlung werden im konkreten Angebot angegeben.',
      'Je nach Vermögenswert und gesetzlicher Voraussetzung kann die Umsatzsteuer gesondert ausgewiesen werden oder eine andere steuerliche Behandlung Anwendung finden. Maßgeblich sind die Angaben im jeweiligen Angebot und in der Rechnung.',
    ],
  },
  {
    title: '§ 6 Zahlungsbedingungen',
    paragraphs: [
      'Die Zahlung ist innerhalb der im Angebot oder Vertrag bestimmten Frist und auf das dort angegebene Konto zu leisten. Soweit nichts anderes vereinbart ist, erfolgt die Übergabe erst nach vollständigem Zahlungseingang.',
      'Bei verspäteter Zahlung gelten die gesetzlichen Folgen. Weitergehende Rechte der jeweils berechtigten Vertragspartei bleiben unberührt.',
    ],
  },
  {
    title: '§ 7 Übergabe und Abholung',
    paragraphs: [
      'Übergabe und Abholung erfolgen am im Angebot bezeichneten Standort und innerhalb des vereinbarten Zeitraums. Der Käufer trägt die Kosten und organisiert den Transport, die Demontage und die Verladung, soweit im Einzelfall nichts anderes vereinbart ist.',
      'Erforderliche Genehmigungen, Hilfsmittel und Versicherungen für Transport und Abholung sind vom Käufer zu beschaffen. Der Gefahrübergang richtet sich nach den gesetzlichen Vorschriften und den Vereinbarungen im konkreten Vertrag.',
    ],
  },
  {
    title: '§ 8 Eigentumsvorbehalt',
    paragraphs: [
      'Das Eigentum am verkauften Vermögenswert geht erst mit vollständiger Zahlung des Kaufpreises und aller vereinbarten Nebenforderungen auf den Käufer über, soweit ein Eigentumsvorbehalt wirksam vereinbart wurde.',
      'Bis zum Eigentumsübergang darf der Käufer den Vermögenswert nicht ohne Zustimmung verpfänden, sicherungsübereignen oder anderweitig darüber verfügen.',
    ],
  },
  {
    title: '§ 9 Gewährleistung und Sachmängelhaftung',
    paragraphs: [
      'Die Rechte des Käufers bei Sach- und Rechtsmängeln richten sich nach den gesetzlichen Vorschriften sowie den ausdrücklich vereinbarten Beschaffenheitsangaben. Bei gebrauchten Vermögenswerten sind Alter, Nutzung und Zustand bei der Bewertung zu berücksichtigen.',
      'Abweichende Vereinbarungen zur Sachmängelhaftung gelten nur, soweit sie gegenüber der jeweiligen Käufergruppe gesetzlich zulässig sind. Zwingende Rechte von Verbrauchern bleiben unberührt.',
    ],
  },
  {
    title: '§ 10 Haftung',
    paragraphs: [
      'Die DPSS Management GmbH haftet nach den gesetzlichen Vorschriften für Schäden aus Vorsatz und grober Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.',
      'Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt. Zwingende gesetzliche Haftung bleibt unberührt.',
    ],
  },
  {
    title: '§ 11 Rücktritt, Nichtabnahme und Zahlungsverzug',
    paragraphs: [
      'Bei Zahlungsverzug, Nichtabnahme oder sonstiger erheblicher Pflichtverletzung stehen der jeweils berechtigten Vertragspartei die gesetzlichen Rechte zu. Dazu können insbesondere Rücktritt, Schadensersatz und die anderweitige Verwertung des Vermögenswerts gehören.',
      'Weitergehende Folgen und eine etwaige Anrechnung bereits geleisteter Zahlungen richten sich nach den gesetzlichen Vorschriften und dem konkreten Vertrag.',
    ],
  },
  {
    title: '§ 12 Online-Verkäufe und Online-Versteigerungen',
    paragraphs: [
      'Für Online-Verkäufe gelten die Angaben und die Vertragsmechanik des jeweiligen Angebots. Eine Darstellung auf der Website begründet keine Verpflichtung zur Durchführung eines Verkaufs.',
      'Sofern künftig Online-Versteigerungen angeboten werden, werden Gebotsabgabe, Bindungswirkung, Auktionsende, Mindestpreis, Zuschlag und der Umgang mit technischen Störungen in den jeweiligen Teilnahmebedingungen geregelt. Die Website bietet derzeit keine eigenständige Online-Auktionsfunktion.',
    ],
  },
  {
    title: '§ 13 Technische Verfügbarkeit',
    paragraphs: [
      'Die Website wird mit angemessener Sorgfalt betrieben. Vorübergehende Einschränkungen durch Wartung, technische Störungen, höhere Gewalt oder Störungen der Internetübertragung bleiben möglich. Gesetzliche Ansprüche bleiben unberührt.',
    ],
  },
  {
    title: '§ 14 Datenschutz',
    paragraphs: [
      'Informationen zur Verarbeitung personenbezogener Daten finden sich in der Datenschutzerklärung der DPSS Management GmbH.',
    ],
    link: { href: '/datenschutz', label: 'Zur Datenschutzerklärung' },
  },
  {
    title: '§ 15 Verbraucherstreitbeilegung',
    paragraphs: [
      'Informationen zur Teilnahme an Verfahren der Verbraucherschlichtung werden im jeweiligen Angebot oder an anderer geeigneter Stelle bereitgestellt. Die gesetzlichen Informationspflichten bleiben unberührt.',
    ],
  },
  {
    title: '§ 16 Rechtswahl und Gerichtsstand',
    paragraphs: [
      'Es gilt deutsches Recht. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht der Schutz zwingender Bestimmungen des Staates eingeschränkt wird, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat.',
      'Für Unternehmer ist Gerichtsstand, soweit gesetzlich zulässig, der Sitz der DPSS Management GmbH. Im Übrigen gelten die gesetzlichen Gerichtsstände.',
    ],
  },
  {
    title: '§ 17 Schlussbestimmungen',
    paragraphs: [
      'Änderungen und Ergänzungen des Vertrags bedürfen der vereinbarten Form. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.',
      'Vertragssprache ist Deutsch, soweit im jeweiligen Angebot nichts anderes angegeben ist.',
    ],
  },
] as const

export default function AGBPage() {
  return (
    <LegalPageLayout
      titel="Allgemeine Geschäftsbedingungen"
      beschreibung="Für die Verwertung und den Verkauf von Vermögenswerten."
    >
      <LegalSections>
        {sections.map((section, index) => (
          <LegalSection
            key={section.title}
            nummer={String(index + 1).padStart(2, '0')}
            titel={section.title.replace(/^§ \d+ /, '')}
          >
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {'link' in section && section.link ? (
              <a href={section.link.href} className="underline decoration-border underline-offset-4 hover:text-accent">
                {section.link.label}
              </a>
            ) : null}
          </LegalSection>
        ))}
      </LegalSections>
    </LegalPageLayout>
  )
}
