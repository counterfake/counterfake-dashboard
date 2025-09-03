import React from "react";

import { Button } from "@/common/components/ui/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/primitives/dialog";
import { Input } from "@/common/components/ui/primitives/input";
import { Label } from "@/common/components/ui/primitives/label";

interface GiveFeedbackForBetaDialogProps {
  isOpen: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSend: (message: string) => void;
  onOpenChange: (open: boolean) => void;
}

export default function GiveFeedbackForBetaDialog({
  onSend,
  isSuccess,
  isError,
  isOpen,
  onOpenChange,
}: GiveFeedbackForBetaDialogProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = () => {
    onSend(message);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Feedback</DialogTitle>
          <DialogDescription>
            Please give us your feedback about the app. It will help us to
            improve the app.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-green-700">
                Your feedback has been sent successfully!
              </span>
            </div>
          )}
          {isError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <svg
                className="w-5 h-5 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-sm text-red-700">
                An error occurred while sending your feedback. Please try again.
              </span>
            </div>
          )}
          <div className="grid gap-3">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSuccess || !message}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
