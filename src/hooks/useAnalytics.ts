import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { analyticsService } from "@/services";
import type { ReportDefinition } from "@/types";

export const analyticsKeys = {
  dashboard: ["analytics"] as const,
  revenue: ["analytics", "revenue"] as const,
  employees: ["analytics", "employees"] as const,
  campaigns: ["analytics", "campaigns"] as const,
  conversations: ["analytics", "conversations"] as const,
  knowledge: ["analytics", "knowledge"] as const,
  forecast: ["analytics", "forecast"] as const,
  reports: ["analytics", "reports"] as const,
  insights: ["analytics", "executive-insights"] as const
};

export function useAnalytics() {
  return useQuery({ queryKey: analyticsKeys.dashboard, queryFn: analyticsService.getDashboard });
}

export function useRevenue() {
  return useQuery({ queryKey: analyticsKeys.revenue, queryFn: analyticsService.getRevenue });
}

export function useEmployeeAnalytics() {
  return useQuery({ queryKey: analyticsKeys.employees, queryFn: analyticsService.getEmployees });
}

export function useExecutiveCampaignAnalytics() {
  return useQuery({ queryKey: analyticsKeys.campaigns, queryFn: analyticsService.getCampaignAnalytics });
}

export function useConversationAnalytics() {
  return useQuery({ queryKey: analyticsKeys.conversations, queryFn: analyticsService.getConversationAnalytics });
}

export function useKnowledgeAnalytics() {
  return useQuery({ queryKey: analyticsKeys.knowledge, queryFn: analyticsService.getKnowledgeAnalytics });
}

export function useForecast() {
  return useQuery({ queryKey: analyticsKeys.forecast, queryFn: analyticsService.getForecast });
}

export function useExecutiveInsights() {
  return useQuery({ queryKey: analyticsKeys.insights, queryFn: analyticsService.getExecutiveInsights });
}

export function useReports() {
  return useQuery({ queryKey: analyticsKeys.reports, queryFn: analyticsService.getReports });
}

export function useGenerateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (format: ReportDefinition["format"]) => analyticsService.generateReport(format),
    onSuccess: (report) => {
      queryClient.setQueryData<ReportDefinition[]>(analyticsKeys.reports, (reports = []) => [report, ...reports]);
    }
  });
}

export function useInsights() {
  return useQuery({ queryKey: ["insights"], queryFn: analyticsService.getInsights });
}
