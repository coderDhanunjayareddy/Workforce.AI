import { Activity, BarChart3, BookOpen, Megaphone, PhoneCall, UsersRound } from "lucide-react";

import {
  EmployeeCard,
  ErrorState,
  FilterBar,
  InsightCard,
  LoadingState,
  MetricCard,
  PageHeader,
  QuickActionCard,
  Toolbar
} from "@/components/shared";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { useAnalytics, useEmployees, useInsights, useLiveCalls } from "@/hooks";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/formatters";

export function FoundationDashboard() {
  const analytics = useAnalytics();
  const employees = useEmployees();
  const insights = useInsights();
  const liveCalls = useLiveCalls();

  if (analytics.isLoading || employees.isLoading || insights.isLoading) {
    return <LoadingState label="Loading Workforce AI foundation" />;
  }

  if (analytics.isError || employees.isError || insights.isError) {
    return (
      <ErrorState
        title="Workspace data could not be loaded"
        description="The mock service layer returned an error. Retry to confirm loading and error handling."
        onRetry={() => {
          void analytics.refetch();
          void employees.refetch();
          void insights.refetch();
        }}
      />
    );
  }

  const summary = analytics.data;
  const employeeList = employees.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Foundation"
        title="Enterprise SaaS Foundation"
        description="Routing, providers, service layer, mock API, reusable components, command palette, responsive shell, dark mode, and accessibility primitives are active."
        actions={
          <>
            <Button variant="secondary">
              <BookOpen className="h-4 w-4" />
              Upload Knowledge
            </Button>
            <Button>
              <UsersRound className="h-4 w-4" />
              Hire AI Employee
            </Button>
          </>
        }
      />
      <Toolbar>
        <FilterBar />
      </Toolbar>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={UsersRound} label="AI Employees" value="18" trend="+2 this month" subtitle="14 active, 2 training" />
        <MetricCard icon={PhoneCall} label="Calls Today" value={formatNumber(1842)} trend="+12%" subtitle="Average duration 4m 28s" />
        <MetricCard icon={BarChart3} label="Revenue Influenced" value={formatCurrency(2480000)} trend="+15%" subtitle="Motor and renewal campaigns" />
        <MetricCard icon={Activity} label="Customer Satisfaction" value={formatPercent(summary?.customerSatisfaction ?? 94)} trend="+2%" subtitle="Across live conversations" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Service-backed AI Workforce" description="Employee cards consume TanStack Query hooks, which call services, which call the mock API." />
          <CardContent className="grid gap-4 md:grid-cols-2">
            {employeeList.slice(0, 4).map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </CardContent>
        </Card>
        <div className="space-y-4">
          {(insights.data ?? []).map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
          <Card>
            <CardHeader title="Live Conversations" description="Conversation infrastructure is ready for the operations center." />
            <CardContent className="space-y-3">
              {(liveCalls.data ?? []).map((call) => (
                <div key={call.id} className="flex items-center justify-between rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm">
                  <span>
                    <strong>{call.customerName}</strong>
                    <span className="block text-[var(--text-secondary)]">{call.goal}</span>
                  </span>
                  <span className="font-semibold">{call.duration}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <QuickActionCard icon={UsersRound} title="Hire AI Employee" description="Foundation route and wizard shell are ready." />
        <QuickActionCard icon={Megaphone} title="Launch Campaign" description="Campaign services and routes are prepared." />
        <QuickActionCard icon={BookOpen} title="Improve Knowledge" description="Knowledge service and document types are wired." />
      </section>
    </div>
  );
}
