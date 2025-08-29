"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { AuthTokens, DashboardType, User, UserRole } from "@/types/auth";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  currentDashboard: DashboardType | null;
  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  setTokens: (tokens: AuthState["tokens"]) => void;
  updateTokens: (tokens: Partial<AuthState["tokens"]>) => void;
  /**
   * Returns the time until the session expires in milliseconds.
   *
   * @returns The time until the session expires in milliseconds, or null if there are no tokens.
   */
  getSessionExpiry: () => number;
  setCurrentDashboard: (dashboard: DashboardType) => void;
  clear: () => void;
  checkRoles: (
    /**
     * The roles that are required to access the resource.
     *
     * If an array is provided, the user must have all of the roles in the array.
     *
     * If a single role is provided, the user must have that role.
     */
    requiredRoles: UserRole[] | UserRole,
    /**
     * If true, all required roles must be present in the user roles.
     *
     * If false, any of the required roles must be present in the user roles.
     */
    matchAll: boolean
  ) => boolean;
  hasValidSession: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      currentDashboard: null,
      setTokens: (tokens: AuthState["tokens"]) => {
        set({
          tokens,
        });
      },
      updateTokens: (tokens: Partial<AuthState["tokens"]>) => {
        const prevState = get().tokens || ({} as AuthTokens);

        set({
          tokens: {
            ...prevState,
            ...tokens,
          },
        });
      },
      setUser: (user: User) => {
        set({
          user,
        });
      },
      updateUser: (user: Partial<User>) => {
        const prevState = get().user || ({} as User);

        set({
          user: {
            ...prevState,
            ...user,
          },
        });
      },
      setCurrentDashboard: (dashboard: AuthState["currentDashboard"]) => {
        set({
          currentDashboard: dashboard,
        });
      },
      clear: () => {
        set({
          user: null,
          tokens: null,
          currentDashboard: null,
        });
      },
      checkRoles: (
        /**
         * The roles that are required to access the resource.
         *
         * If an array is provided, the user must have all of the roles in the array.
         *
         * If a single role is provided, the user must have that role.
         */
        requiredRoles: UserRole[] | UserRole,
        /**
         * If true, all required roles must be present in the user roles.
         *
         * If false, any of the required roles must be present in the user roles.
         */
        matchAll: boolean = false
      ) => {
        const userRoles = get().user?.role || [];

        if (requiredRoles instanceof Array) {
          if (matchAll) {
            return requiredRoles.every((role) => userRoles.includes(role));
          }

          return requiredRoles.some((role) => userRoles.includes(role));
        }

        return userRoles.includes(requiredRoles);
      },
      hasValidSession: () => {
        const tokens = get().tokens;
        const user = get().user;
        const sessionExpiry = get().getSessionExpiry() || 0;

        return (
          !!tokens?.accessToken &&
          !!tokens?.refreshToken &&
          sessionExpiry > 0 &&
          !!user
        );
      },
      getSessionExpiry: () => {
        const tokens = get().tokens;

        if (!tokens) return 0;

        const expiresIn = Number(tokens.expiresIn || 0) * 1000; // convert to milliseconds
        const expiresAt = Number(tokens.fetchedAt || 0) + expiresIn;
        const now = Date.now();

        return expiresAt - now;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
