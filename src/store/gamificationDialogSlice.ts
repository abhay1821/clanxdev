import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RewardEventFormSnapshot {
  rewardEventId: string;
  crossSalesAmount: string;
  postsCount: string;
  postsPeriodId: string;
}

export interface RewardWithFormSnapshot {
  rewardWithId: string;
  flatBonusAmount: string;
  commissionTierId: string;
}

export type RewardDialogView = "main" | "tier-select";

export interface GamificationDialogState {
  isOpen: boolean;
  rewardDialogView: RewardDialogView;
  rewardEventId: string;
  rewardWithId: string;
  crossSalesAmount: string;
  postsCount: string;
  postsPeriodId: string;
  flatBonusAmount: string;
  commissionTierId: string;
  isTimeBound: boolean;
  rewardEndDate: string;
}

export type RewardDialogFormPatch = Partial<
  Pick<
    GamificationDialogState,
    | "rewardDialogView"
    | "rewardEventId"
    | "rewardWithId"
    | "crossSalesAmount"
    | "postsCount"
    | "postsPeriodId"
    | "flatBonusAmount"
    | "commissionTierId"
    | "isTimeBound"
    | "rewardEndDate"
  >
>;

const initialState: GamificationDialogState = {
  isOpen: false,
  rewardDialogView: "main",
  rewardEventId: "",
  rewardWithId: "",
  crossSalesAmount: "",
  postsCount: "",
  postsPeriodId: "",
  flatBonusAmount: "",
  commissionTierId: "",
  isTimeBound: false,
  rewardEndDate: "",
};

function applyFormPatch(
  state: GamificationDialogState,
  patch: RewardDialogFormPatch,
) {
  const timeBoundTurnedOff =
    Object.hasOwn(patch, "isTimeBound") && patch.isTimeBound === false;

  const draft = state as unknown as Record<string, unknown>;
  (Object.entries(patch) as [keyof RewardDialogFormPatch, unknown][]).forEach(
    ([key, value]) => {
      if (value === undefined) return;
      draft[key] = value;
    },
  );

  if (timeBoundTurnedOff && !Object.hasOwn(patch, "rewardEndDate")) {
    state.rewardEndDate = "";
  }
}

const gamificationDialogSlice = createSlice({
  name: "gamificationDialog",
  initialState,
  reducers: {
    openRewardDialog(state) {
      state.isOpen = true;
      state.rewardDialogView = "main";
    },
    closeRewardDialog(state) {
      state.isOpen = false;
      state.rewardDialogView = "main";
      state.rewardEventId = "";
      state.rewardWithId = "";
      state.crossSalesAmount = "";
      state.postsCount = "";
      state.postsPeriodId = "";
      state.flatBonusAmount = "";
      state.commissionTierId = "";
      state.isTimeBound = false;
      state.rewardEndDate = "";
    },
    patchRewardDialogForm(state, action: PayloadAction<RewardDialogFormPatch>) {
      applyFormPatch(state, action.payload);
    },
    pickRewardEventRow(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (id === "cross-sales") {
        state.postsCount = "";
        state.postsPeriodId = "";
      } else if (id === "posts-period") {
        state.crossSalesAmount = "";
      } else if (id === "is-onboarded") {
        state.crossSalesAmount = "";
        state.postsCount = "";
        state.postsPeriodId = "";
      }
      state.rewardEventId = id;
    },
    pickRewardWithRow(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (id === "flat-bonus") {
        state.commissionTierId = "";
      } else if (id === "commissioner") {
        state.flatBonusAmount = "";
      }
      state.rewardWithId = id;
    },
  },
});

export const {
  openRewardDialog,
  closeRewardDialog,
  patchRewardDialogForm,
  pickRewardEventRow,
  pickRewardWithRow,
} = gamificationDialogSlice.actions;

export const gamificationDialogReducer = gamificationDialogSlice.reducer;
