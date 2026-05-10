import type { RewardOption } from "../data/rewardFormOptions";
import {
  COMMISSION_TIER_OPTIONS,
  POST_PERIOD_OPTIONS,
  REWARD_EVENT_OPTIONS,
  REWARD_WITH_OPTIONS,
} from "../data/rewardFormOptions";

export function getRewardOptionLabel(
  options: RewardOption[],
  id: string,
): string {
  return options.find((o) => o.id === id)?.label ?? "";
}

export function formatRewardEventTriggerText(params: {
  rewardEventId: string;
  crossSalesAmount: string;
  postsCount: string;
  postsPeriodId: string;
}): string {
  const { rewardEventId, crossSalesAmount, postsCount, postsPeriodId } =
    params;
  if (!rewardEventId) return "";

  if (rewardEventId === "cross-sales") {
    const n = crossSalesAmount.trim();
    return n ? `Cross $${n} in sales` : "Cross $X in sales";
  }

  if (rewardEventId === "posts-period") {
    const periodLabel = getRewardOptionLabel(
      POST_PERIOD_OPTIONS,
      postsPeriodId.trim(),
    );
    const c = postsCount.trim();
    if (c && periodLabel) return `Posts ${c} times every ${periodLabel}`;
    if (c) return `Posts ${c} times every Y period`;
    if (periodLabel) return `Posts X times every ${periodLabel}`;
    return "Posts X times every Y period";
  }

  if (rewardEventId === "is-onboarded") {
    return (
      REWARD_EVENT_OPTIONS.find((o) => o.id === "is-onboarded")?.label ?? ""
    );
  }

  return "";
}

export function formatRewardWithTriggerText(params: {
  rewardWithId: string;
  flatBonusAmount: string;
  commissionTierId: string;
}): string {
  const { rewardWithId, flatBonusAmount, commissionTierId } = params;
  if (!rewardWithId) return "";

  if (rewardWithId === "flat-bonus") {
    const n = flatBonusAmount.trim();
    return n ? `Flat $${n} bonus` : "Flat $X bonus";
  }

  if (rewardWithId === "commissioner") {
    const tierLabel = getRewardOptionLabel(
      COMMISSION_TIER_OPTIONS,
      commissionTierId,
    );
    return tierLabel || "Commissioner";
  }

  return REWARD_WITH_OPTIONS.find((o) => o.id === rewardWithId)?.label ?? "";
}
