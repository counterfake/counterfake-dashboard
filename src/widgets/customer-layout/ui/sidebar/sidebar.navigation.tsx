"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/ui/primitives/collapsible";

import { cn } from "@/shared/lib/cn";

import { CustomerLayoutConfig, NavigationItem } from "../../customer-layout.config";

interface CustomerSidebarNavigationProps {
  currentPage: string;
  navigations: CustomerLayoutConfig["SIDEBAR"]["NAVIGATIONS"];
}

export function CustomerSidebarNavigation({
  currentPage,
  navigations,
}: CustomerSidebarNavigationProps) {
  return (
    <nav className="flex-1 p-4 space-y-1">
      {navigations.map((item) => {
        if (item.items && item.items.length > 0) {
          return <CollapsibleNavigationItem key={item.id} item={item} currentPage={currentPage} />;
        }

        return <SimpleNavigationItem key={item.id} item={item} currentPage={currentPage} />;
      })}
    </nav>
  );
}

interface SimpleNavigationItemProps {
  item: NavigationItem;
  currentPage: string;
}

function SimpleNavigationItem({ item, currentPage }: SimpleNavigationItemProps) {
  const Icon = item.icon;
  const isActive = currentPage === item.href;

  return (
    <Link href={item.href!} className="inline-block w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start focus-within:ring-transparent hover:bg-muted",
          isActive && "bg-muted text-accent-foreground"
        )}
      >
        <Icon className="w-4 h-4 mr-3" />
        {item.label}
      </Button>
    </Link>
  );
}

interface CollapsibleNavigationItemProps {
  item: NavigationItem;
  currentPage: string;
}

function CollapsibleNavigationItem({ item, currentPage }: CollapsibleNavigationItemProps) {
  const Icon = item.icon;
  const hasActiveChild = item.items?.some((subItem) => currentPage === subItem.href);
  const [isOpen, setIsOpen] = React.useState(hasActiveChild);

  React.useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start focus-within:ring-transparent hover:bg-muted",
            hasActiveChild && "bg-muted/50"
          )}
        >
          <Icon className="w-4 h-4 mr-3" />
          {item.label}
          <ChevronRight
            className={cn(
              "ml-auto h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 space-y-1 pt-1">
        {item.items?.map((subItem) => {
          const isActive = currentPage === subItem.href;

          return (
            <Link key={subItem.id} href={subItem.href} className="inline-block w-full">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start focus-within:ring-transparent hover:bg-muted",
                  isActive && "bg-muted text-accent-foreground"
                )}
              >
                <span className="text-sm">{subItem.label}</span>
              </Button>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
