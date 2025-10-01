import React from "react";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { SellerProfile } from "@/entities/brand-protection/seller-profile/model/types";

interface ContactInfoCardProps {
  profile: SellerProfile;
}

export function ContactInfoCard({ profile }: ContactInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium break-all">
              {profile.email || (
                <span className="text-muted-foreground italic">
                  Not available
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">
              {profile.phoneNumber || (
                <span className="text-muted-foreground italic">
                  Not available
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-medium">
              {profile.address || (
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
