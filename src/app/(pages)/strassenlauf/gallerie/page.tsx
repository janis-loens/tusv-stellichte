import Hero from "@/app/components/ui/Hero";
import Gallery from "@/app/components/ui/Gallery";

const IMAGE_COUNT = 203;
const IMAGE_DIR = "/images/wetransfer_stellichter-strassenlauf-2026_2026-08-16_1436";

const images = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const number = String(i + 1).padStart(5, "0");
  return {
    src: `${IMAGE_DIR}/image${number}.jpeg`,
    alt: `Stellichter Straßenlauf 2026 – Bild ${i + 1}`,
    downloadName: `stellichter-strassenlauf-2026-bild-${i + 1}.jpeg`,
  };
});

export default function StrassenlaufGaleriePage() {
  return (
    <main>
      <Hero
        variant="page"
        eyebrow="Veranstaltung"
        title="Galerie – Stellichter Straßenlauf 2026"
        description="Impressionen vom 40. Stellichter Straßenlauf am 16.08.2026. Klicke auf ein Bild, um es in voller Größe anzusehen und herunterzuladen."
      />

      <section className="section">
        <div className="container">
          <Gallery
            images={images}
            zipName="stellichter-strassenlauf-2026-bilder.zip"
          />
        </div>
      </section>
    </main>
  );
}
