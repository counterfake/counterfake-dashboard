import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/primitives/button";
import { cn } from "@/lib/utils/ui";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  UserRound,
} from "lucide-react";

interface SellerCardProps {
  seller: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    platforms: string[];
    totalProducts: number;
    activeProducts: number;
    closedProducts: number;
    riskyProducts: number;
    category?: "risky" | "not risky" | "third party";
    trustScore?: number;
    responseRate?: number;
  };
  variant?: "default" | "compact" | "detailed";
  onViewDetails?: (sellerId: string) => void;
  className?: string;
}

export function SellerCard({
  seller,
  variant = "default",
  onViewDetails,
  className,
}: SellerCardProps) {
  const riskPercentage =
    seller.totalProducts > 0
      ? (seller.riskyProducts / seller.totalProducts) * 100
      : 0;

  if (variant === "compact") {
    return (
      <Card variant="interactive" className={cn("overflow-hidden", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium truncate">{seller.name}</h3>
            {seller.category && (
              <Badge
                variant={
                  seller.category === "risky" ? "destructive" : "success"
                }
                className="text-xs"
              >
                {seller.category}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Products</p>
              <p className="font-semibold">{seller.totalProducts}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Risky</p>
              <p className="font-semibold">{seller.riskyProducts}</p>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full mt-3"
            onClick={() => onViewDetails?.(seller.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <UserRound className="w-4 h-4" /> {seller.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {seller.platforms.length} platform
                {seller.platforms.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              {seller.category && (
                <Badge
                  variant={
                    seller.category === "risky" ? "destructive" : "success"
                  }
                  className="text-xs"
                >
                  {seller.category}
                </Badge>
              )}
              {seller.trustScore !== undefined && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Trust Score</p>
                  <p className="font-semibold text-sm">{seller.trustScore}%</p>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Total</span>
                </div>
                <span className="font-medium text-sm">
                  {seller.totalProducts}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Active</span>
                </div>
                <span className="font-medium text-sm">
                  {seller.activeProducts}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">Closed</span>
                </div>
                <span className="font-medium text-sm">
                  {seller.closedProducts}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Risky</span>
                </div>
                <span className="font-medium text-sm">
                  {seller.riskyProducts}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Percentage Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Risk Level</span>
              <span className="font-medium">{riskPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300 bg-primary"
                )}
                style={{ width: `${Math.min(riskPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4" />
              <span className="truncate">{seller.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>{seller.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{seller.address}</span>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Platforms</p>
            <div className="flex flex-wrap gap-1">
              {seller.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="default"
            className="w-full"
            size="sm"
            onClick={() => onViewDetails?.(seller.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Full Details
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{seller.name}</CardTitle>
          {seller.riskyProducts > 0 && (
            <Badge variant="destructive" className="text-xs">
              {seller.riskyProducts} Risky
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active Products</span>
            <p className="font-semibold">{seller.activeProducts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total Products</span>
            <p className="font-semibold">{seller.totalProducts}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-4 h-4" />
            <span className="truncate">{seller.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>{seller.phone}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Platforms:</p>
          <div className="flex flex-wrap gap-1">
            {seller.platforms.slice(0, 3).map((platform) => (
              <Badge key={platform} variant="outline" className="text-xs">
                {platform}
              </Badge>
            ))}
            {seller.platforms.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{seller.platforms.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          size="sm"
          onClick={() => onViewDetails?.(seller.id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
