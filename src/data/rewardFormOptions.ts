export interface RewardOption {
  id: string;
  label: string;
}

export const REWARD_EVENT_OPTIONS: RewardOption[] = [
  { id: "cross-sales", label: "Cross $X in sales" },
  { id: "posts-period", label: "Posts X times every Y period" },
  { id: "is-onboarded", label: "Is Onboarded" },
];

export const REWARD_WITH_OPTIONS: RewardOption[] = [
  { id: "flat-bonus", label: "Flat $X bonus" },
  { id: "commissioner", label: "Commissioner" },
];

export const COMMISSION_TIER_OPTIONS: RewardOption[] = [
  { id: "tier-1", label: "Tier Name 1" },
  { id: "tier-2", label: "Tier Name 2" },
  { id: "tier-3", label: "Tier Name 3" },
  { id: "tier-4", label: "Tier Name 4" },
  { id: "tier-5", label: "Tier Name 5" },
];

export const POST_PERIOD_OPTIONS: RewardOption[] = [
  { id: "14-days", label: "14 days" },
  { id: "1-month", label: "1 month" },
  { id: "2-months", label: "2 months" },
  { id: "3-months", label: "3 months" },
  { id: "1-year", label: "1 year" },
];
