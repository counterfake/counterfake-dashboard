"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";
import { Label } from "@/components/ui/primitives/label";
import { Switch } from "@/components/ui/primitives/switch";
import { Slider } from "@/components/ui/primitives/slider";
import { Progress } from "@/components/ui/primitives/progress";

export function InteractiveControlsDemo() {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(65);

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Interactive Controls</CardTitle>
        <CardDescription>
          Switches, sliders (no animation), and progress indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
          <Switch
            id="airplane-mode"
            checked={switchValue}
            onCheckedChange={setSwitchValue}
          />
        </div>

        <div className="space-y-2">
          <Label>Volume: {sliderValue[0]}%</Label>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Progress: {progressValue}%</Label>
          <Progress
            value={progressValue}
            className="w-full transition-all duration-500"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
            >
              -10%
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setProgressValue(Math.min(100, progressValue + 10))
              }
            >
              +10%
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
