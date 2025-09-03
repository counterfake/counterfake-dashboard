import React, { Fragment } from "react";
import Link from "next/link";

import { Separator } from "@/common/components/ui/primitives/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/common/components/ui/primitives/breadcrumb";

import { DashboardSidebarToggleButton } from "../dashboard-sidebar";
import GoBackButton from "../go-back-button";

interface DashboardPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showGoBack?: boolean;
  breadcrumbs?: {
    label: string;
    href?: string;
    current?: boolean;
  }[];
}

export default function DashboardPageWrapper({
  children,
  title,
  description,
  showGoBack = true,
  breadcrumbs = [],
}: DashboardPageLayoutProps) {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="pt-4 space-y-8">
        <div className="flex items-center gap-4">
          <DashboardSidebarToggleButton />
          <Separator orientation="vertical" className="h-6" />
          {showGoBack && <GoBackButton />}
          <div>
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    if (breadcrumb.href) {
                      return (
                        <Fragment key={breadcrumb.label}>
                          <BreadcrumbItem>
                            <Link
                              href={breadcrumb.href}
                              className="hover:underline"
                            >
                              {breadcrumb.label}
                            </Link>
                          </BreadcrumbItem>
                          {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                      );
                    }

                    return (
                      <Fragment key={breadcrumb.label}>
                        <BreadcrumbItem
                          className={breadcrumb.current ? "font-bold" : ""}
                        >
                          {breadcrumb.label}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
          {description ? (
            <p className="text-muted-foreground text-base">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 fade-in">{children}</div>
    </div>
  );
}
