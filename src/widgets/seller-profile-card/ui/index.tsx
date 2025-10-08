import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Store,
  XCircle,
  Package,
  AlertTriangle,
  PackageX,
  Users,
  Scale,
  ArrowRight,
  Flag,
} from "lucide-react";

import useToast from "@/common/hooks/use-toast";

import { Badge } from "@/common/components/ui/primitives/badge";
import { Card, CardContent } from "@/common/components/ui/primitives/card";
import {
  Avatar,
  AvatarFallback,
} from "@/common/components/ui/primitives/avatar";
import { Button } from "@/common/components/ui/primitives/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/ui/primitives/alert-dialog";

import {
  useStartLegalProcess,
  useStartSoftNotice,
} from "@/features/seller-profile";

import { sellerProfileService } from "@/entities/brand-protection/seller-profile/model/services";

import { useSellerProfileData } from "../model";
import { SellerProfileSkeleton } from "./skeleton";
import { DefaultErrorFallback } from "@/shared/ui/error-handler/app-error-boundary";

interface SellerProfileCardProps {
  sellerProfileId: number;
  showViewSellerButton?: boolean;
}

export function SellerProfileCard({
  sellerProfileId,
  showViewSellerButton = true,
}: SellerProfileCardProps) {
  const { profile, stats, category, isLoading, error } =
    useSellerProfileData(sellerProfileId);
  const [isLegalDialogOpen, setIsLegalDialogOpen] = useState(false);
  const [isSoftDialogOpen, setIsSoftDialogOpen] = useState(false);
  const startLegalProcessMutation = useStartLegalProcess();
  const startSoftNoticeMutation = useStartSoftNotice();
  const toast = useToast();
  const router = useRouter();

  const CategoryIcon = category.icon;
  const hasLegalTakedown =
    profile?.legalTakedownStatus !== null &&
    profile?.legalTakedownStatus !== undefined;
  const hasSoftNotice =
    profile?.softNoticeStatus !== null &&
    profile?.softNoticeStatus !== undefined;

  const handleConfirmLegalProcess = () => {
    setIsLegalDialogOpen(false);
    startLegalProcessMutation.mutate(sellerProfileId, {
      onSuccess: () => {
        toast.success(
          "Legal Takedown Started",
          "A legal takedown case has been created for this seller’s physical store. Track progress in Case Management → Seller Cases."
        );
        // Navigate to Seller Cases and highlight this seller's case
        router.push(
          `/dashboard/case-management/seller-cases?highlight=${encodeURIComponent(
            String(sellerProfileId)
          )}`
        );
      },
      onError: () => {
        toast.error(
          "Failed to Start Legal Takedown",
          "An error occurred while starting the legal takedown. Please try again."
        );
      },
    });
  };

  const handleConfirmSoftNotice = () => {
    setIsSoftDialogOpen(false);
    startSoftNoticeMutation.mutate(sellerProfileId, {
      onSuccess: () => {
        toast.success(
          "Soft Notice Sent",
          "A soft notice case has been created to request closure of the seller’s online stores and listings. Track progress in Case Management → Seller Cases."
        );
        // Navigate to Seller Cases and highlight this seller's case
        router.push(
          `/dashboard/case-management/seller-cases?highlight=${encodeURIComponent(
            String(sellerProfileId)
          )}`
        );
      },
      onError: () => {
        toast.error(
          "Failed to Send Soft Notice",
          "An error occurred while sending the soft notice. Please try again."
        );
      },
    });
  };

  if (isLoading) return <SellerProfileSkeleton />;

  if (error) return <DefaultErrorFallback error={error} />;

  return (
    <Card className="mb-6">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
            <AvatarFallback className="text-lg sm:text-xl font-semibold">
              {profile?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                    {profile?.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {showViewSellerButton && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full sm:w-auto"
                      >
                        <Link
                          href={`/dashboard/sellers/${sellerProfileId}`}
                          className="inline-flex items-center gap-2 justify-center"
                        >
                          View Seller
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {/* Status badges if any */}
                    {hasSoftNotice &&
                      (() => {
                        const info = sellerProfileService.getSoftNoticeInfo(
                          profile!.softNoticeStatus as any
                        );
                        const Icon = info.icon;
                        return (
                          <Badge
                            variant={info.variant as any}
                            size="lg"
                            className="w-full sm:w-auto justify-center"
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            <span className="truncate">
                              Soft Notice: {info.label}
                            </span>
                          </Badge>
                        );
                      })()}
                    {hasLegalTakedown &&
                      (() => {
                        const info = sellerProfileService.getLegalTakedownInfo(
                          profile!.legalTakedownStatus as any
                        );
                        const Icon = info.icon;
                        return (
                          <Badge
                            variant={info.variant as any}
                            size="lg"
                            className="w-full sm:w-auto justify-center"
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            <span className="truncate">
                              Legal Takedown: {info.label}
                            </span>
                          </Badge>
                        );
                      })()}
                    {/* Action buttons (disabled if any status exists) */}
                    {!hasLegalTakedown && (
                      <Button
                        size="sm"
                        onClick={() => setIsLegalDialogOpen(true)}
                        className="bg-warning/10 text-warning hover:bg-warning/20 w-full sm:w-auto"
                        disabled={
                          hasLegalTakedown ||
                          startLegalProcessMutation.isPending
                        }
                      >
                        <Scale className="w-4 h-4 mr-2" />
                        <span className="truncate">
                          {startLegalProcessMutation.isPending
                            ? "Starting..."
                            : "Start Legal Takedown"}
                        </span>
                      </Button>
                    )}
                    {!hasSoftNotice && (
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => setIsSoftDialogOpen(true)}
                        disabled={
                          hasSoftNotice || startSoftNoticeMutation.isPending
                        }
                        className="w-full sm:w-auto"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        <span className="truncate">
                          {startSoftNoticeMutation.isPending
                            ? "Sending..."
                            : "Soft Notice"}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3 mt-4">
                  <Badge variant={category.variant} size="default">
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {category.label} Seller
                  </Badge>
                  {profile?.isClosed && (
                    <Badge variant="destructiveSoft" size="default">
                      <XCircle className="w-3 h-3 mr-1" />
                      Closed
                    </Badge>
                  )}
                  <Badge variant="outline" size="default">
                    <Store className="w-3 h-3 mr-1" />
                    {profile?.platformCount} Platforms
                  </Badge>
                  <Badge variant="outline" size="default">
                    <Users className="w-3 h-3 mr-1" />
                    {stats?.accountCount} Accounts
                  </Badge>
                </div>
              </div>
            </div>

            {/* Product Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border/50 p-3 sm:p-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted border border-border/50 shrink-0">
                  <Package className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Active Product
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {stats?.total}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border/50 p-3 sm:p-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted border border-border/50 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Risky Product
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {stats?.risky}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border/50 p-3 sm:p-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted border border-border/50 shrink-0">
                  <PackageX className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Closed Product
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {stats?.closed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Takedown Confirmation Dialog */}
        <AlertDialog
          open={isLegalDialogOpen}
          onOpenChange={setIsLegalDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start Legal Takedown Process</AlertDialogTitle>
              <AlertDialogDescription>
                This will initiate a legal takedown for the seller’s physical
                store. A case will be created under Case Management → Seller
                Cases where you can track progress. Do you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmLegalProcess}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Soft Notice Confirmation Dialog */}
        <AlertDialog open={isSoftDialogOpen} onOpenChange={setIsSoftDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Send Soft Notice</AlertDialogTitle>
              <AlertDialogDescription>
                This will notify platforms to request closure of the seller’s
                online stores and product listings. A case will be created under
                Case Management → Seller Cases where you can track progress. Do
                you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSoftNotice}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
