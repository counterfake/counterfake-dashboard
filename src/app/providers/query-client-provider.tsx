"use client";

import React from "react";

import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/query-client";

interface Props {
  children: React.ReactNode;
}

export default function QueryClientProvider({ children }: Props) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
