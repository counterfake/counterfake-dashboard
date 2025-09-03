"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserConfigState {
  productGridLayout: "default" | "compact" | "minimal";
  hasGivenFeedbackForBeta: boolean;
  updateProductGridLayout: (layout: "default" | "compact" | "minimal") => void;
  updateHasGivenFeedbackForBeta: (hasGivenFeedbackForBeta: boolean) => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  persist(
    (set, get) => ({
      productGridLayout: "default",
      hasGivenFeedbackForBeta: false,
      updateProductGridLayout: (layout) => {
        set({
          productGridLayout: layout,
        });
      },
      updateHasGivenFeedbackForBeta: (hasGivenFeedbackForBeta) => {
        set({
          hasGivenFeedbackForBeta,
        });
      },
    }),
    {
      name: "user-config-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
