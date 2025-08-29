"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/primitives/table";
import { Badge } from "@/components/ui/primitives/badge";

const tableData = [
  {
    id: 1,
    product: "Nike Air Max 90",
    status: "Risky",
    platform: "Amazon",
    price: "$129.99",
  },
  {
    id: 2,
    product: "Nike React Infinity",
    status: "Not Risky",
    platform: "eBay",
    price: "$159.99",
  },
  {
    id: 3,
    product: "Nike Air Force 1",
    status: "Pending",
    platform: "Trendyol",
    price: "$89.99",
  },
  {
    id: 4,
    product: "Nike Dunk Low",
    status: "Brand Decision",
    platform: "Hepsiburada",
    price: "$110.00",
  },
];

export function DataTableDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Data Table</CardTitle>
        <CardDescription>
          Structured data display with sorting and filtering capabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Risky"
                          ? "destructive"
                          : item.status === "Not Risky"
                          ? "success"
                          : item.status === "Pending"
                          ? "info"
                          : "warning"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.platform}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
