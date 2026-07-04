import { Link } from "@tanstack/react-router";
import { Activity, CalendarClock, CheckCircle2, IndianRupee, Megaphone, PauseCircle, Target, UsersRound } from "lucide-react";

import { MetricCard } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { CampaignDashboard } from "@/types";

export function CampaignStatsBar({ dashboard }: { dashboard: CampaignDashboard }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7" aria-label="Campaign KPI cards">
      <MetricCard icon={Megaphone} label="Total Campaigns" value={String(dashboard.totalCampaigns)} trend="+3" subtitle="Enterprise programs" />
      <MetricCard icon={Activity} label="Running" value={String(dashboard.runningCampaigns)} trend="live" subtitle="Executing now" />
      <MetricCard icon={CalendarClock} label="Scheduled" value={String(dashboard.scheduledCampaigns)} trend="ready" subtitle="Future launches" />
      <MetricCard icon={CheckCircle2} label="Completed" value={String(dashboard.completedCampaigns)} trend="+2" subtitle="Closed this month" />
      <MetricCard icon={PauseCircle} label="Paused" value={String(dashboard.pausedCampaigns)} trend="review" subtitle="Needs action" />
      <MetricCard icon={UsersRound} label="Appointments" value={String(dashboard.appointmentsGenerated)} trend="+12" subtitle="Generated outcomes" />
      <MetricCard icon={IndianRupee} label="Revenue" value={dashboard.revenueInfluenced} trend="+15%" subtitle="Influenced premium" />
    </section>
  );
}

export function CampaignDashboardWidgets({ dashboard }: { dashboard: CampaignDashboard }) {
  const widgets = [
    ["Total Campaigns", dashboard.totalCampaigns],
    ["Running Campaigns", dashboard.runningCampaigns],
    ["Scheduled Campaigns", dashboard.scheduledCampaigns],
    ["Completed Campaigns", dashboard.completedCampaigns],
    ["Paused Campaigns", dashboard.pausedCampaigns],
    ["Appointments Generated", dashboard.appointmentsGenerated],
    ["Revenue Influenced", dashboard.revenueInfluenced],
    ["Campaign Success Rate", `${dashboard.campaignSuccessRate}%`]
  ];
  return (
    <Card>
      <CardHeader title="Campaign Dashboard" description="Operational health across objectives, audiences, workforce ownership and revenue." />
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {widgets.map(([label, value]) => (
          <div key={label} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
            <Target className="h-4 w-4 text-[var(--ai-accent)]" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p>
            <p className="mt-1 font-display text-xl font-semibold text-[var(--text-primary)]">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CampaignRecommendations({ dashboard }: { dashboard: CampaignDashboard }) {
  return (
    <Card>
      <CardHeader title="AI Recommendations" description="Optimization actions tied to business impact." />
      <CardContent className="space-y-3">
        {dashboard.recommendations.map((item) => (
          <div key={item.id} className="rounded-[16px] border border-[var(--border)] p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <Badge tone={item.priority === "critical" ? "red" : item.priority === "high" ? "amber" : "blue"}>{item.priority}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.reason}</p>
            <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">{item.impact}</p>
            <Link to={item.href} className="mt-3 inline-flex text-sm font-semibold text-[var(--ai-accent)]">{item.action}</Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CampaignActivity({ dashboard }: { dashboard: CampaignDashboard }) {
  return (
    <Card>
      <CardHeader title="Campaign Timeline" description="Created, assigned, launched, optimized and completed milestones." />
      <CardContent className="space-y-4">
        {dashboard.activity.map((item) => (
          <div key={item.id} className="border-l-2 border-[var(--ai-accent)] pl-4">
            <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
            {item.href ? <Link to={item.href} className="mt-2 inline-flex text-sm font-semibold text-[var(--ai-accent)]">Open workflow</Link> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
