import Image from "next/image";

import { Badge } from "@/common/components/ui/primitives/badge";

import { SelectableCard } from "@/common/components/ui/data-display/selectable-card";
import { PreventClick } from "@/common/components/utility/prevent-click";

export interface MinimalBrandProductCardProps {
  product: {
    name: string;
    price?: string | number;
    discountedPrice?: string | number;
    imageUrl: string;
    platform: string;
    sellerName?: string;
    sellerUrl?: string;
  };
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}

export function MinimalBrandProductCard({
  product,
  className,
  selectable = false,
  selected = false,
  onSelectChange,
}: MinimalBrandProductCardProps) {
  return (
    <SelectableCard
      selectable={selectable}
      selected={selected}
      onSelectChange={onSelectChange}
      className={className}
    >
      <div className="flex items-center space-x-4 p-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">
            {product.name || (
              <span className="text-muted-foreground">Name not available</span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            {product.sellerName ? (
              <>
                by{" "}
                {!product.sellerUrl ? (
                  <span className="text-primary">{product.sellerName}</span>
                ) : (
                  <PreventClick asChild>
                    <a
                      href={product.sellerUrl || "#"}
                      target="_blank"
                      className="text-primary cursor-pointer"
                    >
                      {product.sellerName}
                    </a>
                  </PreventClick>
                )}
              </>
            ) : null}
            {product.platform
              ? ` on ${product.platform}`
              : "Platform not available"}
          </p>
        </div>
        <div className="text-right">
          {product.discountedPrice ? (
            <div className="flex flex-col">
              <p className="font-medium text-green-600">
                {product.discountedPrice}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                {product.price || "No Price"}
              </p>
            </div>
          ) : (
            <p className="font-medium">{product.price || "No Price"}</p>
          )}
          <Badge variant="destructiveSoft" className="text-xs">
            Risky
          </Badge>
        </div>
      </div>
    </SelectableCard>
  );
}
