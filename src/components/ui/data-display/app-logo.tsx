import Image, { ImageProps } from "next/image";
import React from "react";

import appLogo from "@/assets/app-logos/app-logo-primary.png";
import appLogoWithoutText from "@/assets/app-logos/app-logo-primary-without-text.png";

import { cn } from "@/lib/utils/ui";

interface AppLogoProps extends Omit<ImageProps, "src" | "alt"> {
  withoutText?: boolean;
}

export default function AppLogo({
  className,
  withoutText,
  ...props
}: AppLogoProps) {
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
