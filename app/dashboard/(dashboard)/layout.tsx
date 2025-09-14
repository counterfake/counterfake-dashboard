"use client";

import React from "react";

import CustomerLayout from "@/widgets/customer-layout/ui/customer-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
