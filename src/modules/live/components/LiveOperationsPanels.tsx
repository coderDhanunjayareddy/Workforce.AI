import { Link } from "@tanstack/react-router";
import { Activity, CalendarCheck2, Clock3, Headphones, Pause, PhoneCall, Radio, ShieldAlert, UsersRound } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard, MetricCard } from "@/components/shared";
import { Avatar, Badge, Button, Card, CardContent, CardHeader, Table } from "@/components/ui";
import { employeeAssetService } from "@/services/employeeAssetService";
import type {
  ConversationDetail,
  ConversationQueueItem,
  LiveEmployeeStatus,
  LiveOperationsDashboard,
  SentimentPoint,
  TranscriptLine
} from "@/types";

import { sentimentTone, statusTone } from "./liveDisplay";

export function LiveKpis({ dashboard }: { dashboard: LiveOperationsDashboard }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6" aria-label="Executive KPIs">
      <MetricCard icon={Radio} label="Active Calls" value={String(dashboard.activeCalls)} trend="live" subtitle="Connected now" />
      <MetricCard icon={UsersRound} label="Waiting Queue" value={String(dashboard.waitingQueue)} trend="watch" subtitle="Customers waiting" />
      <MetricCard icon={PhoneCall} label="Completed Today" value={dashboard.completedToday.toLocaleString("en-IN")} trend="+12%" subtitle="Completed calls" />
      <MetricCard icon={Clock3} label="Average Duration" value={dashboard.averageDuration} trend="-8s" subtitle="Current average" />
      <MetricCard icon={Activity} label="Current CSAT" value={`${dashboard.currentCsat}%`} trend="+2%" subtitle="Customer satisfaction" />
      <MetricCard icon={CalendarCheck2} label="Appointments Today" value={String(dashboard.appointmentsToday)} trend="+12" subtitle="Booked outcomes" />
    </section>
  );
}

export function LiveWorkforcePanel({ employees, selectedId, onSelect }: { employees: LiveEmployeeStatus[]; selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <Card>
      <CardHeader title="Live AI Employees" description="Real-time employee status, campaign, customer, duration and health." />
      <CardContent className="space-y-3">
        {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            onClick={() => employee.conversationId && onSelect(employee.conversationId)}
            className={`w-full rounded-[16px] border p-4 text-left transition hover:bg-[var(--surface-elevated)] ${selectedId === employee.conversationId ? "border-[var(--ai-accent)]" : "border-[var(--border)]"}`}
          >
            <div className="flex items-start gap-3">
              <Avatar name={employee.employeeName} src={employeeAssetService.getThumbnailImage(employee.employeeId)} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-semibold text-[var(--text-primary)]">{employee.employeeName}</p>
                  <Badge tone={employee.status === "Talking" ? "green" : employee.status === "On Hold" ? "amber" : "slate"}>{employee.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{employee.department} | {employee.campaign}</p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">{employee.currentCustomer} | {employee.duration}</p>
                <div className="mt-3 h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${employee.health}%` }} /></div>
              </div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

export function LiveConversationPanel({ conversation, transcript }: { conversation: ConversationDetail; transcript: TranscriptLine[] }) {
  return (
    <Card>
      <CardHeader
        title="Live Conversation"
        description={`${conversation.customerName} | ${conversation.customerPhone} | ${conversation.campaignName}`}
        action={<Badge tone={statusTone(conversation.status)}>{conversation.status}</Badge>}
      />
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-4">
          <Metric label="AI Employee" value={conversation.employeeName ?? "AI Employee"} />
          <Metric label="Call Duration" value={conversation.duration} />
          <Metric label="Call Status" value={conversation.status} />
          <Metric label="Campaign" value={conversation.campaignName ?? conversation.goal} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">Live Transcript</h3>
          <div className="mt-3 max-h-[430px] space-y-3 overflow-y-auto pr-2" aria-label="Live transcript">
            {transcript.map((line) => (
              <div key={line.id} className={`rounded-[16px] p-4 ${line.role === "employee" ? "bg-teal-50 dark:bg-teal-950" : "bg-[var(--surface-elevated)]"}`}>
                <div className="flex justify-between gap-3 text-xs font-semibold text-[var(--text-muted)]"><span>{line.speaker}</span><span>{line.timestamp}</span></div>
                <p className="mt-2 text-sm leading-6 text-[var(--text-primary)]">{line.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">Conversation Timeline</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-7">
            {conversation.timeline.map((item) => (
              <div key={item.id} className={`rounded-[12px] p-3 text-xs font-semibold ${item.title === conversation.currentStage ? "bg-[var(--ai-accent)] text-white" : "bg-[var(--surface-elevated)] text-[var(--text-secondary)]"}`}>
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InsightActionPanel({ conversation, sentiment }: { conversation: ConversationDetail; sentiment: SentimentPoint[] }) {
  const insight = conversation.insights;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Real-Time Insights" description="Customer sentiment, intent, risk and recommended action." />
        <CardContent className="space-y-3">
          <Metric label="Customer Sentiment" value={insight.customerSentiment} badge={sentimentTone(insight.customerSentiment)} />
          <Metric label="Confidence" value={`${insight.confidence}%`} />
          <Metric label="Buying Intent" value={insight.buyingIntent} />
          <Metric label="Risk Level" value={insight.riskLevel} />
          <Metric label="Current Objective" value={insight.currentObjective} />
          <Metric label="Recommended Action" value={insight.recommendedAction} />
          <div className="flex flex-wrap gap-2">{insight.knowledgeUsed.map((item) => <Badge key={item} tone="teal">{item}</Badge>)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="AI Decision Panel" description="Business-language explanation of the current decision." />
        <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
          <p><strong className="text-[var(--text-primary)]">Why current question:</strong> {conversation.decision.whyAsked}</p>
          <p><strong className="text-[var(--text-primary)]">Knowledge referenced:</strong> {conversation.decision.knowledgeReferenced}</p>
          <p><strong className="text-[var(--text-primary)]">Customer intent:</strong> {conversation.decision.customerIntent}</p>
          <p><strong className="text-[var(--text-primary)]">Next action:</strong> {conversation.decision.nextRecommendedAction}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Call Controls" description="Mock monitoring controls for operations teams." />
        <CardContent className="grid grid-cols-2 gap-2">
          {[
            ["Listen", Headphones],
            ["Pause Monitoring", Pause],
            ["Transfer", PhoneCall],
            ["Escalate", ShieldAlert],
            ["Take Over (Future)", Activity],
            ["End Monitoring", Radio]
          ].map(([label, Icon]) => <Button key={String(label)} variant="secondary" type="button"><Icon className="h-4 w-4" />{String(label)}</Button>)}
        </CardContent>
      </Card>
      <ChartCard title="Live Sentiment" description="Real-time positive, neutral and negative sentiment movement." summary="Sentiment improved after the recommendation stage.">
        <ResponsiveContainer width="100%" height={220}><LineChart data={sentiment}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line dataKey="positive" stroke="#16a34a" /><Line dataKey="neutral" stroke="#2563eb" /><Line dataKey="negative" stroke="#dc2626" /></LineChart></ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

export function CustomerAndSummaryPanel({ conversation }: { conversation: ConversationDetail }) {
  return (
    <section className="grid gap-6 xl:grid-cols-3">
      <Card>
        <CardHeader title="Customer Profile" description="Customer context for the current conversation." />
        <CardContent className="space-y-3">
          <Metric label="Customer Name" value={conversation.customerProfile.customerName} />
          <Metric label="Company" value={conversation.customerProfile.company} />
          <Metric label="Lead Score" value={`${conversation.customerProfile.leadScore}/100`} />
          <Metric label="Previous Calls" value={String(conversation.customerProfile.previousCalls)} />
          <Metric label="Assigned Campaign" value={conversation.customerProfile.assignedCampaign} />
          <Metric label="Customer Lifetime Value" value={conversation.customerProfile.lifetimeValue} />
          <Link to="/app/contacts/$contactId" params={{ contactId: conversation.customerProfile.contactId }} className="inline-flex text-sm font-semibold text-[var(--ai-accent)]">Open Customer Profile</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Call Summary" description="Updates continuously as the conversation progresses." />
        <CardContent className="space-y-3">
          {Object.entries(conversation.summary).map(([label, value]) => (
            <div key={label} className="rounded-[12px] bg-[var(--surface-elevated)] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label.replaceAll(/([A-Z])/g, " $1")}</p>
              <p className="mt-2 text-sm text-[var(--text-primary)]">{Array.isArray(value) ? value.join(", ") : value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Post Call Summary" description="Generated outcome, follow-up and performance notes." />
        <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
          <p>{conversation.postCallSummary.summary}</p>
          <Metric label="Outcome" value={conversation.postCallSummary.outcome} />
          <Metric label="Appointment" value={conversation.postCallSummary.appointment} />
          <Metric label="Follow-up Needed" value={conversation.postCallSummary.followUpNeeded} />
          <p><strong className="text-[var(--text-primary)]">Employee Performance:</strong> {conversation.postCallSummary.employeePerformance}</p>
        </CardContent>
      </Card>
    </section>
  );
}

export function QueueUtilizationPanel({ queue, dashboard }: { queue: ConversationQueueItem[]; dashboard: LiveOperationsDashboard }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card>
        <CardHeader title="Call Queue" description="Queued customers, priority, estimated wait, assigned employee and campaign." />
        <CardContent>
          <Table>
            <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Customer", "Priority", "Estimated Wait", "Assigned Employee", "Campaign"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>{queue.map((item) => <tr key={item.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{item.customerName}</td><td className="p-3"><Badge tone={item.priority === "critical" ? "red" : item.priority === "high" ? "amber" : "blue"}>{item.priority}</Badge></td><td className="p-3">{item.estimatedWait}</td><td className="p-3"><Link to="/app/employees/$employeeId" params={{ employeeId: item.assignedEmployeeId }} className="font-semibold text-[var(--ai-accent)]">{item.assignedEmployeeName}</Link></td><td className="p-3">{item.campaignName}</td></tr>)}</tbody>
          </Table>
        </CardContent>
      </Card>
      <ChartCard title="Workforce Utilization" description="Employees busy, idle, average wait, queue length and calls per hour." summary={`${dashboard.utilization.employeesBusy} employees busy, ${dashboard.utilization.employeesIdle} idle, average wait ${dashboard.utilization.averageWait}.`}>
        <ResponsiveContainer width="100%" height={260}><BarChart data={dashboard.utilization.callsPerHour}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="calls" fill="var(--ai-accent)" /></BarChart></ResponsiveContainer>
      </ChartCard>
    </section>
  );
}

export function NotificationsRecommendations({ dashboard }: { dashboard: LiveOperationsDashboard }) {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader title="Live Notifications" description="Operational events from active customer conversations." /><CardContent className="space-y-3">{dashboard.notifications.map((item) => <Link key={item.id} to={item.href} className="block rounded-[16px] border border-[var(--border)] p-4 hover:bg-[var(--surface-elevated)]"><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p><p className="mt-2 text-xs text-[var(--text-muted)]">{item.time}</p></Link>)}</CardContent></Card>
      <Card><CardHeader title="AI Recommendations" description="Recommended operations actions based on live signals." /><CardContent className="space-y-3">{dashboard.recommendations.map((item) => <Link key={item.id} to={item.href} className="block rounded-[16px] border border-[var(--border)] p-4 hover:bg-[var(--surface-elevated)]"><div className="flex justify-between gap-3"><p className="font-semibold">{item.title}</p><Badge tone={item.priority === "critical" ? "red" : "amber"}>{item.priority}</Badge></div><p className="mt-2 text-sm text-[var(--text-secondary)]">{item.reason}</p><p className="mt-2 text-sm font-semibold text-[var(--ai-accent)]">{item.action}</p></Link>)}</CardContent></Card>
    </section>
  );
}

function Metric({ label, value, badge }: { label: string; value: string; badge?: "slate" | "blue" | "green" | "amber" | "red" | "teal" }) {
  return (
    <div className="rounded-[12px] bg-[var(--surface-elevated)] p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p>
      {badge ? <Badge className="mt-2" tone={badge}>{value}</Badge> : <p className="mt-2 font-semibold text-[var(--text-primary)]">{value}</p>}
    </div>
  );
}
