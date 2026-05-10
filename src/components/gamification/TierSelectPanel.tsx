import { useState } from "react";
import { COMMISSION_TIER_OPTIONS } from "../../data/rewardFormOptions";
import { getRewardOptionLabel } from "../../utils/rewardFormDisplay";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { patchRewardDialogForm } from "../../store/gamificationDialogSlice";
import { RewardFormDropdown } from "../forms/RewardFormDropdown";
import { GamifyDialogButton } from "../ui/GamifyDialogButton";

export function TierSelectPanel() {
  const dispatch = useAppDispatch();
  const commissionTierId = useAppSelector(
    (s) => s.gamificationDialog.commissionTierId,
  );

  const [draftTierId, setDraftTierId] = useState(commissionTierId);

  function handleGoBack() {
    dispatch(patchRewardDialogForm({ rewardDialogView: "main" }));
  }

  function handleSave() {
    dispatch(
      patchRewardDialogForm({
        commissionTierId: draftTierId,
        rewardDialogView: "main",
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <RewardFormDropdown
        label="Upgrade to"
        placeholder="Select a tier"
        required
        selectedId={draftTierId}
        options={COMMISSION_TIER_OPTIONS}
        formatSelection={() =>
          getRewardOptionLabel(COMMISSION_TIER_OPTIONS, draftTierId)
        }
        onPickOption={(id) => setDraftTierId(id)}
        closePanelAfterPick={() => true}
      />

      <div className="flex gap-4">
        <GamifyDialogButton
          variant="secondary"
          className="flex flex-1"
          type="button"
          onClick={handleGoBack}
        >
          Go Back
        </GamifyDialogButton>
        <GamifyDialogButton
          variant="primary"
          className="flex flex-1"
          type="button"
          onClick={handleSave}
        >
          Save
        </GamifyDialogButton>
      </div>
    </div>
  );
}
