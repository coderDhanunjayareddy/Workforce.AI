import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui";

export function WizardShell({ title, step, totalSteps, children }: { title: string; step: number; totalSteps: number; children: ReactNode }) {
  const progress = Math.round((step / totalSteps) * 100);
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <span className="text-sm font-semibold text-[var(--text-secondary)]">
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-[var(--border)]">
          <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-6">{children}</div>
      </CardContent>
    </Card>
  );
}
