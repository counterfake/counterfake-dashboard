import { CircleCheckBig, CircleX, AlertTriangle, Info } from "lucide-react";

import { ToastContainer } from "./toast-container";
import {
  ToastActionButton,
  ToastActionButtonProps as ToastActionButtonPropsType,
} from "./toast-action-button";

type ToastActionButtonProps = Omit<ToastActionButtonPropsType, "toastId">;

export interface ToastSuccessProps {
  toastId: string | number;
  dismissible?: boolean;
  message: string;
  description?: string | React.ReactNode;
  actions?: ToastActionButtonProps[] | null;
}

export interface ToastErrorProps {
  toastId: string | number;
  dismissible?: boolean;
  message: string;
  description?: string | React.ReactNode;
  actions?: ToastActionButtonProps[] | null;
}

export interface ToastWarningProps {
  toastId: string | number;
  dismissible?: boolean;
  message: string;
  description?: string | React.ReactNode;
  actions?: ToastActionButtonProps[] | null;
}

export interface ToastInfoProps {
  toastId: string | number;
  dismissible?: boolean;
  message: string;
  description?: string | React.ReactNode;
  actions?: ToastActionButtonProps[] | null;
}

export function ToastSuccess({
  toastId,
  dismissible,
  message,
  description,
  actions,
}: ToastSuccessProps) {
  return (
    <ToastContainer toastId={toastId} dismissible={dismissible}>
      <div className="flex items-center gap-1">
        <CircleCheckBig className="w-4 h-4 text-success mr-1" />
        <h3 className="text-base font-medium">{message}</h3>
      </div>
      {typeof description === "string" ? (
        <p className="text-sm font-normal text-muted-foreground">
          {description}
        </p>
      ) : (
        description
      )}
      {actions && actions.length > 0 ? (
        <div className="flex items-center justify-end gap-1 mt-1">
          {actions.map((action) => (
            <ToastActionButton
              key={action.label}
              toastId={toastId}
              {...action}
            />
          ))}
        </div>
      ) : null}
    </ToastContainer>
  );
}

export function ToastError({
  toastId,
  dismissible,
  message,
  description,
  actions,
}: ToastErrorProps) {
  return (
    <ToastContainer toastId={toastId} dismissible={dismissible}>
      <div className="flex items-center gap-1">
        <CircleX className="w-4 h-4 text-destructive mr-1" />
        <h3 className="text-base font-medium">{message}</h3>
      </div>
      {typeof description === "string" ? (
        <p className="text-sm font-normal text-muted-foreground">
          {description}
        </p>
      ) : (
        description
      )}
      {actions && actions.length > 0 ? (
        <div className="flex items-center justify-end gap-1 mt-1">
          {actions.map((action) => (
            <ToastActionButton
              key={action.label}
              toastId={toastId}
              {...action}
            />
          ))}
        </div>
      ) : null}
    </ToastContainer>
  );
}

export function ToastWarning({
  toastId,
  dismissible,
  message,
  description,
  actions,
}: ToastWarningProps) {
  return (
    <ToastContainer toastId={toastId} dismissible={dismissible}>
      <div className="flex items-center gap-1">
        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
        <h3 className="text-base font-medium">{message}</h3>
      </div>
      {typeof description === "string" ? (
        <p className="text-sm font-normal text-muted-foreground">
          {description}
        </p>
      ) : (
        description
      )}
      {actions && actions.length > 0 ? (
        <div className="flex items-center justify-end gap-1 mt-1">
          {actions.map((action) => (
            <ToastActionButton
              key={action.label}
              toastId={toastId}
              {...action}
            />
          ))}
        </div>
      ) : null}
    </ToastContainer>
  );
}

export function ToastInfo({
  toastId,
  dismissible,
  message,
  description,
  actions,
}: ToastInfoProps) {
  return (
    <ToastContainer toastId={toastId} dismissible={dismissible}>
      <div className="flex items-center gap-1">
        <Info className="w-4 h-4 text-primary mr-1" />
        <h3 className="text-base font-medium">{message}</h3>
      </div>
      {typeof description === "string" ? (
        <p className="text-sm font-normal text-muted-foreground">
          {description}
        </p>
      ) : (
        description
      )}
      {actions && actions.length > 0 ? (
        <div className="flex items-center justify-end gap-1 mt-1">
          {actions.map((action) => (
            <ToastActionButton
              key={action.label}
              toastId={toastId}
              {...action}
            />
          ))}
        </div>
      ) : null}
    </ToastContainer>
  );
}
