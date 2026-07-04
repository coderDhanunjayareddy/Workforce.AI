import { Link } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard, HealthRing, MetricCard } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Select, Table } from "@/components/ui";
import type { AnalyticsDashboard, AnalyticsForecast, AnalyticsInsight, EmployeeAnalyticsRow, ReportDefinition } from "@/types";
import { Activity, CalendarCheck2, Clock, IndianRupee, Percent, Target, ThumbsUp, UsersRound } from "lucide-react";

export function ExecutiveKpis({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const kpis = dashboard.kpis;
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
      <MetricCard icon={IndianRupee} label="Revenue Influenced" value="Rs. 2.4 Cr" trend="+18%" subtitle="Quarterly influence" />
      <MetricCard icon={CalendarCheck2} label="Appointments" value={kpis.appointments.toLocaleString("en-IN")} trend="+12%" subtitle="Booked outcomes" />
      <MetricCard icon={Activity} label="Calls Completed" value={kpis.callsAutomated.toLocaleString("en-IN")} trend="+16%" subtitle="Conversations handled" />
      <MetricCard icon={Target} label="Qualified Leads" value={kpis.qualifiedLeads.toLocaleString("en-IN")} trend="+9%" subtitle="Sales-ready prospects" />
      <MetricCard icon={Percent} label="Conversion Rate" value={`${kpis.conversionRate}%`} trend="+4%" subtitle="Campaign conversion" />
      <MetricCard icon={ThumbsUp} label="Customer Satisfaction" value={`${kpis.customerSatisfaction}%`} trend="+4%" subtitle="CSAT score" />
      <MetricCard icon={Clock} label="Hours Saved" value={kpis.hoursSaved.toLocaleString("en-IN")} trend="+22%" subtitle="Operational workload" />
      <MetricCard icon={UsersRound} label="ROI" value={`${kpis.roi}%`} trend="+38%" subtitle="Return on workforce" />
    </section>
  );
}

export function BusinessImpact({ dashboard }: { dashboard: AnalyticsDashboard }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Business Impact</h2>
      <div className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Revenue Trend" description="Revenue influence across the executive reporting period." summary={dashboard.businessImpact.summary}>
        <ResponsiveContainer width="100%" height={280}><AreaChart data={dashboard.businessImpact.revenueTrend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="revenue" stroke="var(--ai-accent)" fill="var(--ai-accent)" fillOpacity={0.18} /></AreaChart></ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Appointments and Qualified Leads" description="Business growth through customer outcomes." summary="Appointments and qualified leads are both trending upward this quarter.">
        <ResponsiveContainer width="100%" height={280}><BarChart data={dashboard.businessImpact.revenueTrend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="appointments" fill="var(--ai-accent)" /><Bar dataKey="leads" fill="var(--secondary)" /></BarChart></ResponsiveContainer>
      </ChartCard>
      </div>
    </section>
  );
}

export function WorkforcePerformance({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const metrics = dashboard.workforcePerformance;
  return (
    <section className="grid gap-6 xl:grid-cols-[0.7fr_1fr]">
      <Card><CardHeader title="AI Workforce Performance" description="Total employees, health, CSAT, duration, success and utilization." /><CardContent className="grid gap-4 sm:grid-cols-2"><HealthRing value={metrics.averageHealth} label="Average Health" />{[
        ["Total Employees", metrics.totalEmployees],
        ["Active Employees", metrics.activeEmployees],
        ["Average CSAT", `${metrics.averageCsat}%`],
        ["Average Call Duration", metrics.averageCallDuration],
        ["Success Rate", `${metrics.successRate}%`],
        ["Employee Utilization", `${metrics.utilization}%`]
      ].map(([label, value]) => <div key={label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-sm text-[var(--text-secondary)]">{label}</p><p className="mt-2 font-display text-2xl font-semibold">{value}</p></div>)}</CardContent></Card>
      <ChartCard title="Department Performance Heatmap" description="Department health, training, knowledge and compliance indicators." summary="Sales and Finance are leading; Claims has the clearest improvement opportunity.">
        <ResponsiveContainer width="100%" height={300}><BarChart data={dashboard.workforceHealth.departmentHealth}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer>
      </ChartCard>
    </section>
  );
}

export function EmployeeLeaderboard({ rows }: { rows: EmployeeAnalyticsRow[] }) {
  return (
    <Card>
      <CardHeader title="Employee Leaderboard" description="Ranked by calls, appointments, revenue, CSAT, health and trend." />
      <CardContent>
        <Table>
          <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Rank", "Employee", "Department", "Calls", "Appointments", "Revenue", "CSAT", "Health", "Trend"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.employeeId} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{row.rank}</td><td className="p-3"><Link to="/app/employees/$employeeId" params={{ employeeId: row.employeeId }} className="font-semibold text-[var(--ai-accent)]">{row.employee}</Link></td><td className="p-3">{row.department}</td><td className="p-3">{row.calls} Calls</td><td className="p-3">{row.appointments} Appointments</td><td className="p-3">{row.revenue}</td><td className="p-3">{row.csat}%</td><td className="p-3">{row.health}%</td><td className="p-3"><Badge tone="green">{row.trend}</Badge></td></tr>)}</tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function CampaignAnalyticsView({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const data = dashboard.campaignAnalytics;
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader title="Campaign Analytics" description="Success, appointments, revenue, conversion, response and completion." /><CardContent className="grid gap-3 md:grid-cols-3">{Object.entries({ "Campaign Success": `${data.campaignSuccess}%`, Appointments: data.appointments, Revenue: data.revenue, Conversion: `${data.conversion}%`, "Customer Response": `${data.customerResponse}%`, Completion: `${data.completion}%` }).map(([label, value]) => <MetricBox key={label} label={label} value={String(value)} />)}</CardContent></Card>
      <ChartCard title="Campaign Comparison" description="Appointments and progress across active campaigns." summary="Motor Insurance Q3 is currently the strongest performer."><ResponsiveContainer width="100%" height={280}><BarChart data={data.comparison}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="appointments" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Campaign Funnel" description="Contacts through policies sold." summary="The appointment step is the biggest opportunity to expand conversion."><ResponsiveContainer width="100%" height={280}><BarChart data={data.funnel}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="var(--secondary)" /></BarChart></ResponsiveContainer></ChartCard>
      <Donut title="Revenue Distribution" data={data.revenueDistribution} summary="Revenue remains concentrated in motor and renewal campaigns." />
    </section>
  );
}

export function CustomerAnalyticsView({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const data = dashboard.customerAnalytics;
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Donut title="Lead Sources" data={data.leadSources} summary="Campaign import and referrals produce the strongest customer quality." />
      <Donut title="Customer Segments" data={data.customerSegments} summary="Qualified leads and renewals are the highest-value segments." />
      <Donut title="Policy Distribution" data={data.policyDistribution} summary="Motor and health remain the largest active policy categories." />
      <Card><CardHeader title="Customer Experience" description="Retention, renewals, response rate and satisfaction." /><CardContent className="grid gap-3 md:grid-cols-2">{Object.entries({ Retention: `${data.retention}%`, Renewals: data.renewals, "Response Rate": `${data.responseRate}%`, Satisfaction: `${data.satisfaction}%` }).map(([label, value]) => <MetricBox key={label} label={label} value={String(value)} />)}</CardContent></Card>
    </section>
  );
}

export function ConversationAnalyticsView({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const data = dashboard.conversationAnalytics;
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Calls Per Hour" description="Conversation volume by business hour." summary="Peak demand lands between 11:00 and 14:00."><ResponsiveContainer width="100%" height={280}><BarChart data={data.callsPerHour}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="calls" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer></ChartCard>
      <Donut title="Sentiment Distribution" data={data.sentimentDistribution} summary="Positive and satisfied conversations dominate the current period." />
      <Donut title="Knowledge Usage" data={data.knowledgeUsage} summary="Pricing and policy documents remain central to conversation quality." />
      <Donut title="Conversation Outcomes" data={data.outcomes} summary="Appointments and qualified outcomes are tracking above target." />
    </section>
  );
}

export function KnowledgeAnalyticsView({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const data = dashboard.knowledgeAnalytics;
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader title="Knowledge Analytics" description="Coverage, freshness, confidence, document usage and training impact." /><CardContent className="grid gap-3 md:grid-cols-3"><MetricBox label="Knowledge Coverage" value={`${data.coverage}%`} /><MetricBox label="Knowledge Freshness" value={`${data.freshness}%`} /><MetricBox label="Knowledge Confidence" value={`${data.confidence}%`} /></CardContent></Card>
      <Donut title="Most Used Documents" data={data.mostUsedDocuments} summary="Insurance Products and Pricing Guide are the most referenced documents." />
      <ChartCard title="Knowledge Usage" description="Document usage across active conversations." summary="Usage remains concentrated in sales and support documents."><ResponsiveContainer width="100%" height={280}><BarChart data={data.documentUsage}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Training Impact" description="Impact before and after training refreshes." summary="Training refresh increased confidence and answer quality."><ResponsiveContainer width="100%" height={280}><LineChart data={data.trainingImpact}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line dataKey="value" stroke="var(--secondary)" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard>
    </section>
  );
}

export function InsightsForecasts({ insights, forecasts }: { insights: AnalyticsInsight[]; forecasts: AnalyticsForecast[] }) {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader title="AI Insights" description="Priority, business impact and recommended action." /><CardContent className="space-y-3">{insights.map((insight) => <Link key={insight.id} to={insight.href} className="block rounded-[16px] border border-[var(--border)] p-4 hover:bg-[var(--surface-elevated)]"><div className="flex justify-between gap-3"><p className="font-semibold">{insight.title}</p><Badge tone={insight.priority === "critical" ? "red" : insight.priority === "high" ? "amber" : "blue"}>{insight.priority}</Badge></div><p className="mt-2 text-sm text-[var(--text-secondary)]">{insight.businessImpact}</p><p className="mt-2 text-sm font-semibold text-[var(--ai-accent)]">{insight.recommendedAction}</p></Link>)}</CardContent></Card>
      <Card><CardHeader title="Forecasts" description="Projected revenue, appointments, completion, capacity, demand and growth." /><CardContent className="grid gap-3 md:grid-cols-2">{forecasts.map((forecast) => <div key={forecast.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-sm text-[var(--text-secondary)]">{forecast.label}</p><p className="mt-2 font-display text-2xl font-semibold">{forecast.value}</p><p className="mt-1 text-xs font-semibold text-emerald-600">{forecast.trend}</p><p className="mt-2 text-xs text-[var(--text-muted)]">{forecast.description}</p></div>)}</CardContent></Card>
    </section>
  );
}

export function ReportBuilder({ reports, onGenerate, generating }: { reports: ReportDefinition[]; onGenerate: (format: ReportDefinition["format"]) => void; generating: boolean }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.75fr_1fr]">
      <Card><CardHeader title="Custom Report Builder" description="Build reports by date, department, employee, campaign, knowledge and conversation." /><CardContent className="space-y-3"><Select><option>Date</option><option>Quarter</option></Select><Select><option>Department</option><option>Sales</option></Select><Select><option>Employee</option><option>Sophia</option></Select><Select><option>Campaign</option><option>Motor Insurance Q3</option></Select><Select><option>Knowledge</option><option>Pricing Guide v3</option></Select><Select><option>Conversation</option><option>All conversations</option></Select><div className="flex flex-wrap gap-2 pt-2">{["PDF", "Excel", "CSV"].map((format) => <Button key={format} type="button" loading={generating} onClick={() => onGenerate(format as ReportDefinition["format"])}>{format}</Button>)}</div></CardContent></Card>
      <Card><CardHeader title="Report Export" description="Branding, company logo, date, prepared by, summary, charts and KPIs." /><CardContent><Table><thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]"><th className="p-3">Report</th><th className="p-3">Format</th><th className="p-3">Date</th><th className="p-3">Prepared By</th><th className="p-3">Status</th></tr></thead><tbody>{reports.map((report) => <tr key={report.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{report.title}</td><td className="p-3">{report.format}</td><td className="p-3">{report.date}</td><td className="p-3">{report.preparedBy}</td><td className="p-3"><Badge tone="green">{report.status}</Badge></td></tr>)}</tbody></Table></CardContent></Card>
    </section>
  );
}

function Donut({ title, data, summary }: { title: string; data: AnalyticsDashboard["customerAnalytics"]["leadSources"]; summary: string }) {
  return (
    <ChartCard title={title} description="Distribution and proportional business contribution." summary={summary}>
      <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={data} dataKey="value" nameKey="name" outerRadius={95}>{data.map((item, index) => <Cell key={item.name} fill={["#0f766e", "#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"][index % 6]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
    </ChartCard>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-sm text-[var(--text-secondary)]">{label}</p><p className="mt-2 font-display text-2xl font-semibold">{value}</p></div>;
}
