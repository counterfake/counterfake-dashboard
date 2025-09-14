"use client";

import React from "react";

import { setupInterceptors } from "@/shared/api/brand-protection/bp-api.interceptors";

setupInterceptors();

export default function SetupInterceptorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
