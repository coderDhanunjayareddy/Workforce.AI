import type { Employee, Status } from "@/types";

export type EmployeeViewMode = "grid" | "table";
export type EmployeeHealthFilter = "all" | "excellent" | "good" | "attention";
export type EmployeePerformanceFilter = "all" | "excellent" | "strong" | "improving";
export type EmployeeSortKey =
  | "name"
  | "performance"
  | "health"
  | "calls"
  | "appointments"
  | "lastActive"
  | "newest"
  | "oldest";

export interface EmployeeFilters {
  search: string;
  department: string;
  role: string;
  status: Status | "all";
  health: EmployeeHealthFilter;
  voice: string;
  language: string;
  performance: EmployeePerformanceFilter;
  sort: EmployeeSortKey;
}

export interface EmployeeHealthSummary {
  overall: number;
  knowledge: number;
  voice: number;
  conversationQuality: number;
  policyCompliance: number;
  toolConnectivity: number;
  trend: string;
}

export interface EmployeePerformanceSummary {
  callsToday: number;
  callsThisMonth: number;
  appointments: number;
  averageDuration: string;
  successRate: number;
  customerSatisfaction: number;
  revenueInfluenced: string;
}

export interface EmployeeDirectoryStats {
  total: number;
  active: number;
  training: number;
  paused: number;
  averageHealth: number;
  appointmentsToday: number;
}

export interface EmployeeActionContext {
  employee: Employee;
  action: "pause" | "resume" | "archive";
}
