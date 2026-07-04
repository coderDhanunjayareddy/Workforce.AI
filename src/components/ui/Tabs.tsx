import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: ReactNode }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 rounded-[12px] border border-[var(--border)] bg-[var(--surface-elevated)] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "rounded-[8px] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]",
            active === tab.id && "bg-[var(--surface)] text-[var(--text-primary)] shadow-xs"
          )}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
