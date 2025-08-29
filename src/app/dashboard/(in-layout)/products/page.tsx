"use client";

import React, { Suspense } from "react";

import ProductsPage from "@/features/user-dashboard/pages/products-page";

export default function ProductsRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
