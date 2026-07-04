import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout";
import { Button } from "@/components/ui";

import { marketingLinks } from "../constants/marketing.constants";

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8" aria-label="Marketing navigation">
        <Link to="/" className="flex items-center gap-3 font-display text-lg font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--primary)] text-white">W</span>
          Workforce AI
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {marketingLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Hire Your First AI Employee</Button>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open marketing navigation">
          <Menu className="h-5 w-5" />
        </Button>
      </nav>
      {open ? (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {marketingLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="rounded-[12px] px-3 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]">
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <ThemeToggle />
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="secondary">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button>Hire</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
