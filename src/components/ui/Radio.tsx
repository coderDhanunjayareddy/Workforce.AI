import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn("h-4 w-4 border-[var(--border)] accent-[var(--ai-accent)]", className)}
      {...props}
    />
  )
);

Radio.displayName = "Radio";
