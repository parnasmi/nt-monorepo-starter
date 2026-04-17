import { useCallback } from "react";
import { toast } from "sonner";

import type { ShowToastOptions, SonnerToastOptions } from "@/shared/types/notification.types";

export function useToastNotif() {
  const showToast = useCallback(
    ({ type = "success", message = "Successfully created", toastOptions }: ShowToastOptions) => {
      const notify = () => {
        const toastData: SonnerToastOptions = {
          position: "top-right",
          ...toastOptions,
        };

        switch (type) {
          case "success":
            toast.success(message, toastData);
            break;
          case "info":
            toast.info(message, toastData);
            break;
          case "warning":
            toast.warning(message, toastData);
            break;
          case "error":
            toast.error(message, toastData);
            break;
          default:
            toast(message, toastData);
        }
      };

      return notify();
    },
    [],
  );

  return { showToast };
}
