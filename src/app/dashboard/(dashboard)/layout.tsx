"use client";

import React from "react";

import { GENERAL_CONFIG } from "@/common/lib/config/general";
import { useAuthStore } from "@/common/lib/stores/auth-store";
import { useUserConfigStore } from "@/common/lib/stores/user-config-store";

import { useAppVersionInfo } from "@/common/hooks/use-app-version-info";

import {
  DashboardSidebar,
  DashboardSidebarProvider,
} from "@/features/user-dashboard/components/dashboard-sidebar";
import InfoBar from "@/features/user-dashboard/components/info-bar";
import GiveFeedbackForBetaDialog from "@/features/user-dashboard/components/give-feedback-for-beta-dialog";

import { useBetaFeedback } from "@/features/notifications/email/hooks/use-internal-email";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [betaFeedbackDialogOpen, setBetaFeedbackDialogOpen] =
    React.useState(false);

  const { user } = useAuthStore();
  const userConfig = useUserConfigStore();
  const sendBetaFeedback = useBetaFeedback();
  const { version } = useAppVersionInfo();

  const handleSendBetaFeedback = (message: string) => {
    sendBetaFeedback.mutate(message);
  };

  return (
    <div>
      <DashboardSidebarProvider>
        <DashboardSidebar
          appName={GENERAL_CONFIG.APP_NAME}
          brandName={user?.brand.name || "-"}
          appVersion={version ?? "-"}
        />
        <main className="w-full">
          <InfoBar
            onFeedbackClick={() => setBetaFeedbackDialogOpen(true)}
            showFeedbackButton={!userConfig.hasGivenFeedbackForBeta}
          />
          <div className="max-w-6xl mx-auto p-4">{children}</div>
        </main>
      </DashboardSidebarProvider>

      {/* Give Feedback For Beta Dialog */}
      <GiveFeedbackForBetaDialog
        isOpen={betaFeedbackDialogOpen}
        isSuccess={userConfig.hasGivenFeedbackForBeta}
        isError={sendBetaFeedback.isError}
        onSend={handleSendBetaFeedback}
        onOpenChange={setBetaFeedbackDialogOpen}
      />
    </div>
  );
}
