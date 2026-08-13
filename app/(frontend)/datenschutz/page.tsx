import type { ReactNode } from 'react'

export const metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung der DPSS Management GmbH.',
}

function Abschnitt({ nummer, titel, children }: { nummer: string; titel: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{nummer}</p>
      <h2 className="mt-3 font-serif text-2xl text-foreground md:text-3xl">{titel}</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function DatenschutzSeite() {
  return (
    <div className="border-b border-border">
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Rechtliches</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-foreground text-balance md:text-6xl">Datenschutzerklärung</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Informationen über die Verarbeitung personenbezogener Daten auf der Website der DPSS Management GmbH.</p>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="space-y-12 md:space-y-16">
          <Abschnitt nummer="01" titel="Verantwortlicher">
            <p>Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
            <p>DPSS Management GmbH<br />Herzberger Landstr. 63<br />37085 Göttingen<br />Deutschland</p>
            <p>Geschäftsführung: Dirk Schymura und Phillip Schaper</p>
            <p>E-Mail: <a className="text-foreground underline decoration-border underline-offset-4 hover:text-accent" href="mailto:info@dpss-management.com">info@dpss-management.com</a><br />Telefon: [TELEFONNUMMER]</p>
          </Abschnitt>

          <Abschnitt nummer="02" titel="Allgemeine Hinweise">
            <p>Der Schutz personenbezogener Daten ist uns wichtig. Personenbezogene Daten werden nur verarbeitet, soweit dies für die Bereitstellung dieser Website, die Bearbeitung von Anfragen und die Kommunikation mit Ihnen erforderlich ist oder Sie hierzu eingewilligt haben.</p>
            <p>Wir behandeln Ihre Daten vertraulich und verarbeiten sie nach den geltenden datenschutzrechtlichen Vorgaben.</p>
          </Abschnitt>

          <Abschnitt nummer="03" titel="Besuch der Website">
            <p>Beim Aufruf der Website können technisch notwendige Informationen verarbeitet werden, die für die sichere und stabile Bereitstellung der Website erforderlich sind. Dazu können insbesondere technische Zugriffsdaten wie Datum und Uhrzeit des Aufrufs, angeforderte Seite, Browsertyp und Betriebssystem gehören.</p>
            <p>Die Verarbeitung erfolgt ausschließlich im Rahmen des technisch erforderlichen Websitebetriebs.</p>
          </Abschnitt>

          <Abschnitt nummer="04" titel="Hosting">
            <p>Diese Website wird über Vercel betrieben. Im Rahmen des Hostings werden Daten verarbeitet, die zur Bereitstellung, Sicherheit und Stabilität der Website erforderlich sind.</p>
            <p>Weitere Einzelheiten ergeben sich aus den jeweils geltenden Datenschutzinformationen des Hosting-Anbieters.</p>
          </Abschnitt>

          <Abschnitt nummer="05" titel="Kontaktaufnahme">
            <p>Wenn Sie uns per E-Mail, Kontaktformular oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Angaben, soweit dies zur Bearbeitung Ihrer Anfrage und zur Kommunikation mit Ihnen erforderlich ist.</p>
            <p>Die Angaben werden nicht für andere Zwecke verwendet, sofern keine gesetzliche Verpflichtung besteht oder Sie ausdrücklich eingewilligt haben.</p>
          </Abschnitt>

          <Abschnitt nummer="06" titel="Verwertung, Katalog und Anfragen">
            <p>Über den Verwertungskatalog können Informationen zu angebotenen Vermögenswerten abgerufen und Anfragen zu einzelnen Positionen gestellt werden. Die dabei übermittelten Angaben werden zur Bearbeitung der Anfrage, zur Kommunikation und zur Durchführung der gewünschten Verwertung verarbeitet.</p>
            <p>Wir verarbeiten nur die Daten, die Sie uns im Rahmen Ihrer Anfrage tatsächlich mitteilen.</p>
          </Abschnitt>

          <Abschnitt nummer="07" titel="Cookies und ähnliche Technologien">
            <p>Diese Website verwendet technisch notwendige Speichermechanismen, die für den Betrieb und die Darstellung der Website erforderlich sind. Ihre Auswahl im Consent-System kann lokal in Ihrem Browser gespeichert werden.</p>
            <p>Optionale Analyse- oder Marketing-Technologien werden derzeit nicht aktiviert. Falls künftig optionale Technologien eingesetzt werden, werden sie nur nach Ihrer Einwilligung aktiviert. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.</p>
          </Abschnitt>

          <Abschnitt nummer="08" titel="Externe Dienste">
            <p>Die Website nutzt Vercel für das Hosting sowie Payload CMS für die Verwaltung der Websiteinhalte und Katalogpositionen. Darüber hinaus werden keine Analyse-, Marketing-, Karten-, Video- oder Social-Media-Dienste eingebunden.</p>
          </Abschnitt>

          <Abschnitt nummer="09" titel="Speicherdauer">
            <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Die konkrete Speicherdauer richtet sich nach dem jeweiligen Verarbeitungszweck und den gesetzlichen Vorgaben.</p>
          </Abschnitt>

          <Abschnitt nummer="10" titel="Rechte betroffener Personen">
            <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft über Ihre personenbezogenen Daten, Berichtigung unrichtiger Daten, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.</p>
            <p>Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine Mitteilung an die oben genannte Kontaktadresse.</p>
          </Abschnitt>

          <Abschnitt nummer="11" titel="Beschwerderecht bei einer Aufsichtsbehörde">
            <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die für Sie zuständige Aufsichtsbehörde können Sie anhand Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes bestimmen.</p>
          </Abschnitt>

          <Abschnitt nummer="12" titel="Aktualität und Änderung dieser Datenschutzerklärung">
            <p>Wir können diese Datenschutzerklärung anpassen, wenn sich die Website, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Maßgeblich ist jeweils die auf dieser Website veröffentlichte Fassung.</p>
          </Abschnitt>
        </div>
      </main>
    </div>
  )
}
