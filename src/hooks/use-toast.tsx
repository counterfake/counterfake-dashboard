import React from "react";
import { ExternalToast, toast as sonnerToast } from "sonner";

import {
  ToastSuccess,
  ToastError,
  ToastWarning,
  ToastInfo,
  type ToastErrorProps,
  type ToastInfoProps,
  type ToastSuccessProps,
  type ToastWarningProps,
} from "@/components/ui/feedback/toast/toasts";

export default function useToast() {
  return {
    success: (
      message: ToastSuccessProps["message"],
      description?: ToastSuccessProps["description"],
      actions?: ToastSuccessProps["actions"],
      options?: ExternalToast
    ) => {
      const id = sonnerToast.custom(
        (toastId) => (
          <ToastSuccess
            toastId={toastId}
            message={message}
            description={description}
            actions={actions}
          />
        ),
        options
      );

      return {
        id,
        dismiss: () => sonnerToast.dismiss(id),
      };
    },
    error: (
      message: ToastErrorProps["message"],
      description?: ToastErrorProps["description"],
      actions?: ToastErrorProps["actions"],
      options?: ExternalToast
    ) => {
      const id = sonnerToast.custom(
        (toastId) => (
          <ToastError
            toastId={toastId}
            message={message}
            description={description}
            actions={actions}
          />
        ),
        options
      );

      return {
        id,
        dismiss: () => sonnerToast.dismiss(id),
      };
    },
    warning: (
      message: ToastWarningProps["message"],
      description?: ToastWarningProps["description"],
      actions?: ToastWarningProps["actions"],
      options?: ExternalToast
    ) => {
      const id = sonnerToast.custom(
        (toastId) => (
          <ToastWarning
            toastId={toastId}
            message={message}
            description={description}
            actions={actions}
          />
        ),
        options
      );

      return {
        id,
        dismiss: () => sonnerToast.dismiss(id),
      };
    },
    info: (
      message: ToastInfoProps["message"],
      description?: ToastInfoProps["description"],
      actions?: ToastInfoProps["actions"],
      options?: ExternalToast
    ) => {
      const id = sonnerToast.custom(
        (toastId) => (
          <ToastInfo
            toastId={toastId}
            message={message}
            description={description}
            actions={actions}
          />
        ),
        options
      );

      return {
        id,
        dismiss: () => sonnerToast.dismiss(id),
      };
    },
    /**
     * If no id is provided, it will dismiss all toasts
     * @param id - The id of the toast to dismiss
     */
    dismiss: (id?: string | number) => {
      sonnerToast.dismiss(id);
    },
  };
}
