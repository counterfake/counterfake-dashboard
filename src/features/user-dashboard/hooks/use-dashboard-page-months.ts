import React from "react";

export function useDashboardPageMonths() {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(12);

  const monthOptions = [
    { value: 12, label: "Last 12 months" },
    { value: 6, label: "Last 6 months" },
  ];

  return {
    selectedMonth,
    setSelectedMonth,
    monthOptions,
  };
}
