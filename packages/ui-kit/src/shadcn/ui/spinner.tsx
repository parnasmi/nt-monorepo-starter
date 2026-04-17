import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeMap = {
  small: "size-4",
  medium: "size-6",
  large: "size-10",
} as const;

type SpinnerSize = keyof typeof sizeMap;

interface SpinnerProps extends Omit<React.ComponentProps<"svg">, "size"> {
  size?: SpinnerSize;
  show?: boolean;
}

function Spinner({ className, size = "medium", show = true, ...props }: SpinnerProps) {
  if (!show) return null;
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", sizeMap[size], className)}
      {...props}
    />
  );
}

export { Spinner };
