import { Link } from "@tanstack/react-router";
import { FileInput, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui";
import { useCampaignDashboard, useCampaigns, useDuplicateCampaign, useEmployees, usePauseCampaign, useResumeCampaign } from "@/hooks";

import { CampaignActivity, CampaignDashboardWidgets, CampaignRecommendations, CampaignStatsBar } from "../components/CampaignDashboardViews";
import { CampaignBulkActions, CampaignCard, CampaignTable, CampaignToolbar } from "../components/CampaignDirectoryViews";
import { defaultCampaignFilters } from "../constants/campaign.constants";
import type { CampaignFilters, CampaignViewMode } from "../types/campaignModule.types";
import { getFilteredCampaigns } from "../utils/campaignFilters";

const pageSize = 8;

export function CampaignsPage() {
  const campaignsQuery = useCampaigns();
  const dashboardQuery = useCampaignDashboard();
  const employeesQuery = useEmployees();
  const pauseCampaign = usePauseCampaign();
  const resumeCampaign = useResumeCampaign();
  const duplicateCampaign = useDuplicateCampaign();
  const [filters, setFilters] = useState<CampaignFilters>(defaultCampaignFilters);
  const [view, setView] = useState<CampaignViewMode>("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const campaigns = useMemo(() => campaignsQuery.data ?? [], [campaignsQuery.data]);
  const filtered = useMemo(() => getFilteredCampaigns(campaigns, filters), [campaigns, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const departments = useMemo(() => Array.from(new Set(campaigns.map((campaign) => campaign.department).filter(Boolean))).sort() as string[], [campaigns]);

  const updateFilter = <TKey extends keyof CampaignFilters>(key: TKey, value: CampaignFilters[TKey]) => {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  if (campaignsQuery.isLoading || dashboardQuery.isLoading || employeesQuery.isLoading) {
    return <div className="space-y-6"><PageHeader title="Campaigns" description="Loading campaign intelligence..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (campaignsQuery.isError || dashboardQuery.isError || employeesQuery.isError || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Campaign Error"
        description="Campaign services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => {
          void campaignsQuery.refetch();
          void dashboardQuery.refetch();
          void employeesQuery.refetch();
        }}
      />
    );
  }

  const pause = (id: string) => pauseCampaign.mutate(id, { onSuccess: () => toast.success("Campaign paused.") });
  const resume = (id: string) => resumeCampaign.mutate(id, { onSuccess: () => toast.success("Campaign resumed.") });
  const duplicate = (id: string) => duplicateCampaign.mutate(id, { onSuccess: () => toast.success("Campaign duplicated.") });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campaign Management"
        title="Campaigns"
        description="Launch, monitor and optimize AI-powered customer engagement campaigns."
        actions={
          <>
            <Link to="/app/campaigns/templates" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><FileInput className="h-4 w-4" />Import Campaign Template</Link>
            <Link to="/app/campaigns/create" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"><Plus className="h-4 w-4" />Create Campaign</Link>
          </>
        }
      />
      <CampaignStatsBar dashboard={dashboardQuery.data} />
      <div className="grid gap-6 2xl:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-6">
          <CampaignToolbar filters={filters} employees={employeesQuery.data ?? []} departments={departments} view={view} onViewChange={setView} onFilterChange={updateFilter} onReset={() => { setFilters(defaultCampaignFilters); setSelectedIds([]); }} />
          <CampaignBulkActions count={selectedIds.length} onClear={() => setSelectedIds([])} />
          {visible.length === 0 ? (
            <EmptyState title="No campaigns available." description="Create your first campaign to activate your AI Workforce." action={<Link to="/app/campaigns/create" className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Create Campaign</Link>} />
          ) : view === "grid" ? (
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} onPause={pause} onResume={resume} onDuplicate={duplicate} />)}</section>
          ) : (
            <Card><CardContent><CampaignTable campaigns={visible} selectedIds={selectedIds} onSelectionChange={setSelectedIds} /></CardContent></Card>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[var(--text-secondary)]">Showing {visible.length} of {filtered.length} campaigns</p><div className="flex gap-2"><button className="h-11 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold disabled:opacity-50" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button><button className="h-11 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Next</button></div></div>
        </div>
        <aside className="space-y-6"><CampaignDashboardWidgets dashboard={dashboardQuery.data} /><CampaignRecommendations dashboard={dashboardQuery.data} /></aside>
      </div>
      <CampaignActivity dashboard={dashboardQuery.data} />
    </div>
  );
}
