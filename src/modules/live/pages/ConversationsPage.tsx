import { Link } from "@tanstack/react-router";
import { Megaphone, Radio } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Badge, Card, CardContent, Input, Select, Table } from "@/components/ui";
import { useLiveCalls } from "@/hooks";
import type { Conversation } from "@/types";

import { sentimentTone, statusTone } from "../components/liveDisplay";

export function ConversationsPage() {
  const liveCallsQuery = useLiveCalls();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Conversation["status"] | "all">("all");
  const [sentiment, setSentiment] = useState<Conversation["sentiment"] | "all">("all");

  const conversations = useMemo(() => liveCallsQuery.data ?? [], [liveCallsQuery.data]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return conversations.filter((conversation) => {
      const text = [conversation.id, conversation.employeeName, conversation.customerName, conversation.campaignName].filter(Boolean).join(" ").toLowerCase();
      return (!query || text.includes(query)) && (status === "all" || conversation.status === status) && (sentiment === "all" || conversation.sentiment === sentiment);
    });
  }, [conversations, search, status, sentiment]);

  if (liveCallsQuery.isLoading) return <div className="space-y-6"><PageHeader title="Conversations" description="Loading conversations..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  if (liveCallsQuery.isError) return <ErrorState title="Connection Lost" description="Conversation services did not finish loading. Retry or reconnect if this repeats." onRetry={() => void liveCallsQuery.refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Live Calls"
        title="Conversations"
        description="Search, filter and review active conversations across customers, employees and campaigns."
        actions={
          <>
            <Link to="/app/live" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><Radio className="h-4 w-4" />Live Operations Center</Link>
            <Link to="/app/campaigns" className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white"><Megaphone className="h-4 w-4" />Launch Campaign</Link>
          </>
        }
      />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, employee, campaign or conversation ID" aria-label="Search conversations" />
          <Select value={status} onChange={(event) => setStatus(event.target.value as Conversation["status"] | "all")} aria-label="Filter by status"><option value="all">All Statuses</option><option value="live">Live</option><option value="queued">Queued</option><option value="on-hold">On Hold</option><option value="escalated">Escalated</option><option value="completed">Completed</option></Select>
          <Select value={sentiment} onChange={(event) => setSentiment(event.target.value as Conversation["sentiment"] | "all")} aria-label="Filter by sentiment"><option value="all">All Sentiments</option><option value="positive">Positive</option><option value="neutral">Neutral</option><option value="satisfied">Satisfied</option><option value="negative">Negative</option></Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState title="No live conversations." description="Your AI Workforce is ready to start customer conversations." action={<Link to="/app/campaigns" className="inline-flex h-11 items-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Launch Campaign</Link>} />
      ) : (
        <Card>
          <CardContent>
            <Table>
              <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Conversation ID", "Employee", "Customer", "Campaign", "Duration", "Status", "Sentiment", "Outcome", "Actions"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
              <tbody>{filtered.map((conversation) => <tr key={conversation.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{conversation.id}</td><td className="p-3"><Link to="/app/employees/$employeeId" params={{ employeeId: conversation.employeeId }} className="font-semibold text-[var(--ai-accent)]">{conversation.employeeName}</Link></td><td className="p-3"><Link to="/app/contacts/$contactId" params={{ contactId: conversation.contactId ?? "contact_rajesh_kumar" }} className="font-semibold text-[var(--text-primary)]">{conversation.customerName}</Link></td><td className="p-3"><Link to="/app/campaigns/$campaignId" params={{ campaignId: conversation.campaignId ?? "camp_motor_insurance_q3" }} className="text-[var(--text-secondary)]">{conversation.campaignName}</Link></td><td className="p-3">{conversation.duration}</td><td className="p-3"><Badge tone={statusTone(conversation.status)}>{conversation.status}</Badge></td><td className="p-3"><Badge tone={sentimentTone(conversation.sentiment)}>{conversation.sentiment}</Badge></td><td className="p-3">{conversation.outcome}</td><td className="p-3"><Link to="/app/conversations/$conversationId" params={{ conversationId: conversation.id }} className="font-semibold text-[var(--ai-accent)]">Open</Link></td></tr>)}</tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
