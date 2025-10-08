import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/shared/ui/primitives/button";
import {
  Calendar,
  User,
  AlertTriangle,
  FileText,
  Mail,
  ExternalLink,
  DollarSign,
  Store,
} from "lucide-react";
import { SellerCase } from "../model";
import { formatDistance } from "date-fns";
import { sellerProfileService } from "@/entities/brand-protection/seller-profile/model/services";
import { useAuthStore } from "@/common/lib/stores/auth-store";

interface CaseCardProps {
  sellerCase: SellerCase;
  highlighted?: boolean;
}

function getCaseBadgeInfo(case_: SellerCase) {
  if (case_.actionType === "online" && case_.softNoticeStatus !== undefined) {
    return sellerProfileService.getSoftNoticeInfo(case_.softNoticeStatus);
  }
  if (case_.actionType === "legal" && case_.legalTakedownStatus !== undefined) {
    return sellerProfileService.getLegalTakedownInfo(case_.legalTakedownStatus);
  }
  return { label: "", variant: "default", icon: AlertTriangle } as const;
}

export function CaseCard({ sellerCase, highlighted = false }: CaseCardProps) {
  const {
    user: {
      brand: { name: defaultBrandName },
    },
  } = useAuthStore();
  const statusInfo = getCaseBadgeInfo(sellerCase);

  const StatusIcon = statusInfo.icon;

  const reportedDate = new Date(sellerCase.reportDate);
  const lastUpdatedDate = new Date(sellerCase.lastUpdated);
  const timeAgo = formatDistance(reportedDate, new Date(), { addSuffix: true });

  const brands =
    sellerCase.brands.length > 0 ? sellerCase.brands : [defaultBrandName];

  return (
    <Card
      id={`case-card-${sellerCase.sellerId}`}
      variant="interactive"
      className={`w-full ${highlighted ? "ring-2 ring-primary/60" : ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                {sellerCase.sellerName}
              </CardTitle>
              {statusInfo.label && (
                <Badge
                  variant={statusInfo.variant as any}
                  className="flex items-center py-1"
                >
                  {sellerCase.actionType === "online"
                    ? "Soft Notice"
                    : "Legal Takedown"}
                  :
                  <StatusIcon className="h-3 w-3 ml-1 mr-0.5" />
                  {statusInfo.label}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{sellerCase.caseNumber}</span>
              <span>•</span>
              <span>{sellerCase.platforms.join(", ")}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Case Description */}
        <div className="space-y-2">
          <p className="text-sm text-foreground leading-relaxed">
            {sellerCase.description}
          </p>
        </div>

        {/* Seller Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm border-primary/20 py-1">
              <span className="flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-primary" /> Contact:
              </span>
              <span className="font-semibold text-foreground">
                {sellerCase.sellerEmail}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm border-primary/20 py-1">
              <span className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-primary" /> Reported by:
              </span>
              <span className="font-semibold text-foreground">
                {sellerCase.reportedBy}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm border-primary/20 py-1">
              <span className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Evidence:
              </span>
              <span className="font-semibold text-foreground">
                {sellerCase.evidenceCount} files
              </span>
            </div>
            {sellerCase.compensationAmount && (
              <div className="flex items-center gap-1 text-sm border-success/30 py-1">
                <span className="flex items-center gap-2 text-foreground">
                  <DollarSign className="h-5 w-5 text-success" />
                  Compensation:
                </span>
                <span className="font-semibold text-success">
                  ${sellerCase.compensationAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {brands.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {brands.map((brand) => (
              <Badge key={brand} variant="primarySoft" size="sm">
                {brand}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Reported {timeAgo}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Updated {lastUpdatedDate.toLocaleString()}</span>
            </div>
          </div>

          <Button variant="soft" className="text-xs">
            View Details
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
