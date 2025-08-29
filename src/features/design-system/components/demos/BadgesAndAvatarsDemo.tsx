"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Label } from "@/components/ui/primitives/label";
import { Badge } from "@/components/ui/primitives/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export function BadgesAndAvatarsDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Badges & Avatars</CardTitle>
        <CardDescription>Status indicators and user avatars</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Badge Variants</Label>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Status Badges</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Success
            </Badge>
            <Badge variant="warning">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Warning
            </Badge>
            <Badge variant="info">
              <Info className="w-3 h-3 mr-1" />
              Info
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Avatars</Label>
          <div className="flex gap-4">
            <Avatar className="transition-all duration-300 hover:scale-110">
              <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="transition-all duration-300 hover:scale-110">
              <AvatarFallback className="bg-primary text-primary-foreground">
                AB
              </AvatarFallback>
            </Avatar>
            <Avatar className="transition-all duration-300 hover:scale-110">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                XY
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
