import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'
import { KANZLEI } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Datenschutz | DPSS Management GmbH',
  description: 'Datenschutzerklärung der DPSS Management GmbH.',
}

export default function DatenschutzSeite() {
  return (
    <LegalPageLayout
      titel="Datenschutzerklärung"
      beschreibung="Informationen über die Verarbeitung personenbezogener Daten auf der Website der DPSS Management GmbH."
    >
      <LegalSections>
        <LegalSection nummer="01" titel="Verantwortlicher">
          <p>Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
          <p>DPSS Management GmbH<br />Herzberger Landstr. 63<br />37085 Göttingen<br />Deutschland</p>
          <p>Geschäftsführung: Dirk Schymura und Phillip Schaper</p>
          <p>E-Mail: <a className="underline decoration-border underline-offset-4 hover:text-accent" href={KANZLEI.email.href}>{KANZLEI.email.anzeige}</a><br />Telefon: <a className="underline decoration-border underline-offset-4 hover:text-accent" href={KANZLEI.telefon.href}>{KANZLEI.telefon.anzeige}</a></p>
        </LegalSection>
        <LegalSection nummer="02" titel="Allgemeine Hinweise">
          <p>Der Schutz personenbezogener Daten ist uns wichtig. Personenbezogene Daten werden nur verarbeitet, soweit dies für die Bereitstellung dieser Website, die Bearbeitung von Anfragen und die Kommunikation mit Ihnen erforderlich ist oder Sie hierzu eingewilligt haben.</p>
          <p>Wir behandeln Ihre Daten vertraulich und verarbeiten sie nach den geltenden datenschutzrechtlichen Vorgaben.</p>
        </LegalSection>
        <LegalSection nummer="03" titel="Besuch der Website">
          <p>Beim Aufruf der Website können technisch notwendige Informationen verarbeitet werden, die für die sichere und stabile Bereitstellung der Website erforderlich sind. Dazu können insbesondere technische Zugriffsdaten wie Datum und Uhrzeit des Aufrufs, angeforderte Seite, Browsertyp und Betriebssystem gehören.</p>
          <p>Die Verarbeitung erfolgt ausschließlich im Rahmen des technisch erforderlichen Websitebetriebs.</p>
        </LegalSection>
        <LegalSection nummer="04" titel="Hosting">
          <p>Diese Website wird über Vercel betrieben. Im Rahmen des Hostings werden Daten verarbeitet, die zur Bereitstellung, Sicherheit und Stabilität der Website erforderlich sind.</p>
          <p>Weitere Einzelheiten ergeben sich aus den jeweils geltenden Datenschutzinformationen des Hosting-Anbieters.</p>
        </LegalSection>
        <LegalSection nummer="05" titel="Kontaktaufnahme">
          <p>Wenn Sie uns per E-Mail, Kontaktformular oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Angaben, soweit dies zur Bearbeitung Ihrer Anfrage und zur Kommunikation mit Ihnen erforderlich ist.</p>
          <p>Die Angaben werden nicht für andere Zwecke verwendet, sofern keine gesetzliche Verpflichtung besteht oder Sie ausdrücklich eingewilligt haben.</p>
        </LegalSection>
        <LegalSection nummer="06" titel="Verwertung, Katalog und Anfragen">
          <p>Über den Verwertungskatalog können Informationen zu angebotenen Vermögenswerten abgerufen und Kaufanfragen zu einzelnen Positionen übermittelt werden. Dabei verarbeiten wir die von Ihnen angegebenen Kontakt-, Adress- und gegebenenfalls Unternehmensdaten zur Prüfung und Bearbeitung Ihrer Anfrage sowie zur weiteren Kommunikation.</p>
          <p>Wenn für eine Sofortkaufanfrage Identitäts- oder Unternehmensnachweise hochgeladen werden, verarbeiten wir diese ausschließlich zur Zuordnung und Prüfung der anfragenden Person beziehungsweise des Unternehmens und zur Vorbereitung der angefragten Transaktion. Der Zugriff wird auf die mit der Bearbeitung befassten Personen beschränkt.</p>
          <p>Die Daten und Unterlagen werden gelöscht, sobald sie für diese Zwecke nicht mehr erforderlich sind, soweit keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen.</p>
        </LegalSection>
        <LegalSection nummer="07" titel="Cookies und ähnliche Technologien">
          <p>Diese Website verwendet technisch notwendige Speichermechanismen, die für den Betrieb und die Darstellung der Website erforderlich sind. Ihre Auswahl im Consent-System kann lokal in Ihrem Browser gespeichert werden.</p>
          <p>Optionale Analyse- oder Marketing-Technologien werden derzeit nicht aktiviert. Falls künftig optionale Technologien eingesetzt werden, werden sie nur nach Ihrer Einwilligung aktiviert. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.</p>
        </LegalSection>
        <LegalSection nummer="08" titel="Externe Dienste">
          <p>Die Website nutzt Vercel für das Hosting sowie Payload CMS für die Verwaltung der Websiteinhalte und Katalogpositionen. Darüber hinaus werden keine Analyse-, Marketing-, Karten-, Video- oder Social-Media-Dienste eingebunden.</p>
        </LegalSection>
        <LegalSection nummer="09" titel="Speicherdauer">
          <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Die konkrete Speicherdauer richtet sich nach dem jeweiligen Verarbeitungszweck und den gesetzlichen Vorgaben.</p>
        </LegalSection>
        <LegalSection nummer="10" titel="Rechte betroffener Personen">
          <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft über Ihre personenbezogenen Daten, Berichtigung unrichtiger Daten, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.</p>
          <p>Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine Mitteilung an die oben genannte Kontaktadresse.</p>
        </LegalSection>
        <LegalSection nummer="11" titel="Beschwerderecht bei einer Aufsichtsbehörde">
          <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die für Sie zuständige Aufsichtsbehörde können Sie anhand Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes bestimmen.</p>
        </LegalSection>
        <LegalSection nummer="12" titel="Aktualität und Änderung dieser Datenschutzerklärung">
          <p>Wir können diese Datenschutzerklärung anpassen, wenn sich die Website, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Maßgeblich ist jeweils die auf dieser Website veröffentlichte Fassung.</p>
        </LegalSection>
      </LegalSections>
    </LegalPageLayout>
  )
}
