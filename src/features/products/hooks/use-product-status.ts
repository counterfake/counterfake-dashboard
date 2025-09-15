import { JSX } from "react";
import {
  ArrowDownToDot,
  Building,
  FileClock,
  History,
  Loader,
  ScanEye,
  SearchCheck,
  TriangleAlert,
} from "lucide-react";

import { ProductStatusKey } from "../types/product-status.types";

export function useProductStatusUIVariables() {
  const icons = {
    risky: TriangleAlert,
    "not-risky": SearchCheck,
    "brand-decision": Building,
    "second-hand": History,
    "on-hold": Loader,
    "parallel-import": ArrowDownToDot,
    "brand-monitor": ScanEye,
    "third-party": FileClock,
  } as const satisfies Record<ProductStatusKey, JSX.ElementType>;

  const colors = {
    risky: "destructive",
    "not-risky": "success",
    "brand-decision": "warning",
    "second-hand": "info",
    "on-hold": "default",
    "parallel-import": "default",
    "brand-monitor": "default",
    "third-party": "default",
  } as const satisfies Record<ProductStatusKey, string>;

  const getIcon = (statusKey: ProductStatusKey) => {
    return icons[statusKey];
  };

  const getColor = (statusKey: ProductStatusKey) => {
    return colors[statusKey];
  };

  return {
    icons,
    colors,
    getIcon,
    getColor,
  };
}
