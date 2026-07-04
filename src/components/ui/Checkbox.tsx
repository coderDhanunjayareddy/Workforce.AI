import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn("h-4 w-4 rounded border-[var(--border)] accent-[var(--ai-accent)]", className)}
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";
