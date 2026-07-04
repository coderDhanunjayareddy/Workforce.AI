import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition hover:border-[var(--muted-border)] focus:border-[var(--ai-accent)]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
