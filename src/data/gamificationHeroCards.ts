export type GamificationHeroCard = {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
};

export const GAMIFICATION_HERO_CARDS: GamificationHeroCard[] = [
  {
    title: "Reward Your Ambassadors",
    description:
      "Boost campaign performance by setting up rewards for ambassadors",
    icon: "/assets/Gift.svg",
    iconAlt: "Gift icon",
  },
  {
    title: "Set Milestones",
    description:
      "Set up custom goals for sales, posts, or time-based achievements",
    icon: "/assets/Crown.svg",
    iconAlt: "Crown icon",
  },
  {
    title: "Customise Incentives",
    description:
      "Create custom incentives like flat fees, free products, or special commissions",
    icon: "/assets/TicketSale.svg",
    iconAlt: "Ticket icon",
  },
];
