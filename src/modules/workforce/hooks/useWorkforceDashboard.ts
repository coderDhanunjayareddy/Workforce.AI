import { useQuery } from "@tanstack/react-query";

import { workforceDashboardService } from "../services/workforceDashboard.service";

export const workforceDashboardKeys = {
  dashboard: ["workforce-dashboard"] as const
};

export function useWorkforceDashboard() {
  return useQuery({
    queryKey: workforceDashboardKeys.dashboard,
    queryFn: workforceDashboardService.getDashboard
  });
}
