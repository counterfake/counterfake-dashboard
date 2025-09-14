"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ArrowRight, X } from "lucide-react";

import BrandLogo from "@/shared/ui/brand-logo";

import { PAGE_ROUTES } from "@/shared/routes/page-routes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/ui/primitives/sidebar";
import { Button } from "@/shared/ui/primitives/button";

import { CustomerSidebarNavigation } from "./sidebar.navigation";
import { CUSTOMER_LAYOUT_CONFIG } from "../../customer-layout.config";
import { SwitchBrand } from "@/features/customer/switch-brand/switch-brand.ui";
import { useAuthStore } from "@/common/lib/stores/auth-store";

interface CustomerSidebarProps {
  appName: string;
  brandName: string;
  appVersion: string;
}

export function CustomerSidebar({
  appName,
  brandName,
  appVersion,
}: CustomerSidebarProps) {
  const router = useRouter();
  const currentPage = usePathname();
  const { checkRoles } = useAuthStore();

  const handleLogout = () => {
    router.push(PAGE_ROUTES.USER_DASHBOARD_LOGOUT);
  };

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="p-0">
        <Link
          href="/dashboard"
          className="relative w-full p-6 border-b border-border flex items-center justify-center group/header hover:bg-muted overflow-hidden"
        >
          <BrandLogo className="w-20 transition-all duration-300" />
          <X className="w-4 h-4 mx-3" />

          <div className="relative overflow-hidden flex-1 h-20 transition-all duration-300">
            {/* Brand Section */}
            <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out translate-x-0 opacity-100 group-hover/header:-translate-x-full group-hover/header:opacity-0">
              <h2 className="font-semibold text-lg capitalize">{brandName}</h2>
              <p className="text-sm text-muted-foreground">Brand Protection</p>
            </div>

            {/* Slogan Section */}
            <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out -translate-x-full opacity-0 group-hover/header:translate-x-0 group-hover/header:opacity-100">
              <h2 className="font-semibold text-lg">{appName}</h2>
              <p className="whitespace-nowrap text-xs text-muted-foreground flex items-center gap-2">
                Go to Dashboard <ArrowRight className="w-2 h-2" />
              </p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <CustomerSidebarNavigation
          currentPage={currentPage}
          navigations={CUSTOMER_LAYOUT_CONFIG.SIDEBAR.NAVIGATIONS}
        />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-center font-semibold text-muted-foreground/70">
              App Version: <span>v{appVersion}</span>
            </p>
          </div>
          <div className="p-4 border-t border-border space-y-4">
            {checkRoles("admin") && <SwitchBrand />}
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
