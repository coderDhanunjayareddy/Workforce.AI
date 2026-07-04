import { Link, useRouterState } from "@tanstack/react-router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { appNavigation } from "@/constants/navigation";
import { cn } from "@/utils/cn";

import { Button } from "../ui";

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <aside
      className={cn(
        "hidden min-h-screen shrink-0 border-r border-white/10 bg-[var(--sidebar)] text-white transition-all lg:block",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/app" className="flex items-center gap-3 font-display text-lg font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white text-[var(--sidebar)]">W</span>
          {!collapsed ? <span>Workforce AI</span> : null}
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle sidebar" className="text-white hover:bg-white/10">
          {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="mt-4 space-y-1 px-3" aria-label="Main navigation">
        {appNavigation.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white",
                active && "bg-white/12 text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {!collapsed ? item.label : <span className="sr-only">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
