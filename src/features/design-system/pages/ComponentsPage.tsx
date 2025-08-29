"use client";

import { AlertsDemo } from "@/features/design-system/components/demos/AlertsDemo";
import { BadgesAndAvatarsDemo } from "@/features/design-system/components/demos/BadgesAndAvatarsDemo";
import { ButtonsDemo } from "@/features/design-system/components/demos/ButtonsDemo";
import { ChartsDemo } from "@/features/design-system/components/demos/ChartsDemo";
import { ComboboxDemo } from "@/features/design-system/components/demos/ComboboxDemo";
import { DataTableDemo } from "@/features/design-system/components/demos/DataTableDemo";
import { DatePickerDemo } from "@/features/design-system/components/demos/DatePickerDemo";
import { IconShowcaseDemo } from "@/features/design-system/components/demos/IconShowcaseDemo";
import { InputComponentsDemo } from "@/features/design-system/components/demos/InputComponentsDemo";
import { InteractiveControlsDemo } from "@/features/design-system/components/demos/InteractiveControlsDemo";
import { InteractiveOverlaysDemo } from "@/features/design-system/components/demos/InteractiveOverlaysDemo";
import { NavigationComponentsDemo } from "@/features/design-system/components/demos/NavigationComponentsDemo";
import { SelectionComponentsDemo } from "@/features/design-system/components/demos/SelectionComponentsDemo";
import PageWrapper from "../components/PageWrapper";
import { ToastDemo } from "../components/demos/ToastDemo";

export default function ComponentsPage() {
  return (
    <PageWrapper className="space-y-8">
      {/* Charts */}
      <ChartsDemo />

      {/* Data Table */}
      <DataTableDemo />

      {/* Date Picker & Combobox */}
      <div className="grid md:grid-cols-2 gap-6">
        <DatePickerDemo />
        <ComboboxDemo />
      </div>

      {/* Buttons */}
      <ButtonsDemo />

      {/* Form Components */}
      <div className="grid md:grid-cols-2 gap-6">
        <InputComponentsDemo />
        <SelectionComponentsDemo />
      </div>

      {/* Interactive Components */}
      <div className="grid md:grid-cols-2 gap-6">
        <InteractiveControlsDemo />
        <BadgesAndAvatarsDemo />
      </div>

      {/* Alerts */}
      <AlertsDemo />

      {/* Navigation Components */}
      <NavigationComponentsDemo />

      {/* Interactive Overlays */}
      <InteractiveOverlaysDemo />

      {/* Icon Showcase */}
      <IconShowcaseDemo />

      {/* Toast */}
      <ToastDemo />
    </PageWrapper>
  );
}
