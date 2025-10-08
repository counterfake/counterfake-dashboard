"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomerPageWrapper } from "@/widgets/customer-page-layout/customer-page-layout.ui";

import { useSellerCaseList, useSellerCaseStats, SellerCase } from "../model";

// UI Components
import { StatsCards } from "./stats-cards";
import { CaseCard } from "./case-card";
import { CasesPagination } from "./pagination";
import { CasesEmptyState } from "./empty-state";
import { CasesLoadingSkeleton } from "./loading-skeleton";
import { sellerProfileQueries } from "@/entities/brand-protection/seller-profile/query/queries";
import {
  SellerProfileSoftNoticeStatus,
  SellerProfileLegalTakedownStatus,
} from "@/entities/brand-protection/seller-profile/model/types";
import { sellerProfileService } from "@/entities/brand-protection/seller-profile/model/services";
import { useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/common/components/ui/primitives/tabs";
import { useAuthStore } from "@/common/lib/stores/auth-store";

export function SellerCasesPage() {
  const { user } = useAuthStore();

  // Online Takedown (Soft Notice) section state
  const [onlineStatus, setOnlineStatus] =
    useState<SellerProfileSoftNoticeStatus>(
      SellerProfileSoftNoticeStatus.INITIATED
    );
  const [onlinePage, setOnlinePage] = useState(1);

  // Legal Takedown section state
  const [legalStatus, setLegalStatus] =
    useState<SellerProfileLegalTakedownStatus>(
      SellerProfileLegalTakedownStatus.INITIATED
    );
  const [legalPage, setLegalPage] = useState(1);

  // Mock data will be fetched per-section using the new params below

  const { stats, isLoading: statsLoading } = useSellerCaseStats();

  // Demo/prototype: no brand filter context available; use empty array
  const brands: number[] = user?.brand?.ownedBrands;

  // Queries for server-provided lists
  const onlineQuery = useQuery(
    sellerProfileQueries.onlineTakedownList({
      page: onlinePage,
      limit: 6,
      brands,
      softNoticeStatus: onlineStatus,
    })
  );

  const legalQuery = useQuery(
    sellerProfileQueries.legalTakedownList({
      page: legalPage,
      limit: 6,
      brands,
      legalTakedownStatus: legalStatus,
    })
  );

  const onlineStatuses = useMemo(
    () => [
      SellerProfileSoftNoticeStatus.INITIATED,
      SellerProfileSoftNoticeStatus.PRODUCTS_CLOSED,
      SellerProfileSoftNoticeStatus.SELLER_CLOSED,
    ],
    []
  );

  const legalStatuses = useMemo(
    () => [
      SellerProfileLegalTakedownStatus.INITIATED,
      SellerProfileLegalTakedownStatus.EXPERT_REVIEW,
      SellerProfileLegalTakedownStatus.IN_MEDIATION,
      SellerProfileLegalTakedownStatus.CASE_CLOSED,
    ],
    []
  );

  // Map server item (online/soft notice) to local SellerCase (demo defaults)
  const mapOnlineItemToMockCase = (item: any): SellerCase => {
    return {
      id: String(item.id),
      sellerId: String(item.id),
      sellerName: item.name ?? "Unknown Seller",
      sellerEmail: "—",
      platforms: Array.isArray(item.platforms)
        ? item.platforms.filter(Boolean)
        : item.platforms
        ? [String(item.platforms)]
        : [],
      actionType: "online",
      softNoticeStatus: item.softNoticeStatus,
      reportDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      caseNumber: `SC-${item.id}`,
      description: "Online takedown (soft notice) case",
      reportedBy: "System",
      compensationAmount: undefined,
      evidenceCount: 0,
      brands: Array.isArray(item.brands) ? item.brands.filter(Boolean) : [],
    };
  };

  // Map server item (legal takedown) to local SellerCase (demo defaults)
  const mapLegalItemToMockCase = (item: any): SellerCase => {
    return {
      id: String(item.id),
      sellerId: String(item.id),
      sellerName: item.name ?? "Unknown Seller",
      sellerEmail: "—",
      platforms: Array.isArray(item.platforms)
        ? item.platforms.filter(Boolean)
        : item.platforms
        ? [String(item.platforms)]
        : [],
      actionType: "legal",
      legalTakedownStatus: item.legalTakedownStatus,
      reportDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      caseNumber: `SC-${item.id}`,
      description: "Legal takedown case",
      reportedBy: "System",
      compensationAmount: undefined,
      evidenceCount: 0,
      brands: Array.isArray(item.brands) ? item.brands.filter(Boolean) : [],
    };
  };

  // Mock data per-section using the new hook with filters
  const onlineMock = useSellerCaseList({
    actionType: "online",
    softNoticeStatus: onlineStatus,
    page: 1,
    limit: 6,
  });

  const legalMock = useSellerCaseList({
    actionType: "legal",
    legalTakedownStatus: legalStatus,
    page: 1,
    limit: 6,
  });

  // Highlight support via query param
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight") || undefined;

  useEffect(() => {
    if (!highlightId) return;
    // Delay to ensure DOM is rendered
    const t = setTimeout(() => {
      const el = document.getElementById(`case-card-${highlightId}`);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
    return () => clearTimeout(t);
  }, [
    highlightId,
    onlineQuery.data,
    legalQuery.data,
    onlineMock.sellerCases,
    legalMock.sellerCases,
  ]);

  return (
    <CustomerPageWrapper
      title="Seller Cases"
      description="Track and manage cases related to sellers across all platforms. Monitor investigation progress, mediation status, and compensation received."
      breadcrumbs={[
        {
          label: "Case Management",
        },
        {
          label: "Seller Cases",
          current: true,
        },
      ]}
    >
      <section>
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <StatsCards stats={stats} isLoading={statsLoading} />
      </section>
      <div className="space-y-8">
        <Tabs defaultValue="online">
          <TabsList className="w-full">
            <TabsTrigger value="online">Online Takedown Actions</TabsTrigger>
            <TabsTrigger value="legal">Legal Takedown Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="online">
            {/* Online Takedown Actions */}
            <section className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Online Takedown Actions
                </h2>
                <div className="text-sm text-muted-foreground">
                  {onlineQuery.data?.total ?? 0}{" "}
                  {(onlineQuery.data?.total ?? 0) === 1 ? "case" : "cases"}{" "}
                  found
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {onlineStatuses.map((st) => {
                  const info = sellerProfileService.getSoftNoticeInfo(st);
                  const Icon = info.icon as any;
                  const isActive = onlineStatus === st;
                  return (
                    <button
                      key={`soft-${st}`}
                      onClick={() => {
                        setOnlineStatus(st);
                        setOnlinePage(1);
                      }}
                      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "bg-background cursor-pointer"
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {info.label}
                    </button>
                  );
                })}
              </div>

              {onlineQuery.isLoading ? (
                <CasesLoadingSkeleton />
              ) : onlineQuery.isError ? (
                <div className="text-center py-8">
                  <p className="text-destructive">
                    Failed to load online takedown list.
                  </p>
                </div>
              ) : onlineQuery.data && onlineQuery.data.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    {onlineQuery.data.data.map((item: any) => {
                      const adapted: SellerCase = mapOnlineItemToMockCase(item);
                      return (
                        <CaseCard
                          key={`online-${adapted.id}`}
                          sellerCase={adapted}
                          highlighted={highlightId === adapted.sellerId}
                        />
                      );
                    })}
                    {/* Append mock items for the same filter */}
                    {onlineMock.sellerCases.items.map((mockItem) => (
                      <CaseCard
                        key={`online-mock-${mockItem.id}`}
                        sellerCase={mockItem}
                        highlighted={highlightId === mockItem.sellerId}
                      />
                    ))}
                  </div>
                  {onlineQuery.data.pages > 1 && (
                    <div className="flex justify-center mt-4">
                      <CasesPagination
                        currentPage={onlinePage}
                        totalPages={onlineQuery.data.pages}
                        onPageChange={setOnlinePage}
                      />
                    </div>
                  )}
                </>
              ) : // No server data -> show mock list (if any) else empty state
              onlineMock.sellerCases.items.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {onlineMock.sellerCases.items.map((mockItem) => (
                    <CaseCard
                      key={`online-mock-${mockItem.id}`}
                      sellerCase={mockItem}
                    />
                  ))}
                </div>
              ) : (
                <CasesEmptyState hasFilters={true} />
              )}
            </section>
          </TabsContent>

          <TabsContent value="legal">
            {/* Legal Takedown Actions */}
            <section className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Legal Takedown Actions
                </h2>
                <div className="text-sm text-muted-foreground">
                  {legalQuery.data?.total ?? 0}{" "}
                  {(legalQuery.data?.total ?? 0) === 1 ? "case" : "cases"} found
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {legalStatuses.map((st) => {
                  const info = sellerProfileService.getLegalTakedownInfo(st);
                  const Icon = info.icon as any;
                  const isActive = legalStatus === st;
                  return (
                    <button
                      key={`legal-${st}`}
                      onClick={() => {
                        setLegalStatus(st);
                        setLegalPage(1);
                      }}
                      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "bg-background cursor-pointer"
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {info.label}
                    </button>
                  );
                })}
              </div>

              {legalQuery.isLoading ? (
                <CasesLoadingSkeleton />
              ) : legalQuery.isError ? (
                <div className="text-center py-8">
                  <p className="text-destructive">
                    Failed to load legal takedown list.
                  </p>
                </div>
              ) : legalQuery.data && legalQuery.data.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    {legalQuery.data.data.map((item: any) => {
                      const adapted: SellerCase = mapLegalItemToMockCase(item);
                      return (
                        <CaseCard
                          key={`legal-${adapted.id}`}
                          sellerCase={adapted}
                          highlighted={highlightId === adapted.sellerId}
                        />
                      );
                    })}
                    {/* Append mock items for the same filter */}
                    {legalMock.sellerCases.items.map((mockItem) => (
                      <CaseCard
                        key={`legal-mock-${mockItem.id}`}
                        sellerCase={mockItem}
                        highlighted={highlightId === mockItem.sellerId}
                      />
                    ))}
                  </div>
                  {legalQuery.data.pages > 1 && (
                    <div className="flex justify-center mt-4">
                      <CasesPagination
                        currentPage={legalPage}
                        totalPages={legalQuery.data.pages}
                        onPageChange={setLegalPage}
                      />
                    </div>
                  )}
                </>
              ) : // No server data -> show mock list (if any) else empty state
              legalMock.sellerCases.items.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {legalMock.sellerCases.items.map((mockItem) => (
                    <CaseCard
                      key={`legal-mock-${mockItem.id}`}
                      sellerCase={mockItem}
                    />
                  ))}
                </div>
              ) : (
                <CasesEmptyState hasFilters={true} />
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerPageWrapper>
  );
}
