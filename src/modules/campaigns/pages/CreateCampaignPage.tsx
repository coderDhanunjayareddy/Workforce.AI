import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState, PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";
import { useCreateCampaign, useEmployees, useKnowledgeCollections } from "@/hooks";
import type { Campaign } from "@/types";

import { CreateCampaignWizard } from "../components/CreateCampaignWizard";

export function CreateCampaignPage() {
  const employeesQuery = useEmployees();
  const collectionsQuery = useKnowledgeCollections();
  const createCampaign = useCreateCampaign();
  const [step, setStep] = useState(1);

  const launch = () => {
    const campaign: Campaign = {
      id: `camp_created_${Date.now()}`,
      name: "Motor Insurance Expansion",
      status: "running",
      assignedEmployeeId: "emp_sophia",
      assignedEmployeeName: "Sophia",
      contacts: 420,
      progress: 0,
      appointments: 0,
      revenueInfluenced: 0,
      businessGoal: "Generate qualified policy appointments",
      department: "Sales",
      type: "Sales",
      priority: "high",
      conversionRate: 0,
      health: 92,
      launchDate: new Date().toISOString()
    };
    createCampaign.mutate(campaign, { onSuccess: () => toast.success("Campaign launched."), onError: () => toast.error("Launch Failed. Retry campaign launch.") });
  };

  if (employeesQuery.isLoading || collectionsQuery.isLoading) return <div className="space-y-6"><PageHeader title="Create Campaign" description="Loading campaign wizard..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  if (employeesQuery.isError || collectionsQuery.isError) return <ErrorState title="Launch Failed" description="Campaign wizard services did not finish loading. Retry or contact support if this repeats." onRetry={() => { void employeesQuery.refetch(); void collectionsQuery.refetch(); }} />;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Campaigns" title="Create Campaign" description="Configure objective, AI Employee, contacts, knowledge, strategy, schedule and launch readiness." actions={<Link to="/app/campaigns" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" />Campaigns</Link>} />
      <CreateCampaignWizard step={step} employees={employeesQuery.data ?? []} collections={collectionsQuery.data ?? []} onLaunch={launch} launching={createCampaign.isPending} />
      <div className="flex justify-between">
        <Button variant="secondary" type="button" disabled={step === 1} onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" />Previous</Button>
        {step < 8 ? <Button type="button" onClick={() => setStep(step + 1)}>Next<ArrowRight className="h-4 w-4" /></Button> : <Link to="/app/campaigns" className="inline-flex h-11 items-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Open Campaigns</Link>}
      </div>
    </div>
  );
}
