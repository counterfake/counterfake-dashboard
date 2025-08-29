"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import {
  User,
  Settings,
  Bell,
  Shield,
  Star,
  Heart,
  Share,
  Download,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Target,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react";

export function IconShowcaseDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Icon Library</CardTitle>
        <CardDescription>
          Lucide React icons used throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 md:grid-cols-12 gap-4">
          {[
            { icon: User, name: "User" },
            { icon: Settings, name: "Settings" },
            { icon: Bell, name: "Bell" },
            { icon: Shield, name: "Shield" },
            { icon: Star, name: "Star" },
            { icon: Heart, name: "Heart" },
            { icon: Share, name: "Share" },
            { icon: Download, name: "Download" },
            { icon: CheckCircle, name: "Check" },
            { icon: AlertTriangle, name: "Alert" },
            { icon: Info, name: "Info" },
            { icon: Zap, name: "Zap" },
            { icon: Target, name: "Target" },
            { icon: BarChart3, name: "BarChart" },
            { icon: PieChart, name: "PieChart" },
            { icon: TrendingUp, name: "Trending" },
          ].map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="text-center space-y-2 transition-all duration-200 hover:scale-110"
            >
              <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
