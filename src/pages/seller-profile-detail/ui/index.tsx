"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";

import { CustomerPageWrapper } from "@/widgets/customer-page-layout/customer-page-layout.ui";
import { SellerProfileCard } from "@/widgets/seller-profile-card";

// UI
import { ContactInfoCard } from "./contact-info-card";
import { CompanyInfoCard } from "./company-info-card";
import { PlatformsCard } from "./platforms-card";
import { SellersCard } from "./sellers-card";
import { PageSkeleton } from "./page-skeleton";

// Model
import { useSuspenseSellerProfileData } from "../model";

export function SellerProfileDetailPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SellerProfileDetailPageBase />
    </Suspense>
  );
}

function SellerProfileDetailPageBase() {
  const params = useParams();
  const sellerId = params.id as string;

  return (
    <CustomerPageWrapper
      title="Seller Profile"
      description="Information about the seller profile"
      breadcrumbs={[
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Sellers",
          href: "/dashboard/sellers",
        },
        {
          label: "Details",
          href: `/dashboard/sellers/${sellerId}`,
          current: true,
        },
      ]}
    >
      <SellerProfileCard
        sellerId={Number(sellerId)}
        showViewSellerButton={false}
      />

      <SellerProfileContent sellerId={sellerId} />
    </CustomerPageWrapper>
  );
}

function SellerProfileContent({ sellerId }: { sellerId: string }) {
  const { profile } = useSuspenseSellerProfileData(Number(sellerId));

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Left Column - Contact & Company Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactInfoCard profile={profile} />
        <CompanyInfoCard profile={profile} />
      </div>

      {/* Right Column - Platforms & Sellers */}
      <div className="space-y-6">
        <SellersCard sellers={profile.sellers} />
        <PlatformsCard platforms={profile.platforms} />
      </div>
    </div>
  );
}
