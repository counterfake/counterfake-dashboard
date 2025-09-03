"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/primitives/table";
import { Button } from "@/common/components/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/primitives/tooltip";

import TopRiskyCategoriesSkeleton from "./top-risky-categories-skeleton";
import TopRiskyCategoriesError from "./top-risky-categories-error";
import { ROUTES } from "@/common/lib/config/routes";

interface TopRiskyCategoriesProps {
  topRiskyCategories: {
    name: string;
    riskyProducts: number;
    totalProducts: number;
    id: number;
  }[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TopRiskyCategories({
  topRiskyCategories = [],
  isLoading = false,
  isError = false,
}: TopRiskyCategoriesProps) {
  if (isLoading) return <TopRiskyCategoriesSkeleton />;
  if (isError) return <TopRiskyCategoriesError />;

  const isDataExists = topRiskyCategories.length > 0;

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Top Risky Categories</CardTitle>
        <CardDescription>
          Risky categories are the categories that have the most fake products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isDataExists ? (
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Risky Products</TableHead>
                  <TableHead className="text-center">Total Products</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRiskyCategories.map((category) => {
                  return (
                    <TableRow
                      key={category.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="font-semibold text-primary">
                          {category.riskyProducts}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {category.totalProducts}
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="soft"
                              size="icon"
                              className="flex items-center gap-2 mx-auto"
                              asChild
                            >
                              <Link
                                href={`${ROUTES.USER_DASHBOARD_PRODUCTS}?productCategory=${category.id}`}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View products</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground h-[400px] flex items-center justify-center">
            No risky categories found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
