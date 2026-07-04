import { Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard, HealthRing } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader, Table } from "@/components/ui";
import type { CampaignAnalytics, CampaignDetail, CampaignHealth } from "@/types";

export function CampaignDetailTabs({ campaign, analytics, health, activeTab }: { campaign: CampaignDetail; analytics: CampaignAnalytics; health: CampaignHealth; activeTab: string }) {
  if (activeTab === "live") return <LiveTab analytics={analytics} />;
  if (activeTab === "performance") return <PerformanceTab analytics={analytics} />;
  if (activeTab === "contacts") return <ContactsTab campaign={campaign} />;
  if (activeTab === "knowledge") return <KnowledgeTab campaign={campaign} />;
  if (activeTab === "timeline") return <TimelineTab campaign={campaign} />;
  return <OverviewTab campaign={campaign} health={health} />;
}

function OverviewTab({ campaign, health }: { campaign: CampaignDetail; health: CampaignHealth }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
      <Card><CardHeader title="Campaign Information" description="Objective, audience, knowledge, assigned employee and timeline." /><CardContent className="grid gap-4 md:grid-cols-2">{[
        ["Business Objective", campaign.objective],
        ["Assigned Employee", campaign.assignedEmployeeName],
        ["Knowledge Used", `${campaign.knowledgeAssigned.length} sources`],
        ["Target Audience", campaign.targetAudience],
        ["Current Status", campaign.status],
        ["Timeline", `${campaign.schedule.mode} through ${new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(campaign.schedule.endDate))}`]
      ].map(([label, value]) => <div key={label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p><p className="mt-2 font-semibold">{value}</p></div>)}</CardContent></Card>
      <Card><CardHeader title="Campaign Health" description="Overall score with quality drivers." /><CardContent className="space-y-4"><HealthRing value={health.overallScore} label="Overall Score" />{[
        ["Knowledge Quality", health.knowledgeQuality],
        ["Employee Health", health.employeeHealth],
        ["Contact Quality", health.contactQuality],
        ["Conversion Rate", health.conversionRate],
        ["Completion Progress", health.completionProgress]
      ].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-[12px] bg-[var(--surface-elevated)] p-3"><span className="text-sm text-[var(--text-secondary)]">{label}</span><span className="font-semibold">{value}%</span></div>)}</CardContent></Card>
    </div>
  );
}

function LiveTab({ analytics }: { analytics: CampaignAnalytics }) {
  const metrics = analytics.liveMetrics;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Object.entries(metrics).map(([label, value]) => <Card key={label}><CardContent><p className="font-display text-2xl font-semibold">{value}</p><p className="mt-2 text-sm capitalize text-[var(--text-secondary)]">{label.replaceAll(/([A-Z])/g, " $1")}</p></CardContent></Card>)}
      <Card className="md:col-span-2 xl:col-span-4"><CardHeader title="Current Queue" description="Calls in progress, completed calls, pending calls, failed calls, average duration and sentiment distribution." /><CardContent className="grid gap-4 md:grid-cols-3">{Object.entries(analytics.performance).map(([label, value]) => <div key={label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="font-semibold">{value}</p><p className="text-sm capitalize text-[var(--text-secondary)]">{label.replaceAll(/([A-Z])/g, " $1")}</p></div>)}</CardContent></Card>
    </div>
  );
}

function PerformanceTab({ analytics }: { analytics: CampaignAnalytics }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Calls Over Time" description="Calls and appointments by business day." summary="Volume is increasing while appointments stay above target.">
        <ResponsiveContainer width="100%" height={260}><LineChart data={analytics.callsOverTime}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="calls" stroke="var(--ai-accent)" strokeWidth={2} /><Line type="monotone" dataKey="appointments" stroke="var(--secondary)" strokeWidth={2} /></LineChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Conversion Funnel" description="Assigned contacts through revenue-bearing outcomes." summary="Qualified appointments are the strongest conversion step this week.">
        <ResponsiveContainer width="100%" height={260}><BarChart data={analytics.funnel}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Revenue" description="Revenue influenced across campaign activity." summary="Revenue momentum is strongest on Thursday and Friday.">
        <ResponsiveContainer width="100%" height={260}><BarChart data={analytics.callsOverTime}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="revenue" fill="var(--secondary)" /></BarChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Customer Satisfaction" description="Sentiment distribution from campaign conversations." summary="Positive sentiment remains healthy; negative responses need escalation review.">
        <ResponsiveContainer width="100%" height={260}><PieChart><Pie data={analytics.sentiment} dataKey="value" nameKey="name" outerRadius={90}>{analytics.sentiment.map((entry, index) => <Cell key={entry.name} fill={["#0f766e", "#2563eb", "#16a34a", "#dc2626"][index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ContactsTab({ campaign }: { campaign: CampaignDetail }) {
  return <Card><CardHeader title="Assigned Contacts" description="Status, last contact, outcome, next action, search, filters and bulk actions." /><CardContent><Table><thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Contact", "Status", "Last Contact", "Outcome", "Next Action", "Actions"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{campaign.contactsAssigned.map((contact) => <tr key={contact.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3"><Link to="/app/contacts/$contactId" params={{ contactId: contact.contactId }} className="font-semibold text-[var(--ai-accent)]">{contact.fullName}</Link><p className="text-xs text-[var(--text-muted)]">{contact.company}</p></td><td className="p-3"><Badge>{contact.status}</Badge></td><td className="p-3">{new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(contact.lastContact))}</td><td className="p-3">{contact.outcome}</td><td className="p-3">{contact.nextAction}</td><td className="p-3"><Link to="/app/conversations" className="font-semibold text-[var(--ai-accent)]">Timeline</Link></td></tr>)}</tbody></Table></CardContent></Card>;
}

function KnowledgeTab({ campaign }: { campaign: CampaignDetail }) {
  return <Card><CardHeader title="Knowledge Assigned" description="Usage, performance, freshness and recommendations." /><CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{campaign.knowledgeAssigned.map((item) => <Link key={item.id} to="/app/knowledge/$knowledgeId" params={{ knowledgeId: item.knowledgeId }} className="rounded-[16px] border border-[var(--border)] p-4 hover:bg-[var(--surface-elevated)]"><p className="font-semibold">{item.title}</p><p className="mt-2 text-sm text-[var(--text-secondary)]">{item.type} | {item.recommendation}</p><div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm"><span>{item.usage}% usage</span><span>{item.performance}% performance</span><span>{item.freshness}% fresh</span></div></Link>)}</CardContent></Card>;
}

function TimelineTab({ campaign }: { campaign: CampaignDetail }) {
  return <Card><CardHeader title="Timeline" description="Campaign Created, Knowledge Assigned, Employee Assigned, Campaign Started, Appointments Generated, Campaign Completed." /><CardContent className="space-y-4">{campaign.timeline.map((item) => <div key={item.id} className="border-l-2 border-[var(--ai-accent)] pl-4"><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>{item.href ? <Link to={item.href} className="mt-2 inline-flex text-sm font-semibold text-[var(--ai-accent)]">Open workflow</Link> : null}</div>)}</CardContent></Card>;
}
