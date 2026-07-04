import { memo } from "react";

import { Card, CardContent } from "@/components/ui";

import type { ExecutiveKpi } from "../types/workforceDashboard.types";
import { dashboardIcons } from "../utils/dashboardIcons";

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);

  return (
    <div className="flex h-8 items-end gap-1" aria-hidden="true">
      {values.map((value, index) => {
        const height = max === min ? 50 : 28 + ((value - min) / (max - min)) * 72;
        return (
          <span
            key={`${value}-${index}`}
            className="w-full rounded-full bg-[var(--ai-accent)]/70"
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}

function KpiCard({ kpi }: { kpi: ExecutiveKpi }) {
  const Icon = dashboardIcons[kpi.icon];

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-[12px] bg-teal-50 p-2 text-[var(--ai-accent)] dark:bg-teal-950">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
            {kpi.trend}
          </span>
        </div>
        <p className="mt-5 text-sm text-[var(--text-secondary)]">{kpi.label}</p>
        <p className="mt-1 font-display text-2xl font-semibold">{kpi.value}</p>
        <p className="mt-2 min-h-10 text-xs leading-5 text-[var(--text-muted)]">{kpi.comparison}</p>
        <div className="mt-4">
          <Sparkline values={kpi.sparkline} />
        </div>
      </CardContent>
    </Card>
  );
}

export const ExecutiveKpiBar = memo(function ExecutiveKpiBar({ kpis }: { kpis: ExecutiveKpi[] }) {
  return (
    <section aria-label="Executive KPI bar" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
});
