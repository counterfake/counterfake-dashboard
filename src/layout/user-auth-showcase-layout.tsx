"use client";

import React from "react";

import AppLogo from "@/common/components/ui/data-display/app-logo";
import Footer from "@/common/components/ui/layouts/footer";

import BrandProtectionShowcase from "@/common/components/ui/data-display/brand-protection-showcase";

export default function UserAuthShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Main Content Area */}
        <main className="flex items-center justify-center p-6 lg:p-8 relative">
          <div className="relative z-10 w-full max-w-md fade-in">
            {children}
          </div>
        </main>

        {/* Showcase Sidebar */}
        <aside className="hidden lg:block relative overflow-hidden">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-primary/5" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 32px, oklch(var(--primary)) 32px, oklch(var(--primary)) 34px)`,
            }}
          />

          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-8 lg:p-12">
            {/* Logo and Content Section */}
            <div className="relative text-center space-y-4 mb-16 fade-in">
              <div className="relative mx-auto flex items-center justify-center group">
                <AppLogo
                  className="w-36 h-36 lg:w-44 lg:h-44 select-none"
                  draggable={false}
                />
              </div>

              {/* Enhanced Typography */}
              <div className="space-y-6 max-w-md mx-auto">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                  Your AI-Powered Protection Agent
                </h1>

                <p className="text-base lg:text-lg text-muted-foreground font-medium leading-relaxed">
                  Detecting fakes. Dismantling networks.
                  <br />
                  <span className="text-primary font-semibold">
                    Defending your brand—24/7.
                  </span>
                </p>
              </div>
            </div>

            <div className="fade-in w-full flex justify-center">
              <BrandProtectionShowcase />
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
