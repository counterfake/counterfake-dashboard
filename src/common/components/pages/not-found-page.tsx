"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/common/components/ui/primitives/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <FileQuestion className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex gap-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
