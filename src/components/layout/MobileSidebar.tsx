import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

import { Button } from "@/components/ui";
import { appNavigation } from "@/constants/navigation";

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden">
      <aside className="h-full w-80 bg-[var(--sidebar)] p-4 text-white">
        <div className="flex items-center justify-between">
          <Link to="/app" className="font-display text-lg font-semibold" onClick={onClose}>
            Workforce AI
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close navigation" className="text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-6 space-y-1" aria-label="Mobile navigation">
          {appNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} to={item.href} onClick={onClose} className="flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/10">
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
