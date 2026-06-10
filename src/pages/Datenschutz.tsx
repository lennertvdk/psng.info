import LegalPageLayout from "@/components/LegalPageLayout";

const Datenschutz = () => {
  return (
    <LegalPageLayout title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        Lennert van de Kreeke
        <br />
        Tucholskystraße 7
        <br />
        10117 Berlin
        <br />
        Deutschland
        <br />
        E-Mail: <a href="mailto:kontakt@psng.info">kontakt@psng.info</a>
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei Netlify, Inc., 44 Montgomery Street, Suite
        300, San Francisco, CA 94104, USA gehostet. Beim Aufruf der Website
        verarbeitet Netlify automatisch sogenannte Server-Logfiles, die dein
        Browser übermittelt. Dazu gehören u. a. IP-Adresse, Datum und
        Uhrzeit der Anfrage, Browsertyp und das verwendete Betriebssystem.
        Diese Daten dienen der technischen Bereitstellung und Absicherung
        der Website (Art. 6 Abs. 1 lit. f DSGVO) und werden nicht mit anderen
        Datenquellen zusammengeführt. Weitere Informationen findest du in der{" "}
        <a
          href="https://www.netlify.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Netlify
        </a>
        .
      </p>

      <h2>3. Kontaktformular</h2>
      <p>
        Wenn du unser Kontaktformular nutzt, werden die von dir angegebenen
        Daten (z. B. Name, E-Mail-Adresse, Betreff/Anliegen und
        Nachrichtentext) zur Bearbeitung deiner Anfrage gespeichert und
        verarbeitet. Die Verarbeitung erfolgt auf Grundlage deiner
        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Bearbeitung
        vorvertraglicher oder vertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b
        DSGVO). Die Übermittlung erfolgt technisch über Netlify Forms; die
        eingehenden Nachrichten werden per E-Mail an{" "}
        <a href="mailto:kontakt@psng.info">kontakt@psng.info</a> weitergeleitet.
        Eine Weitergabe an Dritte findet nicht statt. Deine Daten werden
        gelöscht, sobald sie für die Bearbeitung deiner Anfrage nicht mehr
        erforderlich sind.
      </p>

      <h2>4. Eingebundene Schriftarten (Google Fonts)</h2>
      <p>
        Diese Website bindet Schriftarten ("Google Fonts") des Anbieters
        Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
        Irland ein. Beim Laden der Seite stellt dein Browser eine
        Verbindung zu den Servern von Google her, wobei deine IP-Adresse
        übermittelt werden kann. Rechtsgrundlage ist unser berechtigtes
        Interesse an einer einheitlichen und ansprechenden Darstellung
        unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen
        findest du in der{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>5. Eingebettete Inhalte und externe Links</h2>
      <p>
        Auf unserer Website verlinken wir auf externe Plattformen und
        Communitys, u. a. WhatsApp, Instagram, YouTube und LinkedIn. Beim
        Anklicken dieser Links verlässt du unsere Website. Für die dortige
        Verarbeitung deiner Daten ist der jeweilige Anbieter verantwortlich;
        es gelten dessen Datenschutzbestimmungen. Eingebettete Inhalte (z. B.
        Videos) werden erst nach Anklicken geladen, sodass keine Daten an den
        jeweiligen Anbieter übertragen werden, solange du den Inhalt nicht
        aktiv aufrufst.
      </p>

      <h2>6. Cookies und Tracking</h2>
      <p>
        Diese Website verwendet keine Analyse- oder Tracking-Tools und setzt
        keine Cookies zu Marketing- oder Analysezwecken ein.
      </p>

      <h2>7. Deine Rechte</h2>
      <p>
        Du hast jederzeit das Recht auf Auskunft über die zu deiner Person
        gespeicherten Daten, deren Berichtigung, Löschung oder Einschränkung
        der Verarbeitung sowie ein Widerspruchsrecht gegen die Verarbeitung
        und ein Recht auf Datenübertragbarkeit. Wende dich hierfür an{" "}
        <a href="mailto:kontakt@psng.info">kontakt@psng.info</a>. Außerdem
        steht dir ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde
        zu.
      </p>

      <h2>8. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung wird bei Bedarf angepasst, um sie an
        geänderte Rechtslagen oder Änderungen des Angebots anzupassen.
      </p>
    </LegalPageLayout>
  );
};

export default Datenschutz;
