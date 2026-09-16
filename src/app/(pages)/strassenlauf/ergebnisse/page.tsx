import Hero from "@/app/components/ui/Hero";
import ErgebnisTableCard from "@/app/components/ui/ErgebnisTableCard";
import { ergebnisse } from "@/data/ergebnisse";

export default function StrassenlaufErgebnissePage() {
  const tables = ergebnisse;

  return (
    <main>
      <Hero
        variant="page"
        eyebrow="Veranstaltung"
        title="Ergebnisse – Stellichter Straßenlauf 2026"
        description="Die Ergebnislisten vom 40. Stellichter Straßenlauf 'Quer durch Stellichte' am 16.08.2026. Klicke auf eine Disziplin, um die Tabelle anzuzeigen."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Ergebnislisten</h2>
            <p>
              Alle Läufe des Stellichter Straßenlaufs 2026. Die Tabellen sind
              standardmäßig zusammengeklappt – klicke auf den Titel, um sie zu
              öffnen.
            </p>
          </div>

          <div className="ergebnis-list">
            {tables.map((table, index) => (
              <ErgebnisTableCard key={index} table={table} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
