"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserConfigState {
  productGridLayout: "default" | "compact" | "minimal";
  updateProductGridLayout: (layout: "default" | "compact" | "minimal") => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  persist(
    (set, get) => ({
      productGridLayout: "default",
      updateProductGridLayout: (layout) => {
        set({
          productGridLayout: layout,
        });
      },
    }),
    {
      name: "user-config-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
