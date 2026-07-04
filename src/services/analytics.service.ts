import { mockApi } from "@/mocks/mockApi";
import { analyticsSummary, insights } from "@/mocks/mockData";
import type { AnalyticsSummary, Insight } from "@/types";

export const analyticsService = {
  getDashboard: () => mockApi<AnalyticsSummary>(() => analyticsSummary),
  getInsights: () => mockApi<Insight[]>(() => insights),
  generateReport: () =>
    mockApi(() => ({
      id: "report_executive_summary",
      title: "Executive Workforce Report",
      status: "ready"
    }))
};
