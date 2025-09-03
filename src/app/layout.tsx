import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import ReactQueryProvider from "@/common/providers/react-query-provider";

import ClientRehydrator from "@/common/components/utility/client-rehydrator";

import { AuthRouterProvider } from "@/features/authentication/providers/auth-router-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CounterBrand - Counterfeit Product Detection",
  description:
    "Advanced counterfeit product detection and brand protection platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ReactQueryProvider>
          <AuthRouterProvider>
            <Toaster position="top-right" />
            {children}
          </AuthRouterProvider>
        </ReactQueryProvider>
        <ClientRehydrator />
      </body>
    </html>
  );
}
