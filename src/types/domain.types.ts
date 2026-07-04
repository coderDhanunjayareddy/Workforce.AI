export type Status = "draft" | "training" | "active" | "busy" | "paused" | "offline" | "archived";
export type Priority = "low" | "medium" | "high" | "critical";
export type ThemeMode = "light" | "dark" | "system";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
  verified: boolean;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  subscription: string;
  timezone: string;
  owner: string;
  humanEmployees: number;
  aiEmployees: number;
  customers: number;
  branches: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: Status;
  voice: string;
  language: string;
  health: number;
  knowledgeScore: number;
  performance: number;
  callsToday: number;
  appointmentsToday: number;
  csat: number;
  currentCampaign?: string;
  lastActive: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled";
  assignedEmployeeId: string;
  contacts: number;
  progress: number;
  appointments: number;
  revenueInfluenced: number;
}

export interface Knowledge {
  id: string;
  title: string;
  type: "pdf" | "docx" | "website" | "faq" | "policy";
  status: "indexed" | "processing" | "needs-review" | "failed";
  department: string;
  freshness: number;
  version: string;
}

export interface Contact {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  status: "new-lead" | "qualified" | "customer" | "renewal-due" | "inactive";
  leadScore: number;
  assignedEmployeeId: string;
}

export interface Conversation {
  id: string;
  employeeId: string;
  customerName: string;
  goal: string;
  duration: string;
  sentiment: "positive" | "neutral" | "satisfied" | "negative";
  status: "live" | "completed" | "queued";
}

export interface AnalyticsSummary {
  revenueInfluenced: number;
  appointments: number;
  qualifiedLeads: number;
  policiesSold: number;
  customerSatisfaction: number;
  hoursSaved: number;
  callsAutomated: number;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  href: string;
}

export interface Insight {
  id: string;
  priority: Priority;
  title: string;
  description: string;
  impact: string;
  action: string;
  href: string;
}

export interface Settings {
  theme: ThemeMode;
  locale: string;
  currency: string;
  notificationsEnabled: boolean;
}
