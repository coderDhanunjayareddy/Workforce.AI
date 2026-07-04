import { Card, CardContent, CardHeader } from "@/components/ui";

import type { DepartmentPerformance } from "../types/workforceDashboard.types";

export function WorkforceMap({ departments }: { departments: DepartmentPerformance[] }) {
  return (
    <Card>
      <CardHeader title="Workforce Map" description="Department coverage, health and performance." />
      <CardContent className="space-y-4">
        {departments.map((department) => (
          <div key={department.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
            <div className="flex items-center justify-between gap-3">
              <span>
                <span className="block text-sm font-semibold">{department.department}</span>
                <span className="text-xs text-[var(--text-secondary)]">{department.employees} AI Employees</span>
              </span>
              <span className="text-right text-sm font-semibold">{department.performance}% performance</span>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="h-2 rounded-full bg-[var(--border)]">
                <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${department.health}%` }} />
              </div>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">{department.health}% health</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
