"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { ROUTES } from "@/lib/config/routes";

import LogoutVerificationPage from "@/features/authentication/pages/logout-verification-page";

import { useUserLogout } from "@/hooks/use-user-dashboard";

export default function LogoutRoute() {
  const router = useRouter();

  const logout = useUserLogout(false);

  useEffect(() => {
    setTimeout(async () => {
      await logout.mutateAsync();

      setTimeout(() => {
        router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
      }, 2000);
    }, 1000);
  }, []);

  return (
    <LogoutVerificationPage
      showError={!!logout.data?.error}
      showSuccess={logout.data?.success}
    />
  );
}
