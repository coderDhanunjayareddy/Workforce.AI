import { toast } from "sonner";

import { EmptyState, ErrorState } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { useAnalytics, useExecutiveInsights, useForecast, useGenerateReport, useReports } from "@/hooks";

import { AnalyticsShell } from "../components/AnalyticsShell";
import {
  BusinessImpact,
  CampaignAnalyticsView,
  ConversationAnalyticsView,
  CustomerAnalyticsView,
  EmployeeLeaderboard,
  ExecutiveKpis,
  InsightsForecasts,
  KnowledgeAnalyticsView,
  ReportBuilder,
  WorkforcePerformance
} from "../components/AnalyticsViews";

type AnalyticsSection = "overview" | "workforce" | "employees" | "campaigns" | "conversations" | "customers" | "reports";

export function AnalyticsPage({ section = "overview" }: { section?: AnalyticsSection }) {
  const dashboardQuery = useAnalytics();
  const insightsQuery = useExecutiveInsights();
  const forecastQuery = useForecast();
  const reportsQuery = useReports();
  const generateReport = useGenerateReport();

  const queries = [dashboardQuery, insightsQuery, forecastQuery, reportsQuery];

  const exportReport = () => {
    generateReport.mutate("PDF", {
      onSuccess: () => toast.success("Executive report exported."),
      onError: () => toast.error("Report Failed. Retry export or contact support.")
    });
  };

  if (queries.some((query) => query.isLoading)) {
    return <AnalyticsShell active={section}><div className="h-96 rounded-[20px] bg-[var(--surface)]" aria-label="Analytics Skeleton" /></AnalyticsShell>;
  }

  if (queries.some((query) => query.isError) || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Analytics Error"
        description="Analytics services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => queries.forEach((query) => void query.refetch())}
      />
    );
  }

  const dashboard = dashboardQuery.data;
  const insights = insightsQuery.data ?? dashboard.insights;
  const forecasts = forecastQuery.data ?? dashboard.forecasts;
  const reports = reportsQuery.data ?? dashboard.reports;

  if (!dashboard.kpis) {
    return <EmptyState title="No analytics available." description="Launch campaigns and conversations to start generating business insights." />;
  }

  return (
    <AnalyticsShell active={section} onExport={exportReport} exporting={generateReport.isPending}>
      <ExecutiveKpis dashboard={dashboard} />
      {section === "overview" ? (
        <>
          <BusinessImpact dashboard={dashboard} />
          <WorkforcePerformance dashboard={dashboard} />
          <EmployeeLeaderboard rows={dashboard.employeeLeaderboard} />
          <CampaignAnalyticsView dashboard={dashboard} />
          <CustomerAnalyticsView dashboard={dashboard} />
          <ConversationAnalyticsView dashboard={dashboard} />
          <KnowledgeAnalyticsView dashboard={dashboard} />
          <InsightsForecasts insights={insights} forecasts={forecasts} />
          <ExecutiveSummary summary={dashboard.executiveSummary} />
        </>
      ) : section === "workforce" ? (
        <>
          <WorkforcePerformance dashboard={dashboard} />
          <KnowledgeAnalyticsView dashboard={dashboard} />
          <InsightsForecasts insights={insights} forecasts={forecasts} />
        </>
      ) : section === "employees" ? (
        <>
          <EmployeeLeaderboard rows={dashboard.employeeLeaderboard} />
          <WorkforcePerformance dashboard={dashboard} />
        </>
      ) : section === "campaigns" ? (
        <>
          <CampaignAnalyticsView dashboard={dashboard} />
          <InsightsForecasts insights={insights.filter((item) => item.href.includes("campaigns"))} forecasts={forecasts} />
        </>
      ) : section === "conversations" ? (
        <>
          <ConversationAnalyticsView dashboard={dashboard} />
          <KnowledgeAnalyticsView dashboard={dashboard} />
        </>
      ) : section === "customers" ? (
        <>
          <CustomerAnalyticsView dashboard={dashboard} />
          <BusinessImpact dashboard={dashboard} />
        </>
      ) : (
        <>
          <ReportBuilder reports={reports} onGenerate={(format) => generateReport.mutate(format, { onSuccess: () => toast.success(`${format} report generated.`) })} generating={generateReport.isPending} />
          <ExecutiveSummary summary={dashboard.executiveSummary} />
        </>
      )}
    </AnalyticsShell>
  );
}

function ExecutiveSummary({ summary }: { summary: string }) {
  return (
    <Card>
      <CardHeader title="Executive Summary" description="Automatically generated business summary for leadership." />
      <CardContent>
        <p className="max-w-4xl text-base leading-7 text-[var(--text-secondary)]">{summary}</p>
      </CardContent>
    </Card>
  );
}
