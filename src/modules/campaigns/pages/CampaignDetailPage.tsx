import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useState } from "react";

import { ErrorState, PageHeader } from "@/components/shared";
import { Badge, Button } from "@/components/ui";
import { useCampaign, useCampaignAnalytics, useCampaignHealth, usePauseCampaign, useResumeCampaign } from "@/hooks";

import { CampaignDetailTabs } from "../components/CampaignDetailTabs";
import { statusLabel, statusTone } from "../components/campaignDisplay";
import { campaignTabs } from "../constants/campaign.constants";
import type { CampaignTabId } from "../types/campaignModule.types";

export function CampaignDetailPage() {
  const { campaignId } = useParams({ strict: false });
  const id = campaignId ?? "";
  const [activeTab, setActiveTab] = useState<CampaignTabId>("overview");
  const campaignQuery = useCampaign(id);
  const analyticsQuery = useCampaignAnalytics(id);
  const healthQuery = useCampaignHealth(id);
  const pauseCampaign = usePauseCampaign();
  const resumeCampaign = useResumeCampaign();

  if (campaignQuery.isLoading || analyticsQuery.isLoading || healthQuery.isLoading) return <div className="space-y-6"><PageHeader title="Campaign" description="Loading campaign details..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  if (campaignQuery.isError || analyticsQuery.isError || healthQuery.isError || !campaignQuery.data || !analyticsQuery.data || !healthQuery.data) {
    return <ErrorState title="Campaign Error" description="Campaign details did not finish loading. Retry or contact support if this repeats." onRetry={() => { void campaignQuery.refetch(); void analyticsQuery.refetch(); void healthQuery.refetch(); }} />;
  }

  const campaign = campaignQuery.data;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campaign Details"
        title={campaign.name}
        description={campaign.description}
        actions={
          <>
            <Link to="/app/campaigns" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" />Campaigns</Link>
            {campaign.status === "paused" ? <Button type="button" onClick={() => resumeCampaign.mutate(campaign.id)}><Play className="h-4 w-4" />Resume</Button> : <Button variant="secondary" type="button" onClick={() => pauseCampaign.mutate(campaign.id)}><Pause className="h-4 w-4" />Pause</Button>}
          </>
        }
      />
      <section className="flex flex-col gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2"><Badge tone={statusTone(campaign.status)}>{statusLabel(campaign.status)}</Badge><Badge tone="teal">{campaign.type}</Badge><Badge>{campaign.priority}</Badge></div>
        <div className="flex gap-4 text-sm text-[var(--text-secondary)]"><Link to="/app/employees/$employeeId" params={{ employeeId: campaign.assignedEmployeeId }} className="font-semibold text-[var(--ai-accent)]">{campaign.assignedEmployeeName}</Link><Link to="/app/analytics" className="font-semibold text-[var(--ai-accent)]">Campaign Analytics</Link></div>
      </section>
      <nav className="overflow-x-auto rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-2" aria-label="Campaign detail tabs"><div className="flex min-w-max gap-1">{campaignTabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`rounded-[12px] px-3 py-2 text-sm font-semibold ${activeTab === tab.id ? "bg-[var(--surface-elevated)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{tab.label}</button>)}</div></nav>
      <CampaignDetailTabs campaign={campaign} analytics={analyticsQuery.data} health={healthQuery.data} activeTab={activeTab} />
    </div>
  );
}
