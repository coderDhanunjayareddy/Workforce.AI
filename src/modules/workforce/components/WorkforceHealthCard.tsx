import { HealthRing } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui";

import type { WorkforceDashboardData } from "../types/workforceDashboard.types";

export function WorkforceHealthCard({ health }: { health: WorkforceDashboardData["health"] }) {
  return (
    <Card>
      <CardHeader title="AI Workforce Health" description={`${health.trend}. ${health.lastUpdated}.`} />
      <CardContent>
        <HealthRing value={health.overall} label="Overall Health" />
        <div className="mt-5 space-y-4">
          {health.breakdown.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="font-semibold">{item.value}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-[var(--border)]">
                <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
