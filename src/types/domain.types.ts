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

export interface EmployeeHealth {
  overall: number;
  knowledge: number;
  voice: number;
  performance: number;
  compliance: number;
  tools: number;
  conversationQuality: number;
  trainingStatus: string;
  trend: string;
  history: { name: string; value: number }[];
}

export interface EmployeePerformance {
  businessContribution: {
    revenueInfluenced: string;
    appointmentsBooked: number;
    callsCompleted: number;
    qualifiedLeads: number;
    customerSatisfaction: number;
    hoursSaved: number;
    conversionRate: number;
  };
  monthlyTrends: { name: string; calls: number; appointments: number; revenue: number }[];
  leaderboardPosition: number;
}

export interface EmployeeTimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface EmployeeKnowledgeItem {
  id: string;
  title: string;
  type: string;
  status: string;
  freshness: number;
  version: string;
  lastUpdated: string;
}

export interface EmployeeTrainingItem {
  id: string;
  title: string;
  status: string;
  date: string;
  outcome: string;
}

export interface EmployeeVersionItem {
  id: string;
  version: string;
  published: string;
  changes: string;
  knowledgeUpdated: string;
  performanceDifference: string;
}

export interface EmployeeConversationItem extends Conversation {
  campaign: string;
  outcome: string;
  knowledgeUsed: string;
  date: string;
}

export interface EmployeeGoal {
  id: string;
  title: string;
  target: string;
  progress: number;
  achievement: string;
}

export interface EmployeeSkill {
  id: string;
  title: string;
  level: number;
  trend: string;
  lastTraining: string;
}

export interface EmployeeToolConnection {
  id: string;
  name: string;
  status: "connected" | "attention";
  lastSync: string;
}

export interface EmployeePolicy {
  id: string;
  title: string;
  value: string;
}

export interface EmployeeRecommendation {
  id: string;
  priority: Priority;
  title: string;
  impact: string;
  action: string;
  href: string;
}

export interface EmployeeWorkspaceData {
  manager: string;
  currentVersion: string;
  createdDate: string;
  assignment: {
    campaign: string;
    department: string;
    businessGoal: string;
    priority: Priority;
    workingHours: string;
  };
  voiceProfile: {
    accent: string;
    tone: string;
    speakingSpeed: string;
    pitch: string;
    emotion: string;
    quality: number;
  };
  policies: EmployeePolicy[];
  goals: EmployeeGoal[];
  skills: EmployeeSkill[];
  tools: EmployeeToolConnection[];
  notifications: string[];
  pinnedNotes: string[];
  recommendations: EmployeeRecommendation[];
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

export interface KnowledgeCollection {
  id: string;
  name: string;
  department: string;
  documents: number;
  freshness: number;
  employeesAssigned: number;
}

export interface KnowledgeQueueItem {
  id: string;
  title: string;
  stage: string;
  progress: number;
  eta: string;
  status: "processing" | "scanning" | "indexing" | "failed";
}

export interface KnowledgeActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  href: string;
}

export interface KnowledgeRecommendation {
  id: string;
  priority: Priority;
  title: string;
  impact: string;
  action: string;
  href: string;
}

export interface KnowledgeDashboard {
  stats: {
    totalSources: number;
    indexed: number;
    processing: number;
    requiresReview: number;
    freshness: number;
    storageUsed: string;
  };
  collections: KnowledgeCollection[];
  processingQueue: KnowledgeQueueItem[];
  activity: KnowledgeActivityItem[];
  recommendations: KnowledgeRecommendation[];
  recentlyUpdated: string[];
  mostUsed: string[];
}

export interface KnowledgeVersion {
  id: string;
  version: string;
  published: string;
  changes: string;
  author: string;
  status: "current" | "published" | "restored";
}

export interface KnowledgeUsage {
  employeesUsing: number;
  campaignsUsing: number;
  conversationsReferenced: number;
  customerQuestionsAnswered: number;
  appointmentsGenerated: number;
  revenueInfluenced: string;
}

export interface KnowledgeQuality {
  coverage: number;
  freshness: number;
  completeness: number;
  accuracy: number;
  readability: number;
  usage: number;
  confidence: number;
  overall: number;
}

export interface KnowledgeSummary {
  purpose: string;
  keyTopics: string[];
  businessValue: string;
  recommendedDepartments: string[];
  employeesUsingIt: string[];
}

export interface KnowledgeDetail extends Knowledge {
  category: string;
  owner: string;
  description: string;
  tags: string[];
  language: string;
  indexedDate: string;
  assignedEmployees: string[];
  quality: KnowledgeQuality;
  usage: KnowledgeUsage;
  summary: KnowledgeSummary;
  versions: KnowledgeVersion[];
  processingLog: KnowledgeQueueItem[];
  relatedDocuments: string[];
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
