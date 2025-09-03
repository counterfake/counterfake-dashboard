"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";

import PageWrapper from "../components/PageWrapper";

export default function DesignSystemPage() {
  return (
    <PageWrapper>
      {/* Foundations Tab */}
      <div className="space-y-8">
        {/* Brand Colors */}
        <Card className="fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary rounded-full"></div>
              Brand Colors
            </CardTitle>
            <CardDescription>
              Our primary and secondary color palette
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-full h-20 bg-primary rounded-lg shadow-lg"></div>
                <div>
                  <p className="font-medium">Primary</p>
                  <p className="text-sm text-muted-foreground">#014289</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-full h-20 bg-secondary rounded-lg shadow-lg"></div>
                <div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm text-muted-foreground">#9dee66</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-full h-20 bg-success rounded-lg shadow-lg"></div>
                <div>
                  <p className="font-medium">Success</p>
                  <p className="text-sm text-muted-foreground">Success Green</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-full h-20 bg-warning rounded-lg shadow-lg"></div>
                <div>
                  <p className="font-medium">Warning</p>
                  <p className="text-sm text-muted-foreground">
                    Warning Orange
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography Scale</CardTitle>
            <CardDescription>
              Consistent text hierarchy for all components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">Heading 1 - 36px Bold</h1>
              <h2 className="text-3xl font-semibold">
                Heading 2 - 30px Semibold
              </h2>
              <h3 className="text-2xl font-semibold">
                Heading 3 - 24px Semibold
              </h3>
              <h4 className="text-xl font-semibold">
                Heading 4 - 20px Semibold
              </h4>
              <p className="text-base">Body Text - 16px Regular</p>
              <p className="text-sm text-muted-foreground">
                Small Text - 14px Muted
              </p>
              <p className="text-xs text-muted-foreground">
                Caption - 12px Muted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing System</CardTitle>
            <CardDescription>8px base unit spacing system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
                <div key={size} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {size * 4}px
                  </div>
                  <div
                    className="bg-primary rounded"
                    style={{ width: `${size * 4}px`, height: "16px" }}
                  />
                  <div className="text-sm text-muted-foreground">
                    space-{size} / p-{size} / m-{size}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
