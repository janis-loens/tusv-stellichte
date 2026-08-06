import Hero from "@/app/components/ui/Hero";
import Link from "next/link";

export default function MitgliedPage() {
  return (
    <main>
      <Hero
        variant="page"
        eyebrow="Dabei sein"
        title="Mitglied werden"
        description="Lust auf Sport und Gemeinschaft? Schreiben Sie uns – wir freuen uns auf neue Mitglieder und Unterstützer."
      />

      <section className="section section-compact">
        <div className="container">
          <h2>Mitgliedsantrag ausfüllen</h2>
          <p>
            Füllen Sie das interaktive Formular online aus und unterschreiben
            Sie digital, oder laden Sie die PDF zum Ausdrucken herunter.
          </p>
          <div className="hero-actions" style={{ marginTop: "24px" }}>
            <Link href="/eintrittserklaerung" className="btn primary">
              Online-Formular ausfüllen
            </Link>
            <a
              href="https://nylcloqoblzfcdsakeuk.supabase.co/storage/v1/object/public/templates/Eintrittserklaerung.pdf"
              className="btn ghost"
              download
            >
              PDF herunterladen
            </a>
          </div>
          <p
            style={{
              marginTop: "16px",
              color: "var(--muted)",
              fontSize: "0.95rem",
            }}
          >
            <strong>Online-Formular:</strong> Ausfüllen, digital unterschreiben
            und direkt als PDF speichern.
            <br />
            <strong>PDF-Download:</strong> Zum Ausdrucken und händischen
            Ausfüllen.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container membership">
          <div>
            <h2>Warum TuSV?</h2>
            <p>
              Familiäre Atmosphäre, kurze Wege und vielseitige Trainingsangebote
              – wir freuen uns auf dich.
            </p>
          </div>
          <div className="membership-actions">
            <Link href="/angebot" className="btn primary">
              Angebot entdecken
            </Link>
            <Link href="/trainingszeiten" className="btn ghost">
              Trainingszeiten
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
