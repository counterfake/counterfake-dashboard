import React from "react";
import UserAuthShowcaseLayout from "@/layout/user-auth-showcase-layout";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserAuthShowcaseLayout>{children}</UserAuthShowcaseLayout>;
}
