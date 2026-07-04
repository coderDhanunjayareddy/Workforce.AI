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
  status: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled" | "archived";
  assignedEmployeeId: string;
  assignedEmployeeName?: string;
  contacts: number;
  progress: number;
  appointments: number;
  revenueInfluenced: number;
  businessGoal?: string;
  department?: string;
  type?: CampaignType;
  priority?: Priority;
  conversionRate?: number;
  health?: number;
  launchDate?: string;
  knowledgeIds?: string[];
}

export type CampaignType =
  | "Sales"
  | "Lead Qualification"
  | "Renewals"
  | "Customer Support"
  | "Claims"
  | "Collections"
  | "Recruitment"
  | "Surveys"
  | "Feedback"
  | "Custom Campaign";

export interface CampaignDashboard {
  totalCampaigns: number;
  runningCampaigns: number;
  scheduledCampaigns: number;
  completedCampaigns: number;
  pausedCampaigns: number;
  appointmentsGenerated: number;
  revenueInfluenced: string;
  campaignSuccessRate: number;
  recommendations: CampaignRecommendation[];
  activity: CampaignTimelineItem[];
}

export interface CampaignRecommendation {
  id: string;
  priority: Priority;
  title: string;
  reason: string;
  impact: string;
  action: string;
  href: string;
}

export interface CampaignHealth {
  overallScore: number;
  knowledgeQuality: number;
  employeeHealth: number;
  contactQuality: number;
  conversionRate: number;
  completionProgress: number;
}

export interface CampaignAnalytics {
  callsOverTime: { name: string; calls: number; appointments: number; revenue: number }[];
  funnel: { name: string; value: number }[];
  sentiment: { name: string; value: number }[];
  liveMetrics: {
    callsToday: number;
    callsCompleted: number;
    appointments: number;
    interestedCustomers: number;
    notInterested: number;
    followUpRequired: number;
    voicemail: number;
    failedCalls: number;
  };
  performance: {
    averageDuration: string;
    pendingCalls: number;
    completedCalls: number;
    callsInProgress: number;
    failedCalls: number;
    currentQueue: number;
    customerSatisfaction: number;
  };
}

export interface CampaignContact {
  id: string;
  contactId: string;
  fullName: string;
  company: string;
  status: Contact["status"];
  lastContact: string;
  outcome: string;
  nextAction: string;
}

export interface CampaignKnowledgeItem {
  id: string;
  knowledgeId: string;
  title: string;
  type: Knowledge["type"];
  usage: number;
  performance: number;
  freshness: number;
  recommendation: string;
}

export interface CampaignTimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  type: CampaignType;
  description: string;
  recommendedEmployeeRole: string;
  estimatedDuration: string;
  expectedOutcome: string;
}

export interface CampaignDetail extends Campaign {
  description: string;
  objective: string;
  targetAudience: string;
  timeline: CampaignTimelineItem[];
  contactsAssigned: CampaignContact[];
  knowledgeAssigned: CampaignKnowledgeItem[];
  callingStrategy: {
    businessHours: string;
    retryRules: string;
    callAttempts: number;
    escalationRules: string;
    followUpDelay: string;
  };
  schedule: {
    mode: "Launch Now" | "Future Date" | "Recurring";
    businessCalendar: string;
    endDate: string;
  };
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
  status: "new-lead" | "qualified" | "customer" | "renewal-due" | "inactive" | "blacklisted" | "archived";
  leadScore: number;
  assignedEmployeeId: string;
  assignedEmployeeName?: string;
  currentCampaign?: string;
  recentActivity?: string;
  tags?: string[];
  policyType?: string;
  industry?: string;
  city?: string;
  state?: string;
  country?: string;
  lastContact?: string;
  policyNumber?: string;
}

export type LeadScoreCategory = "Cold" | "Warm" | "Hot" | "Qualified";
export type LeadScoreTrend = "up" | "down" | "stable";

export interface LeadScoreSummary {
  contactId: string;
  score: number;
  category: LeadScoreCategory;
  trend: LeadScoreTrend;
  reason: string;
}

export interface ContactDashboard {
  totalContacts: number;
  qualifiedLeads: number;
  activeCustomers: number;
  renewalsDue: number;
  pendingFollowUps: number;
  appointmentsToday: number;
  recentlyAdded: number;
  campaignCoverage: number;
  activeConversations: number;
  appointmentsScheduled: number;
  recommendations: ContactRecommendation[];
  insights: ContactInsight[];
  recentActivity: ContactTimelineItem[];
}

export interface ContactSegment {
  id: string;
  name: string;
  description: string;
  contacts: number;
  policyType: string;
  ownerEmployeeId: string;
  conversionRate: number;
  health: number;
  lastUpdated: string;
  filters: string[];
}

export interface ContactRecommendation {
  id: string;
  priority: Priority;
  title: string;
  reason: string;
  impact: string;
  action: string;
  href: string;
}

export interface ContactInsight {
  id: string;
  label: string;
  value: string;
  trend: string;
  description: string;
}

export interface ContactTimelineItem {
  id: string;
  type: "created" | "imported" | "assigned" | "campaign" | "conversation" | "appointment" | "policy" | "renewal" | "email" | "feedback";
  title: string;
  description: string;
  date: string;
  href?: string;
}

export interface ContactAppointment {
  id: string;
  title: string;
  date: string;
  ownerEmployeeId: string;
  outcome: string;
}

export interface ContactPolicy {
  id: string;
  type: string;
  policyNumber: string;
  premium: string;
  renewalDate: string;
  status: "active" | "renewal-due" | "expired";
}

export interface ContactDetail extends Contact {
  firstName: string;
  lastName: string;
  language: string;
  leadSource: string;
  notes: string;
  leadScoring: LeadScoreSummary;
  communicationHistory: ContactTimelineItem[];
  campaignHistory: ContactTimelineItem[];
  timeline: ContactTimelineItem[];
  appointments: ContactAppointment[];
  policiesPurchased: ContactPolicy[];
}

export interface ContactImportResult {
  imported: number;
  duplicates: number;
  validationErrors: number;
  source: string;
  completedAt: string;
}

export interface Conversation {
  id: string;
  employeeId: string;
  employeeName?: string;
  department?: string;
  campaignId?: string;
  campaignName?: string;
  contactId?: string;
  customerName: string;
  customerPhone?: string;
  goal: string;
  duration: string;
  sentiment: "positive" | "neutral" | "satisfied" | "negative";
  status: "live" | "completed" | "queued" | "on-hold" | "escalated";
  outcome?: string;
  health?: number;
  currentStage?: string;
  buyingIntent?: "Low" | "Medium" | "High";
  riskLevel?: "Low" | "Medium" | "High";
  confidence?: number;
}

export interface LiveOperationsDashboard {
  activeCalls: number;
  waitingQueue: number;
  completedToday: number;
  averageDuration: string;
  currentCsat: number;
  appointmentsToday: number;
  utilization: WorkforceUtilization;
  notifications: LiveNotification[];
  recommendations: LiveRecommendation[];
}

export interface LiveEmployeeStatus {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  campaign: string;
  status: "Talking" | "On Hold" | "Idle" | "Ready";
  currentCustomer: string;
  duration: string;
  health: number;
  conversationId?: string;
}

export interface TranscriptLine {
  id: string;
  speaker: string;
  role: "employee" | "customer";
  text: string;
  timestamp: string;
}

export interface SentimentPoint {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface ConversationInsight {
  customerSentiment: Conversation["sentiment"];
  confidence: number;
  buyingIntent: "Low" | "Medium" | "High";
  riskLevel: "Low" | "Medium" | "High";
  knowledgeUsed: string[];
  currentObjective: string;
  recommendedAction: string;
}

export interface AIDecision {
  whyAsked: string;
  knowledgeReferenced: string;
  customerIntent: string;
  confidence: number;
  nextRecommendedAction: string;
}

export interface CustomerConversationProfile {
  contactId: string;
  customerName: string;
  company: string;
  existingPolicies: string[];
  leadScore: number;
  previousCalls: number;
  assignedCampaign: string;
  lastConversation: string;
  lifetimeValue: string;
}

export interface ConversationSummary {
  topicsDiscussed: string[];
  products: string[];
  objections: string[];
  questions: string[];
  commitments: string[];
  appointmentStatus: string;
}

export interface PostCallSummary {
  customerIntent: string;
  summary: string;
  productsDiscussed: string[];
  outcome: string;
  appointment: string;
  followUpNeeded: string;
  suggestedNextSteps: string[];
  knowledgeUsed: string[];
  employeePerformance: string;
}

export interface ConversationQueueItem {
  id: string;
  customerName: string;
  priority: Priority;
  estimatedWait: string;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  campaignName: string;
}

export interface WorkforceUtilization {
  employeesBusy: number;
  employeesIdle: number;
  averageWait: string;
  queueLength: number;
  callsPerHour: { name: string; calls: number }[];
}

export interface LiveNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  href: string;
}

export interface LiveRecommendation {
  id: string;
  priority: Priority;
  title: string;
  action: string;
  reason: string;
  href: string;
}

export interface ConversationDetail extends Conversation {
  overview: string;
  transcript: TranscriptLine[];
  timeline: CampaignTimelineItem[];
  insights: ConversationInsight;
  decision: AIDecision;
  customerProfile: CustomerConversationProfile;
  summary: ConversationSummary;
  postCallSummary: PostCallSummary;
  sentimentTimeline: SentimentPoint[];
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

export interface AnalyticsKpis extends AnalyticsSummary {
  conversionRate: number;
  roi: number;
}

export interface AnalyticsChartPoint {
  name: string;
  revenue?: number;
  appointments?: number;
  calls?: number;
  leads?: number;
  value?: number;
  satisfaction?: number;
}

export interface EmployeeAnalyticsRow {
  rank: number;
  employeeId: string;
  employee: string;
  department: string;
  calls: number;
  appointments: number;
  revenue: string;
  csat: number;
  health: number;
  trend: string;
}

export interface AnalyticsInsight {
  id: string;
  priority: Priority;
  title: string;
  businessImpact: string;
  recommendedAction: string;
  href: string;
}

export interface AnalyticsForecast {
  id: string;
  label: string;
  value: string;
  trend: string;
  description: string;
}

export interface ReportDefinition {
  id: string;
  title: string;
  format: "PDF" | "Excel" | "CSV";
  status: "ready" | "building" | "failed";
  date: string;
  preparedBy: string;
}

export interface AnalyticsDashboard extends AnalyticsSummary {
  kpis: AnalyticsKpis;
  businessImpact: {
    revenueTrend: AnalyticsChartPoint[];
    appointments: AnalyticsChartPoint[];
    businessGrowth: AnalyticsChartPoint[];
    policiesSold: AnalyticsChartPoint[];
    qualifiedLeads: AnalyticsChartPoint[];
    hoursSaved: AnalyticsChartPoint[];
    summary: string;
  };
  workforcePerformance: {
    totalEmployees: number;
    activeEmployees: number;
    averageHealth: number;
    averageCsat: number;
    averageCallDuration: string;
    successRate: number;
    utilization: number;
  };
  employeeLeaderboard: EmployeeAnalyticsRow[];
  campaignAnalytics: {
    campaignSuccess: number;
    appointments: number;
    revenue: string;
    conversion: number;
    customerResponse: number;
    completion: number;
    comparison: AnalyticsChartPoint[];
    funnel: AnalyticsChartPoint[];
    revenueDistribution: AnalyticsChartPoint[];
  };
  customerAnalytics: {
    leadSources: AnalyticsChartPoint[];
    customerSegments: AnalyticsChartPoint[];
    policyDistribution: AnalyticsChartPoint[];
    retention: number;
    renewals: number;
    responseRate: number;
    satisfaction: number;
  };
  conversationAnalytics: {
    callsPerHour: AnalyticsChartPoint[];
    averageDuration: string;
    firstCallResolution: number;
    escalationRate: number;
    sentimentDistribution: AnalyticsChartPoint[];
    knowledgeUsage: AnalyticsChartPoint[];
    outcomes: AnalyticsChartPoint[];
  };
  knowledgeAnalytics: {
    mostUsedDocuments: AnalyticsChartPoint[];
    coverage: number;
    freshness: number;
    confidence: number;
    documentUsage: AnalyticsChartPoint[];
    trainingImpact: AnalyticsChartPoint[];
  };
  workforceHealth: {
    overallHealth: number;
    departmentHealth: AnalyticsChartPoint[];
    employeeHealth: AnalyticsChartPoint[];
    trainingHealth: number;
    knowledgeHealth: number;
    compliance: number;
  };
  insights: AnalyticsInsight[];
  forecasts: AnalyticsForecast[];
  reports: ReportDefinition[];
  executiveSummary: string;
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
