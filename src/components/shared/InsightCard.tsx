import { ArrowRight } from "lucide-react";

import { Badge, Button, Card, CardContent } from "@/components/ui";
import type { Insight } from "@/types";

export function InsightCard({ insight }: { insight: Insight }) {
  const tone = insight.priority === "critical" ? "red" : insight.priority === "high" ? "amber" : "blue";
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <Badge tone={tone}>{insight.priority}</Badge>
          <Button variant="link">
            {insight.action}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">{insight.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{insight.description}</p>
        <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{insight.impact}</p>
      </CardContent>
    </Card>
  );
}
