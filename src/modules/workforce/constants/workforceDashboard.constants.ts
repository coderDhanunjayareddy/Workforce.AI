import type { WorkforceDashboardData } from "../types/workforceDashboard.types";

export const workforceDashboardData: WorkforceDashboardData = {
  kpis: [
    {
      id: "employees",
      label: "Total AI Employees",
      value: "18",
      trend: "+2 this month",
      comparison: "14 active, 2 training, 1 paused, 1 draft",
      icon: "users",
      sparkline: [12, 13, 13, 15, 16, 16, 18]
    },
    {
      id: "live-conversations",
      label: "Live Conversations",
      value: "8",
      trend: "+18%",
      comparison: "Across sales, support and renewals",
      icon: "phone",
      sparkline: [4, 5, 6, 5, 7, 7, 8]
    },
    {
      id: "calls-today",
      label: "Calls Today",
      value: "1,842",
      trend: "+12%",
      comparison: "Average duration 4m 28s",
      icon: "activity",
      sparkline: [720, 940, 1110, 1240, 1510, 1690, 1842]
    },
    {
      id: "appointments",
      label: "Appointments Booked",
      value: "216",
      trend: "+9%",
      comparison: "Motor renewal and policy expiry campaigns lead",
      icon: "calendar",
      sparkline: [84, 102, 126, 144, 171, 196, 216]
    },
    {
      id: "csat",
      label: "Customer Satisfaction",
      value: "94%",
      trend: "+2%",
      comparison: "Measured across live conversations",
      icon: "sparkles",
      sparkline: [88, 90, 90, 91, 92, 93, 94]
    },
    {
      id: "revenue",
      label: "Revenue Influenced",
      value: "Rs. 24.8L",
      trend: "+15%",
      comparison: "Revenue connected to campaigns",
      icon: "briefcase",
      sparkline: [9.2, 11.4, 14.1, 17.5, 20.6, 22.8, 24.8]
    }
  ],
  businessImpact: {
    metrics: [
      { id: "revenue", label: "Revenue Influenced", value: "Rs. 24.8L", trend: "+15%" },
      { id: "hours", label: "Hours Saved", value: "1,842", trend: "+12%" },
      { id: "policies", label: "Policies Sold", value: "428", trend: "+8%" },
      { id: "leads", label: "Qualified Leads", value: "640", trend: "+11%" },
      { id: "conversion", label: "Conversion Rate", value: "28.6%", trend: "+3.4%" }
    ],
    summary:
      "Your AI Workforce influenced Rs. 24.8L in revenue this month while saving approximately 1,842 working hours.",
    monthlyTrend: [
      { name: "Week 1", value: 5.4, secondary: 362 },
      { name: "Week 2", value: 6.1, secondary: 418 },
      { name: "Week 3", value: 6.8, secondary: 493 },
      { name: "Week 4", value: 6.5, secondary: 569 }
    ]
  },
  health: {
    overall: 96,
    trend: "+3% over last month",
    lastUpdated: "Updated 4 minutes ago",
    breakdown: [
      { label: "Knowledge", value: 95 },
      { label: "Conversation Quality", value: 97 },
      { label: "Voice Quality", value: 99 },
      { label: "Tool Connectivity", value: 100 },
      { label: "Policy Compliance", value: 98 }
    ]
  },
  liveWorkforce: [
    {
      id: "live-sophia",
      employeeId: "emp_sophia",
      employeeName: "Sophia",
      role: "Senior AI Sales Executive",
      currentActivity: "Talking with Rajesh Kumar",
      duration: "04:42",
      customerName: "Rajesh Kumar",
      status: "talking"
    },
    {
      id: "live-emma",
      employeeId: "emp_emma",
      employeeName: "Emma",
      role: "Senior Customer Success Specialist",
      currentActivity: "Resolving health policy clarification",
      duration: "03:25",
      customerName: "Anjali Rao",
      status: "talking"
    },
    {
      id: "live-david",
      employeeId: "emp_david",
      employeeName: "David",
      role: "Claims Support",
      currentActivity: "Training",
      duration: "12%",
      customerName: "Claims SOP v4",
      status: "training"
    },
    {
      id: "live-olivia",
      employeeId: "emp_olivia",
      employeeName: "Olivia",
      role: "Customer Support",
      currentActivity: "Idle",
      duration: "Last active 8 min ago",
      customerName: "Ready for next conversation",
      status: "idle"
    }
  ],
  activity: [
    {
      id: "activity-1",
      time: "09:12",
      title: "Sophia booked appointment",
      description: "Rajesh Kumar scheduled a motor insurance consultation.",
      href: "/app/employees/emp_sophia",
      tone: "success"
    },
    {
      id: "activity-2",
      time: "09:18",
      title: "Emma resolved policy query",
      description: "Customer success conversation ended with no escalation required.",
      href: "/app/campaigns/camp_policy_expiry",
      tone: "success"
    },
    {
      id: "activity-3",
      time: "09:31",
      title: "Campaign launched",
      description: "Travel Insurance Leads started with 360 contacts.",
      href: "/app/campaigns/camp_travel_leads",
      tone: "info"
    },
    {
      id: "activity-4",
      time: "09:42",
      title: "Knowledge updated",
      description: "Premium Pricing Guide was published for the sales workforce.",
      href: "/app/knowledge/kn_premium_pricing",
      tone: "info"
    },
    {
      id: "activity-5",
      time: "09:56",
      title: "David resolved claim",
      description: "Claims Follow-up closed a customer query without escalation.",
      href: "/app/conversations/conv_3",
      tone: "success"
    }
  ],
  quickActions: [
    { id: "hire", title: "Hire AI Employee", description: "Add a new employee to your workforce.", href: "/app/employees/hire", icon: "users" },
    { id: "knowledge", title: "Upload Knowledge", description: "Improve answers with fresh company material.", href: "/app/knowledge", icon: "upload" },
    { id: "contacts", title: "Import Contacts", description: "Add customers for campaigns and conversations.", href: "/app/contacts", icon: "book" },
    { id: "campaign", title: "Launch Campaign", description: "Assign a business objective to your workforce.", href: "/app/campaigns", icon: "megaphone" },
    { id: "analytics", title: "Review Analytics", description: "Measure revenue, conversion and customer impact.", href: "/app/analytics", icon: "activity" },
    { id: "live", title: "View Live Calls", description: "Monitor customer conversations in real time.", href: "/app/conversations", icon: "phone" },
    { id: "directory", title: "Open Employee Directory", description: "Manage roles, health and performance.", href: "/app/employees", icon: "briefcase" }
  ],
  departments: [
    { id: "sales", department: "Sales", employees: 8, health: 97, performance: 96 },
    { id: "support", department: "Customer Support", employees: 4, health: 96, performance: 95 },
    { id: "claims", department: "Claims", employees: 2, health: 96, performance: 95 },
    { id: "operations", department: "Operations", employees: 2, health: 94, performance: 93 },
    { id: "finance", department: "Finance", employees: 1, health: 97, performance: 95 },
    { id: "compliance", department: "Compliance", employees: 1, health: 97, performance: 96 }
  ],
  priorities: [
    {
      id: "pricing-guide",
      priority: "critical",
      title: "Review Premium Pricing Guide",
      description: "Sales conversations are using material that needs review.",
      cta: "Update Knowledge",
      href: "/app/knowledge"
    },
    {
      id: "renewal-campaign",
      priority: "high",
      title: "Scale Policy Expiry Renewal Drive",
      description: "310 renewals are due this week across Nova Insurance.",
      cta: "Open Campaigns",
      href: "/app/campaigns"
    },
    {
      id: "emma-training",
      priority: "medium",
      title: "Approve Emma Training",
      description: "Emma completed customer success handling updates and is ready for approval.",
      cta: "Open Workspace",
      href: "/app/employees/emp_emma"
    },
    {
      id: "travel-leads",
      priority: "medium",
      title: "Import 250 Travel Leads",
      description: "Travel Insurance Leads will exhaust its high-intent segment tomorrow.",
      cta: "Import Contacts",
      href: "/app/contacts"
    }
  ],
  charts: {
    callsPerHour: [
      { name: "08:00", value: 96 },
      { name: "10:00", value: 186 },
      { name: "12:00", value: 244 },
      { name: "14:00", value: 302 },
      { name: "16:00", value: 276 },
      { name: "18:00", value: 214 }
    ],
    duration: [
      { name: "Sales", value: 4.8 },
      { name: "Renewals", value: 5.2 },
      { name: "Support", value: 3.7 },
      { name: "Claims", value: 6.1 }
    ],
    sentiment: [
      { name: "Positive", value: 62 },
      { name: "Neutral", value: 28 },
      { name: "Negative", value: 10 }
    ],
    funnel: [
      { name: "Connected", value: 1842 },
      { name: "Qualified", value: 640 },
      { name: "Interested", value: 412 },
      { name: "Appointment", value: 216 },
      { name: "Policy Sold", value: 86 }
    ],
    resolution: [
      { name: "Resolved", value: 82 },
      { name: "Follow-up", value: 12 },
      { name: "Escalated", value: 6 }
    ]
  }
};
