import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils/ui";
import { formatRatingDisplay } from "@/lib/utils/convert-rating-5-based";

const ratingStarVariants = cva("", {
  variants: {
    size: {
      default: "w-4 h-4",
      sm: "w-3 h-3",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const ratingTextVariants = cva("font-semibold", {
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
      xl: "text-lg",
    },
  },
});

interface RatingProps extends VariantProps<typeof ratingStarVariants> {
  /**
   * @default true
   */
  showRatingCount?: boolean;
  rating?: number;
  maxRating?: number;
  className?: string;
  activeStarClassName?: string;
}

export default function Rating({
  showRatingCount = true,
  rating,
  maxRating,
  className,
  size = "default",
  activeStarClassName,
}: RatingProps) {
  const ratingValue = typeof rating === "number" && rating > 0 ? rating : 0;
  const ratingDisplay = formatRatingDisplay(ratingValue);
  const maxRatingDisplay = maxRating ? formatRatingDisplay(maxRating) : null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              ratingStarVariants({ size }),
              index < Math.floor(ratingValue)
                ? cn("fill-primary text-primary", activeStarClassName)
                : "text-muted-foreground"
            )}
          />
        ))}
      </div>
      {showRatingCount && (
        <span className={cn(ratingTextVariants({ size }))}>
          {ratingValue > 0 ? ratingDisplay : "-"}
          {maxRatingDisplay && `/${maxRatingDisplay}`}
        </span>
      )}
    </div>
  );
}
