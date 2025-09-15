"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/primitives/tabs";
import { cn } from "@/common/lib/utils/ui";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/common/components/ui/primitives/button";

const tabs = [
  {
    label: "Foundations",
    value: "/design-system",
  },
  {
    label: "Components",
    value: "/design-system/components",
  },
  {
    label: "Cards",
    value: "/design-system/cards",
  },
];

export default function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("foundations");

  useEffect(() => {
    const tab = tabs.find((tab) => tab.value === pathname);
    if (tab) {
      setActiveTab(tab.value);
    }
  }, [pathname]);

  return (
    <div className={cn("p-16 max-w-6xl w-full mx-auto space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Link href="/dashboard" className="inline-block">
          <Button variant="ghost" className="text-muted-foreground" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Counterfake Design System</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} asChild>
                <Link href={tab.value}>{tab.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {children}
    </div>
  );
}
