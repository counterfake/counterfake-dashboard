import { toast as sonnerToast } from "sonner";
import { Button } from "../primitives/button";

export interface ToasterContainerProps {
  toastId: string | number;
  dismissible?: boolean;
  children: React.ReactNode;
}

export function ToastContainer({
  toastId,
  dismissible = true,
  children,
}: ToasterContainerProps) {
  return (
    <div className="bg-background flex flex-col gap-2 p-4 min-w-xs shadow-lg rounded-2xl border border-border relative">
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-3 text-lg hover:bg-muted rounded-full"
          onClick={() => sonnerToast.dismiss(toastId)}
        >
          &times;
        </Button>
      )}
      {children}
    </div>
  );
}
