import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import QueryClientProvider from "@/app/providers/query-client-provider";
import SetupInterceptorsProvider from "@/app/providers/setup-interceptors-provider";

import ClientRehydrator from "@/common/components/utility/client-rehydrator";

import { AuthRouterProvider } from "@/features/authentication/providers/auth-router-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Counterfake - AI Powered Brand Protection",
  description:
    "Advanced counterfeit brand detection and brand protection platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <QueryClientProvider>
          <AuthRouterProvider>
            <SetupInterceptorsProvider>
              <Toaster position="top-right" />
              {children}
            </SetupInterceptorsProvider>
          </AuthRouterProvider>
        </QueryClientProvider>
        <ClientRehydrator />
      </body>
    </html>
  );
}
