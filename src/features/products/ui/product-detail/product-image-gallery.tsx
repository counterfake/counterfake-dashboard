"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import { Card } from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/primitives/dialog";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  isLoading?: boolean;
}

export function ProductImageGallery({
  images,
  productName,
  isLoading = false,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="w-full h-[500px] rounded-lg mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-20 h-20 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  if (!images || images.length === 0) {
    return (
      <Card className="p-4">
        <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">No images available</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card>
        {/* Main Image Display */}
        <div className="relative group">
          <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain cursor-pointer"
              onClick={() => setIsFullscreen(true)}
              priority
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsFullscreen(true)}
            >
              <Expand className="h-4 w-4" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 0 && (
          <div className="px-4 pb-2 mt-4 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative rounded-xl w-24 h-24 overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-muted-foreground/50"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh]">
          <DialogTitle className="text-xl font-semibold">
            {productName}
          </DialogTitle>
          <div className="relative w-full h-[85vh]">
            <Image
              src={images[currentImageIndex]}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
