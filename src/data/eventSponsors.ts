export type EventSponsor = {
  eventSlug: string;
  name: string;
  logo: string;
};

export const eventSponsors: EventSponsor[] = [
  {
    eventSlug: "strassenlauf-2026",
    name: "Auto Kühn GmbH",
    logo: "/images/auto-kuehn_logo.svg",
  },
  {
    eventSlug: "strassenlauf-2026",
    name: "Marco Bungalski GmbH",
    logo: "/images/bungalski_logo.svg",
  },
  {
    eventSlug: "strassenlauf-2026",
    name: "Stadtwerke Böhmetal GmbH",
    logo: "/images/stadtwerke_logo.svg",
  },
  {
    eventSlug: "strassenlauf-2026",
    name: "Ehlers+Otten GmbH & Co. KG.",
    logo: "/images/ehlers_otten_greentech_logo.svg",
  },
  {
    eventSlug: "strassenlauf-2026",
    name: "Tierarztpraxis Eckernworth",
    logo: "/images/eckernworth_logo.svg",
  },
];

export function getEventSponsors(eventSlug: string) {
  return eventSponsors.filter((sponsor) => sponsor.eventSlug === eventSlug);
}
