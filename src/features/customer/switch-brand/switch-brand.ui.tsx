import { useState, Suspense } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/cn";

import { Button } from "@/shared/ui/primitives/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/primitives/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/primitives/command";

import {
  useSwitchBrand,
  useSuspenseBrandsQuery,
  useCurrentBrand,
} from "./switch-brand.model";

import { AppErrorBoundary } from "@/shared/ui/error-handler/app-error-boundary";

import { SwitchBrandSkeleton } from "./switch-brand.skeleton";
import { SwitchBrandError } from "./switch-brand.error";
import useToast from "@/shared/ui/toast/use-toast";

export function SwitchBrand() {
  return (
    <AppErrorBoundary fallback={SwitchBrandError}>
      <Suspense fallback={<SwitchBrandSkeleton />}>
        <SwitchBrandBase />
      </Suspense>
    </AppErrorBoundary>
  );
}

function SwitchBrandBase() {
  const switchBrand = useSwitchBrand();
  const brands = useSuspenseBrandsQuery();
  const currentBrand = useCurrentBrand();
  const toast = useToast();

  const [selectedBrand, setSelectedBrand] = useState<number>(currentBrand.id);

  const handleSwitchBrand = async () => {
    const brand = brands.find((brand) => brand.id === selectedBrand);

    await switchBrand.mutateAsync({
      brandName: brand?.name,
      brandId: brand?.id,
    });

    toast.info(
      "Brand switched successfully",
      "All data will be reloaded. Please wait..."
    );
  };

  const isDifferentSelect = selectedBrand !== currentBrand.id;

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
            size="sm"
          >
            {selectedBrand
              ? brands.find((brand) => brand.id === selectedBrand)?.name
              : "Select brand..."}
            <ChevronsUpDown className="w-3 h-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search brand..." className="h-9" />
            <CommandList>
              <CommandEmpty>No brand found.</CommandEmpty>
              <CommandGroup>
                {brands.map((brand) => (
                  <CommandItem
                    key={brand.name}
                    value={brand.name}
                    onSelect={() => {
                      setSelectedBrand(brand.id);
                    }}
                  >
                    {brand.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedBrand === brand.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        size="sm"
        className="w-full"
        onClick={handleSwitchBrand}
        disabled={switchBrand.isPending || !isDifferentSelect}
      >
        {switchBrand.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Change Brand
      </Button>
    </div>
  );
}
