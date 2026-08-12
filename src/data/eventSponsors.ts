export type EventSponsor = {
  eventSlug: string;
  name: string;
  logo: string;
};

export const eventSponsors: EventSponsor[] = [
  {
    eventSlug: "strassenlauf-2026",
    name: "Auto Kühn GmbH",
    logo: "/images/auto-kuehn-gmbh.jpg",
  },
];

export function getEventSponsors(eventSlug: string) {
  return eventSponsors.filter((sponsor) => sponsor.eventSlug === eventSlug);
}
