import { mockApi } from "@/mocks/mockApi";
import { campaigns, contacts, employees, knowledge } from "@/mocks/mockData";
import type {
  Campaign,
  CampaignAnalytics,
  CampaignDashboard,
  CampaignDetail,
  CampaignHealth,
  CampaignTemplate,
  CampaignTimelineItem,
  CampaignType
} from "@/types";

const campaignTypes: CampaignType[] = [
  "Sales",
  "Lead Qualification",
  "Renewals",
  "Customer Support",
  "Claims",
  "Collections",
  "Recruitment",
  "Surveys",
  "Feedback",
  "Custom Campaign"
];

const campaignDirectory: Campaign[] = campaigns.map((campaign, index) => {
  const employee = employees.find((item) => item.id === campaign.assignedEmployeeId);
  const type = campaign.type ?? campaignTypes[index % campaignTypes.length];
  return {
    ...campaign,
    assignedEmployeeName: employee?.name,
    businessGoal:
      campaign.businessGoal ??
      (type === "Renewals" ? "Protect renewal revenue and reduce churn." : type === "Claims" ? "Resolve claim follow-ups with high customer satisfaction." : "Convert qualified customer intent into measurable business outcomes."),
    department: campaign.department ?? employee?.department ?? "Sales",
    type,
    priority: campaign.priority ?? (index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low"),
    conversionRate: Math.round((campaign.appointments / Math.max(campaign.contacts, 1)) * 100),
    health: Math.max(62, Math.min(97, 92 - index * 3 + Math.round(campaign.progress / 12))),
    launchDate: new Date(Date.now() - (index + 1) * 4 * 24 * 60 * 60 * 1000).toISOString(),
    knowledgeIds: knowledge.slice(index % 3, index % 3 + 3).map((item) => item.id)
  };
});

const dashboard: CampaignDashboard = {
  totalCampaigns: campaignDirectory.length,
  runningCampaigns: campaignDirectory.filter((campaign) => campaign.status === "running").length,
  scheduledCampaigns: 2,
  completedCampaigns: campaignDirectory.filter((campaign) => campaign.status === "completed").length,
  pausedCampaigns: 1,
  appointmentsGenerated: campaignDirectory.reduce((total, campaign) => total + campaign.appointments, 0),
  revenueInfluenced: `Rs. ${(campaignDirectory.reduce((total, campaign) => total + campaign.revenueInfluenced, 0) / 100000).toFixed(1)}L`,
  campaignSuccessRate: 78,
  recommendations: [
    {
      id: "rec_appointment_rate",
      priority: "high",
      title: "Appointment rate is below average.",
      reason: "Health Insurance Premium has strong contact quality but fewer booked meetings than similar campaigns.",
      impact: "Improving the sales script may add 22 appointments this week.",
      action: "Improve sales script",
      href: "/app/knowledge"
    },
    {
      id: "rec_calling_hours",
      priority: "medium",
      title: "Contact response rate decreasing.",
      reason: "Response dips after 17:00 across travel and renewal segments.",
      impact: "Adjusting calling hours can recover 8% response quality.",
      action: "Adjust calling hours",
      href: "/app/campaigns/create"
    },
    {
      id: "rec_pricing",
      priority: "critical",
      title: "Knowledge outdated.",
      reason: "Premium Pricing Guide is used by four active campaigns and requires review.",
      impact: "Quote accuracy and compliance may be affected.",
      action: "Update Pricing Guide",
      href: "/app/knowledge"
    },
    {
      id: "rec_duplicate",
      priority: "low",
      title: "High-performing campaign detected.",
      reason: "Motor Insurance Renewal Q3 is converting 18% above baseline.",
      impact: "Duplicating the campaign can expand a proven playbook.",
      action: "Duplicate campaign",
      href: "/app/campaigns"
    }
  ],
  activity: [
    { id: "created", title: "Campaign Created", description: "Health Insurance Premium moved through review.", date: "Today", href: "/app/campaigns/camp_health_insurance_premium" },
    { id: "knowledge", title: "Knowledge Assigned", description: "Sales Script and Health Insurance Handbook attached.", date: "Today", href: "/app/knowledge" },
    { id: "employee", title: "Employee Assigned", description: "Liam is scheduled for launch readiness.", date: "Yesterday", href: "/app/employees/emp_liam" },
    { id: "started", title: "Campaign Started", description: "Motor Insurance Renewal Q3 continued with 680 assigned contacts.", date: "Jul 1", href: "/app/campaigns/camp_motor_renewal_q3" },
    { id: "appointments", title: "Appointments Generated", description: "216 appointments created across active campaigns.", date: "This week", href: "/app/analytics" },
    { id: "completed", title: "Campaign Completed", description: "High Value Customer Review closed above target.", date: "Jun 28", href: "/app/campaigns/history" }
  ]
};

const templates: CampaignTemplate[] = [
  ["tpl_sales", "Sales Outreach", "Sales", "Convert warm leads into appointments and policy purchases.", "Sales Executive", "10 business days", "Qualified appointments and influenced revenue"],
  ["tpl_renewal", "Policy Renewal", "Renewals", "Retain customers whose policies renew in the next 30 days.", "Renewal Specialist", "7 business days", "Protected renewal premium"],
  ["tpl_claims", "Claims Follow-up", "Claims", "Proactively update customers on claim status and required documents.", "Claims Coordinator", "5 business days", "Higher satisfaction and fewer support escalations"],
  ["tpl_qualification", "Lead Qualification", "Lead Qualification", "Score new prospects and route high-intent customers.", "Lead Qualification", "8 business days", "Prioritized lead pipeline"],
  ["tpl_satisfaction", "Customer Satisfaction", "Customer Support", "Collect feedback after service or policy purchase.", "Customer Care", "4 business days", "CSAT and retention insights"],
  ["tpl_recruitment", "Recruitment", "Recruitment", "Screen candidate interest and schedule interviews.", "HR Recruiter", "12 business days", "Interview-ready candidates"],
  ["tpl_collections", "Collections", "Collections", "Recover overdue premiums with compliant customer reminders.", "Finance Coordinator", "10 business days", "Recovered premium and lower delinquency"]
].map(([id, name, type, description, recommendedEmployeeRole, estimatedDuration, expectedOutcome]) => ({
  id: String(id),
  name: String(name),
  type: type as CampaignType,
  description: String(description),
  recommendedEmployeeRole: String(recommendedEmployeeRole),
  estimatedDuration: String(estimatedDuration),
  expectedOutcome: String(expectedOutcome)
}));

function timeline(campaign: Campaign): CampaignTimelineItem[] {
  return [
    { id: `${campaign.id}_created`, title: "Campaign Created", description: `${campaign.name} was created with ${campaign.businessGoal}.`, date: "Jun 24" },
    { id: `${campaign.id}_knowledge`, title: "Knowledge Assigned", description: "Relevant scripts, FAQs, policies and documents were attached.", date: "Jun 25", href: "/app/knowledge" },
    { id: `${campaign.id}_employee`, title: "Employee Assigned", description: `${campaign.assignedEmployeeName ?? "AI Employee"} became the campaign owner.`, date: "Jun 26", href: `/app/employees/${campaign.assignedEmployeeId}` },
    { id: `${campaign.id}_started`, title: "Campaign Started", description: "Calling strategy, schedule and contact audience became active.", date: "Jul 1" },
    { id: `${campaign.id}_appointments`, title: "Appointments Generated", description: `${campaign.appointments} appointments generated so far.`, date: "Jul 3", href: "/app/analytics" },
    { id: `${campaign.id}_completed`, title: "Campaign Completed", description: campaign.status === "completed" ? "Campaign completed and moved into history." : "Completion milestone is tracked against current progress.", date: "Planned" }
  ];
}

function getCampaignHealth(campaign: Campaign): CampaignHealth {
  const overall = campaign.health ?? 82;
  return {
    overallScore: overall,
    knowledgeQuality: Math.min(98, overall + 4),
    employeeHealth: Math.min(99, overall + 2),
    contactQuality: Math.max(58, overall - 6),
    conversionRate: campaign.conversionRate ?? 18,
    completionProgress: campaign.progress
  };
}

function getCampaignAnalytics(campaign: Campaign): CampaignAnalytics {
  return {
    callsOverTime: ["Mon", "Tue", "Wed", "Thu", "Fri"].map((name, index) => ({
      name,
      calls: 80 + index * 24 + Math.round(campaign.progress / 3),
      appointments: 8 + index * 3 + Math.round(campaign.appointments / 18),
      revenue: 120000 + index * 45000
    })),
    funnel: [
      { name: "Assigned", value: campaign.contacts },
      { name: "Reached", value: Math.round(campaign.contacts * 0.72) },
      { name: "Interested", value: Math.round(campaign.contacts * 0.34) },
      { name: "Appointments", value: campaign.appointments },
      { name: "Converted", value: Math.round(campaign.appointments * 0.42) }
    ],
    sentiment: [
      { name: "Positive", value: 52 },
      { name: "Neutral", value: 31 },
      { name: "Satisfied", value: 12 },
      { name: "Negative", value: 5 }
    ],
    liveMetrics: {
      callsToday: 186,
      callsCompleted: 142,
      appointments: campaign.appointments,
      interestedCustomers: 74,
      notInterested: 39,
      followUpRequired: 58,
      voicemail: 22,
      failedCalls: 8
    },
    performance: {
      averageDuration: "04:18",
      pendingCalls: Math.max(0, campaign.contacts - Math.round((campaign.contacts * campaign.progress) / 100)),
      completedCalls: Math.round((campaign.contacts * campaign.progress) / 100),
      callsInProgress: campaign.status === "running" ? 18 : 0,
      failedCalls: 8,
      currentQueue: 44,
      customerSatisfaction: 93
    }
  };
}

function buildCampaignDetail(campaign: Campaign): CampaignDetail {
  return {
    ...campaign,
    description: `${campaign.name} assigns a measurable business objective to ${campaign.assignedEmployeeName ?? "the AI Workforce"}.`,
    objective: campaign.businessGoal ?? "Create measurable customer engagement outcomes.",
    targetAudience: `${campaign.contacts.toLocaleString("en-IN")} contacts from saved lists, segments and manual selection.`,
    timeline: timeline(campaign),
    contactsAssigned: contacts.slice(0, 8).map((contact, index) => ({
      id: `${campaign.id}_${contact.id}`,
      contactId: contact.id,
      fullName: contact.fullName,
      company: contact.company,
      status: contact.status,
      lastContact: new Date(Date.now() - (index + 1) * 9 * 60 * 60 * 1000).toISOString(),
      outcome: index % 3 === 0 ? "Appointment booked" : index % 3 === 1 ? "Follow-up required" : "Qualified response",
      nextAction: index % 2 === 0 ? "Send policy comparison" : "Schedule second call"
    })),
    knowledgeAssigned: knowledge.slice(0, 5).map((item, index) => ({
      id: `${campaign.id}_${item.id}`,
      knowledgeId: item.id,
      title: item.title,
      type: item.type,
      usage: 72 + index * 4,
      performance: 84 + index * 2,
      freshness: item.freshness,
      recommendation: item.status === "needs-review" ? "Update before scale-up." : "Approved for current calls."
    })),
    callingStrategy: {
      businessHours: "09:30-18:30 IST",
      retryRules: "Retry unanswered contacts twice across separate business days.",
      callAttempts: 3,
      escalationRules: "Escalate negative sentiment and premium objections to manager review.",
      followUpDelay: "24 hours"
    },
    schedule: {
      mode: campaign.status === "scheduled" ? "Future Date" : "Launch Now",
      businessCalendar: "India business calendar",
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  };
}

export const campaignService = {
  getCampaigns: () => mockApi<Campaign[]>(() => campaignDirectory),
  getCampaign: (id: string) =>
    mockApi<CampaignDetail>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return buildCampaignDetail(campaign);
    }),
  getDashboard: () => mockApi<CampaignDashboard>(() => dashboard),
  getCampaignAnalytics: (id: string) =>
    mockApi<CampaignAnalytics>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return getCampaignAnalytics(campaign);
    }),
  getCampaignHealth: (id: string) =>
    mockApi<CampaignHealth>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return getCampaignHealth(campaign);
    }),
  getTemplates: () => mockApi<CampaignTemplate[]>(() => templates),
  getHistory: () => mockApi<Campaign[]>(() => campaignDirectory.filter((campaign) => campaign.status === "completed" || campaign.status === "archived")),
  createCampaign: (campaign: Campaign) => mockApi<Campaign>(() => campaign),
  updateCampaign: (id: string, updates: Partial<Campaign>) =>
    mockApi<Campaign>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return { ...campaign, ...updates };
    }),
  pauseCampaign: (id: string) =>
    mockApi<Campaign>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return { ...campaign, status: "paused" };
    }),
  resumeCampaign: (id: string) =>
    mockApi<Campaign>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return { ...campaign, status: "running" };
    }),
  deleteCampaign: (id: string) => mockApi<{ id: string; deleted: true }>(() => ({ id, deleted: true })),
  duplicateCampaign: (id: string) =>
    mockApi<Campaign>(() => {
      const campaign = campaignDirectory.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return {
        ...campaign,
        id: `${campaign.id}_copy`,
        name: `${campaign.name} Copy`,
        status: "draft",
        progress: 0,
        appointments: 0,
        revenueInfluenced: 0
      };
    })
};
