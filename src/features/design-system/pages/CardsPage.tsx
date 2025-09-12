"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Separator } from "@/common/components/ui/primitives/separator";
import { SellerCard } from "@/common/components/ui/enhanced-seller-card";

import PageWrapper from "../components/PageWrapper";

const sampleSeller = {
  id: "1",
  name: "SportShoes Ltd",
  email: "contact@sportshoes.com",
  phone: "+1 234 567 8900",
  address: "123 Sport Street, NY 10001",
  platforms: ["Amazon", "eBay", "Shopify"],
  totalProducts: 245,
  activeProducts: 189,
  closedProducts: 56,
  riskyProducts: 12,
  riskLevel: "low" as const,
  trustScore: 87,
  responseRate: 95,
};

export default function CardsPage() {
  return (
    <PageWrapper className="space-y-8">
      {/* Product Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Product Cards</CardTitle>
          <CardDescription>
            Different variants for product display
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Default Product Card</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <DefaultBrandProductCard product={mockBrandProducts[0]} />
              <DefaultBrandProductCard product={mockBrandProducts[1]} />
              <DefaultBrandProductCard product={mockBrandProducts[2]} />
              <DefaultBrandProductCard product={mockBrandProducts[3]} /> */}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Compact Product Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <CompactBrandProductCard product={mockBrandProducts[0]} />
              <CompactBrandProductCard product={mockBrandProducts[1]} /> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seller Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Cards</CardTitle>
          <CardDescription>
            Seller information with different detail levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Detailed Seller Card</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SellerCard seller={sampleSeller} variant="detailed" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Standard Seller Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SellerCard seller={sampleSeller} />
              <SellerCard
                seller={{
                  ...sampleSeller,
                  id: "2",
                  name: "Risky Seller",
                  category: "risky",
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Compact Seller Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SellerCard seller={sampleSeller} variant="compact" />
              <SellerCard
                seller={{
                  ...sampleSeller,
                  id: "3",
                  name: "Medium Risk",
                  category: "risky",
                }}
                variant="compact"
              />
              <SellerCard
                seller={{
                  ...sampleSeller,
                  id: "4",
                  name: "Low Risk",
                  category: "not risky",
                }}
                variant="compact"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
