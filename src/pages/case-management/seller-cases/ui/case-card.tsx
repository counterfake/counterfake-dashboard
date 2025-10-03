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
import { SellerCase, SellerCaseStatus } from "../model";
import { formatDistance } from "date-fns";

interface CaseCardProps {
  sellerCase: SellerCase;
}

const statusConfig = {
  [SellerCaseStatus.INITIATED]: {
    label: "Action Initiated",
    variant: "warningSoft" as const,
    description: "Investigation has started",
  },
  [SellerCaseStatus.EXPERT_REVIEW]: {
    label: "Expert Review",
    variant: "infoSoft" as const,
    description: "Under expert evaluation",
  },
  [SellerCaseStatus.MEDIATION]: {
    label: "In Mediation",
    variant: "primarySoft" as const,
    description: "Mediation process ongoing",
  },
  [SellerCaseStatus.COMPENSATION_RECEIVED]: {
    label: "Compensation Received",
    variant: "successSoft" as const,
    description: "Compensation has been paid",
  },
  [SellerCaseStatus.CLOSED]: {
    label: "Case Closed",
    variant: "default" as const,
    description: "Case resolved and closed",
  },
};

const priorityConfig = {
  low: { variant: "default" as const, color: "text-muted-foreground" },
  medium: { variant: "warningSoft" as const, color: "text-warning" },
  high: { variant: "destructiveSoft" as const, color: "text-destructive" },
};

export function CaseCard({ sellerCase }: CaseCardProps) {
  const statusInfo = statusConfig[sellerCase.status];
  const priorityInfo = priorityConfig[sellerCase.priority];

  const reportedDate = new Date(sellerCase.reportDate);
  const lastUpdatedDate = new Date(sellerCase.lastUpdated);
  const timeAgo = formatDistance(reportedDate, new Date(), { addSuffix: true });

  return (
    <Card variant="interactive" className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                {sellerCase.sellerName}
              </CardTitle>
              <Badge variant={statusInfo.variant} size="sm" className="text-xs">
                {statusInfo.label} ({sellerCase.priority})
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{sellerCase.caseNumber}</span>
              <span>•</span>
              <span>{sellerCase.platform}</span>
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
        {sellerCase.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {sellerCase.tags.map((tag) => (
              <Badge key={tag} variant="primarySoft" size="sm">
                {tag}
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
              <span>
                Updated{" "}
                {formatDistance(lastUpdatedDate, new Date(), {
                  addSuffix: true,
                })}
              </span>
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
