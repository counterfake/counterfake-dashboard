export function formatProductsMonthlyChartData(
  data: {
    month: string;
    risky_product_count: number;
    closed_product_count: number;
  }[]
) {
  return data.map((item) => ({
    month: new Date(item.month).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
    riskyProducts: item.risky_product_count,
    closedProducts: item.closed_product_count,
  }));
}

export function formatSellersMonthlyChartData(
  data: {
    month: string;
    risky_seller_count: number;
    closed_seller_count: number;
  }[]
) {
  return data.map((item) => ({
    month: new Date(item.month).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
    riskySellers: item.risky_seller_count,
    closedSellers: item.closed_seller_count,
  }));
}

export function formatPlatformsChartData(
  data: {
    name: string;
    value: number;
  }[]
) {
  return data.map((item) => ({
    platform: item.name,
    product: item.value,
  }));
}
