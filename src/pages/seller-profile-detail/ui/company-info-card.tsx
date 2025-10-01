import React from "react";
import { FileText, Hash } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { SellerProfile } from "@/entities/brand-protection/seller-profile/model/types";

interface CompanyInfoCardProps {
  profile: SellerProfile;
}

export function CompanyInfoCard({ profile }: CompanyInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Hash className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Tax Number</p>
            <p className="text-sm font-medium">
              {profile.taxNumber || (
                <span className="text-muted-foreground italic">
                  Not available
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Hash className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Mersis Number</p>
            <p className="text-sm font-medium">
              {profile.mersisNumber || (
                <span className="text-muted-foreground italic">
                  Not available
                </span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
