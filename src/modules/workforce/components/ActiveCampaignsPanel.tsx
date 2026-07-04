import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { Campaign, Employee } from "@/types";

const statusTone = {
  draft: "slate",
  scheduled: "blue",
  running: "green",
  paused: "amber",
  completed: "teal",
  cancelled: "red"
} as const;

export function ActiveCampaignsPanel({ campaigns, employees }: { campaigns: Campaign[]; employees: Employee[] }) {
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "running" || campaign.status === "scheduled").slice(0, 4);
  const employeeNameById = new Map(employees.map((employee) => [employee.id, employee.name]));

  return (
    <Card>
      <CardHeader title="Active Campaigns" description="Campaign progress, owners and remaining customer coverage." />
      <CardContent className="space-y-3">
        {activeCampaigns.map((campaign) => {
          const contactsRemaining = Math.max(campaign.contacts - Math.round((campaign.contacts * campaign.progress) / 100), 0);

          return (
            <Link key={campaign.id} to="/app/campaigns" className="block rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-display text-base font-semibold">{campaign.name}</span>
                  <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                    Assigned to {employeeNameById.get(campaign.assignedEmployeeId) ?? "Nova Workforce"}
                  </span>
                </span>
                <Badge tone={statusTone[campaign.status]}>{campaign.status}</Badge>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[var(--border)]">
                <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${campaign.progress}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <span>
                  <span className="block font-semibold">{campaign.progress}%</span>
                  <span className="text-xs text-[var(--text-muted)]">Progress</span>
                </span>
                <span>
                  <span className="block font-semibold">{contactsRemaining}</span>
                  <span className="text-xs text-[var(--text-muted)]">Contacts left</span>
                </span>
                <span>
                  <span className="block font-semibold">{campaign.appointments}</span>
                  <span className="text-xs text-[var(--text-muted)]">Appointments</span>
                </span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]">
                Open Campaign
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
