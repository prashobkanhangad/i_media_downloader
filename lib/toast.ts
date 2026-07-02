import { toast as sonnerToast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface ToastOptions {
  description?: string;
  duration?: number;
  id?: string | number;
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    sonnerToast.success(message, options),

  error: (message: string, options?: ToastOptions) =>
    sonnerToast.error(message, options),

  info: (message: string, options?: ToastOptions) =>
    sonnerToast.info(message, options),

  warning: (message: string, options?: ToastOptions) =>
    sonnerToast.warning(message, options),

  loading: (message: string, options?: ToastOptions) =>
    sonnerToast.loading(message, options),

  promise: sonnerToast.promise,

  dismiss: sonnerToast.dismiss,
};
