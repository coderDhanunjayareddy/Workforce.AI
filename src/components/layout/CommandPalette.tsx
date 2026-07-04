import { Command } from "cmdk";
import { Search, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { appNavigation } from "@/constants/navigation";
import { useCampaigns, useEmployees, useKnowledge } from "@/hooks";

import { Button } from "../ui";

export function CommandPalette({ open: controlledOpen, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);
  const employees = useEmployees();
  const campaigns = useCampaigns();
  const knowledge = useKnowledge();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleOpen();
      }
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen, toggleOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <Command className="mx-auto max-w-2xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
          <Search className="h-5 w-5 text-[var(--text-muted)]" />
          <Command.Input className="h-14 flex-1 bg-transparent text-sm outline-none" placeholder="Search pages, employees, campaigns, knowledge..." />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close command palette">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Command.List className="max-h-[440px] overflow-auto p-3">
          <Command.Empty className="p-4 text-sm text-[var(--text-secondary)]">No matching action found.</Command.Empty>
          <Command.Group heading="Pages">
            {appNavigation.map((item) => (
              <Command.Item key={item.href} value={item.label} className="cursor-pointer rounded-[12px] px-3 py-2 text-sm data-[selected=true]:bg-[var(--surface-elevated)]">
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="AI Employees">
            {(employees.data ?? []).slice(0, 6).map((item) => (
              <Command.Item key={item.id} value={item.name} className="cursor-pointer rounded-[12px] px-3 py-2 text-sm data-[selected=true]:bg-[var(--surface-elevated)]">
                {item.name} · {item.role}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Quick Actions">
            {[
              "Hire AI Employee",
              "Upload Knowledge",
              "Launch Campaign",
              ...(campaigns.data ?? []).slice(0, 2).map((item) => item.name),
              (knowledge.data ?? [])[2]?.title ?? "Review Knowledge Freshness"
            ].map((item) => (
              <Command.Item key={item} value={item} className="flex cursor-pointer items-center gap-2 rounded-[12px] px-3 py-2 text-sm data-[selected=true]:bg-[var(--surface-elevated)]">
                <Sparkles className="h-4 w-4 text-[var(--ai-accent)]" />
                {item}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
