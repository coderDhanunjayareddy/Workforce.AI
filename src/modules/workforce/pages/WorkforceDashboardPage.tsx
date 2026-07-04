import { Link } from "@tanstack/react-router";
import { BookOpen, Megaphone, RefreshCw, Upload, UsersRound } from "lucide-react";

import { ErrorState, PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  useAnalytics,
  useCampaigns,
  useEmployees,
  useInsights,
  useLiveCalls,
  useNotificationsQuery,
  useOrganizationQuery
} from "@/hooks";
import { cn } from "@/utils/cn";

import { ActiveCampaignsPanel } from "../components/ActiveCampaignsPanel";
import { ActivityFeedPanel } from "../components/ActivityFeedPanel";
import { BusinessImpactCard } from "../components/BusinessImpactCard";
import { CommandCenterPanel } from "../components/CommandCenterPanel";
import { ConversationMetrics } from "../components/ConversationMetrics";
import { DashboardInsights } from "../components/DashboardInsights";
import { DashboardQuickActions } from "../components/DashboardQuickActions";
import { ExecutiveKpiBar } from "../components/ExecutiveKpiBar";
import { LiveWorkforcePanel } from "../components/LiveWorkforcePanel";
import { NotificationPanel } from "../components/NotificationPanel";
import { TopPerformersTable } from "../components/TopPerformersTable";
import { WorkforceDashboardSkeleton } from "../components/WorkforceDashboardSkeleton";
import { WorkforceHealthCard } from "../components/WorkforceHealthCard";
import { WorkforceMap } from "../components/WorkforceMap";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";

function ActionLink({
  to,
  children,
  variant = "secondary"
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
          : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
      )}
    >
      {children}
    </Link>
  );
}

export function WorkforceDashboardPage() {
  const dashboard = useWorkforceDashboard();
  const analytics = useAnalytics();
  const employees = useEmployees();
  const campaigns = useCampaigns();
  const liveCalls = useLiveCalls();
  const insights = useInsights();
  const notifications = useNotificationsQuery();
  const organization = useOrganizationQuery();

  const queries = [dashboard, analytics, employees, campaigns, liveCalls, insights, notifications, organization];
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return <WorkforceDashboardSkeleton />;
  }

  if (isError || !dashboard.data) {
    return (
      <ErrorState
        title="Workforce Overview could not be loaded"
        description="Dashboard services did not finish loading. Refresh the command center or contact support if this repeats."
        onRetry={() => {
          queries.forEach((query) => {
            void query.refetch();
          });
        }}
      />
    );
  }

  const employeeList = employees.data ?? [];
  const campaignList = campaigns.data ?? [];
  const insightList = insights.data ?? [];
  const notificationList = notifications.data ?? [];
  const organizationName = organization.data?.name ?? "Nova Insurance Pvt. Ltd.";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={organizationName}
        title="Workforce Overview"
        description="Monitor your AI Workforce, business performance, live conversations and actionable insights from a single command center."
        actions={
          <>
            <ActionLink to="/app/employees/hire" variant="primary">
              <UsersRound className="h-4 w-4" aria-hidden="true" />
              Hire AI Employee
            </ActionLink>
            <ActionLink to="/app/campaigns">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              Launch Campaign
            </ActionLink>
            <ActionLink to="/app/contacts">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Import Contacts
            </ActionLink>
            <ActionLink to="/app/knowledge">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload Knowledge
            </ActionLink>
            <Button
              variant="secondary"
              onClick={() => {
                queries.forEach((query) => {
                  void query.refetch();
                });
              }}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh Dashboard
            </Button>
          </>
        }
      />

      <ExecutiveKpiBar kpis={dashboard.data.kpis} />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <BusinessImpactCard impact={dashboard.data.businessImpact} />
        <DashboardInsights insights={insightList} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_0.8fr_1.1fr]">
        <LiveWorkforcePanel items={dashboard.data.liveWorkforce} />
        <WorkforceHealthCard health={dashboard.data.health} />
        <ActivityFeedPanel activities={dashboard.data.activity} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <TopPerformersTable employees={employeeList} />
        <DashboardQuickActions actions={dashboard.data.quickActions} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ActiveCampaignsPanel campaigns={campaignList} employees={employeeList} />
        <CommandCenterPanel priorities={dashboard.data.priorities} />
      </section>

      <ConversationMetrics charts={dashboard.data.charts} />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <WorkforceMap departments={dashboard.data.departments} />
        <NotificationPanel notifications={notificationList} />
      </section>
    </div>
  );
}
