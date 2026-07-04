import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Radio } from "lucide-react";

import { ErrorState, PageHeader } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { useConversation, useSentiment, useTranscript } from "@/hooks";

import { CustomerAndSummaryPanel, InsightActionPanel, LiveConversationPanel } from "../components/LiveOperationsPanels";
import { sentimentTone, statusTone } from "../components/liveDisplay";

export function ConversationDetailPage() {
  const { conversationId } = useParams({ strict: false });
  const id = conversationId ?? "";
  const conversationQuery = useConversation(id);
  const transcriptQuery = useTranscript(id);
  const sentimentQuery = useSentiment(id);

  if (conversationQuery.isLoading || transcriptQuery.isLoading || sentimentQuery.isLoading) {
    return <div className="space-y-6"><PageHeader title="Conversation" description="Loading conversation details..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (conversationQuery.isError || transcriptQuery.isError || sentimentQuery.isError || !conversationQuery.data) {
    return (
      <ErrorState
        title="Transcript Error"
        description="Conversation services did not finish loading. Retry or reconnect if this repeats."
        onRetry={() => {
          void conversationQuery.refetch();
          void transcriptQuery.refetch();
          void sentimentQuery.refetch();
        }}
      />
    );
  }

  const conversation = conversationQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Conversation Details"
        title={conversation.customerName}
        description="Conversation Overview, Transcript, Timeline, Customer Profile, Knowledge Used, Employee Actions, Outcome and Follow-up."
        actions={
          <>
            <Link to="/app/conversations" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" />Conversations</Link>
            <Link to="/app/live" className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white"><Radio className="h-4 w-4" />Live Operations Center</Link>
          </>
        }
      />
      <section className="flex flex-col gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2"><Badge tone={statusTone(conversation.status)}>{conversation.status}</Badge><Badge tone={sentimentTone(conversation.sentiment)}>{conversation.sentiment}</Badge><Badge tone="teal">{conversation.buyingIntent} intent</Badge></div>
        <div className="flex gap-4 text-sm"><Link to="/app/employees/$employeeId" params={{ employeeId: conversation.employeeId }} className="font-semibold text-[var(--ai-accent)]">{conversation.employeeName}</Link><Link to="/app/campaigns/$campaignId" params={{ campaignId: conversation.campaignId ?? "camp_motor_insurance_q3" }} className="font-semibold text-[var(--ai-accent)]">{conversation.campaignName}</Link></div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
        <LiveConversationPanel conversation={conversation} transcript={transcriptQuery.data ?? conversation.transcript} />
        <InsightActionPanel conversation={conversation} sentiment={sentimentQuery.data ?? conversation.sentimentTimeline} />
      </section>
      <CustomerAndSummaryPanel conversation={conversation} />
      <Card>
        <CardHeader title="Knowledge Used and Follow-up" description="Knowledge references, outcome, follow-up, and suggested next steps." />
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Section title="Knowledge Used" items={conversation.postCallSummary.knowledgeUsed} />
          <Section title="Suggested Next Steps" items={conversation.postCallSummary.suggestedNextSteps} />
          <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
            <p className="font-semibold text-[var(--text-primary)]">Outcome</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{conversation.postCallSummary.outcome}</p>
            <p className="mt-3 font-semibold text-[var(--text-primary)]">Follow-up</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{conversation.postCallSummary.followUpNeeded}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
      <p className="font-semibold text-[var(--text-primary)]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
