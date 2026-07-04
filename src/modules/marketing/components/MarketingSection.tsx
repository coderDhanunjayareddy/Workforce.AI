import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function MarketingSection({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description, align = "center" }: { eyebrow?: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--ai-accent)]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[var(--text-primary)] lg:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
