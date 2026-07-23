import { getAvatarGradient, getInitials } from "@/utils/avatar";
import { cn } from "@/utils/cn";

export function Avatar({ name, className, src }: { name: string; className?: string; src?: string }) {
  return (
    <span
      aria-label={name}
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white",
        className
      )}
      style={{ background: getAvatarGradient(name) }}
    >
      {getInitials(name)}
      {src ? <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(event) => { event.currentTarget.remove(); }} /> : null}
    </span>
  );
}
