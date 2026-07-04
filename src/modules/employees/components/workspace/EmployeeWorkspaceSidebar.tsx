import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Megaphone, RefreshCw } from "lucide-react";

import { HealthRing } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { Employee, EmployeeHealth, EmployeePerformance, EmployeeWorkspaceData } from "@/types";

import { MetricTile, ProgressRow } from "./WorkspacePrimitives";

const priorityTone = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "teal"
} as const;

export function EmployeeWorkspaceSidebar({
  employee,
  workspace,
  health,
  performance,
  onTabChange
}: {
  employee: Employee;
  workspace: EmployeeWorkspaceData;
  health: EmployeeHealth;
  performance: EmployeePerformance;
  onTabChange: (tab: string) => void;
}) {
  return (
    <aside className="space-y-6">
      <Card>
        <CardHeader title="Quick Actions" description="Common workspace operations." />
        <CardContent className="grid gap-3">
          <button type="button" className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-left hover:shadow-sm" onClick={() => onTabChange("training")}>
            <RefreshCw className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
            <span className="mt-2 block text-sm font-semibold">Retrain Employee</span>
          </button>
          <Link to="/app/campaigns" className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-left hover:shadow-sm">
            <Megaphone className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
            <span className="mt-2 block text-sm font-semibold">Assign Campaign</span>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Employee Health" description={health.trend} />
        <CardContent>
          <HealthRing value={health.overall} />
          <div className="mt-5 space-y-4">
            <ProgressRow label="Knowledge" value={health.knowledge} />
            <ProgressRow label="Conversation Quality" value={health.conversationQuality} />
            <ProgressRow label="Tools" value={health.tools} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Current Campaign" description={workspace.assignment.businessGoal} />
        <CardContent className="space-y-3">
          <MetricTile label="Campaign" value={workspace.assignment.campaign} />
          <MetricTile label="Priority" value={<Badge tone={priorityTone[workspace.assignment.priority]}>{workspace.assignment.priority}</Badge>} />
          <MetricTile label="Working Hours" value={workspace.assignment.workingHours} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Today's Performance" description="Live productivity snapshot." />
        <CardContent className="grid gap-3">
          <MetricTile label="Calls" value={employee.callsToday} />
          <MetricTile label="Appointments" value={employee.appointmentsToday} />
          <MetricTile label="Conversion" value={`${performance.businessContribution.conversionRate}%`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Notifications" description="Recent employee updates." />
        <CardContent className="space-y-3">
          {workspace.notifications.map((notification) => (
            <div key={notification} className="flex gap-3 rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm">
              <Bell className="mt-0.5 h-4 w-4 text-[var(--secondary)]" aria-hidden="true" />
              <span>{notification}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="AI Recommendations" description="Recommended next actions." />
        <CardContent className="space-y-3">
          {workspace.recommendations.slice(0, 3).map((item) => (
            <Link key={item.id} to={item.href} className="block rounded-[12px] bg-[var(--surface-elevated)] p-3 hover:shadow-sm">
              <Badge tone={priorityTone[item.priority]}>{item.priority}</Badge>
              <span className="mt-2 block text-sm font-semibold">{item.title}</span>
              <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{item.impact}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--secondary)]">
                {item.action}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Pinned Notes" description="Manager guidance for this workspace." />
        <CardContent className="space-y-3">
          {workspace.pinnedNotes.map((note) => (
            <p key={note} className="rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm leading-6 text-[var(--text-secondary)]">
              {note}
            </p>
          ))}
          <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]" onClick={() => onTabChange("overview")}>
            Open overview
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </CardContent>
      </Card>
    </aside>
  );
}
