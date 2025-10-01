import React, { Suspense, useState } from "react";
import Link from "next/link";

import {
  Store,
  XCircle,
  Package,
  AlertTriangle,
  PackageX,
  Users,
  Scale,
  ArrowRight,
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

import { useStartLegalProcess } from "@/features/seller-profile";

import { SellerProfileCategory } from "@/entities/brand-protection/seller-profile/model/types";

import { useSellerProfileData } from "../model";
import { SellerProfileSkeleton } from "./skeleton";

interface SellerProfileCardProps {
  sellerId: number;
  showViewSellerButton?: boolean;
}

export function SellerProfileCard({
  sellerId,
  showViewSellerButton = true,
}: SellerProfileCardProps) {
  const { profile, stats, category, isLoading } =
    useSellerProfileData(sellerId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const startLegalProcessMutation = useStartLegalProcess();
  const toast = useToast();

  const CategoryIcon = category.icon;
  const isLegalProcessStarted =
    profile?.category === SellerProfileCategory.REPORTED;

  const handleConfirmLegalProcess = () => {
    setIsDialogOpen(false);
    startLegalProcessMutation.mutate(sellerId, {
      onSuccess: () => {
        toast.success(
          "Legal Process Started",
          "The closure process has been initiated. You can track the process from the 'Actions' page."
        );
      },
      onError: () => {
        toast.error(
          "Failed to Start Legal Process",
          "An error occurred while starting the legal process. Please try again."
        );
      },
    });
  };

  if (isLoading) return <SellerProfileSkeleton />;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-xl font-semibold">
              {profile?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {profile?.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    {showViewSellerButton && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/dashboard/sellers/${sellerId}`}
                          className="inline-flex items-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          View Seller
                        </Link>
                      </Button>
                    )}
                    {isLegalProcessStarted ? (
                      <Badge variant="warningSoft" size="lg">
                        <Scale className="w-4 h-4 mr-2" />
                        Legal Process Started
                      </Badge>
                    ) : (
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => setIsDialogOpen(true)}
                        disabled={startLegalProcessMutation.isPending}
                      >
                        <Scale className="w-4 h-4 mr-2" />
                        {startLegalProcessMutation.isPending
                          ? "Starting..."
                          : "Start Legal Process"}
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
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

                {/* Brands */}
                {profile?.brands && profile?.brands.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile?.brands.map((brand, idx) => (
                      <Badge key={idx} variant="secondarySoft" size="default">
                        {brand.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Statistics */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Active Product
                  </p>
                  <p className="text-sm font-semibold">{stats?.total}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Risky Product</p>
                  <p className="text-sm font-semibold">{stats?.risky}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PackageX className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Closed Product
                  </p>
                  <p className="text-sm font-semibold">{stats?.closed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Process Confirmation Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start Legal Process</AlertDialogTitle>
              <AlertDialogDescription>
                By requesting a legal process for this seller, you will create a
                closure request. You can track the closure process from the
                &quot;Action Status&quot; page.
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
      </CardContent>
    </Card>
  );
}
