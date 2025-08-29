"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

import asicsLogo from "@/assets/brand-logos/asics-logo.webp";
import beymenLogo from "@/assets/brand-logos/beymen-logo.webp";
import lacosteLogo from "@/assets/brand-logos/lacoste-logo.webp";

import asicsProduct1 from "@/assets/products/asics-product-1.webp";
import asicsProduct2 from "@/assets/products/asics-product-2.webp";
import asicsProduct3 from "@/assets/products/asics-product-3.webp";
import beymenProduct1 from "@/assets/products/beymen-product-1.webp";
import beymenProduct2 from "@/assets/products/beymen-product-2.webp";
import beymenProduct3 from "@/assets/products/beymen-product-3.webp";
import lacosteProduct1 from "@/assets/products/lacoste-product-1.webp";
import lacosteProduct2 from "@/assets/products/lacoste-product-2.webp";
import lacosteProduct3 from "@/assets/products/lacoste-product-3.webp";

interface Product {
  image: string;
  isSafe: boolean;
}

interface BrandContent {
  brandLogo: string;
  brandName: string;
  products: Product[];
}

const brandContent: BrandContent[] = [
  {
    brandLogo: asicsLogo.src,
    brandName: "Asics",
    products: [
      {
        image: asicsProduct1.src,
        isSafe: false,
      },
      {
        image: asicsProduct2.src,
        isSafe: false,
      },
      {
        image: asicsProduct3.src,
        isSafe: true,
      },
    ],
  },
  {
    brandLogo: beymenLogo.src,
    brandName: "Beymen",
    products: [
      {
        image: beymenProduct1.src,
        isSafe: true,
      },
      {
        image: beymenProduct2.src,
        isSafe: true,
      },
      {
        image: beymenProduct3.src,
        isSafe: false,
      },
    ],
  },
  {
    brandLogo: lacosteLogo.src,
    brandName: "Lacoste",
    products: [
      {
        image: lacosteProduct1.src,
        isSafe: true,
      },
      {
        image: lacosteProduct2.src,
        isSafe: false,
      },
      {
        image: lacosteProduct3.src,
        isSafe: true,
      },
    ],
  },
];

export default function BrandProtectionShowcase() {
  const itemRef = useRef<HTMLDivElement>(null);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState(300); // Default fallback height

  // Calculate container height after component mounts
  useEffect(() => {
    const updateHeight = () => {
      if (itemRef.current) {
        setContainerHeight(itemRef.current.clientHeight);
      }
    };

    // Initial height calculation
    updateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [currentBrandIndex]); // Recalculate when brand changes

  // Auto-rotate brands every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentBrandIndex(
          (prevIndex) => (prevIndex + 1) % brandContent.length
        );
        setIsTransitioning(false);
      }, 300); // Half of the transition duration
    }, 3000); // Change brand every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentBrand = brandContent[currentBrandIndex];

  return (
    <>
      <div className="w-full max-w-md">
        {/* Main container */}
        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-4 shadow-lg border border-border relative overflow-hidden">
          <div
            ref={itemRef}
            className="relative bg-muted rounded-lg p-4 sm:p-6 mb-4 min-h-[240px] flex-col items-center justify-center flex-shrink-0"
          >
            {/* Scanning Animation Background */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/30 animate-pulse"></div>
              <div className="scanning-line absolute top-0 left-0 w-full h-0.5 bg-primary shadow-lg"></div>

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 16px, var(--color-primary) 16px, var(--color-primary) 18px), repeating-linear-gradient(90deg, transparent, transparent 16px, var(--color-primary) 16px, var(--color-primary) 18px)`,
                    opacity: 0.4,
                  }}
                ></div>
              </div>
            </div>

            {/* Animated Brand Content */}
            <div
              className={`relative z-10 text-center transition-all duration-600 ease-in-out transform ${
                isTransitioning
                  ? "opacity-0 scale-95 translate-y-2"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              {/* Main protection shield */}
              <div className="relative mb-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white flex items-center justify-center mx-auto mb-3 p-2 rounded-lg relative transition-transform duration-300 hover:scale-105">
                  <Image
                    src={currentBrand.brandLogo}
                    alt={currentBrand.brandName}
                    width={96}
                    height={96}
                    className="transition-all duration-300"
                  />
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  Brand Protection Active
                </h3>
                <p className="text-xs text-muted-foreground">
                  Scanning products...
                </p>
              </div>

              {/* Protected products grid */}
              <div className="grid grid-cols-3 mb-4">
                {currentBrand.products.map((product, index) => (
                  <div
                    key={`${currentBrandIndex}-${index}`}
                    className="aspect-square max-w-24 bg-white rounded-lg border border-border flex items-center justify-center relative group transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      width={96}
                      height={96}
                      src={product.image}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300"
                      alt={currentBrand.brandName}
                    />
                    {/* Small protection indicator */}
                    {product.isSafe ? (
                      <div className="transform opacity-0 scale-in absolute -top-1 -right-1 w-4 h-4 bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <Check className="text-white w-3 h-3" />
                      </div>
                    ) : (
                      <div className="transform opacity-0 scale-in absolute -top-1 -right-1 w-4 h-4 bg-red-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <X className="text-white w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>24/7 AI Protection Scanning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(${containerHeight}px);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOutDown {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .scanning-line {
          animation: scan 3s ease-in-out infinite;
        }

        .scale-in {
          animation: scaleIn 0.3s ease-out forwards 0.5s;
        }
      `}</style>
    </>
  );
}
