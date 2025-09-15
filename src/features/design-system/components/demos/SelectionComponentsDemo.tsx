"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Label } from "@/common/components/ui/primitives/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/common/components/ui/primitives/radio-group";
import { Checkbox } from "@/common/components/ui/primitives/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/primitives/select";

export function SelectionComponentsDemo() {
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Selection Components</CardTitle>
        <CardDescription>
          Radio groups, checkboxes, and selects (no animations)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Radio Group</Label>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">Option 3</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Checkboxes</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={checkboxValue}
                onCheckedChange={(checked) =>
                  setCheckboxValue(
                    checked === "indeterminate" ? false : checked
                  )
                }
              />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Subscribe to newsletter</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Select Menu</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
