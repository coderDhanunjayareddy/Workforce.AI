import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader, Table } from "@/components/ui";
import { useCampaignHistory } from "@/hooks";

import { formatRevenue, statusLabel, statusTone } from "../components/campaignDisplay";

export function CampaignHistoryPage() {
  const historyQuery = useCampaignHistory();
  if (historyQuery.isLoading) return <div className="space-y-6"><PageHeader title="Campaign History" description="Loading campaign history..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  if (historyQuery.isError) return <ErrorState title="Campaign Error" description="History services did not finish loading. Retry or contact support if this repeats." onRetry={() => void historyQuery.refetch()} />;
  const campaigns = historyQuery.data ?? [];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Campaigns" title="Campaign History" description="Review completed and archived campaigns with outcomes, revenue, appointments and health." actions={<Link to="/app/campaigns" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" />Campaigns</Link>} />
      {campaigns.length === 0 ? (
        <EmptyState title="No campaigns available." description="Create your first campaign to activate your AI Workforce." action={<Link to="/app/campaigns/create" className="inline-flex h-11 items-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Create Campaign</Link>} />
      ) : (
        <Card>
          <CardHeader title="Completed Campaigns" description="Historical campaign performance and reusable playbooks." />
          <CardContent>
            <Table>
              <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Campaign", "Status", "Employee", "Contacts", "Appointments", "Revenue", "Health", "Actions"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
              <tbody>{campaigns.map((campaign) => <tr key={campaign.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{campaign.name}</td><td className="p-3"><Badge tone={statusTone(campaign.status)}>{statusLabel(campaign.status)}</Badge></td><td className="p-3">{campaign.assignedEmployeeName}</td><td className="p-3">{campaign.contacts}</td><td className="p-3">{campaign.appointments}</td><td className="p-3">{formatRevenue(campaign.revenueInfluenced)}</td><td className="p-3">{campaign.health}%</td><td className="p-3"><Link to="/app/campaigns/$campaignId" params={{ campaignId: campaign.id }} className="font-semibold text-[var(--ai-accent)]">Review</Link></td></tr>)}</tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
