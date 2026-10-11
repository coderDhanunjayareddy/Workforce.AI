import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/shared";
import { cn } from "@/utils/cn";

import { organizationTabs, settingsTabs } from "../constants/organization.constants";

export function OrganizationShell({
  activePath,
  children
}: {
  activePath: string;
  children: ReactNode;
}) {
  const tabs = [...organizationTabs, ...settingsTabs];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Organization Settings"
        description="Preview organization, user, integration, and security settings with sample data."
      />

      <p className="rounded-[12px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)]">Administration is a preview in version 1. Changes here do not configure a live service.</p>

      <nav className="flex gap-2 overflow-x-auto rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-2" aria-label="Administration sections">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            to={tab.href}
            className={cn(
              "whitespace-nowrap rounded-[12px] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface)]",
              activePath === tab.href && "bg-[var(--surface)] text-[var(--text-primary)] shadow-xs"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
