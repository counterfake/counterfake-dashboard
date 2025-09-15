"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import { Download, Share } from "lucide-react";

export function ButtonsDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
        <CardDescription>
          Interactive button components with hover animations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Download className="w-4 h-4 mr-2" />
            With Icon
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
