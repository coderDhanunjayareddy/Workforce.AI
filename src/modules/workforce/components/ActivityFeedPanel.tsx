import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Info } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui";

import type { WorkforceActivity } from "../types/workforceDashboard.types";

const toneIcon = {
  success: CheckCircle2,
  info: Info,
  warning: Clock3
} as const;

export function ActivityFeedPanel({ activities }: { activities: WorkforceActivity[] }) {
  return (
    <Card>
      <CardHeader title="Workforce Activity Feed" description="Chronological activity across conversations, campaigns and knowledge." />
      <CardContent className="space-y-1">
        {activities.map((activity) => {
          const Icon = toneIcon[activity.tone];

          return (
            <Link key={activity.id} to={activity.href} className="grid grid-cols-[52px_1fr] gap-3 rounded-[16px] p-3 transition hover:bg-[var(--surface-elevated)]">
              <span className="text-sm font-semibold text-[var(--text-muted)]">{activity.time}</span>
              <span className="relative block border-l border-[var(--border)] pl-4">
                <Icon className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-[var(--surface)] text-[var(--ai-accent)]" aria-hidden="true" />
                <span className="block text-sm font-semibold">{activity.title}</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{activity.description}</span>
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
