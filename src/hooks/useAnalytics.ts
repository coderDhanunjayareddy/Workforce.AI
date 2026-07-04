import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "@/services";

export function useAnalytics() {
  return useQuery({ queryKey: ["analytics"], queryFn: analyticsService.getDashboard });
}

export function useInsights() {
  return useQuery({ queryKey: ["insights"], queryFn: analyticsService.getInsights });
}
