import { mockApi } from "@/mocks/mockApi";
import { organization } from "@/mocks/mockData";
import type {
  ApiKey,
  Integration,
  NotificationSettings,
  Organization,
  OrganizationAdminDashboard,
  OrganizationProfile,
  SecuritySettings,
  TeamMember
} from "@/types";

const team: TeamMember[] = [
  ["tm_priya", "Priya Reddy", "priya.reddy@nova-insurance.demo", "Operations", "Super Admin", "active", "2 minutes ago", "PR"],
  ["tm_rahul", "Rahul Sharma", "rahul.sharma@nova-insurance.demo", "Leadership", "Organization Admin", "active", "14 minutes ago", "RS"],
  ["tm_meera", "Meera Iyer", "meera.iyer@nova-insurance.demo", "Knowledge", "Knowledge Manager", "active", "38 minutes ago", "MI"],
  ["tm_arjun", "Arjun Menon", "arjun.menon@nova-insurance.demo", "Sales", "Sales Manager", "active", "1 hour ago", "AM"],
  ["tm_nisha", "Nisha Rao", "nisha.rao@nova-insurance.demo", "Support", "Support Manager", "active", "3 hours ago", "NR"],
  ["tm_vikram", "Vikram Jain", "vikram.jain@nova-insurance.demo", "Campaigns", "Campaign Manager", "invited", "Invitation sent", "VJ"]
].map(([id, name, email, department, role, status, lastLogin, avatar]) => ({
  id: String(id),
  name: String(name),
  email: String(email),
  department: String(department),
  role: String(role),
  status: status as TeamMember["status"],
  lastLogin: String(lastLogin),
  avatar: String(avatar)
}));

const integrations: Integration[] = [
  ["salesforce", "Salesforce", "CRM", "available", "Not connected", "Sync enterprise customer records and sales activity."],
  ["hubspot", "HubSpot", "CRM", "connected", "12 minutes ago", "Import contacts, companies, deals and campaign outcomes."],
  ["zoho", "Zoho CRM", "CRM", "available", "Not connected", "Connect Indian sales teams and policy pipelines."],
  ["dynamics", "Microsoft Dynamics", "CRM", "available", "Not connected", "Connect account and opportunity workflows."],
  ["google_calendar", "Google Calendar", "Calendar", "connected", "8 minutes ago", "Book appointments from AI Employee conversations."],
  ["outlook", "Microsoft Outlook", "Calendar", "available", "Not connected", "Coordinate meetings and renewal follow-ups."],
  ["slack", "Slack", "Collaboration", "connected", "18 minutes ago", "Send alerts for campaigns, knowledge and security events."],
  ["teams", "Microsoft Teams", "Collaboration", "available", "Not connected", "Notify managers inside operations channels."],
  ["zapier", "Zapier", "Automation", "available", "Not connected", "Route workflow events to approved business tools."],
  ["webhook", "Webhook", "Developer", "connected", "4 minutes ago", "Send Workforce AI events to internal systems."],
  ["rest_api", "REST API", "Developer", "connected", "Live", "Use API keys for secure backend integration."]
].map(([id, name, category, status, lastSync, description]) => ({
  id: String(id),
  name: String(name),
  category: String(category),
  status: status as Integration["status"],
  lastSync: String(lastSync),
  description: String(description)
}));

const dashboard: OrganizationAdminDashboard = {
  profile: {
    name: organization.name,
    logoInitials: "NI",
    website: "https://nova-insurance.demo",
    industry: organization.industry,
    phone: "+91 40 4567 8900",
    email: "admin@nova-insurance.demo",
    country: "India",
    timezone: organization.timezone,
    businessHours: "09:00-18:00, Monday-Friday",
    currency: "INR",
    dateFormat: "DD MMM YYYY",
    language: "English",
    workspaceUrl: "nova-insurance.workforce-ai.demo"
  },
  kpis: {
    humanUsers: 48,
    aiEmployees: organization.aiEmployees,
    departments: 8,
    storageUsedGb: 2.8,
    storageLimitGb: 20,
    apiRequestsToday: 42184,
    subscription: organization.subscription
  },
  team,
  roles: [
    {
      id: "role_super_admin",
      name: "Super Admin",
      description: "Full administrative access across organization, billing, security and data controls.",
      users: 2,
      permissions: [
        { area: "Dashboard", permissions: ["View", "Edit", "Export"] },
        { area: "Employees", permissions: ["Create", "Edit", "Delete", "Assign"] },
        { area: "Campaigns", permissions: ["Create", "Launch", "Pause", "Archive"] },
        { area: "Knowledge", permissions: ["Upload", "Delete", "Assign"] },
        { area: "Analytics", permissions: ["View", "Export"] }
      ]
    },
    {
      id: "role_operations",
      name: "Operations Manager",
      description: "Manages day-to-day Workforce activity, conversations, campaigns and performance.",
      users: 8,
      permissions: [
        { area: "Dashboard", permissions: ["View", "Edit"] },
        { area: "Employees", permissions: ["Edit", "Assign"] },
        { area: "Campaigns", permissions: ["Launch", "Pause"] },
        { area: "Knowledge", permissions: ["Assign"] },
        { area: "Analytics", permissions: ["View"] }
      ]
    },
    {
      id: "role_viewer",
      name: "Viewer",
      description: "Read-only access for leaders who monitor business outcomes and reports.",
      users: 18,
      permissions: [
        { area: "Dashboard", permissions: ["View"] },
        { area: "Employees", permissions: ["View"] },
        { area: "Campaigns", permissions: ["View"] },
        { area: "Knowledge", permissions: ["View"] },
        { area: "Analytics", permissions: ["View"] }
      ]
    }
  ],
  security: {
    passwordPolicy: "Minimum 12 characters, uppercase, lowercase, number and special character.",
    sessionTimeout: "30 minutes",
    twoFactorEnabled: true,
    ipWhitelistEnabled: true,
    deviceManagement: true,
    activeSessions: [
      { id: "session_1", device: "MacBook Pro", browser: "Chrome", location: "Hyderabad, India", ipAddress: "103.44.18.24", lastActive: "2 minutes ago" },
      { id: "session_2", device: "Windows Desktop", browser: "Edge", location: "Bengaluru, India", ipAddress: "49.207.91.18", lastActive: "18 minutes ago" },
      { id: "session_3", device: "iPad Pro", browser: "Safari", location: "Mumbai, India", ipAddress: "122.161.77.88", lastActive: "1 hour ago" }
    ]
  },
  workforceDefaults: {
    defaultVoice: "Sophia Premium",
    language: "English",
    accent: "Indian English",
    workingHours: "09:00-18:00 IST",
    knowledgeCollection: "Insurance",
    conversationStyle: "Consultative",
    escalationRules: "Escalate negative sentiment, compliance questions and claim disputes.",
    complianceRules: "Follow IRDA guidance, consent recording and restricted-topic policies."
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    campaignAlerts: true,
    conversationAlerts: true,
    securityAlerts: true,
    knowledgeUpdates: true,
    employeeHealthAlerts: true
  },
  integrations,
  billing: {
    subscription: organization.subscription,
    renewalDate: "31 Dec 2026",
    seatsUsed: 48,
    seatsLimit: 75,
    aiEmployeesUsed: 18,
    aiEmployeesLimit: 30,
    storageUsedGb: 2.8,
    storageLimitGb: 20,
    apiUsage: 42184,
    paymentMethod: "Visa ending 4242",
    invoices: [
      { id: "INV-2026-071", date: "Jul 1, 2026", amount: "Rs. 4,80,000", status: "paid" },
      { id: "INV-2026-070", date: "Jun 1, 2026", amount: "Rs. 4,80,000", status: "paid" },
      { id: "INV-2026-072", date: "Aug 1, 2026", amount: "Rs. 4,80,000", status: "upcoming" }
    ]
  },
  api: {
    keys: [
      { id: "key_live", name: "Production Workspace Key", keyPreview: "wf_live_8f29...91ad", created: "Apr 12, 2026", lastUsed: "4 minutes ago", status: "active" },
      { id: "key_reports", name: "Analytics Export Key", keyPreview: "wf_live_2bc4...70fe", created: "May 3, 2026", lastUsed: "2 hours ago", status: "active" }
    ],
    webhooks: [
      { id: "wh_campaign", url: "https://nova-insurance.demo/webhooks/campaigns", events: ["Campaign Started", "Appointment Booked"], status: "active" },
      { id: "wh_security", url: "https://nova-insurance.demo/webhooks/security", events: ["Role Changed", "Login"], status: "active" }
    ],
    requestsToday: 42184,
    errorRate: 0.08,
    documentationUrl: "/app/support"
  },
  auditLogs: [
    { id: "audit_1", timestamp: "Jul 4, 2026 22:16", user: "Priya Reddy", action: "Knowledge Upload", resource: "Pricing Guide v3", ipAddress: "103.44.18.24", status: "success" },
    { id: "audit_2", timestamp: "Jul 4, 2026 21:42", user: "Arjun Menon", action: "Campaign Launch", resource: "Motor Insurance Q3", ipAddress: "49.207.91.18", status: "success" },
    { id: "audit_3", timestamp: "Jul 4, 2026 20:58", user: "Rahul Sharma", action: "Role Change", resource: "Operations Manager", ipAddress: "103.44.18.24", status: "warning" },
    { id: "audit_4", timestamp: "Jul 4, 2026 19:24", user: "Security System", action: "IP Restriction", resource: "Unknown login", ipAddress: "185.19.84.10", status: "blocked" }
  ],
  customization: {
    logo: "Nova Insurance",
    primaryColor: "#0F1B3D",
    companyName: organization.name,
    emailFooter: "Nova Insurance Pvt. Ltd. | Hyderabad, India",
    defaultSignature: "Regards, Nova Insurance Customer Operations",
    dashboardLayout: "Executive Command Center"
  },
  systemHealth: [
    { id: "api", service: "API Health", status: "operational", value: "99.99%", description: "Core workspace APIs are responding normally." },
    { id: "storage", service: "Storage", status: "operational", value: "2.8 GB", description: "Document storage is within plan limits." },
    { id: "knowledge", service: "Knowledge Processing", status: "review", value: "4 in review", description: "Pricing Guide requires approval before distribution." },
    { id: "campaign", service: "Campaign Engine", status: "operational", value: "3 running", description: "Campaign scheduling and retries are healthy." },
    { id: "conversation", service: "Conversation Engine", status: "operational", value: "8 live", description: "Live conversations are being processed normally." },
    { id: "notifications", service: "Notification Service", status: "operational", value: "Live", description: "Security and campaign alerts are delivering." }
  ],
  dataManagement: [
    { id: "export", title: "Export Data", description: "Download organization users, campaigns, contacts, knowledge metadata and analytics.", action: "Start Export", tone: "primary" },
    { id: "import", title: "Import Data", description: "Bring approved business data into the Nova Insurance workspace.", action: "Open Import", tone: "secondary" },
    { id: "backup", title: "Backup Workspace", description: "Create a mock recovery point for the current organization state.", action: "Create Backup", tone: "secondary" },
    { id: "delete", title: "Delete Workspace", description: "Mock restricted action requiring Super Admin approval and security review.", action: "Request Review", tone: "danger" }
  ],
  support: [
    { id: "docs", title: "Documentation", description: "Implementation guides for teams, security, integrations and reports.", href: "/app/support" },
    { id: "kb", title: "Knowledge Base", description: "Answers for administration, billing, API usage and enterprise controls.", href: "/app/knowledge" },
    { id: "ticket", title: "Submit Ticket", description: "Escalate workspace issues to Workforce AI support.", href: "/app/support" },
    { id: "releases", title: "Release Notes", description: "Review recent platform improvements and policy updates.", href: "/app/support" }
  ],
  recentActivity: []
};

dashboard.recentActivity = dashboard.auditLogs.slice(0, 3);

export const organizationService = {
  getOrganization: () => mockApi<Organization>(() => organization),
  updateOrganization: (updates: Partial<Organization>) =>
    mockApi<Organization>(() => ({ ...organization, ...updates })),
  getAdminDashboard: () => mockApi<OrganizationAdminDashboard>(() => dashboard),
  getTeam: () => mockApi<TeamMember[]>(() => dashboard.team),
  getRoles: () => mockApi<OrganizationAdminDashboard["roles"]>(() => dashboard.roles),
  getSecurity: () => mockApi<SecuritySettings>(() => dashboard.security),
  getBilling: () => mockApi<OrganizationAdminDashboard["billing"]>(() => dashboard.billing),
  getIntegrations: () => mockApi<Integration[]>(() => dashboard.integrations),
  getNotifications: () => mockApi<NotificationSettings>(() => dashboard.notifications),
  getAuditLogs: () => mockApi<OrganizationAdminDashboard["auditLogs"]>(() => dashboard.auditLogs),
  updateProfile: (profile: Partial<OrganizationProfile>) =>
    mockApi<OrganizationProfile>(() => ({ ...dashboard.profile, ...profile })),
  inviteTeamMember: (email: string) =>
    mockApi<TeamMember>(() => ({
      id: `tm_${Date.now()}`,
      name: email.split("@")[0].replace(/[._]/g, " "),
      email,
      department: "Operations",
      role: "Viewer",
      status: "invited",
      lastLogin: "Invitation sent",
      avatar: email.slice(0, 2).toUpperCase()
    })),
  updateNotifications: (settings: NotificationSettings) =>
    mockApi<NotificationSettings>(() => settings),
  generateApiKey: (name = "New Workspace Key") =>
    mockApi<ApiKey>(() => ({
      id: `key_${Date.now()}`,
      name,
      keyPreview: "wf_live_new...demo",
      created: "Jul 4, 2026",
      lastUsed: "Never",
      status: "active"
    }))
};
