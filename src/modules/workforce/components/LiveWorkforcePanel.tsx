import { Link } from "@tanstack/react-router";

import { Avatar, Badge, Card, CardContent, CardHeader } from "@/components/ui";

import type { LiveWorkforceStatus } from "../types/workforceDashboard.types";

const statusTone = {
  talking: "green",
  training: "amber",
  idle: "slate"
} as const;

export function LiveWorkforcePanel({ items }: { items: LiveWorkforceStatus[] }) {
  return (
    <Card>
      <CardHeader title="Live AI Workforce" description="Real-time employee activity across Nova Insurance." />
      <CardContent className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to="/app/employees/$employeeId"
            params={{ employeeId: item.employeeId }}
            className="flex items-center justify-between gap-4 rounded-[16px] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative">
                <Avatar name={item.employeeName} className="h-11 w-11" />
                <span
                  className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-[var(--success)]"
                  aria-hidden="true"
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{item.employeeName}</span>
                <span className="block truncate text-xs text-[var(--text-secondary)]">{item.role}</span>
                <span className="mt-1 block truncate text-sm text-[var(--text-primary)]">{item.currentActivity}</span>
                <span className="block truncate text-xs text-[var(--text-muted)]">{item.customerName}</span>
              </span>
            </div>
            <span className="shrink-0 text-right">
              <Badge tone={statusTone[item.status]}>{item.status}</Badge>
              <span className="mt-2 block text-sm font-semibold">{item.duration}</span>
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
