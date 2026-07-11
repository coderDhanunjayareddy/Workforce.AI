import { Menu, Presentation, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { useDemo } from "@/demo/hooks";

import { Breadcrumbs } from "../shared";
import { CommandPalette } from "./CommandPalette";
import { NotificationMenu } from "./NotificationMenu";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const demo = useDemo();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden min-w-0 md:block">
          <Breadcrumbs />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="hidden md:flex" onClick={() => setCommandOpen(true)}>
          <Search className="h-4 w-4" />
          Search
          <kbd className="ml-2 rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 text-xs">Ctrl K</kbd>
        </Button>
        <Button
          variant={demo.enabled ? "success" : "secondary"}
          className="hidden sm:flex"
          onClick={demo.enabled ? demo.disableDemo : demo.enableDemo}
          aria-pressed={demo.enabled}
          aria-label={demo.enabled ? "Exit Investor Demo" : "Enable Investor Demo"}
        >
          <Presentation className="h-4 w-4" />
          Investor Demo
        </Button>
        <OrganizationSwitcher />
        <NotificationMenu />
        <ThemeToggle />
        <UserMenu />
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
