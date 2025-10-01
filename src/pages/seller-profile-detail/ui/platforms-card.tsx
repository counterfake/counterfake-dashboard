import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { SellerProfile } from "@/entities/brand-protection/seller-profile/model/types";
import { Store } from "lucide-react";

interface PlatformsCardProps {
  platforms: SellerProfile["platforms"];
}

export function PlatformsCard({ platforms }: PlatformsCardProps) {
  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="w-5 h-5" />
          Reported Platforms
        </CardTitle>
        <CardDescription>Platforms where this seller is active</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              {platform.iconLink && (
                <Image
                  src={platform.iconLink}
                  alt={platform.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              )}
              <span className="text-sm font-medium truncate">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
