"use client";

import React, { useRef, useState } from "react";
import { Upload, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { cn } from "@/lib/utils/ui";
import type { StepProps } from "../../../types/user-auth-types";

export function StepOne({ formData, onUpdateData, onNext }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      onUpdateData({ brandLogo: file });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const isStepValid =
    formData.brandName.trim().length >= 2 &&
    formData.brandWebsite.trim().length >= 3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Introduce Your Brand
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Share the basic information to help us understand your brand and web
            presence
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Brand Name */}
        <div className="space-y-3">
          <Label
            htmlFor="brandName"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-primary" />
            Brand Name
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="brandName"
            type="text"
            value={formData.brandName}
            onChange={(e) => onUpdateData({ brandName: e.target.value })}
            placeholder="Enter your brand name"
            required
          />
          <p className="text-xs text-muted-foreground">
            This name will be used to identify your brand in our protection
            systems
          </p>
        </div>

        {/* Brand Logo Upload */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Brand Logo
          </Label>

          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80",
              formData.brandLogo ? "border-success bg-success/5" : ""
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
              className="hidden"
            />

            {formData.brandLogo ? (
              <div className="space-y-3">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-success">
                    Logo Uploaded
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.brandLogo.name}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drag and drop your logo file here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to select a file (PNG, JPG, SVG)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Brand Website */}
        <div className="space-y-3">
          <Label
            htmlFor="brandWebsite"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-primary" />
            Brand Website
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="brandWebsite"
            type="url"
            value={formData.brandWebsite}
            onChange={(e) => onUpdateData({ brandWebsite: e.target.value })}
            placeholder="https://yourbrand.com"
            required
          />
          <p className="text-xs text-muted-foreground">
            Your official website will be used to verify your brand and
            determine protection coverage
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4">
        <Button
          onClick={onNext}
          disabled={!isStepValid}
          className={cn(
            "w-full h-12 text-base font-semibold transition-all duration-200",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80",
            "shadow-lg hover:shadow-xl"
          )}
        >
          Continue
        </Button>

        {!isStepValid && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Please fill in the required fields to continue
          </p>
        )}
      </div>
    </div>
  );
}
