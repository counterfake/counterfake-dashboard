"use client";

import React from "react";

import CustomerAuthGuard from "@/features/authentication/providers/customer-auth-guard";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerAuthGuard>{children}</CustomerAuthGuard>;
}
