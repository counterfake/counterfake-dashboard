"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import { Label } from "@/common/components/ui/primitives/label";
import { Calendar } from "@/common/components/ui/primitives/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/primitives/popover";
import { format } from "date-fns";
import { cn } from "@/common/lib/utils/ui";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Date Picker</CardTitle>
        <CardDescription>Calendar component for date selection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Pick a date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all duration-300",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
