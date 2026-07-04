import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-[12px] bg-slate-200/80 dark:bg-slate-700/70", className)}
      {...props}
    />
  );
}
