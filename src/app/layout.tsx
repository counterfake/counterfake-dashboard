import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { AuthProvider } from "@/providers/auth-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

import ClientRehydrator from "@/components/utility/client-rehydrator";

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
          <AuthProvider>
            <Toaster position="top-right" />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <ClientRehydrator />
      </body>
    </html>
  );
}
