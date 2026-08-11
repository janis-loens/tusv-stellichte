import Image from "next/image";

type Sponsor = {
  name: string;
  logo: string;
};

type SponsorGridProps = {
  sponsors: Sponsor[];
};

export default function SponsorGrid({ sponsors }: SponsorGridProps) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <div className="sponsor-grid">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="sponsor-card">
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} Logo`}
            width={88}
            height={88}
          />
        </div>
      ))}
    </div>
  );
}
