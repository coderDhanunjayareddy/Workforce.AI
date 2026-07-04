import { Link } from "@tanstack/react-router";
import { BarChart3, CalendarCheck2, MessageSquareText, RefreshCw, Target, UsersRound } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { ContactDashboard, ContactSegment } from "@/types";

const widgetIcons = [UsersRound, Target, RefreshCw, CalendarCheck2, MessageSquareText, BarChart3];

export function ContactDashboardWidgets({ dashboard }: { dashboard: ContactDashboard }) {
  const widgets = [
    ["Total Contacts", dashboard.totalContacts.toLocaleString("en-IN")],
    ["Qualified Leads", dashboard.qualifiedLeads.toLocaleString("en-IN")],
    ["Customers", dashboard.activeCustomers.toLocaleString("en-IN")],
    ["Renewals Due", dashboard.renewalsDue.toLocaleString("en-IN")],
    ["Recently Added", dashboard.recentlyAdded.toLocaleString("en-IN")],
    ["Campaign Coverage", `${dashboard.campaignCoverage}%`],
    ["Active Conversations", dashboard.activeConversations.toLocaleString("en-IN")],
    ["Appointments Scheduled", dashboard.appointmentsScheduled.toLocaleString("en-IN")]
  ];

  return (
    <Card>
      <CardHeader title="Contact Dashboard" description="Customer intelligence powering campaigns, conversations and renewals." />
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {widgets.map(([label, value], index) => {
          const Icon = widgetIcons[index % widgetIcons.length];
          return (
            <div key={label} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
              <Icon className="h-4 w-4 text-[var(--ai-accent)]" aria-hidden="true" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p>
              <p className="mt-1 font-display text-xl font-semibold text-[var(--text-primary)]">{value}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function ContactRecommendations({ dashboard }: { dashboard: ContactDashboard }) {
  return (
    <Card>
      <CardHeader title="AI Recommendations" description="Actionable contact moves for the current pipeline." />
      <CardContent className="space-y-3">
        {dashboard.recommendations.map((recommendation) => (
          <div key={recommendation.id} className="rounded-[16px] border border-[var(--border)] p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-[var(--text-primary)]">{recommendation.title}</h3>
              <Badge tone={recommendation.priority === "critical" ? "red" : recommendation.priority === "high" ? "amber" : "blue"}>{recommendation.priority}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{recommendation.reason}</p>
            <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">{recommendation.impact}</p>
            <Link to={recommendation.href} className="mt-3 inline-flex text-sm font-semibold text-[var(--ai-accent)]">
              {recommendation.action}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ContactInsights({ dashboard }: { dashboard: ContactDashboard }) {
  return (
    <Card>
      <CardHeader title="Contact Insights" description="Quality, response and conversion health across the database." />
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {dashboard.insights.map((insight) => (
          <div key={insight.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">{insight.label}</p>
              <span className="text-xs font-semibold text-emerald-600">{insight.trend}</span>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">{insight.value}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">{insight.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SegmentPanel({ segments }: { segments: ContactSegment[] }) {
  return (
    <Card>
      <CardHeader
        title="Segments"
        description="Dynamic customer groups for targeting, renewals and support."
        action={<Link to="/app/contacts/segments" className="text-sm font-semibold text-[var(--ai-accent)]">View all</Link>}
      />
      <CardContent className="space-y-3">
        {segments.slice(0, 5).map((segment) => (
          <Link key={segment.id} to="/app/contacts/segments" className="block rounded-[16px] border border-[var(--border)] p-4 hover:bg-[var(--surface-elevated)]">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-[var(--text-primary)]">{segment.name}</span>
              <Badge tone={segment.health > 85 ? "green" : segment.health > 75 ? "teal" : "amber"}>{segment.contacts.toLocaleString("en-IN")}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{segment.description}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function ContactActivityPanel({ dashboard }: { dashboard: ContactDashboard }) {
  return (
    <Card>
      <CardHeader title="Customer Timeline" description="Recent events connecting contacts to outcomes." />
      <CardContent className="space-y-4">
        {dashboard.recentActivity.map((item) => (
          <div key={item.id} className="border-l-2 border-[var(--ai-accent)] pl-4">
            <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
            {item.href ? <Link to={item.href} className="mt-2 inline-flex text-sm font-semibold text-[var(--ai-accent)]">Open related workflow</Link> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
