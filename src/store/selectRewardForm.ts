import type { GamificationDialogState } from "./gamificationDialogSlice";
import {
  formatRewardEventTriggerText,
  formatRewardWithTriggerText,
  getRewardOptionLabel,
} from "../utils/rewardFormDisplay";
import {
  COMMISSION_TIER_OPTIONS,
  POST_PERIOD_OPTIONS,
  REWARD_EVENT_OPTIONS,
  REWARD_WITH_OPTIONS,
} from "../data/rewardFormOptions";

interface RewardFormRoot {
  gamificationDialog: GamificationDialogState;
}

export function selectRewardForm(state: RewardFormRoot) {
  const d = state.gamificationDialog;

  const rewardEventSummary = formatRewardEventTriggerText({
    rewardEventId: d.rewardEventId,
    crossSalesAmount: d.crossSalesAmount,
    postsCount: d.postsCount,
    postsPeriodId: d.postsPeriodId,
  });

  const rewardWithSummary = formatRewardWithTriggerText({
    rewardWithId: d.rewardWithId,
    flatBonusAmount: d.flatBonusAmount,
    commissionTierId: d.commissionTierId,
  });

  return {
    selections: {
      rewardEvent: d.rewardEventId
        ? {
            id: d.rewardEventId,
            templateLabel: getRewardOptionLabel(
              REWARD_EVENT_OPTIONS,
              d.rewardEventId,
            ),
            label: rewardEventSummary,
            ...(d.rewardEventId === "cross-sales"
              ? { crossSalesAmount: d.crossSalesAmount }
              : {}),
            ...(d.rewardEventId === "posts-period"
              ? {
                  postsCount: d.postsCount,
                  postsPeriodId: d.postsPeriodId,
                  postsPeriodLabel: getRewardOptionLabel(
                    POST_PERIOD_OPTIONS,
                    d.postsPeriodId,
                  ),
                }
              : {}),
          }
        : null,
      rewardWith: d.rewardWithId
        ? {
            id: d.rewardWithId,
            templateLabel: getRewardOptionLabel(
              REWARD_WITH_OPTIONS,
              d.rewardWithId,
            ),
            label: rewardWithSummary,
            ...(d.rewardWithId === "flat-bonus"
              ? { flatBonusAmount: d.flatBonusAmount }
              : {}),
            ...(d.rewardWithId === "commissioner"
              ? {
                  commissionTierId: d.commissionTierId,
                  commissionTierLabel: getRewardOptionLabel(
                    COMMISSION_TIER_OPTIONS,
                    d.commissionTierId,
                  ),
                }
              : {}),
          }
        : null,
      timeBound: {
        enabled: d.isTimeBound,
        endDate: d.isTimeBound ? d.rewardEndDate : "",
      },
    },
  };
}
