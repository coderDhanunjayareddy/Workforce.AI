import { getAvatarGradient, getInitials } from "@/utils/avatar";
import { cn } from "@/utils/cn";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-label={name}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
        className
      )}
      style={{ background: getAvatarGradient(name) }}
    >
      {getInitials(name)}
    </span>
  );
}
