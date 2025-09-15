import Image, { ImageProps } from "next/image";
import React from "react";

import appLogo from "@/assets/app-logos/app-logo-primary.png";
import appLogoWithoutText from "@/assets/app-logos/app-logo-primary-without-text.png";

import { cn } from "@/shared/lib/cn";

interface BrandLogoProps extends Omit<ImageProps, "src" | "alt"> {
  withoutText?: boolean;
}

export default function BrandLogo({
  className,
  withoutText,
  ...props
}: BrandLogoProps) {
  return (
    <Image
      src={withoutText ? appLogoWithoutText : appLogo}
      alt="app-logo"
      className={cn("w-10 object-contain", className)}
      width={100}
      height={100}
      {...props}
    />
  );
}
