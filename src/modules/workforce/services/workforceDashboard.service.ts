import { mockApi } from "@/mocks/mockApi";

import { workforceDashboardData } from "../constants/workforceDashboard.constants";
import type { WorkforceDashboardData } from "../types/workforceDashboard.types";

export const workforceDashboardService = {
  getDashboard: () => mockApi<WorkforceDashboardData>(() => workforceDashboardData)
};
