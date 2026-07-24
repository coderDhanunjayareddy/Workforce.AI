import { mockApi } from "@/mocks/mockApi";
import { analyticsSummary, campaigns, employees, insights, knowledge } from "@/mocks/mockData";
import { employeeAssetService } from "@/services/employeeAssetService";
import type { AnalyticsChartPoint, AnalyticsDashboard, AnalyticsForecast, AnalyticsInsight, EmployeeAnalyticsRow, Insight, ReportDefinition } from "@/types";

const sophiaKpis = employeeAssetService.getHeroEmployee().KPIs;
const emmaKpis = employeeAssetService.getCustomerSuccessHeroEmployee().KPIs;

const revenueTrend: AnalyticsChartPoint[] = [
  { name: "Jan", revenue: 14000000, appointments: 680, calls: 9400, leads: 420 },
  { name: "Feb", revenue: 16800000, appointments: 790, calls: 11200, leads: 520 },
  { name: "Mar", revenue: 18800000, appointments: 920, calls: 13600, leads: 610 },
  { name: "Apr", revenue: 20400000, appointments: 1040, calls: 15800, leads: 720 },
  { name: "May", revenue: 22600000, appointments: 1160, calls: 17100, leads: 790 },
  { name: "Jun", revenue: 24000000, appointments: 1248, calls: 18420, leads: 842 }
];

const leaderboard: EmployeeAnalyticsRow[] = employees.slice(0, 8).map((employee, index) => ({
  rank: index + 1,
  employeeId: employee.id,
  employee: employee.name,
  department: employee.department,
  calls: employee.id === "emp_sophia" ? Number((sophiaKpis.conversationsCompleted ?? "0").replace(/[^0-9]/g, "")) : employee.id === "emp_emma" ? Number((emmaKpis.customersAssisted ?? "0").replace(/[^0-9]/g, "")) : 132 - index * 7,
  appointments: employee.id === "emp_sophia" ? Number((sophiaKpis.appointmentsScheduled ?? "0").replace(/[^0-9]/g, "")) : employee.id === "emp_emma" ? Number((emmaKpis.renewalAssistance ?? "0").replace(/[^0-9]/g, "")) : 18 - Math.min(index, 8),
  revenue: employee.id === "emp_sophia" ? sophiaKpis.revenueInfluenced ?? "₹4.8 Crore" : employee.id === "emp_emma" ? emmaKpis.retentionContribution ?? "96%" : `Rs. ${(18.2 - index * 1.4).toFixed(1)}L`,
  csat: employee.id === "emp_sophia" ? Number((sophiaKpis.customerSatisfaction ?? "98%").replace("%", "")) : employee.id === "emp_emma" ? Number((emmaKpis.customerSatisfaction ?? "99%").replace("%", "")) : Math.max(90, employee.csat),
  health: employee.health,
  trend: index < 3 ? "+12%" : "+6%"
}));

const analyticsInsights: AnalyticsInsight[] = [
  { id: "sales_conversion", priority: "high", title: "Sales conversations increased conversion by 18%.", businessImpact: "Motor campaigns influenced Rs. 42L more than baseline.", recommendedAction: "Expand campaign", href: "/app/campaigns" },
  { id: "knowledge_freshness", priority: "critical", title: "Knowledge freshness declined.", businessImpact: "Pricing Guide updates affect active sales conversations.", recommendedAction: "Retrain employees", href: "/app/knowledge" },
  { id: "emma_csat", priority: "medium", title: "Emma consistently exceeds customer satisfaction.", businessImpact: "Customers assisted by Emma report 99% CSAT with a 2% escalation rate.", recommendedAction: "Review customer success playbook", href: "/app/employees/emp_emma" },
  { id: "renewal_underperforming", priority: "high", title: "Renewal campaign underperforming.", businessImpact: "Response rate is 7% below the quarter target.", recommendedAction: "Review knowledge base", href: "/app/knowledge" }
];

const forecasts: AnalyticsForecast[] = [
  { id: "projected_revenue", label: "Projected Revenue", value: "Rs. 3.1 Cr", trend: "+28%", description: "Expected next-quarter revenue influence." },
  { id: "expected_appointments", label: "Expected Appointments", value: "1,580", trend: "+26%", description: "Forecast from active campaigns." },
  { id: "campaign_completion", label: "Campaign Completion", value: "91%", trend: "+8%", description: "Projected completion across active programs." },
  { id: "workforce_capacity", label: "Workforce Capacity", value: "84%", trend: "healthy", description: "Current utilization leaves room for scale." },
  { id: "lead_demand", label: "Lead Demand", value: "2,950", trend: "+19%", description: "Expected qualified lead demand." },
  { id: "growth_forecast", label: "Growth Forecast", value: "34%", trend: "+6%", description: "Combined revenue and appointment growth." }
];

const reports: ReportDefinition[] = [
  { id: "report_board", title: "Boardroom Executive Report", format: "PDF", status: "ready", date: "Jul 4, 2026", preparedBy: "Priya Reddy" },
  { id: "report_campaigns", title: "Campaign Performance Export", format: "Excel", status: "ready", date: "Jul 4, 2026", preparedBy: "Priya Reddy" },
  { id: "report_conversations", title: "Conversation Outcomes CSV", format: "CSV", status: "ready", date: "Jul 4, 2026", preparedBy: "Priya Reddy" }
];

const dashboard: AnalyticsDashboard = {
  ...analyticsSummary,
  kpis: {
    ...analyticsSummary,
    revenueInfluenced: 24000000,
    appointments: 1248,
    callsAutomated: 18420,
    qualifiedLeads: 842,
    conversionRate: Number((sophiaKpis.conversionRate ?? "38%").replace("%", "")),
    customerSatisfaction: Number((emmaKpis.customerSatisfaction ?? "99%").replace("%", "")),
    hoursSaved: 1842,
    roi: 324
  },
  businessImpact: {
    revenueTrend,
    appointments: revenueTrend.map((item) => ({ name: item.name, value: item.appointments })),
    businessGrowth: revenueTrend.map((item, index) => ({ name: item.name, value: 18 + index * 3 })),
    policiesSold: revenueTrend.map((item, index) => ({ name: item.name, value: 220 + index * 42 })),
    qualifiedLeads: revenueTrend.map((item) => ({ name: item.name, value: item.leads })),
    hoursSaved: revenueTrend.map((item, index) => ({ name: item.name, value: 900 + index * 188 })),
    summary: "AI Workforce influenced Rs. 2.4 Cr in revenue while reducing operational workload by 1,842 hours this quarter."
  },
  workforcePerformance: {
    totalEmployees: 18,
    activeEmployees: 14,
    averageHealth: 96,
    averageCsat: 94,
    averageCallDuration: "4m 28s",
    successRate: 82,
    utilization: 84
  },
  employeeLeaderboard: leaderboard,
  campaignAnalytics: {
    campaignSuccess: 78,
    appointments: 216,
    revenue: "Rs. 24.8L",
    conversion: 28.6,
    customerResponse: 42,
    completion: 76,
    comparison: campaigns.map((campaign) => ({ name: campaign.name, appointments: campaign.appointments, revenue: campaign.revenueInfluenced, value: campaign.progress })),
    funnel: [
      { name: "Contacts", value: 2350 },
      { name: "Reached", value: 1692 },
      { name: "Interested", value: 842 },
      { name: "Appointments", value: 1248 },
      { name: "Policies", value: 486 }
    ],
    revenueDistribution: campaigns.map((campaign) => ({ name: campaign.name, value: campaign.revenueInfluenced }))
  },
  customerAnalytics: {
    leadSources: [{ name: "Campaign Import", value: 42 }, { name: "Referral", value: 22 }, { name: "Website", value: 18 }, { name: "Manual Entry", value: 18 }],
    customerSegments: [{ name: "High Value", value: 210 }, { name: "Renewals", value: 310 }, { name: "Qualified Leads", value: 640 }, { name: "Support Cases", value: 145 }],
    policyDistribution: [{ name: "Motor", value: 38 }, { name: "Health", value: 28 }, { name: "Life", value: 21 }, { name: "Travel", value: 13 }],
    retention: 91,
    renewals: 310,
    responseRate: 42,
    satisfaction: 94
  },
  conversationAnalytics: {
    callsPerHour: [{ name: "09:00", calls: 84 }, { name: "10:00", calls: 116 }, { name: "11:00", calls: 132 }, { name: "12:00", calls: 148 }, { name: "13:00", calls: 126 }, { name: "14:00", calls: 156 }],
    averageDuration: "4m 28s",
    firstCallResolution: 81,
    escalationRate: 4,
    sentimentDistribution: [{ name: "Positive", value: 52 }, { name: "Neutral", value: 31 }, { name: "Satisfied", value: 12 }, { name: "Negative", value: 5 }],
    knowledgeUsage: knowledge.slice(0, 6).map((item, index) => ({ name: item.title, value: 98 - index * 7 })),
    outcomes: [{ name: "Appointment", value: 216 }, { name: "Follow-up", value: 420 }, { name: "Qualified", value: 842 }, { name: "Escalated", value: 38 }]
  },
  knowledgeAnalytics: {
    mostUsedDocuments: knowledge.slice(0, 6).map((item, index) => ({ name: item.title, value: 1248 - index * 118 })),
    coverage: 96,
    freshness: 95,
    confidence: 94,
    documentUsage: knowledge.slice(0, 6).map((item, index) => ({ name: item.title, value: 88 - index * 5 })),
    trainingImpact: [{ name: "Before", value: 72 }, { name: "After", value: 89 }, { name: "Current", value: 94 }]
  },
  workforceHealth: {
    overallHealth: 96,
    departmentHealth: [{ name: "Sales", value: 97 }, { name: "Support", value: 95 }, { name: "Claims", value: 94 }, { name: "Finance", value: 98 }, { name: "HR", value: 96 }],
    employeeHealth: employees.slice(0, 8).map((employee) => ({ name: employee.name, value: employee.health })),
    trainingHealth: 95,
    knowledgeHealth: 96,
    compliance: 98
  },
  insights: analyticsInsights,
  forecasts,
  reports,
  executiveSummary: "This month your AI Workforce completed 18,420 conversations, generated 1,248 appointments, and influenced Rs. 2.4 Cr in revenue. Customer satisfaction increased by 4%. Sales performance improved by 12%. Knowledge freshness remains above 95%."
};

export const analyticsService = {
  getDashboard: () => mockApi<AnalyticsDashboard>(() => dashboard),
  getRevenue: () => mockApi<AnalyticsDashboard["businessImpact"]>(() => dashboard.businessImpact),
  getEmployees: () => mockApi<EmployeeAnalyticsRow[]>(() => dashboard.employeeLeaderboard),
  getCampaignAnalytics: () => mockApi<AnalyticsDashboard["campaignAnalytics"]>(() => dashboard.campaignAnalytics),
  getConversationAnalytics: () => mockApi<AnalyticsDashboard["conversationAnalytics"]>(() => dashboard.conversationAnalytics),
  getKnowledgeAnalytics: () => mockApi<AnalyticsDashboard["knowledgeAnalytics"]>(() => dashboard.knowledgeAnalytics),
  getForecast: () => mockApi<AnalyticsForecast[]>(() => forecasts),
  getInsights: () => mockApi<Insight[]>(() => insights),
  getExecutiveInsights: () => mockApi<AnalyticsInsight[]>(() => analyticsInsights),
  getReports: () => mockApi<ReportDefinition[]>(() => reports),
  generateReport: (format: ReportDefinition["format"] = "PDF") =>
    mockApi<ReportDefinition>(() => ({
      id: `report_${format.toLowerCase()}_${Date.now()}`,
      title: "Executive Workforce Report",
      format,
      status: "ready",
      date: "Jul 4, 2026",
      preparedBy: "Priya Reddy"
    }))
};
