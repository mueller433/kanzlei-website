import { LegalPageLayout, LegalSection, LegalSections } from '@/components/legal-page-layout'
import { KANZLEI, KANZLEI_ORT } from '@/lib/kanzlei-daten'

export const metadata = {
  title: 'Datenschutz | DPSS Management GmbH',
  description: 'Datenschutzhinweise der DPSS Management GmbH für Website, Kontakt und Kaufanfragen.',
}

export default function DatenschutzSeite() {
  return (
    <LegalPageLayout
      titel="Datenschutzerklärung"
      beschreibung="Transparent erklärt: welche Daten beim Websitebesuch, bei Kontakt- und Kaufanfragen verarbeitet werden."
      current="datenschutz"
      stand="14. September 2026"
    >
      <LegalSections>
        <LegalSection nummer="01" titel="Verantwortlicher">
          <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
          <address className="not-italic">
            <strong className="block">{KANZLEI.name}</strong>
            <span className="block">{KANZLEI.adresse.strasse}</span>
            <span className="block">{KANZLEI_ORT}</span>
            <span className="block">Deutschland</span>
          </address>
          <p>
            E-Mail: <a href={KANZLEI.email.href}>{KANZLEI.email.anzeige}</a>
            <br />
            Telefon: <a href={KANZLEI.telefon.href}>{KANZLEI.telefon.anzeige}</a>
          </p>
        </LegalSection>

        <LegalSection nummer="02" titel="Grundsätze der Verarbeitung">
          <p>
            Wir verarbeiten personenbezogene Daten nur, soweit dies zur sicheren Bereitstellung
            dieser Website, zur Bearbeitung Ihrer Anfrage, zur Durchführung vorvertraglicher
            Maßnahmen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.
          </p>
          <p>
            Maßgebliche Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO für
            vorvertragliche und vertragliche Maßnahmen, Art. 6 Abs. 1 lit. c DSGVO für rechtliche
            Verpflichtungen und Art. 6 Abs. 1 lit. f DSGVO für unsere berechtigten Interessen an
            einem sicheren Websitebetrieb, an der Bearbeitung geschäftlicher Anfragen und an der
            Verhinderung von Missbrauch. Soweit wir eine Einwilligung einholen, beruht die
            Verarbeitung auf Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </LegalSection>

        <LegalSection nummer="03" titel="Websiteaufruf und Hosting">
          <p>
            Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch erforderliche
            Zugriffsdaten. Dazu können IP-Adresse, Zeitpunkt und Ziel des Aufrufs, übertragene
            Datenmenge, Referrer, Browser, Betriebssystem und Statuscodes gehören. Die Verarbeitung
            dient der Auslieferung der Website sowie der Stabilität, Sicherheit und Fehleranalyse.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
            sicheren und zuverlässigen Betrieb des Onlineangebots.
          </p>
          <p>
            Hosting-Anbieter ist Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA.
            Vercel verarbeitet Daten in unserem Auftrag. Eine Verarbeitung in den USA kann nicht
            ausgeschlossen werden. Vercel stützt Übermittlungen nach eigenen Angaben unter anderem
            auf das EU-US Data Privacy Framework und geeignete vertragliche Garantien.
          </p>
          <p>
            Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzhinweise von Vercel</a>.
          </p>
        </LegalSection>

        <LegalSection nummer="04" titel="Cookies und lokale Speicherung">
          <p>
            Für die Speicherung Ihrer Cookie-Auswahl wird der Eintrag
            <code className="mx-1 break-all bg-muted px-1.5 py-0.5 text-sm">dpss-cookie-consent</code>
            lokal in Ihrem Browser gespeichert. Er enthält Ihre Auswahl für notwendige,
            statistische und Marketing-Kategorien. Diese Speicherung ist für die Dokumentation und
            Beachtung Ihrer Auswahl erforderlich.
          </p>
          <p>
            Rechtsgrundlage für den Zugriff auf technisch erforderliche Informationen ist § 25
            Abs. 2 TDDDG; die anschließende Verarbeitung beruht auf Art. 6 Abs. 1 lit. f DSGVO.
            Optionale Technologien würden nur nach Ihrer Einwilligung gemäß § 25 Abs. 1 TDDDG in
            Verbindung mit Art. 6 Abs. 1 lit. a DSGVO aktiviert. Derzeit sind keine Statistik- oder
            Marketingdienste eingebunden.
          </p>
          <p>
            Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern oder den
            Eintrag in den Browsereinstellungen löschen.
          </p>
        </LegalSection>

        <LegalSection nummer="05" titel="Kontaktaufnahme">
          <p>
            Bei einer Kontaktaufnahme per Formular, E-Mail oder Telefon verarbeiten wir die von
            Ihnen übermittelten Angaben. Im Kontaktformular sind dies insbesondere Name,
            E-Mail-Adresse, Telefonnummer, Unternehmen, Betreff und Nachricht.
          </p>
          <p>
            Die Verarbeitung erfolgt zur Bearbeitung und Beantwortung Ihrer Anfrage. Bei
            vertragsbezogenen oder vorvertraglichen Anliegen ist Art. 6 Abs. 1 lit. b DSGVO die
            Rechtsgrundlage; bei sonstigen geschäftlichen Anfragen Art. 6 Abs. 1 lit. f DSGVO.
            Kontaktformulardaten werden nicht zusätzlich in der Website-Datenbank gespeichert,
            sondern als E-Mail an DPSS übermittelt.
          </p>
        </LegalSection>

        <LegalSection nummer="06" titel="Katalog- und Sofortkaufanfragen">
          <p>
            Bei einer Kaufanfrage verarbeiten wir Produktbezug, Käuferart, Name, Kontakt- und
            Anschriftdaten sowie – bei Unternehmen – Firmenname und gegebenenfalls Handelsregister-
            und Umsatzsteuer-Identifikationsnummer. Diese Angaben benötigen wir zur Identifikation,
            Verfügbarkeitsprüfung, Kommunikation und Vorbereitung einer möglichen Transaktion.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Prüfung der Identität und der Schutz
            vor missbräuchlichen oder betrügerischen Anfragen beruhen ergänzend auf Art. 6 Abs. 1
            lit. f DSGVO.
          </p>
          <div className="border-l-2 border-accent bg-muted/35 px-4 py-4 sm:px-5">
            <p className="font-semibold text-foreground">Umgang mit Identitätsnachweisen</p>
            <p className="mt-2 text-sm leading-relaxed">
              Hochgeladene Ausweis- oder Unternehmensnachweise werden während der Anfrage
              ausschließlich im flüchtigen Serverspeicher verarbeitet und als E-Mail-Anhang an
              DPSS übermittelt. Die Dateien werden weder in der Website-Datenbank noch im
              Vercel-Blob-Speicher abgelegt. In der Datenbank werden lediglich die Angaben zur
              Kaufanfrage sowie Bezeichnung und Dateiname der eingereichten Dokumente gespeichert.
              Die E-Mail mit den Anhängen verbleibt anschließend im geschäftlichen Postfach, bis sie
              für Prüfung, Abwicklung oder Nachweis nicht mehr erforderlich ist.
            </p>
          </div>
          <p>
            Ohne die als Pflichtfelder gekennzeichneten Angaben und Nachweise kann die Kaufanfrage
            nicht geprüft und übermittelt werden. Eine automatisierte Entscheidung oder ein
            Profiling findet nicht statt. Die Eingangsbestätigung ist noch keine Annahme eines
            Kaufangebots.
          </p>
        </LegalSection>

        <LegalSection nummer="07" titel="E-Mail-Versand über Resend">
          <p>
            Für den Versand interner Benachrichtigungen und automatischer Eingangsbestätigungen
            nutzen wir Resend, einen Dienst der Plus Five Five, Inc., USA. Dabei werden
            E-Mail-Adresse, Nachrichten- beziehungsweise Anfragedaten sowie die für die jeweilige
            Nachricht erforderlichen Inhalte verarbeitet. Bei Kaufanfragen werden die
            Identitätsnachweise als E-Mail-Anhang übertragen.
          </p>
          <p>
            Der Einsatz erfolgt zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6 Abs. 1 lit.
            b DSGVO beziehungsweise Art. 6 Abs. 1 lit. f DSGVO. Eine Verarbeitung in den USA kann
            stattfinden. Resend stellt nach eigenen Angaben ein Data Processing Addendum bereit
            und ist unter dem EU-US Data Privacy Framework zertifiziert.
          </p>
          <p>
            Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">Datenschutzhinweise von Resend</a>.
          </p>
        </LegalSection>

        <LegalSection nummer="08" titel="CMS, Datenbank und Medien">
          <p>
            Inhalte, Katalogpositionen und die Metadaten von Kaufanfragen werden mit Payload CMS
            verwaltet. Als Datenbank wird eine PostgreSQL-Datenbank eingesetzt. Öffentlich
            dargestellte Medien des Katalogs können im Vercel-Blob-Speicher liegen.
            Identifikationsdokumente aus Kaufanfragen werden dort ausdrücklich nicht gespeichert.
          </p>
          <p>
            Zugriff auf nicht öffentliche Verwaltungs- und Anfragedaten erhalten nur hierzu
            berechtigte Personen und technisch erforderliche Auftragsverarbeiter.
          </p>
        </LegalSection>

        <LegalSection nummer="09" titel="Empfänger und Drittlandübermittlungen">
          <p>
            Daten erhalten innerhalb der DPSS Management GmbH nur Personen, die sie für die
            Bearbeitung benötigen. Externe Empfänger sind insbesondere Hosting-, Datenbank-,
            Speicher-, E-Mail- und IT-Dienstleister, soweit deren Einsatz erforderlich ist. Eine
            Weitergabe kann außerdem erfolgen, wenn wir gesetzlich hierzu verpflichtet sind oder
            sie zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.
          </p>
          <p>
            Bei Übermittlungen in Staaten außerhalb des Europäischen Wirtschaftsraums achten wir
            auf ein zulässiges Übermittlungsinstrument, insbesondere einen Angemessenheitsbeschluss,
            eine gültige Zertifizierung unter dem EU-US Data Privacy Framework oder
            EU-Standardvertragsklauseln.
          </p>
        </LegalSection>

        <LegalSection nummer="10" titel="Speicherdauer">
          <p>
            Wir speichern Daten nur so lange, wie sie für den jeweiligen Zweck benötigt werden.
            Danach werden sie gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen,
            Nachweiserfordernisse oder berechtigten Interessen an einer weiteren Aufbewahrung
            entgegenstehen. Handels- und steuerrechtlich relevante Unterlagen können den jeweils
            geltenden gesetzlichen Aufbewahrungsfristen unterliegen.
          </p>
          <p>
            Fehlgeschlagene oder rein allgemeine Anfragen werden gelöscht, sobald ihre weitere
            Aufbewahrung nicht mehr erforderlich ist. Technische Protokolldaten werden nach den
            für Betrieb und Sicherheit festgelegten Fristen des Hosting-Anbieters gelöscht oder
            anonymisiert.
          </p>
        </LegalSection>

        <LegalSection nummer="11" titel="Ihre Datenschutzrechte">
          <p>Im Rahmen der gesetzlichen Voraussetzungen haben Sie insbesondere das Recht auf:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Auskunft über Ihre verarbeiteten personenbezogenen Daten,</li>
            <li>Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten,</li>
            <li>Löschung oder Einschränkung der Verarbeitung,</li>
            <li>Datenübertragbarkeit, soweit die Voraussetzungen erfüllt sind,</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen und</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft.</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine Nachricht an{' '}
            <a href={KANZLEI.email.href}>{KANZLEI.email.anzeige}</a>.
          </p>
        </LegalSection>

        <LegalSection nummer="12" titel="Beschwerderecht">
          <p>
            Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren. Für Unternehmen mit
            Sitz in Göttingen ist insbesondere der Landesbeauftragte für den Datenschutz
            Niedersachsen zuständig.
          </p>
          <p>
            Landesbeauftragter für den Datenschutz Niedersachsen
            <br />
            Prinzenstraße 5
            <br />
            30159 Hannover
            <br />
            E-Mail: <a href="mailto:poststelle@lfd.niedersachsen.de">poststelle@lfd.niedersachsen.de</a>
            <br />
            <a href="https://www.lfd.niedersachsen.de/beschwerde" target="_blank" rel="noreferrer">
              Online-Beschwerde
            </a>
          </p>
        </LegalSection>

        <LegalSection nummer="13" titel="Datensicherheit">
          <p>
            Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Daten gegen
            Verlust, unbefugten Zugriff und Manipulation zu schützen. Die Übertragung zwischen
            Ihrem Browser und dieser Website erfolgt verschlüsselt über HTTPS. Ein vollständig
            risikofreier elektronischer Datentransfer kann dennoch nicht garantiert werden.
          </p>
        </LegalSection>

        <LegalSection nummer="14" titel="Aktualität dieser Erklärung">
          <p>
            Wir passen diese Datenschutzerklärung an, wenn sich Funktionen, Dienstleister oder
            rechtliche Anforderungen ändern. Maßgeblich ist die jeweils auf dieser Website
            veröffentlichte Fassung.
          </p>
        </LegalSection>
      </LegalSections>
    </LegalPageLayout>
  )
}
