"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function ClientRehydrator() {
  useEffect(() => {
    useAuthStore.persist.rehydrate(); // Manually rehydrate the store
  }, []);

  return null; // Render nothing
}
