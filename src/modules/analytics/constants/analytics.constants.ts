export const analyticsTabs = [
  { id: "overview", label: "Overview", href: "/app/analytics" },
  { id: "workforce", label: "Workforce", href: "/app/analytics/workforce" },
  { id: "employees", label: "Employees", href: "/app/analytics/employees" },
  { id: "campaigns", label: "Campaigns", href: "/app/analytics/campaigns" },
  { id: "conversations", label: "Conversations", href: "/app/analytics/conversations" },
  { id: "customers", label: "Customers", href: "/app/analytics/customers" },
  { id: "reports", label: "Reports", href: "/app/analytics/reports" }
] as const;

export const dateRanges = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Quarter", "Year", "Custom"] as const;
