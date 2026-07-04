import { Link } from "@tanstack/react-router";
import { Save, Send, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/shared";
import { Button, Input, Select } from "@/components/ui";
import { cn } from "@/utils/cn";

import { organizationTabs, roleFilters, settingsTabs, teamFilters } from "../constants/organization.constants";

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
        description="Manage your organization, users, integrations, security and AI Workforce preferences."
        actions={(
          <>
            <Button variant="secondary"><Save className="h-4 w-4" />Save Changes</Button>
            <Button><Send className="h-4 w-4" />Invite Team Member</Button>
          </>
        )}
      />

      <section className="grid gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 lg:grid-cols-[1fr_180px_180px_auto]">
        <Input aria-label="Search administration" placeholder="Search users, roles, audit logs, integrations or settings" />
        <Select aria-label="Filter department">{teamFilters.map((item) => <option key={item}>{item}</option>)}</Select>
        <Select aria-label="Filter role">{roleFilters.map((item) => <option key={item}>{item}</option>)}</Select>
        <Button variant="secondary" type="button"><ShieldCheck className="h-4 w-4" />Security Review</Button>
      </section>

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
