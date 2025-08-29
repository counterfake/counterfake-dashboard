"use client";

import React from "react";

import ErrorPage from "@/features/authentication/pages/error-page";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorPageProps) {
  return <ErrorPage error={error} reset={reset} />;
}
