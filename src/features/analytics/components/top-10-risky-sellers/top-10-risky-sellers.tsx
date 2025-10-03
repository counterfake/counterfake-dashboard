import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Top10RiskySellersSkeleton from "./top-10-risky-sellers-skeleton";
import Top10RiskySellersError from "./top-10-risky-sellers-error";
import { PAGE_ROUTES } from "@/shared/routes/page-routes";

interface Top10RiskySellersProps {
  topRiskySellers: {
    id: string;
    name: string;
    riskyProducts: number;
    totalProducts: number;
    isClosed: boolean;
  }[];
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export function Top10RiskySellers({
  topRiskySellers,
  isError,
  isLoading,
  className,
}: Top10RiskySellersProps) {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const perPage = 5;

  if (isLoading)
    return (
      <div className={className}>
        <Top10RiskySellersSkeleton />
      </div>
    );
  if (isError)
    return (
      <div className={className}>
        <Top10RiskySellersError />
      </div>
    );

  const isDataExists = topRiskySellers.length > 0;

  const topRiskySellersWithNumber = topRiskySellers.map((seller, index) => ({
    ...seller,
    number: index + 1,
  }));

  const filteredTopRiskySellers = topRiskySellersWithNumber.slice(
    currentPageIndex * perPage,
    currentPageIndex * perPage + perPage
  );

  const handlePrevPage = () => {
    setCurrentPageIndex((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prev) => prev + 1);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top 10 Risky Sellers</CardTitle>
        <CardDescription>
          We have detected the top 10 riskiest profiles for your brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* List */}
          {isDataExists ? (
            <div className="grid grid-cols-1 gap-2 p-1">
              {filteredTopRiskySellers.map((seller) => (
                <Link
                  key={seller.number}
                  href={`${PAGE_ROUTES.USER_DASHBOARD_SELLERS}/${seller.id}`}
                  className={`flex hover:bg-accent items-center gap-5 py-2 px-4 rounded-lg transition-all duration-200`}
                >
                  <div className="flex-shrink-0 text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground">
                    {seller.number}
                  </div>
                  <div className="truncate flex-1">
                    <h4 className="text-base font-medium transition-colors">
                      {seller.name}
                    </h4>
                    <div className="text-sm font-medium text-primary">
                      {seller.riskyProducts} risky products
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-base text-muted-foreground h-[200px] flex items-center justify-center">
              No data available
            </div>
          )}
        </div>
      </CardContent>
      {isDataExists && (
        <CardFooter className="flex flex-col gap-2">
          {topRiskySellers.length > perPage && (
            <>
              {currentPageIndex > 0 ? (
                <Button
                  className="w-full"
                  variant="soft"
                  size="sm"
                  onClick={handlePrevPage}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Prev
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="soft"
                  size="sm"
                  onClick={handleNextPage}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </>
          )}
          <Button size="sm" variant="outline" className="w-full">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
