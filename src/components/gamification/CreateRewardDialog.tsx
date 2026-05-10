import { useEffect } from "react";
import {
  closeRewardDialog,
  patchRewardDialogForm,
} from "../../store/gamificationDialogSlice";
import { getMinimumSelectableEndDateYyyyMmDd } from "../../data/dateLimits";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectRewardForm } from "../../store/selectRewardForm";
import { EndDatePicker } from "../forms/EndDatePicker";
import { RewardDialogDropdown } from "../forms/RewardDialogDropdown";
import { GamifyDialogButton } from "../ui/GamifyDialogButton";
import { Toggle } from "../ui/Toggle";
import { TierSelectPanel } from "./TierSelectPanel";

export function CreateRewardDialog() {
  const dispatch = useAppDispatch();
  const { isOpen, isTimeBound, rewardEndDate, rewardDialogView } =
    useAppSelector((state) => state.gamificationDialog);
  const rewardFormSnapshot = useAppSelector(selectRewardForm);

  const minSelectableEnd = getMinimumSelectableEndDateYyyyMmDd();

  useEffect(() => {
    if (!isTimeBound || !rewardEndDate) return;
    const min = getMinimumSelectableEndDateYyyyMmDd();
    if (rewardEndDate < min) {
      dispatch(patchRewardDialogForm({ rewardEndDate: "" }));
    }
  }, [dispatch, isTimeBound, rewardEndDate]);

  if (!isOpen) {
    return null;
  }

  const title =
    rewardDialogView === "tier-select"
      ? "Select a commission tier"
      : "Create your reward system";

  function handleCloseHeader() {
    if (rewardDialogView === "tier-select") {
      dispatch(patchRewardDialogForm({ rewardDialogView: "main" }));
    } else {
      dispatch(closeRewardDialog());
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-[400px] max-w-full rounded-[24px] bg-white p-6 shadow-modal">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-dm text-[20px] font-medium leading-[140%] text-[#2A2C31]">
              {title}
            </h2>
            <button
              type="button"
              onClick={handleCloseHeader}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#52545A] transition hover:bg-[#F7F7F7]"
              aria-label={
                rewardDialogView === "tier-select"
                  ? "Close tier selection"
                  : "Close dialog"
              }
            >
              <span className="relative inline-block h-4 w-4">
                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-current" />
              </span>
            </button>
          </div>

          {rewardDialogView === "main" ? (
            <>
              <div className="mt-4 flex flex-col gap-4">
                <RewardDialogDropdown
                  field="event"
                  label="Reward event"
                  placeholder="Select an event"
                  required
                />
                <RewardDialogDropdown
                  field="with"
                  label="Reward with"
                  placeholder="Select a reward"
                  required
                />
                <Toggle
                  label="Make the reward time bound"
                  hint="Choose an end date to stop this reward automatically."
                  checked={isTimeBound}
                  onChange={(value) =>
                    dispatch(patchRewardDialogForm({ isTimeBound: value }))
                  }
                  checkedChildren={
                    <EndDatePicker
                      value={rewardEndDate}
                      minDate={minSelectableEnd}
                      onChange={(v) =>
                        dispatch(patchRewardDialogForm({ rewardEndDate: v }))
                      }
                    />
                  }
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <GamifyDialogButton
                  variant="secondary"
                  className="flex flex-1"
                  type="button"
                  onClick={() => dispatch(closeRewardDialog())}
                >
                  Cancel
                </GamifyDialogButton>
                <GamifyDialogButton
                  variant="primary"
                  className="flex flex-1"
                  type="button"
                  onClick={() => {
                    console.log("[Create Reward] form", rewardFormSnapshot);
                    dispatch(closeRewardDialog());
                  }}
                >
                  Create Reward
                </GamifyDialogButton>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <TierSelectPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
