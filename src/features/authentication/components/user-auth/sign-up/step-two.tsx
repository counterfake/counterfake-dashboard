"use client";

import React from "react";
import { Shield, MapPin, ShoppingCart, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Label } from "@/components/ui/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";
import { Checkbox } from "@/components/ui/primitives/checkbox";
import { cn } from "@/lib/utils/ui";
import type { StepProps } from "../../../types/user-auth-types";
import { COUNTRIES } from "../../../types/user-auth-types";

export function StepTwo({
  formData,
  onUpdateData,
  onNext,
  onPrevious,
}: StepProps) {
  const handleCountryChange = (value: string) => {
    onUpdateData({ operatingCountry: value });
  };

  const handlePlatformChange = (
    platform: "ecommerce" | "socialMedia",
    checked: boolean
  ) => {
    onUpdateData({
      protectionPlatforms: {
        ...formData.protectionPlatforms,
        [platform]: checked,
      },
    });
  };

  const isStepValid =
    formData.operatingCountry.length > 0 &&
    (formData.protectionPlatforms.ecommerce ||
      formData.protectionPlatforms.socialMedia);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Sizi Nasıl, Ne Şekilde Koruyalım?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Faaliyet gösterdiğiniz ülke ve korunmak istediğiniz platformları
            seçin
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Operating Country */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Hangi ülkede faaliyet gösteriyorsunuz?
            <span className="text-destructive">*</span>
          </Label>

          <Select
            value={formData.operatingCountry}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="h-12 text-base border-2 border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200">
              <SelectValue placeholder="Ülke seçin" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground">
            Bu bilgi, yerel düzenlemeler ve koruma stratejileri için gereklidir
          </p>
        </div>

        {/* Protection Platforms */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-foreground">
            Korunmak istediğiniz platformları seçin
            <span className="text-destructive ml-1">*</span>
          </Label>

          <div className="space-y-4">
            {/* E-commerce Protection */}
            <div className="border border-border/60 rounded-xl p-6 hover:border-border transition-colors">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id="ecommerce"
                  checked={formData.protectionPlatforms.ecommerce}
                  onCheckedChange={(checked) =>
                    handlePlatformChange("ecommerce", checked === true)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-primary" />
                    </div>
                    <Label
                      htmlFor="ecommerce"
                      className="text-base font-semibold cursor-pointer"
                    >
                      E-ticaret Platformlarında Koruma
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Amazon, eBay, Trendyol, Hepsiburada gibi e-ticaret
                    sitelerinde sahte ürün satışlarına karşı koruma sağlar
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-md">
                      Amazon
                    </span>
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-md">
                      eBay
                    </span>
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-md">
                      Trendyol
                    </span>
                    <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-md">
                      +20 Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Protection */}
            <div className="border border-border/60 rounded-xl p-6 hover:border-border transition-colors">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id="socialMedia"
                  checked={formData.protectionPlatforms.socialMedia}
                  onCheckedChange={(checked) =>
                    handlePlatformChange("socialMedia", checked === true)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <Label
                      htmlFor="socialMedia"
                      className="text-base font-semibold cursor-pointer"
                    >
                      Sosyal Medya Platformlarında Koruma
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Instagram, Facebook, TikTok gibi sosyal medya
                    platformlarında sahte hesaplar ve yanıltıcı içeriklere karşı
                    koruma sağlar
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md">
                      Instagram
                    </span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md">
                      Facebook
                    </span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md">
                      TikTok
                    </span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md">
                      +15 Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isStepValid && (
            <p className="text-xs text-muted-foreground">
              En az bir koruma türü seçmelisiniz
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex-1 h-12 text-base font-medium border-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <Button
          onClick={onNext}
          disabled={!isStepValid}
          className={cn(
            "flex-1 h-12 text-base font-semibold transition-all duration-200",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80",
            "shadow-lg hover:shadow-xl"
          )}
        >
          Kayıt Ol
        </Button>
      </div>
    </div>
  );
}
