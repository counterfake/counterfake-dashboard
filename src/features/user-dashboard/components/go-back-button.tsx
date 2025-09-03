import { Button } from "@/common/components/ui/primitives/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleGoBack}
      variant="ghost"
      size="sm"
      className="w-9 h-9 p-0 text-muted-foreground rounded-full"
      title="Go Back"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
