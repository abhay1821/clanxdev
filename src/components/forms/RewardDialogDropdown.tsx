import { useEffect, useRef, useState } from "react";
import {
  POST_PERIOD_OPTIONS,
  REWARD_EVENT_OPTIONS,
  REWARD_WITH_OPTIONS,
} from "../../data/rewardFormOptions";
import {
  formatRewardEventTriggerText,
  formatRewardWithTriggerText,
} from "../../utils/rewardFormDisplay";
import { ChevronDownIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type {
  RewardEventFormSnapshot,
  RewardWithFormSnapshot,
} from "../../store/gamificationDialogSlice";
import {
  patchRewardDialogForm,
  pickRewardEventRow,
  pickRewardWithRow,
} from "../../store/gamificationDialogSlice";
import { RewardFormDropdown } from "./RewardFormDropdown";

export type RewardDialogDropdownField = "event" | "with";

interface RewardDialogDropdownProps {
  field: RewardDialogDropdownField;
  label: string;
  placeholder: string;
  required?: boolean;
}

function RewardEventCrossSalesNested() {
  const dispatch = useAppDispatch();
  const crossSalesAmount = useAppSelector(
    (s) => s.gamificationDialog.crossSalesAmount,
  );

  return (
    <div className="px-[9px] pb-2 pt-1">
      <div className="flex items-center gap-2 rounded-[8.75px] border-2 border-[#C530C5] px-2.5 py-[9px]">
        <span className="shrink-0 font-dm text-[16px] text-[#2A2C31]">$</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 100"
          value={crossSalesAmount}
          onChange={(e) =>
            dispatch(
              patchRewardDialogForm({
                crossSalesAmount: e.target.value.replace(/\D/g, ""),
              }),
            )
          }
          className="min-w-0 flex-1 bg-transparent font-dm text-[16px] leading-[140%] text-[#2A2C31] outline-none placeholder:text-[#B5B5B5]"
        />
      </div>
    </div>
  );
}

function RewardEventPostsNested() {
  const dispatch = useAppDispatch();
  const postsCount = useAppSelector((s) => s.gamificationDialog.postsCount);
  const postsPeriodId = useAppSelector(
    (s) => s.gamificationDialog.postsPeriodId,
  );

  const [periodMenuOpen, setPeriodMenuOpen] = useState(false);
  const periodRootRef = useRef<HTMLDivElement>(null);
  const periodLabel =
    POST_PERIOD_OPTIONS.find((o) => o.id === postsPeriodId)?.label ?? "";

  useEffect(() => {
    if (!periodMenuOpen) return;
    function handlePointerDown(e: MouseEvent) {
      const el = periodRootRef.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      setPeriodMenuOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [periodMenuOpen]);

  return (
    <div className="flex flex-col gap-2 pb-2 pt-1">
      <div className="flex min-w-0 gap-2 px-[9px]">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 22"
          value={postsCount}
          onChange={(e) =>
            dispatch(
              patchRewardDialogForm({
                postsCount: e.target.value.replace(/\D/g, ""),
              }),
            )
          }
          className="h-10 min-w-0 w-0 flex-1 rounded-[8.75px] border-2 border-[#C530C5] px-[10px] py-[9px] font-dm text-[16px] leading-[140%] text-[#2A2C31] outline-none placeholder:text-[#B5B5B5]"
        />
        <div ref={periodRootRef} className="relative min-w-0 w-0 flex-1">
          <button
            type="button"
            onClick={() => setPeriodMenuOpen((v) => !v)}
            className={`flex h-10 w-full items-center justify-between rounded-[8.75px] border bg-white px-[10px] py-[9px] font-dm text-[16px] leading-[140%] outline-none transition-colors ${
              periodMenuOpen
                ? "border-2 border-[#C530C5]"
                : "border border-[#D5D6DA]"
            }`}
          >
            <span
              className={`truncate text-left ${periodLabel ? "text-[#2A2C31]" : "text-[#B5B5B5]"}`}
            >
              {periodLabel || "Select duration"}
            </span>
            <ChevronDownIcon open={periodMenuOpen} />
          </button>
          {periodMenuOpen ? (
            <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-[8.75px] border border-[#D5D6DA] bg-white py-1 shadow-card">
              {POST_PERIOD_OPTIONS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="w-full px-[9px] py-[9px] text-left font-dm text-[16px] leading-[140%] text-[#2A2C31] hover:bg-[#FAEEFA]/60"
                    onClick={() => {
                      dispatch(patchRewardDialogForm({ postsPeriodId: p.id }));
                      setPeriodMenuOpen(false);
                    }}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function RewardWithFlatBonusNested() {
  const dispatch = useAppDispatch();
  const flatBonusAmount = useAppSelector(
    (s) => s.gamificationDialog.flatBonusAmount,
  );

  return (
    <div className="px-[9px] pb-2 pt-1">
      <div className="flex items-center gap-2 rounded-[8.75px] border-2 border-[#C530C5] px-2.5 py-[9px]">
        <span className="shrink-0 font-dm text-[16px] text-[#2A2C31]">$</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 100"
          value={flatBonusAmount}
          onChange={(e) =>
            dispatch(
              patchRewardDialogForm({
                flatBonusAmount: e.target.value.replace(/\D/g, ""),
              }),
            )
          }
          className="min-w-0 flex-1 bg-transparent font-dm text-[16px] leading-[140%] text-[#2A2C31] outline-none placeholder:text-[#B5B5B5]"
        />
      </div>
    </div>
  );
}

export function RewardDialogDropdown({
  field,
  label,
  placeholder,
  required = false,
}: RewardDialogDropdownProps) {
  const dispatch = useAppDispatch();
  const rewardDialog = useAppSelector((s) => s.gamificationDialog);

  const rewardEventSnapshotRef = useRef<RewardEventFormSnapshot | null>(null);
  const rewardWithSnapshotRef = useRef<RewardWithFormSnapshot | null>(null);

  if (field === "event") {
    const {
      rewardEventId,
      crossSalesAmount,
      postsCount,
      postsPeriodId,
    } = rewardDialog;

    const captureSnapshot = () => {
      rewardEventSnapshotRef.current = {
        rewardEventId,
        crossSalesAmount,
        postsCount,
        postsPeriodId,
      };
    };

    const formatSelection = () =>
      formatRewardEventTriggerText({
        rewardEventId,
        crossSalesAmount,
        postsCount,
        postsPeriodId,
      });

    return (
      <RewardFormDropdown
        label={label}
        placeholder={placeholder}
        required={required}
        selectedId={rewardEventId}
        options={REWARD_EVENT_OPTIONS}
        formatSelection={formatSelection}
        onPickOption={(id) => dispatch(pickRewardEventRow(id))}
        renderNested={(optionId) => {
          if (optionId === "cross-sales") return <RewardEventCrossSalesNested />;
          if (optionId === "posts-period") return <RewardEventPostsNested />;
          return null;
        }}
        shouldShowFooter={(id) =>
          id === "cross-sales" || id === "posts-period"
        }
        onPanelOpen={captureSnapshot}
        onFooterCancel={() => {
          const snap = rewardEventSnapshotRef.current;
          if (snap) dispatch(patchRewardDialogForm(snap));
        }}
        onFooterSave={captureSnapshot}
        closePanelAfterPick={(id) => id === "is-onboarded"}
      />
    );
  }

  const { rewardWithId, flatBonusAmount, commissionTierId } = rewardDialog;

  const captureWithSnapshot = () => {
    rewardWithSnapshotRef.current = {
      rewardWithId,
      flatBonusAmount,
      commissionTierId,
    };
  };

  const formatWithSelection = () =>
    formatRewardWithTriggerText({
      rewardWithId,
      flatBonusAmount,
      commissionTierId,
    });

  return (
    <RewardFormDropdown
      label={label}
      placeholder={placeholder}
      required={required}
      selectedId={rewardWithId}
      options={REWARD_WITH_OPTIONS}
      formatSelection={formatWithSelection}
      onPickOption={(id) => {
        dispatch(pickRewardWithRow(id));
        if (id === "commissioner") {
          dispatch(patchRewardDialogForm({ rewardDialogView: "tier-select" }));
        }
      }}
      renderNested={(optionId) =>
        optionId === "flat-bonus" ? <RewardWithFlatBonusNested /> : null
      }
      shouldShowFooter={(id) => id === "flat-bonus"}
      onPanelOpen={captureWithSnapshot}
      onFooterCancel={() => {
        const snap = rewardWithSnapshotRef.current;
        if (snap) dispatch(patchRewardDialogForm(snap));
      }}
      onFooterSave={captureWithSnapshot}
      closePanelAfterPick={(id) => id === "commissioner"}
    />
  );
}
