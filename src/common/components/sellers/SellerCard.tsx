import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import { Seller } from "@/common/lib/mock-data";
import { Eye, Mail, Phone, MapPin } from "lucide-react";

interface SellerCardProps {
  seller: Seller;
  onViewDetails: (seller: Seller) => void;
}

export default function SellerCard({ seller, onViewDetails }: SellerCardProps) {
  return (
    <Card className="fade-in hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{seller.name}</span>
          <div className="flex items-center space-x-2">
            {seller.riskyProducts > 0 && (
              <span className="status-badge status-risky">
                {seller.riskyProducts} Risky
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active Products</span>
            <p className="font-medium">{seller.activeProducts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Closed Products</span>
            <p className="font-medium">{seller.closedProducts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total Products</span>
            <p className="font-medium">{seller.totalProducts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Platforms</span>
            <p className="font-medium">{seller.platforms.length}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{seller.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{seller.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{seller.address}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Platforms:</p>
          <div className="flex flex-wrap gap-2">
            {seller.platforms.map((platform) => (
              <span
                key={platform}
                className="px-2 py-1 bg-muted rounded-full text-xs"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewDetails(seller)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
