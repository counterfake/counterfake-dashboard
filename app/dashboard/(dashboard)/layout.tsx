"use client";

import React from "react";

import CustomerLayout from "@/widgets/customer-layout/ui/customer-layout";
import CustomerBrandCheck from "@/widgets/customer-brand-check-ui/ui/customer-brand-check.ui";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerLayout>
      <CustomerBrandCheck>{children}</CustomerBrandCheck>
    </CustomerLayout>
  );
}
