import { mockApi } from "@/mocks/mockApi";
import { campaigns, conversationRecords, conversations, employeeProfiles, employees, knowledge } from "@/mocks/mockData";
import type {
  Employee,
  EmployeeConversationItem,
  EmployeeHealth,
  EmployeeKnowledgeItem,
  EmployeePerformance,
  EmployeeTimelineItem,
  EmployeeTrainingItem,
  EmployeeVersionItem,
  EmployeeWorkspaceData
} from "@/types";

const getEmployeeOrThrow = (id: string) => {
  const employee = employees.find((item) => item.id === id);
  if (!employee) throw new Error("AI Employee was not found.");
  return employee;
};

const getEmployeeProfile = (id: string) => employeeProfiles.find((profile) => profile.id === id);

const getWorkspaceData = (employee: Employee): EmployeeWorkspaceData => {
  const profile = getEmployeeProfile(employee.id);
  return {
  manager: profile?.manager ?? "Priya Reddy",
  currentVersion: "v2.1",
  createdDate: profile?.aiExperienceYears && profile.aiExperienceYears >= 4 ? "2025-11-18" : "2026-01-12",
  assignment: {
    campaign: employee.currentCampaign ?? "Available for assignment",
    department: employee.department,
    businessGoal: employee.department === "Claims" ? "Resolve claims faster" : profile?.goals[0] ?? "Increase qualified customer outcomes",
    priority: employee.health >= 97 ? "high" : "medium",
    workingHours: profile?.workingHours ?? "09:00 - 18:00 IST"
  },
  voiceProfile: {
    accent: "Indian English",
    tone: profile?.personality.split(",")[0] ?? (employee.department === "Claims" ? "Empathetic" : "Consultative"),
    speakingSpeed: "Balanced",
    pitch: "Medium",
    emotion: profile?.personality.split(" and ").at(-1) ?? "Confident",
    quality: Math.min(100, profile?.conversationQuality ?? employee.health + 1)
  },
  policies: [
    { id: "hours", title: "Working Hours", value: "09:00 - 18:00 IST, Monday to Saturday" },
    { id: "escalation", title: "Escalation Rules", value: "Escalate high-risk customers and compliance questions to a human manager." },
    { id: "compliance", title: "Compliance", value: "Follow IRDA guidance and Nova Insurance disclosure rules." },
    { id: "restricted", title: "Restricted Topics", value: "Do not provide legal, medical or investment advice." },
    { id: "transfer", title: "Transfer Conditions", value: "Transfer when sentiment drops below neutral or customer requests a person." },
    { id: "approval", title: "Approval Rules", value: "Pricing exceptions require manager approval before commitment." }
  ],
  goals: [
    { id: "daily", title: "Daily Target", target: `${Math.max(60, employee.callsToday)} conversations`, progress: Math.min(100, employee.callsToday), achievement: profile?.goals[0] ?? "On track" },
    { id: "weekly", title: "Weekly Target", target: `${Math.max(24, employee.appointmentsToday * 3)} appointments`, progress: Math.min(100, employee.appointmentsToday * 12), achievement: profile?.goals[1] ?? "+8% above baseline" },
    { id: "monthly", title: "Monthly Target", target: `Rs. ${(((profile?.revenueInfluenced ?? 1800000) / 100000)).toFixed(1)}L influenced`, progress: employee.performance, achievement: "Strong" }
  ],
  skills: [
    { id: "lead", title: "Lead Qualification", level: employee.performance, trend: "+6%", lastTraining: "2 days ago" },
    { id: "sales", title: "Sales", level: Math.max(82, employee.performance - 2), trend: "+4%", lastTraining: "5 days ago" },
    { id: "support", title: "Support", level: Math.max(80, employee.health - 3), trend: "+3%", lastTraining: "1 week ago" },
    { id: "scheduling", title: "Scheduling", level: Math.min(99, employee.performance + 1), trend: "+5%", lastTraining: "3 days ago" },
    { id: "negotiation", title: "Negotiation", level: Math.max(78, employee.performance - 5), trend: "+2%", lastTraining: "9 days ago" },
    { id: "claims", title: "Claims", level: employee.department === "Claims" ? 96 : 84, trend: "+1%", lastTraining: "2 weeks ago" },
    { id: "collections", title: "Collections", level: employee.department === "Finance" ? 95 : 82, trend: "+2%", lastTraining: "10 days ago" },
    { id: "recruitment", title: "Recruitment", level: employee.department === "HR" ? 97 : 80, trend: "+1%", lastTraining: "12 days ago" }
  ],
  tools: [
    { id: "crm", name: "CRM", status: "connected", lastSync: "3 minutes ago" },
    { id: "calendar", name: "Calendar", status: "connected", lastSync: "7 minutes ago" },
    { id: "email", name: "Email", status: "connected", lastSync: "12 minutes ago" },
    { id: "webhook", name: "Webhook", status: employee.status === "paused" ? "attention" : "connected", lastSync: "21 minutes ago" },
    { id: "knowledge", name: "Knowledge Base", status: "connected", lastSync: "4 minutes ago" }
  ],
  notifications: [`${employee.currentCampaign ?? "Campaign"} progress updated`, "Knowledge freshness above target", `${employee.voice} quality check completed`],
  pinnedNotes: [profile?.personality ?? "Use approved comparison language for high-intent customers.", "Escalate high-risk compliance or sentiment issues."],
  recommendations: [
    { id: "knowledge", priority: "high", title: "Knowledge requires update", impact: "Pricing accuracy can improve active conversations.", action: "Update Pricing Guide", href: "/app/knowledge" },
    { id: "quality", priority: "medium", title: "Conversation quality improving", impact: "CSAT rose after the latest script training.", action: "Review transcript", href: "/app/conversations" },
    { id: "appointments", priority: "medium", title: "Appointments dropped", impact: "A short retraining pass can recover conversion.", action: "Retrain Employee", href: `/app/employees/${employee.id}` },
    { id: "campaign", priority: "low", title: "Campaign nearly complete", impact: "This employee is ready for another assignment.", action: "Assign new campaign", href: "/app/campaigns" }
  ]
};
};

const getPerformance = (employee: Employee): EmployeePerformance => {
  const profile = getEmployeeProfile(employee.id);
  return {
  businessContribution: {
    revenueInfluenced: `Rs. ${(profile?.revenueInfluenced ?? employee.performance * 18500).toLocaleString("en-IN")}`,
    appointmentsBooked: profile?.appointmentsBooked ?? employee.appointmentsToday * 21,
    callsCompleted: profile?.callsCompleted ?? employee.callsToday * 21,
    qualifiedLeads: Math.round(employee.callsToday * 0.42),
    customerSatisfaction: employee.csat,
    hoursSaved: Math.round((profile?.callsCompleted ?? employee.callsToday) * 0.18),
    conversionRate: Math.min(39, employee.performance - 68)
  },
  monthlyTrends: [
    { name: "Week 1", calls: employee.callsToday * 4, appointments: employee.appointmentsToday * 4, revenue: employee.performance * 4200 },
    { name: "Week 2", calls: employee.callsToday * 5, appointments: employee.appointmentsToday * 5, revenue: employee.performance * 5200 },
    { name: "Week 3", calls: employee.callsToday * 6, appointments: employee.appointmentsToday * 6, revenue: employee.performance * 6100 },
    { name: "Week 4", calls: employee.callsToday * 6, appointments: employee.appointmentsToday * 6, revenue: employee.performance * 6900 }
  ],
  leaderboardPosition: [...employees].sort((first, second) => second.performance - first.performance).findIndex((item) => item.id === employee.id) + 1
};
};

const getHealth = (employee: Employee): EmployeeHealth => ({
  overall: employee.health,
  knowledge: employee.knowledgeScore,
  voice: Math.min(100, employee.health + 1),
  performance: employee.performance,
  compliance: Math.max(90, employee.health - 1),
  tools: employee.status === "paused" ? 92 : 100,
  conversationQuality: Math.min(100, employee.performance),
  trainingStatus: employee.status === "training" ? "In training" : "Current",
  trend: employee.health >= 96 ? "+4% this month" : "+2% this month",
  history: [
    { name: "Jan", value: Math.max(80, employee.health - 8) },
    { name: "Feb", value: Math.max(82, employee.health - 6) },
    { name: "Mar", value: Math.max(84, employee.health - 4) },
    { name: "Apr", value: Math.max(86, employee.health - 2) },
    { name: "May", value: employee.health }
  ]
});

const getTimeline = (employee: Employee): EmployeeTimelineItem[] => [
  { id: "created", title: "Employee Created", description: `${employee.name} joined the ${employee.department} workforce.`, date: "Jan 12" },
  { id: "knowledge", title: "Knowledge Uploaded", description: "Core insurance documents and FAQs assigned.", date: "Jan 14" },
  { id: "training", title: "Training Completed", description: "Voice, policy and campaign training passed.", date: "Jan 18" },
  { id: "campaign", title: "Campaign Assigned", description: `${employee.currentCampaign ?? "Campaign"} became the current assignment.`, date: "Feb 02" },
  { id: "first", title: "First Conversation", description: "First customer conversation completed successfully.", date: "Feb 03" },
  { id: "appointments", title: "Appointments Generated", description: `${employee.appointmentsToday * 21} appointments booked this month.`, date: "Jun 24" },
  { id: "updated", title: "Knowledge Updated", description: "Pricing and policy materials refreshed.", date: "Jul 02" },
  { id: "improved", title: "Performance Improved", description: `Performance reached ${employee.performance}%.`, date: "Today" }
];

const getEmployeeKnowledge = (employee: Employee): EmployeeKnowledgeItem[] => {
  const profile = getEmployeeProfile(employee.id);
  const assignedKnowledge = profile?.knowledgeIds
    .map((knowledgeId) => knowledge.find((item) => item.id === knowledgeId))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? knowledge.slice(0, 4);
  return assignedKnowledge.map((item, index) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    status: item.status,
    freshness: Math.min(100, item.freshness + (index % 2)),
    version: item.version,
    lastUpdated: index < 2 ? "Today" : `${index + 1} days ago`
  }));
};

const getTraining = (employee: Employee): EmployeeTrainingItem[] => [
  { id: "current", title: `${employee.currentCampaign ?? "Campaign"} readiness`, status: "Current", date: "Today", outcome: "Ready for customer conversations" },
  { id: "voice", title: "Voice quality calibration", status: "Completed", date: "2 days ago", outcome: "Voice quality above target" },
  { id: "policy", title: "Policy compliance refresh", status: "Completed", date: "5 days ago", outcome: "Compliance rules passed" },
  { id: "upcoming", title: "Objection handling refresh", status: "Scheduled", date: "Tomorrow", outcome: "Improve conversion and retention" }
];

const getVersions = (): EmployeeVersionItem[] => [
  { id: "v1", version: "v1.0", published: "Jan 12", changes: "Initial identity, voice and responsibilities", knowledgeUpdated: "Base FAQs", performanceDifference: "Baseline" },
  { id: "v1-1", version: "v1.1", published: "Feb 18", changes: "Campaign assignment and scheduling rules", knowledgeUpdated: "Sales Script", performanceDifference: "+8%" },
  { id: "v2", version: "v2.0", published: "Apr 22", changes: "Improved objection handling", knowledgeUpdated: "Pricing Guide", performanceDifference: "+14%" },
  { id: "v2-1", version: "v2.1", published: "Jul 02", changes: "Compliance and knowledge refresh", knowledgeUpdated: "IRDA Guidelines", performanceDifference: "+4%" }
];

export const employeeService = {
  getEmployees: () => mockApi<Employee[]>(() => employees),
  getEmployee: (id: string) =>
    mockApi<Employee>(() => getEmployeeOrThrow(id)),
  getWorkspace: (id: string) => mockApi<EmployeeWorkspaceData>(() => getWorkspaceData(getEmployeeOrThrow(id))),
  getPerformance: (id: string) => mockApi<EmployeePerformance>(() => getPerformance(getEmployeeOrThrow(id))),
  getHealth: (id: string) => mockApi<EmployeeHealth>(() => getHealth(getEmployeeOrThrow(id))),
  getTimeline: (id: string) => mockApi<EmployeeTimelineItem[]>(() => getTimeline(getEmployeeOrThrow(id))),
  getKnowledge: (id: string) => mockApi<EmployeeKnowledgeItem[]>(() => {
    return getEmployeeKnowledge(getEmployeeOrThrow(id));
  }),
  getVersions: () => mockApi<EmployeeVersionItem[]>(() => getVersions()),
  getTraining: (id: string) => mockApi<EmployeeTrainingItem[]>(() => getTraining(getEmployeeOrThrow(id))),
  getConversations: (id: string) =>
    mockApi<EmployeeConversationItem[]>(() =>
      conversations
        .filter((conversation) => conversation.employeeId === id || id === "emp_sophia")
        .slice(0, 10)
        .map((conversation, index) => ({
          ...conversation,
          campaign: campaigns.find((campaign) => campaign.assignedEmployeeId === conversation.employeeId)?.name ?? "General Support",
          outcome: conversation.outcome ?? (index % 2 === 0 ? "Appointment booked" : "Follow-up scheduled"),
          knowledgeUsed: conversationRecords.find((item) => item.id === conversation.id)?.knowledgeUsed.join(", ") ?? knowledge[index % knowledge.length]?.title ?? "Customer FAQ",
          date: index === 0 ? "Today" : `${index + 1} days ago`
        }))
    ),
  hireEmployee: (employee: Employee) => mockApi<Employee>(() => employee),
  updateEmployee: (id: string, updates: Partial<Employee>) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, ...updates })),
  pauseEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "paused" })),
  resumeEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "active" })),
  archiveEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "archived" })),
  deleteEmployee: (id: string) => mockApi(() => ({ id, deleted: true }))
};
