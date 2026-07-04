import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui";

import type { QuickAction } from "../types/workforceDashboard.types";
import { dashboardIcons } from "../utils/dashboardIcons";

export function DashboardQuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card>
      <CardHeader title="Quick Actions" description="One-click workflows for the most common operational tasks." />
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = dashboardIcons[action.icon];

          return (
            <Link
              key={action.id}
              to={action.href}
              className="flex items-start justify-between gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="rounded-[12px] bg-blue-50 p-2 text-[var(--secondary)] dark:bg-blue-950">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{action.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{action.description}</span>
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
