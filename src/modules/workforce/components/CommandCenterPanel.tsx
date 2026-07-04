import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";

import type { CommandPriority } from "../types/workforceDashboard.types";

const priorityTone = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "teal"
} as const;

export function CommandCenterPanel({ priorities }: { priorities: CommandPriority[] }) {
  return (
    <Card>
      <CardHeader title="Command Center" description="Today's priorities for the Nova Insurance leadership team." />
      <CardContent className="space-y-3">
        {priorities.map((priority) => (
          <Link
            key={priority.id}
            to={priority.href}
            className="block rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <Badge tone={priorityTone[priority.priority]}>{priority.priority}</Badge>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]">
                {priority.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{priority.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{priority.description}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
