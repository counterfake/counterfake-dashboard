import { useState, Suspense } from "react";
import { Check, ChevronsUpDown, Loader2, RefreshCw } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/primitives/dialog";

import {
  useSwitchBrand,
  useSuspenseAllBrands,
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
  const { brands, groupBrands } = useSuspenseAllBrands();
  const currentBrand = useCurrentBrand();
  const toast = useToast();

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedGroupBrandId, setSelectedGroupBrandId] = useState<
    number | null
  >(null);
  const [openBrandPopover, setOpenBrandPopover] = useState(false);
  const [openGroupBrandPopover, setOpenGroupBrandPopover] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSelectBrand = (brandId: number) => {
    setSelectedBrandId(brandId);
    setOpenBrandPopover(false);
  };

  const handleSelectGroupBrand = (groupBrandId: number) => {
    setSelectedGroupBrandId(groupBrandId);
    setOpenGroupBrandPopover(false);
  };

  const handleSwitchToGroupBrand = async () => {
    if (!selectedGroupBrandId) return;

    const groupBrand = groupBrands.find((gb) => gb.id === selectedGroupBrandId);
    await switchBrand.mutateAsync({
      brandName: groupBrand?.name || "",
      brandId: groupBrand?.id || 0,
      isGroupBrand: true,
    });

    toast.info(
      "Brand switched successfully",
      "All data will be reloaded. Please wait..."
    );

    setSelectedGroupBrandId(null);
    setOpenDialog(false);
  };

  const handleSwitchToBrand = async () => {
    if (!selectedBrandId) return;

    const brand = brands.find((b) => b.id === selectedBrandId);
    await switchBrand.mutateAsync({
      brandName: brand?.name || "",
      brandId: brand?.id || 0,
      isGroupBrand: false,
    });

    toast.info(
      "Brand switched successfully",
      "All data will be reloaded. Please wait..."
    );

    setSelectedBrandId(null);
    setOpenDialog(false);
  };

  return (
    <div className="space-y-2">
      {/* Mevcut Seçili Brand */}
      <div className="p-2 bg-muted rounded-md">
        <p className="text-xs text-muted-foreground mb-1">Current Brand</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{currentBrand.name}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {currentBrand.isGroupBrand ? "Group Brand" : "Brand"}
          </span>
        </div>
      </div>

      {/* Switch Brand Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <RefreshCw className="w-3 h-3 mr-2" />
            Switch Brand
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Switch Brand</DialogTitle>
            <DialogDescription>
              Choose a group brand or a regular brand to switch to.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Group Brands Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Group Brand</label>
              <Popover
                open={openGroupBrandPopover}
                onOpenChange={setOpenGroupBrandPopover}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    size="sm"
                  >
                    {selectedGroupBrandId
                      ? groupBrands.find((gb) => gb.id === selectedGroupBrandId)
                          ?.name
                      : "Select group brand..."}
                    <ChevronsUpDown className="w-3 h-3 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search group brand..."
                      className="h-9"
                    />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No group brand found.</CommandEmpty>
                      <CommandGroup>
                        {groupBrands.map((groupBrand) => (
                          <CommandItem
                            key={groupBrand.id}
                            value={groupBrand.name}
                            onSelect={() =>
                              handleSelectGroupBrand(groupBrand.id)
                            }
                          >
                            {groupBrand.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedGroupBrandId === groupBrand.id
                                  ? "opacity-100"
                                  : "opacity-0"
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
                onClick={handleSwitchToGroupBrand}
                disabled={switchBrand.isPending || !selectedGroupBrandId}
              >
                {switchBrand.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Change to Group Brand
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Normal Brands Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Popover
                open={openBrandPopover}
                onOpenChange={setOpenBrandPopover}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    size="sm"
                  >
                    {selectedBrandId
                      ? brands.find((b) => b.id === selectedBrandId)?.name
                      : "Select brand..."}
                    <ChevronsUpDown className="w-3 h-3 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search brand..."
                      className="h-9"
                    />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands.map((brand) => (
                          <CommandItem
                            key={brand.id}
                            value={brand.name}
                            onSelect={() => handleSelectBrand(brand.id)}
                          >
                            {brand.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedBrandId === brand.id
                                  ? "opacity-100"
                                  : "opacity-0"
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
                onClick={handleSwitchToBrand}
                disabled={switchBrand.isPending || !selectedBrandId}
              >
                {switchBrand.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Change to Brand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
