import { X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "./Button";

export function Drawer({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40" role="dialog" aria-modal="true" aria-label={title}>
      <aside className="ml-auto h-full w-full max-w-md border-l border-[var(--border)] bg-[var(--surface)] shadow-lg">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close drawer">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </aside>
    </div>
  );
}
