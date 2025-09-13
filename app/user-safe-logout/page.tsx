"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { ROUTES } from "@/common/lib/config/routes";

import LogoutVerificationPage from "@/common/components/pages/logout-verification-page";

import { useCustomerLogout } from "@/features/authentication/hooks/use-customer-auth";

export default function LogoutRoute() {
  const router = useRouter();

  const logout = useCustomerLogout();

  useEffect(() => {
    setTimeout(async () => {
      await logout.mutateAsync();

      setTimeout(() => {
        router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
      }, 1000);
    }, 1000);
  }, []);

  return (
    <LogoutVerificationPage
      showError={!!logout.data?.error}
      showSuccess={logout.data?.success}
    />
  );
}
