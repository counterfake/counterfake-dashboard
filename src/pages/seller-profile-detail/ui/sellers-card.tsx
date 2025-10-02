import React from "react";
import { CircleUser } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { SellerProfile } from "@/entities/brand-protection/seller-profile/model/types";

import { SellerItem } from "./seller-item";

interface SellersCardProps {
  sellers: SellerProfile["sellers"];
}

export function SellersCard({ sellers }: SellersCardProps) {
  if (!sellers || sellers.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleUser className="w-5 h-5" />
          Reported Seller Accounts
        </CardTitle>
        <CardDescription>
          Seller accounts reported on different platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sellers.map((seller, idx) => (
            <SellerItem
              key={seller.id}
              seller={seller}
              showSeparator={idx > 0}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
