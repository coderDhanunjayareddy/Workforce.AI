import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { HealthRing } from "@/components/shared";
import { Avatar, Badge, Card, CardContent, CardHeader, Table } from "@/components/ui";
import type {
  Employee,
  EmployeeConversationItem,
  EmployeeHealth,
  EmployeeKnowledgeItem,
  EmployeePerformance,
  EmployeeTimelineItem,
  EmployeeWorkspaceData
} from "@/types";

import { InfoRow, MetricTile, ProgressRow } from "./WorkspacePrimitives";

const priorityTone = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "teal"
} as const;

export function WorkspaceOverviewTab({
  employee,
  workspace,
  performance,
  health,
  timeline,
  knowledge,
  conversations
}: {
  employee: Employee;
  workspace: EmployeeWorkspaceData;
  performance: EmployeePerformance;
  health: EmployeeHealth;
  timeline: EmployeeTimelineItem[];
  knowledge: EmployeeKnowledgeItem[];
  conversations: EmployeeConversationItem[];
}) {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Identity Card" description="Profile, ownership and current version." />
          <CardContent>
            <div className="flex gap-4">
              <Avatar name={employee.name} src={employee.avatarUrl} className="h-16 w-16" />
              <div>
                <h2 className="font-display text-2xl font-semibold">{employee.name}</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{employee.role}</p>
              </div>
            </div>
            <dl className="mt-6 grid gap-3">
              <InfoRow label="Department" value={employee.department} />
              <InfoRow label="Manager" value={workspace.manager} />
              <InfoRow label="Voice" value={employee.voice} />
              <InfoRow label="Language" value={employee.language} />
              <InfoRow label="Created Date" value={workspace.createdDate} />
              <InfoRow label="Current Version" value={workspace.currentVersion} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Business Contribution" description="Measurable impact created by this AI Employee." />
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="Revenue Influenced" value={performance.businessContribution.revenueInfluenced} />
            <MetricTile label="Appointments Booked" value={performance.businessContribution.appointmentsBooked} />
            <MetricTile label="Calls Completed" value={performance.businessContribution.callsCompleted} />
            <MetricTile label="Qualified Leads" value={performance.businessContribution.qualifiedLeads} />
            <MetricTile label="Customer Satisfaction" value={`${performance.businessContribution.customerSatisfaction}%`} />
            <MetricTile label="Hours Saved" value={performance.businessContribution.hoursSaved} />
            <MetricTile label="Conversion Rate" value={`${performance.businessContribution.conversionRate}%`} />
            <MetricTile label="Leaderboard" value={`#${performance.leaderboardPosition}`} />
          </CardContent>
        </Card>
      </section>

      {workspace.overview ? (
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader title="Biography" description="Hero AI Employee profile and operating style." />
            <CardContent>
              <p className="text-sm leading-6 text-[var(--text-secondary)]">{workspace.overview.biography}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {workspace.overview.personality.map((trait) => (
                  <span key={trait} className="rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm font-semibold">
                    {trait}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title={`${employee.name} KPIs`} description="Production metrics from the approved profile." />
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {workspace.overview.kpiHighlights.map((item) => (
                  <MetricTile key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
              <div className="space-y-2">
                {workspace.overview.speakingRules.slice(0, 4).map((rule) => (
                  <p key={rule} className="rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {rule}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader title="Current Assignment" description={workspace.assignment.businessGoal} />
          <CardContent className="space-y-3">
            <InfoRow label="Campaign" value={<Link to="/app/campaigns" className="text-[var(--secondary)] hover:underline">{workspace.assignment.campaign}</Link>} />
            <InfoRow label="Department" value={workspace.assignment.department} />
            <InfoRow label="Priority" value={<Badge tone={priorityTone[workspace.assignment.priority]}>{workspace.assignment.priority}</Badge>} />
            <InfoRow label="Working Hours" value={workspace.assignment.workingHours} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Health Snapshot" description={health.trend} />
          <CardContent>
            <HealthRing value={health.overall} />
            <div className="mt-5 space-y-4">
              <ProgressRow label="Knowledge Freshness" value={health.knowledge} />
              <ProgressRow label="Voice Quality" value={health.voice} />
              <ProgressRow label="Tool Connectivity" value={health.tools} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Knowledge Status" description="Assigned knowledge sources and freshness." />
          <CardContent className="space-y-3">
            {knowledge.slice(0, 4).map((item) => (
              <Link key={item.id} to="/app/knowledge" className="block rounded-[12px] bg-[var(--surface-elevated)] p-3 hover:shadow-sm">
                <span className="block text-sm font-semibold">{item.title}</span>
                <span className="mt-1 block text-xs text-[var(--text-secondary)]">{item.version} - {item.freshness}% fresh</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Employee Timeline" description="Chronological growth of this workspace." />
          <CardContent className="space-y-3">
            {timeline.map((item) => (
              <div key={item.id} className="grid grid-cols-[64px_1fr] gap-3">
                <span className="text-sm font-semibold text-[var(--text-muted)]">{item.date}</span>
                <span className="border-l border-[var(--border)] pl-4">
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{item.description}</span>
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Recent Conversations" description="Latest customer interactions and outcomes." />
          <CardContent>
            <Table>
              <thead>
                <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Outcome</th>
                  <th className="p-3">Sentiment</th>
                  <th className="p-3">Knowledge Used</th>
                  <th className="p-3">Open</th>
                </tr>
              </thead>
              <tbody>
                {conversations.slice(0, 10).map((conversation) => (
                  <tr key={conversation.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="p-3 font-semibold">{conversation.customerName}</td>
                    <td className="p-3">{conversation.duration}</td>
                    <td className="p-3">{conversation.outcome}</td>
                    <td className="p-3">{conversation.sentiment}</td>
                    <td className="p-3">{conversation.knowledgeUsed}</td>
                    <td className="p-3">
                      <Link to="/app/conversations" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)] hover:underline">
                        Open
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
