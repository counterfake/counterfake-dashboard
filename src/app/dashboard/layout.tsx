"use client";

import React from "react";

import DashboardAuthGuard from "@/features/user-dashboard/providers/dashboard-auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAuthGuard>{children}</DashboardAuthGuard>;
}
