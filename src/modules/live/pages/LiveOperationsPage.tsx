import { Link } from "@tanstack/react-router";
import { BarChart3, Megaphone } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { useConversation, useLiveCalls, useLiveDashboard, useLiveEmployees, useQueue, useSentiment, useTranscript } from "@/hooks";

import {
  CustomerAndSummaryPanel,
  InsightActionPanel,
  LiveConversationPanel,
  LiveKpis,
  LiveWorkforcePanel,
  NotificationsRecommendations,
  QueueUtilizationPanel
} from "../components/LiveOperationsPanels";

export function LiveOperationsPage() {
  const dashboardQuery = useLiveDashboard();
  const liveCallsQuery = useLiveCalls();
  const employeesQuery = useLiveEmployees();
  const queueQuery = useQueue();
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const firstConversationId = selectedId ?? liveCallsQuery.data?.[0]?.id ?? "";
  const conversationQuery = useConversation(firstConversationId);
  const transcriptQuery = useTranscript(firstConversationId);
  const sentimentQuery = useSentiment(firstConversationId);

  const queries = useMemo(() => [dashboardQuery, liveCallsQuery, employeesQuery, queueQuery, conversationQuery, transcriptQuery, sentimentQuery], [dashboardQuery, liveCallsQuery, employeesQuery, queueQuery, conversationQuery, transcriptQuery, sentimentQuery]);

  if (queries.some((query) => query.isLoading)) {
    return <div className="space-y-6"><PageHeader title="Live Operations Center" description="Loading live operations..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (queries.some((query) => query.isError) || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Connection Lost"
        description="Live operations services did not finish loading. Retry or reconnect if this repeats."
        onRetry={() => queries.forEach((query) => void query.refetch())}
      />
    );
  }

  const conversation = conversationQuery.data;
  if (!conversation) {
    return (
      <EmptyState
        title="No live conversations."
        description="Your AI Workforce is ready to start customer conversations."
        action={<Link to="/app/campaigns" className="inline-flex h-11 items-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Launch Campaign</Link>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations Center"
        title="Live Operations Center"
        description="Monitor every AI Employee, every conversation, and every customer interaction in real time."
        actions={
          <>
            <Link to="/app/workforce" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><BarChart3 className="h-4 w-4" />View Workforce Dashboard</Link>
            <Link to="/app/campaigns" className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"><Megaphone className="h-4 w-4" />Launch Campaign</Link>
          </>
        }
      />
      <LiveKpis dashboard={dashboardQuery.data} />
      <section className="grid gap-6 2xl:grid-cols-[0.78fr_1.45fr_0.9fr]">
        <LiveWorkforcePanel employees={employeesQuery.data ?? []} selectedId={conversation.id} onSelect={setSelectedId} />
        <LiveConversationPanel conversation={conversation} transcript={transcriptQuery.data ?? conversation.transcript} />
        <InsightActionPanel conversation={conversation} sentiment={sentimentQuery.data ?? conversation.sentimentTimeline} />
      </section>
      <CustomerAndSummaryPanel conversation={conversation} />
      <QueueUtilizationPanel queue={queueQuery.data ?? []} dashboard={dashboardQuery.data} />
      <NotificationsRecommendations dashboard={dashboardQuery.data} />
    </div>
  );
}
