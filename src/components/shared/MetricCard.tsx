import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui";

export function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  subtitle
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  subtitle: string;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="rounded-[12px] bg-teal-50 p-2 text-[var(--ai-accent)] dark:bg-teal-950">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold text-emerald-600">{trend}</span>
        </div>
        <p className="mt-5 text-sm text-[var(--text-secondary)]">{label}</p>
        <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
