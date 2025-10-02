import { ProductStatus } from "./types";

export const productService = {
  getStatusLabel: (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.Risky:
        return { label: "Risky", variant: "destructiveSoft" as const };
      case ProductStatus.NotRisky:
        return { label: "Not Risky", variant: "successSoft" as const };
      case ProductStatus.BrandDecision:
        return { label: "Brand Decision", variant: "warningSoft" as const };
      case ProductStatus.SecondHand:
        return { label: "Second Hand", variant: "warningSoft" as const };
      case ProductStatus.OnHold:
        return { label: "On Hold", variant: "default" as const };
      case ProductStatus.ParallelImport:
        return { label: "Parallel Import", variant: "infoSoft" as const };
      case ProductStatus.BrandMonitor:
        return { label: "Brand Monitor", variant: "infoSoft" as const };
      case ProductStatus.ThirdParty:
        return { label: "Third Party", variant: "default" as const };
      default:
        return { label: "Unknown", variant: "default" as const };
    }
  },
};
