"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  ComposedChart,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Users,
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/primitives/chart";

import { StatsCard } from "@/common/components/ui/data-display/cards/stats-card";
import { SimpleStatsCard } from "@/common/components/ui/data-display/cards/simple-stats-card";

import { mockDashboardStats } from "@/common/lib/mock-data";

// Chart configurations
const barChartConfig = {
  products: {
    label: "Total Products",
    color: "var(--primary)",
  },
  risky: {
    label: "Risky Products",
    color: "var(--primary)",
  },
  safe: {
    label: "Safe Products",
    color: "var(--primary-light)",
  },
} satisfies ChartConfig;

const lineChartConfig = {
  closedProducts: {
    label: "Closed Products",
    color: "var(--primary)",
  },
  riskyProducts: {
    label: "Risky Products",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  risky: {
    label: "Risky",
    color: "var(--primary)",
  },
  safe: {
    label: "Safe",
    color: "var(--primary-light)",
  },
  review: {
    label: "Under Review",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// Sample data
const monthlyProductData = [
  { month: "Jan", products: 400, risky: 24, safe: 376 },
  { month: "Feb", products: 300, risky: 13, safe: 287 },
  { month: "Mar", products: 450, risky: 28, safe: 422 },
  { month: "Apr", products: 278, risky: 39, safe: 239 },
  { month: "May", products: 520, risky: 31, safe: 489 },
  { month: "Jun", products: 389, risky: 22, safe: 367 },
];

const trendsData = mockDashboardStats.closedProductsStats.map(
  (item, index) => ({
    month: item.month.split(" ")[0].substring(0, 3),
    closedProducts: item.count,
    riskyProducts: mockDashboardStats.riskyProductStats[index]?.count || 0,
  })
);

const distributionData = [
  { name: "Safe Products", value: 1453, color: "hsl(var(--primary))" },
  { name: "Risky Products", value: 153, color: "hsl(var(--primary) / 0.8)" },
  { name: "Under Review", value: 89, color: "hsl(var(--primary) / 0.6)" },
];

const platformData = mockDashboardStats.topRiskyPlatforms.map(
  (platform, index) => ({
    name: platform.platform,
    value: platform.count,
    fill: `oklch(var(--primary) / ${1 - index * 0.15})`,
  })
);

const radialData = mockDashboardStats.topRiskyClasses.map(
  (category, index) => ({
    category: category.category,
    count: category.count,
    percentage: category.percentage,
    fill: `oklch(var(--primary) / ${1 - index * 0.1})`,
  })
);

export function ChartsDemo() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics Cards</CardTitle>
          <CardDescription>Display key metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Revenue"
              value={48572}
              icon={BarChart3}
              description="from last month"
            />
            <StatsCard
              title="Active Users"
              value={2456}
              icon={Users}
              description="from last month"
            />
            <StatsCard
              title="Risk Level"
              value="Medium"
              icon={AlertTriangle}
              description="from last month"
            />
            <StatsCard
              title="Growth Rate"
              value="23.5%"
              icon={TrendingUp}
              description="from last month"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simple Statistics Cards</CardTitle>
          <CardDescription>Display key metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SimpleStatsCard
              title="Total Revenue"
              value={48572}
              icon={BarChart3}
              description="from last month"
            />
            <SimpleStatsCard
              title="Active Users"
              value={2456}
              icon={Users}
              description="from last month"
            />
            <SimpleStatsCard
              title="Risk Level"
              value="Medium"
              icon={AlertTriangle}
              description="from last month"
            />
            <SimpleStatsCard
              title="Growth Rate"
              value="23.5%"
              icon={TrendingUp}
              description="from last month"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Bar Chart
            </CardTitle>
            <CardDescription>Monthly product analysis results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <BarChart data={monthlyProductData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="products"
                    fill="var(--color-products)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="risky"
                    fill="var(--color-risky)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Line Chart
            </CardTitle>
            <CardDescription>Time series trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer
                config={lineChartConfig}
                className="h-full w-full"
              >
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="closedProducts"
                    stroke="var(--color-closedProducts)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="riskyProducts"
                    stroke="var(--color-riskyProducts)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Area Chart
            </CardTitle>
            <CardDescription>Cumulative change visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <AreaChart data={monthlyProductData}>
                  <defs>
                    <linearGradient
                      id="safeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="riskyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="safe"
                    stroke="hsl(var(--primary))"
                    fill="url(#safeGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="risky"
                    stroke="hsl(var(--primary))"
                    fill="url(#riskyGradient)"
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-primary" />
              Pie Chart
            </CardTitle>
            <CardDescription>Product status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={pieChartConfig} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value.toLocaleString()} products
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radial Bar Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Radial Bar Chart
            </CardTitle>
            <CardDescription>Category-based risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={pieChartConfig} className="h-full w-full">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="90%"
                  data={radialData}
                >
                  <RadialBar dataKey="percentage" cornerRadius={10} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.category}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.count} products ({data.percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadialBarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Composed Chart */}
        <Card className="fade-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Composed Chart
            </CardTitle>
            <CardDescription>Platform-based distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <ComposedChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value} risky products
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary) / 0.7)"
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Usage Guide */}
      <Card className="fade-in">
        <CardHeader>
          <CardTitle>Chart Usage Guide</CardTitle>
          <CardDescription>
            Guide on when and how to use these chart components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Bar Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                Used to compare categorical data. Monthly sales, product
                categories, etc.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                Line Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                Ideal for showing time series data. Track trends and changes
                over time.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Area Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                For showing cumulative data and changes in total values over
                time.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <PieChartIcon className="w-4 h-4 text-primary" />
                Pie Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                For showing parts of a whole. Ideal for visualizing percentage
                distributions.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                Radial Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                Used to display cyclical data and goal achievement rates.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                Composed Chart
              </h3>
              <p className="text-sm text-muted-foreground">
                For displaying different data types on the same chart. Bar and
                line combination.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
