import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { Insight } from "@/types";

const priorityTone = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "teal"
} as const;

export function DashboardInsights({ insights }: { insights: Insight[] }) {
  return (
    <Card>
      <CardHeader title="AI Insights" description="Recommendations prioritized by business impact." />
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <Link
            key={insight.id}
            to={insight.href}
            className="block rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
            aria-label={`${insight.title}. ${insight.action}`}
          >
            <div className="flex items-start justify-between gap-3">
              <Badge tone={priorityTone[insight.priority]}>{insight.priority}</Badge>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]">
                {insight.action}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{insight.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{insight.description}</p>
            <p className="mt-3 text-sm font-semibold">{insight.impact}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
