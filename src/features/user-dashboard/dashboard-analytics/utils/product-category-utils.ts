interface SortByRiskyCountItem {
  details_for_risky: { risky_count: number };
}

export const sortByRiskyCount = (
  a: SortByRiskyCountItem,
  b: SortByRiskyCountItem
) => b.details_for_risky.risky_count - a.details_for_risky.risky_count;
