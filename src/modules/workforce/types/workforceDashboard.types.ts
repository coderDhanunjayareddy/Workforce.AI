export type DashboardPriority = "critical" | "high" | "medium" | "low";
export type DashboardIcon =
  | "activity"
  | "book"
  | "briefcase"
  | "calendar"
  | "megaphone"
  | "phone"
  | "refresh"
  | "sparkles"
  | "upload"
  | "users";

export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string;
  trend: string;
  comparison: string;
  icon: DashboardIcon;
  sparkline: number[];
}

export interface BusinessImpactMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface HealthBreakdownItem {
  label: string;
  value: number;
}

export interface WorkforceActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  href: string;
  tone: "success" | "info" | "warning";
}

export interface LiveWorkforceStatus {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  currentActivity: string;
  duration: string;
  customerName: string;
  status: "talking" | "training" | "idle";
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: DashboardIcon;
}

export interface DepartmentPerformance {
  id: string;
  department: string;
  employees: number;
  health: number;
  performance: number;
}

export interface CommandPriority {
  id: string;
  priority: DashboardPriority;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface ChartSeriesPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface ConversationMetricCharts {
  callsPerHour: ChartSeriesPoint[];
  duration: ChartSeriesPoint[];
  sentiment: ChartSeriesPoint[];
  funnel: ChartSeriesPoint[];
  resolution: ChartSeriesPoint[];
}

export interface WorkforceDashboardData {
  kpis: ExecutiveKpi[];
  businessImpact: {
    metrics: BusinessImpactMetric[];
    summary: string;
    monthlyTrend: ChartSeriesPoint[];
  };
  health: {
    overall: number;
    trend: string;
    lastUpdated: string;
    breakdown: HealthBreakdownItem[];
  };
  liveWorkforce: LiveWorkforceStatus[];
  activity: WorkforceActivity[];
  quickActions: QuickAction[];
  departments: DepartmentPerformance[];
  priorities: CommandPriority[];
  charts: ConversationMetricCharts;
}
