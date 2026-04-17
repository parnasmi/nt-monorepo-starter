// Source: apps/dashboard/src/shared/types/notification.types.ts
// Target: apps/naiton/src/shared/types/notification.types.ts
// Note: Dashboard uses `ToastT` from sonner. The plan uses `ExternalToast` instead.
//       Either works — ExternalToast is the options type for toast() calls.
//       This file shows the dashboard's original pattern for reference.

import { ToastT } from 'sonner';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ShowToastOptions {
  type?: ToastType;
  message?: string;
  toastOptions?: SonnerToastOptions;
}

export type SonnerToastOptions = Omit<
  ToastT,
  'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'
>;
