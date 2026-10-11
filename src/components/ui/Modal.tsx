import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "./Button";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]') ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close.current();
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previous?.focus(); };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div ref={panel} className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
