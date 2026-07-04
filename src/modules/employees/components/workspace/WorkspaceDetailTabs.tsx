import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { ChartCard, HealthRing } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Input, Select, Table } from "@/components/ui";
import type {
  Employee,
  EmployeeConversationItem,
  EmployeeHealth,
  EmployeeKnowledgeItem,
  EmployeePerformance,
  EmployeeTrainingItem,
  EmployeeVersionItem,
  EmployeeWorkspaceData
} from "@/types";

import type { WorkspaceTabId } from "../../constants/workspace.constants";
import { MetricTile, ProgressRow } from "./WorkspacePrimitives";

const colors = ["var(--ai-accent)", "var(--secondary)", "var(--warning)", "var(--success)", "var(--danger)"];

export function WorkspaceDetailTabs({
  activeTab,
  employee,
  workspace,
  performance,
  health,
  knowledge,
  conversations,
  training,
  versions
}: {
  activeTab: WorkspaceTabId;
  employee: Employee;
  workspace: EmployeeWorkspaceData;
  performance: EmployeePerformance;
  health: EmployeeHealth;
  knowledge: EmployeeKnowledgeItem[];
  conversations: EmployeeConversationItem[];
  training: EmployeeTrainingItem[];
  versions: EmployeeVersionItem[];
}) {
  if (activeTab === "performance") return <PerformanceTab employee={employee} performance={performance} />;
  if (activeTab === "knowledge") return <KnowledgeTab knowledge={knowledge} />;
  if (activeTab === "goals") return <GoalsTab workspace={workspace} />;
  if (activeTab === "skills") return <SkillsTab workspace={workspace} />;
  if (activeTab === "voice") return <VoiceTab employee={employee} workspace={workspace} />;
  if (activeTab === "policies") return <PoliciesTab workspace={workspace} />;
  if (activeTab === "tools") return <ToolsTab workspace={workspace} />;
  if (activeTab === "analytics") return <AnalyticsTab performance={performance} conversations={conversations} />;
  if (activeTab === "conversations") return <ConversationHistoryTab conversations={conversations} />;
  if (activeTab === "training") return <TrainingTab training={training} workspace={workspace} />;
  if (activeTab === "health") return <HealthTab health={health} workspace={workspace} />;
  return <VersionsTab versions={versions} />;
}

function PerformanceTab({ employee, performance }: { employee: Employee; performance: EmployeePerformance }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile label="Calls" value={performance.businessContribution.callsCompleted} />
        <MetricTile label="Appointments" value={performance.businessContribution.appointmentsBooked} />
        <MetricTile label="Success Rate" value={`${performance.businessContribution.conversionRate}%`} />
        <MetricTile label="CSAT" value={`${employee.csat}%`} />
        <MetricTile label="Average Duration" value={employee.department === "Claims" ? "6m 12s" : "4m 28s"} />
        <MetricTile label="Revenue Influenced" value={performance.businessContribution.revenueInfluenced} />
        <MetricTile label="Leaderboard Position" value={`#${performance.leaderboardPosition}`} />
        <MetricTile label="Hours Saved" value={performance.businessContribution.hoursSaved} />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Monthly Trends" description="Calls, appointments and revenue across the month." summary="Performance improved across the last four weeks, with appointments tracking above target.">
          <div className="h-64" role="img" aria-label="Monthly performance trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance.monthlyTrends} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" name="Calls" stroke="var(--ai-accent)" strokeWidth={3} />
                <Line type="monotone" dataKey="appointments" name="Appointments" stroke="var(--secondary)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Revenue Influenced" description="Revenue influence trend." summary="Revenue influence is strongest when knowledge freshness stays above 95%.">
          <div className="h-64" role="img" aria-label="Revenue influenced trend">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performance.monthlyTrends} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="var(--ai-accent)" fill="var(--ai-accent)" fillOpacity={0.18} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>
    </div>
  );
}

function KnowledgeTab({ knowledge }: { knowledge: EmployeeKnowledgeItem[] }) {
  return (
    <Card>
      <CardHeader title="Knowledge Sources" description="Documents, websites, FAQs, policies and scripts assigned to this employee." action={<LinkButton to="/app/knowledge">Upload Knowledge</LinkButton>} />
      <CardContent>
        <Table>
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
              <th className="p-3">Source</th>
              <th className="p-3">Type</th>
              <th className="p-3">Index Status</th>
              <th className="p-3">Freshness</th>
              <th className="p-3">Version</th>
              <th className="p-3">Last Updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {knowledge.map((item) => (
              <tr key={item.id} className="border-b border-[var(--border)] last:border-0">
                <td className="p-3 font-semibold">{item.title}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3"><Badge tone={item.status === "indexed" ? "green" : "amber"}>{item.status}</Badge></td>
                <td className="p-3">{item.freshness}%</td>
                <td className="p-3">{item.version}</td>
                <td className="p-3">{item.lastUpdated}</td>
                <td className="p-3"><Link to="/app/knowledge" className="text-sm font-semibold text-[var(--secondary)] hover:underline">Preview</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

function GoalsTab({ workspace }: { workspace: EmployeeWorkspaceData }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {workspace.goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader title={goal.title} description={goal.target} />
          <CardContent>
            <ProgressRow label="Current Progress" value={goal.progress} detail={goal.achievement} />
            <p className="mt-4 text-sm text-[var(--text-secondary)]">Completion rate is measured against Nova Insurance campaign targets.</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function SkillsTab({ workspace }: { workspace: EmployeeWorkspaceData }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {workspace.skills.map((skill) => (
        <Card key={skill.id}>
          <CardContent>
            <h3 className="font-display text-base font-semibold">{skill.title}</h3>
            <ProgressRow label="Level" value={skill.level} detail={`${skill.trend} - Last training ${skill.lastTraining}`} />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function VoiceTab({ employee, workspace }: { employee: Employee; workspace: EmployeeWorkspaceData }) {
  return (
    <Card>
      <CardHeader title="Voice Profile" description="Communication quality, tone and preview controls." action={<Button variant="secondary">Preview Voice</Button>} />
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <MetricTile label="Voice Name" value={employee.voice} />
        <MetricTile label="Language" value={employee.language} />
        <MetricTile label="Accent" value={workspace.voiceProfile.accent} />
        <MetricTile label="Tone" value={workspace.voiceProfile.tone} />
        <MetricTile label="Speaking Speed" value={workspace.voiceProfile.speakingSpeed} />
        <MetricTile label="Pitch" value={workspace.voiceProfile.pitch} />
        <MetricTile label="Emotion" value={workspace.voiceProfile.emotion} />
        <MetricTile label="Voice Quality" value={`${workspace.voiceProfile.quality}%`} />
      </CardContent>
    </Card>
  );
}

function PoliciesTab({ workspace }: { workspace: EmployeeWorkspaceData }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {workspace.policies.map((policy) => (
        <Card key={policy.id}>
          <CardHeader title={policy.title} />
          <CardContent>
            <p className="text-sm leading-6 text-[var(--text-secondary)]">{policy.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function ToolsTab({ workspace }: { workspace: EmployeeWorkspaceData }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {workspace.tools.map((tool) => (
        <Card key={tool.id}>
          <CardHeader title={tool.name} description={`Last sync ${tool.lastSync}`} action={<Badge tone={tool.status === "connected" ? "green" : "amber"}>{tool.status}</Badge>} />
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="secondary" type="button">Configure</Button>
            <Button variant="ghost" type="button">Reconnect</Button>
            <Button variant="ghost" type="button">Disconnect</Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function AnalyticsTab({ performance, conversations }: { performance: EmployeePerformance; conversations: EmployeeConversationItem[] }) {
  const sentiment = ["positive", "neutral", "satisfied", "negative"].map((name) => ({
    name,
    value: conversations.filter((conversation) => conversation.sentiment === name).length + 1
  }));
  const funnel = [
    { name: "Connected", value: performance.businessContribution.callsCompleted },
    { name: "Qualified", value: performance.businessContribution.qualifiedLeads },
    { name: "Appointments", value: performance.businessContribution.appointmentsBooked },
    { name: "Resolved", value: Math.round(performance.businessContribution.callsCompleted * 0.82) }
  ];

  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Conversation Volume" description="Conversation trend by week." summary="Volume is increasing steadily while appointment conversion remains healthy.">
        <ChartFrame><BarChart data={performance.monthlyTrends}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="calls" name="Calls" fill="var(--ai-accent)" radius={[8, 8, 0, 0]} /></BarChart></ChartFrame>
      </ChartCard>
      <ChartCard title="Sentiment" description="Conversation sentiment distribution." summary="Most conversations remain positive or satisfied, with low escalation risk.">
        <ChartFrame><PieChart><Tooltip /><Legend /><Pie data={sentiment} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88}>{sentiment.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} />)}</Pie></PieChart></ChartFrame>
      </ChartCard>
      <ChartCard title="Call Funnel" description="Customer movement through outcomes." summary="The appointment step is the largest improvement opportunity.">
        <ChartFrame><BarChart data={funnel} layout="vertical" margin={{ left: 28 }}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" width={96} /><Tooltip /><Legend /><Bar dataKey="value" name="Customers" fill="var(--secondary)" radius={[0, 8, 8, 0]} /></BarChart></ChartFrame>
      </ChartCard>
      <ChartCard title="Knowledge Usage" description="Knowledge-referenced outcomes." summary="Knowledge freshness remains the strongest predictor of resolution quality.">
        <ChartFrame><AreaChart data={performance.monthlyTrends}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Area type="monotone" dataKey="appointments" name="Knowledge-supported appointments" stroke="var(--ai-accent)" fill="var(--ai-accent)" fillOpacity={0.18} /></AreaChart></ChartFrame>
      </ChartCard>
    </section>
  );
}

function ConversationHistoryTab({ conversations }: { conversations: EmployeeConversationItem[] }) {
  return (
    <Card>
      <CardHeader title="Conversation History" description="Search, filter, sort and export recent customer conversations." action={<Button variant="secondary">Export</Button>} />
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input aria-label="Search conversations" />
          <Select aria-label="Filter sentiment"><option>All sentiment</option><option>Positive</option><option>Neutral</option><option>Negative</option></Select>
          <Select aria-label="Sort conversations"><option>Newest first</option><option>Longest duration</option><option>Outcome</option></Select>
        </div>
        <Table>
          <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]"><th className="p-3">Customer</th><th className="p-3">Campaign</th><th className="p-3">Duration</th><th className="p-3">Sentiment</th><th className="p-3">Outcome</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
          <tbody>{conversations.map((conversation) => <tr key={conversation.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{conversation.customerName}</td><td className="p-3">{conversation.campaign}</td><td className="p-3">{conversation.duration}</td><td className="p-3">{conversation.sentiment}</td><td className="p-3">{conversation.outcome}</td><td className="p-3">{conversation.date}</td><td className="p-3"><Link to="/app/conversations" className="font-semibold text-[var(--secondary)] hover:underline">Open Conversation</Link></td></tr>)}</tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TrainingTab({ training, workspace }: { training: EmployeeTrainingItem[]; workspace: EmployeeWorkspaceData }) {
  return (
    <Card>
      <CardHeader title="Training Center" description={`Current version ${workspace.currentVersion}. Training status is active and ready.`} action={<Button>Retrain Employee</Button>} />
      <CardContent className="space-y-3">
        {training.map((item) => <MetricTile key={item.id} label={`${item.title} - ${item.status}`} value={item.date} detail={item.outcome} />)}
      </CardContent>
    </Card>
  );
}

function HealthTab({ health, workspace }: { health: EmployeeHealth; workspace: EmployeeWorkspaceData }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <Card><CardHeader title="Overall Score" description={health.trend} /><CardContent><HealthRing value={health.overall} /><div className="mt-6 space-y-4"><ProgressRow label="Knowledge" value={health.knowledge} /><ProgressRow label="Voice" value={health.voice} /><ProgressRow label="Performance" value={health.performance} /><ProgressRow label="Compliance" value={health.compliance} /><ProgressRow label="Tools" value={health.tools} /><ProgressRow label="Conversation Quality" value={health.conversationQuality} /></div></CardContent></Card>
        <ChartCard title="Historical Trend" description="Health score over time." summary="Health remains enterprise-ready and above the target threshold."><ChartFrame><LineChart data={health.history}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="value" name="Health" stroke="var(--ai-accent)" strokeWidth={3} /></LineChart></ChartFrame></ChartCard>
      </section>
      <RecommendationList workspace={workspace} />
    </div>
  );
}

function VersionsTab({ versions }: { versions: EmployeeVersionItem[] }) {
  return (
    <Card>
      <CardHeader title="Version History" description="Published changes, knowledge updates and performance impact." />
      <CardContent className="space-y-3">
        {versions.map((version) => <MetricTile key={version.id} label={`${version.version} - Published ${version.published}`} value={version.changes} detail={`${version.knowledgeUpdated} - ${version.performanceDifference}`} />)}
      </CardContent>
    </Card>
  );
}

function RecommendationList({ workspace }: { workspace: EmployeeWorkspaceData }) {
  return (
    <Card>
      <CardHeader title="AI Recommendations" description="Priority actions based on health, knowledge and campaign performance." />
      <CardContent className="grid gap-3 md:grid-cols-2">
        {workspace.recommendations.map((item) => (
          <Link key={item.id} to={item.href} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 hover:shadow-sm">
            <Badge tone={item.priority === "high" ? "amber" : item.priority === "medium" ? "blue" : "teal"}>{item.priority}</Badge>
            <h3 className="mt-3 font-display text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.impact}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]">{item.action}<ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

function LinkButton({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="inline-flex h-9 items-center justify-center rounded-[12px] border border-[var(--border)] px-3 text-sm font-semibold hover:bg-[var(--surface-elevated)]">{children}</Link>;
}

function ChartFrame({ children }: { children: React.ReactElement }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
    </div>
  );
}
