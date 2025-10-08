import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Scale,
  DollarSign,
} from "lucide-react";
import { SellerCaseStats } from "../model";
import { StatsCard } from "@/common/components/ui/data-display/cards/stats-card";

interface StatsCardsProps {
  stats: SellerCaseStats;
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading = false }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Cases",
      value: stats.totalCases,
      icon: FileText,
      description: "All seller cases",
      variant: "default" as const,
    },
    {
      title: "Open Cases",
      value: stats.openCases,
      icon: AlertTriangle,
      description: "Active investigations",
      variant: "warningSoft" as const,
    },
    {
      title: "Closed Cases",
      value: stats.closedCases,
      icon: CheckCircle,
      description: "Resolved cases",
      variant: "successSoft" as const,
    },
    {
      title: "Compensation",
      value: `$${stats.compensationReceived.toLocaleString()}`,
      icon: DollarSign,
      description: "Total received",
      variant: "primarySoft" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={IconComponent}
            description={stat.description}
          />
        );
      })}
    </div>
  );
}
