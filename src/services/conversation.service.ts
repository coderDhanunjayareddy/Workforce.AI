import { mockApi } from "@/mocks/mockApi";
import { campaigns, contacts, conversations, employees, knowledge } from "@/mocks/mockData";
import type {
  Conversation,
  ConversationDetail,
  ConversationInsight,
  ConversationQueueItem,
  ConversationSummary,
  LiveEmployeeStatus,
  LiveOperationsDashboard,
  PostCallSummary,
  SentimentPoint,
  TranscriptLine
} from "@/types";

const additionalLiveCalls = [
  ["emp_sophia", "Nisha Menon", "Motor Insurance", "02:34", "positive", "live"],
  ["emp_emma", "Pooja Nair", "Policy Renewal", "05:02", "satisfied", "live"],
  ["emp_david", "Karthik Shah", "Claim Support", "01:18", "neutral", "on-hold"],
  ["emp_liam", "Ishita Das", "Health Insurance", "04:46", "positive", "live"],
  ["emp_noah", "Arvind Singh", "Invoice Follow-up", "03:22", "neutral", "queued"],
  ["emp_ava", "Vikram Reddy", "General Support", "06:08", "negative", "escalated"]
] as const;

const baseLiveCalls: Conversation[] = [
  ...conversations.map((conversation) => [
    conversation.employeeId,
    conversation.customerName,
    conversation.goal,
    conversation.duration,
    conversation.sentiment,
    conversation.status
  ] as const),
  ...additionalLiveCalls
].map(([employeeId, customerName, goal, duration, sentiment, status], index) => {
  const employee = employees.find((item) => item.id === employeeId);
  const campaign = campaigns[index % campaigns.length];
  const contact = contacts.find((item) => item.fullName === customerName) ?? contacts[index % contacts.length];
  return {
    id: index < conversations.length ? `conv_${index + 1}` : `conv_live_${index + 1}`,
    employeeId: String(employeeId),
    employeeName: employee?.name,
    department: employee?.department,
    campaignId: campaign?.id,
    campaignName: campaign?.name ?? String(goal),
    contactId: contact?.id,
    customerName: String(customerName),
    customerPhone: contact?.phone ?? `+91 98765 12${String(index + 40).padStart(3, "0")}`,
    goal: String(goal),
    duration: String(duration),
    sentiment: sentiment as Conversation["sentiment"],
    status: status as Conversation["status"],
    outcome: index % 3 === 0 ? "Appointment likely" : index % 3 === 1 ? "Follow-up needed" : "Question answered",
    health: Math.max(74, 96 - index * 2),
    currentStage: ["Greeting", "Identity Verification", "Need Discovery", "Recommendation", "Objection Handling", "Appointment", "Closing"][index % 7],
    buyingIntent: index % 3 === 0 ? "High" : index % 3 === 1 ? "Medium" : "Low",
    riskLevel: index === 9 ? "High" : index % 4 === 0 ? "Medium" : "Low",
    confidence: Math.max(78, 94 - index)
  };
});

const dashboard: LiveOperationsDashboard = {
  activeCalls: 8,
  waitingQueue: 14,
  completedToday: 1842,
  averageDuration: "4m 28s",
  currentCsat: 94,
  appointmentsToday: 216,
  utilization: {
    employeesBusy: 12,
    employeesIdle: 6,
    averageWait: "01:42",
    queueLength: 14,
    callsPerHour: [
      { name: "09:00", calls: 84 },
      { name: "10:00", calls: 116 },
      { name: "11:00", calls: 132 },
      { name: "12:00", calls: 148 },
      { name: "13:00", calls: 126 },
      { name: "14:00", calls: 156 }
    ]
  },
  notifications: [
    { id: "notif_appointment", title: "Sophia booked appointment.", description: "Rajesh Kumar accepted a motor insurance review slot.", time: "Now", href: "/app/conversations/conv_1" },
    { id: "notif_callback", title: "Customer requested callback.", description: "Anjali Rao prefers renewal follow-up tomorrow.", time: "2m ago", href: "/app/conversations/conv_2" },
    { id: "notif_escalated", title: "David escalated conversation.", description: "Claim support sentiment requires manager review.", time: "4m ago", href: "/app/conversations/conv_3" },
    { id: "notif_renewal", title: "Emma completed renewal.", description: "Policy Renewal Drive reached a positive outcome.", time: "7m ago", href: "/app/campaigns" }
  ],
  recommendations: [
    { id: "rec_intent", priority: "high", title: "Customer showing strong buying intent.", action: "Offer Premium Plan", reason: "Positive sentiment and premium questions indicate readiness.", href: "/app/conversations/conv_1" },
    { id: "rec_negative", priority: "critical", title: "Negative sentiment increasing.", action: "Escalate conversation", reason: "Support conversation includes repeated objection signals.", href: "/app/conversations/conv_live_10" },
    { id: "rec_docs", priority: "medium", title: "Customer requested documentation.", action: "Send brochure", reason: "Pricing and coverage documents were requested.", href: "/app/knowledge" }
  ]
};

function transcript(conversation: Conversation): TranscriptLine[] {
  const employeeName = conversation.employeeName ?? "AI Employee";
  return [
    { id: `${conversation.id}_t1`, speaker: employeeName, role: "employee", text: `Good morning ${conversation.customerName}. I hope you are doing well today.`, timestamp: "00:08" },
    { id: `${conversation.id}_t2`, speaker: "Customer", role: "customer", text: "Yes. How can I help you?", timestamp: "00:18" },
    { id: `${conversation.id}_t3`, speaker: employeeName, role: "employee", text: `I am calling regarding ${conversation.goal.toLowerCase()} and the options available for your business.`, timestamp: "00:36" },
    { id: `${conversation.id}_t4`, speaker: "Customer", role: "customer", text: "I am interested. Can you explain the premium and coverage?", timestamp: "01:04" },
    { id: `${conversation.id}_t5`, speaker: employeeName, role: "employee", text: "Based on your profile, the premium plan offers stronger coverage and a faster claim path.", timestamp: "01:31" },
    { id: `${conversation.id}_t6`, speaker: "Customer", role: "customer", text: "That sounds useful. Can we schedule a detailed review?", timestamp: "02:12" }
  ];
}

function insight(conversation: Conversation): ConversationInsight {
  return {
    customerSentiment: conversation.sentiment,
    confidence: conversation.confidence ?? 94,
    buyingIntent: conversation.buyingIntent ?? "High",
    riskLevel: conversation.riskLevel ?? "Low",
    knowledgeUsed: ["Pricing Guide v3", "Policy Handbook", "Sales Script"],
    currentObjective: "Book Appointment",
    recommendedAction: conversation.riskLevel === "High" ? "Escalate conversation" : "Offer Premium Plan"
  };
}

function summary(conversation: Conversation): ConversationSummary {
  return {
    topicsDiscussed: [conversation.goal, "Coverage", "Premium", "Appointment timing"],
    products: ["Comprehensive Plan", "Premium Plan"],
    objections: conversation.sentiment === "negative" ? ["Pricing concern", "Claim delay"] : ["Needs comparison"],
    questions: ["Premium amount", "Coverage benefits", "Documents required"],
    commitments: ["Send brochure", "Schedule appointment"],
    appointmentStatus: conversation.outcome ?? "Appointment likely"
  };
}

function postCall(conversation: Conversation): PostCallSummary {
  return {
    customerIntent: conversation.buyingIntent ?? "High",
    summary: `${conversation.customerName} discussed ${conversation.goal.toLowerCase()} and showed ${conversation.buyingIntent ?? "High"} intent.`,
    productsDiscussed: ["Premium Plan", "Comprehensive Plan"],
    outcome: conversation.outcome ?? "Follow-up needed",
    appointment: conversation.buyingIntent === "High" ? "Scheduled" : "Pending",
    followUpNeeded: "Send brochure and confirm appointment slot.",
    suggestedNextSteps: ["Send policy comparison", "Confirm appointment", "Update campaign outcome"],
    knowledgeUsed: ["Pricing Guide v3", "Policy Handbook"],
    employeePerformance: `${conversation.employeeName ?? "AI Employee"} maintained clear business context and strong compliance language.`
  };
}

function sentimentTimeline(conversation: Conversation): SentimentPoint[] {
  const positiveBase = conversation.sentiment === "positive" || conversation.sentiment === "satisfied" ? 70 : 44;
  return ["Greeting", "Verification", "Discovery", "Recommendation", "Objection", "Appointment"].map((name, index) => ({
    name,
    positive: Math.min(94, positiveBase + index * 4),
    neutral: Math.max(8, 34 - index * 3),
    negative: conversation.sentiment === "negative" ? 18 + index : Math.max(2, 9 - index)
  }));
}

function detail(conversation: Conversation): ConversationDetail {
  const contact = contacts.find((item) => item.id === conversation.contactId) ?? contacts[0];
  const usedKnowledge = knowledge.slice(0, 3);
  return {
    ...conversation,
    overview: `${conversation.employeeName ?? "AI Employee"} is handling ${conversation.customerName} for ${conversation.goal}.`,
    transcript: transcript(conversation),
    timeline: ["Greeting", "Identity Verification", "Need Discovery", "Recommendation", "Objection Handling", "Appointment", "Closing"].map((title, index) => ({
      id: `${conversation.id}_stage_${index}`,
      title,
      description: title === conversation.currentStage ? "Current stage highlighted for operations review." : "Completed conversation checkpoint.",
      date: `${index + 1}m`
    })),
    insights: insight(conversation),
    decision: {
      whyAsked: "The customer asked about premium value, so the next question confirms budget and timeline.",
      knowledgeReferenced: usedKnowledge.map((item) => item.title).join(", "),
      customerIntent: `${conversation.buyingIntent ?? "High"} buying intent with ${conversation.sentiment} sentiment.`,
      confidence: conversation.confidence ?? 94,
      nextRecommendedAction: conversation.riskLevel === "High" ? "Escalate conversation" : "Offer Premium Plan"
    },
    customerProfile: {
      contactId: contact.id,
      customerName: conversation.customerName,
      company: contact.company,
      existingPolicies: ["Motor Insurance", "Health Insurance"],
      leadScore: contact.leadScore,
      previousCalls: 4,
      assignedCampaign: conversation.campaignName ?? "Motor Insurance Q3",
      lastConversation: "Jun 28",
      lifetimeValue: "Rs. 4.8L"
    },
    summary: summary(conversation),
    postCallSummary: postCall(conversation),
    sentimentTimeline: sentimentTimeline(conversation)
  };
}

const queue: ConversationQueueItem[] = [
  ["queue_1", "Meera Iyer", "high", "01:20", "emp_liam", "Liam", "Health Insurance Premium"],
  ["queue_2", "Farah Khan", "medium", "02:45", "emp_mia", "Mia", "Life Insurance Expansion"],
  ["queue_3", "Harish Gupta", "critical", "00:54", "emp_henry", "Henry", "Commercial Insurance"],
  ["queue_4", "Rina Fernandes", "medium", "03:10", "emp_lucas", "Lucas", "Travel Insurance"]
].map(([id, customerName, priority, estimatedWait, assignedEmployeeId, assignedEmployeeName, campaignName]) => ({
  id: String(id),
  customerName: String(customerName),
  priority: priority as ConversationQueueItem["priority"],
  estimatedWait: String(estimatedWait),
  assignedEmployeeId: String(assignedEmployeeId),
  assignedEmployeeName: String(assignedEmployeeName),
  campaignName: String(campaignName)
}));

const liveEmployees: LiveEmployeeStatus[] = employees.slice(0, 8).map((employee, index) => ({
  id: `live_emp_${employee.id}`,
  employeeId: employee.id,
  employeeName: employee.name,
  department: employee.department,
  campaign: employee.currentCampaign ?? "Available",
  status: index < 5 ? "Talking" : index === 5 ? "On Hold" : index === 6 ? "Idle" : "Ready",
  currentCustomer: baseLiveCalls[index]?.customerName ?? "Ready for next customer",
  duration: baseLiveCalls[index]?.duration ?? "00:00",
  health: employee.health,
  conversationId: baseLiveCalls[index]?.id
}));

export const conversationService = {
  getDashboard: () => mockApi<LiveOperationsDashboard>(() => dashboard),
  getLiveCalls: () => mockApi<Conversation[]>(() => baseLiveCalls.filter((item) => item.status === "live" || item.status === "on-hold" || item.status === "escalated")),
  getLiveEmployees: () => mockApi<LiveEmployeeStatus[]>(() => liveEmployees),
  getConversation: (id: string) =>
    mockApi<ConversationDetail>(() => {
      const conversation = baseLiveCalls.find((item) => item.id === id);
      if (!conversation) throw new Error("Conversation was not found.");
      return detail(conversation);
    }),
  getTranscript: (id: string) =>
    mockApi<TranscriptLine[]>(() => {
      const conversation = baseLiveCalls.find((item) => item.id === id);
      if (!conversation) throw new Error("Transcript Error");
      return transcript(conversation);
    }),
  getSentiment: (id: string) =>
    mockApi<SentimentPoint[]>(() => {
      const conversation = baseLiveCalls.find((item) => item.id === id);
      if (!conversation) throw new Error("Connection Lost");
      return sentimentTimeline(conversation);
    }),
  getSummary: (id: string) =>
    mockApi<PostCallSummary>(() => {
      const conversation = baseLiveCalls.find((item) => item.id === id);
      if (!conversation) throw new Error("Conversation was not found.");
      return postCall(conversation);
    }),
  getQueue: () => mockApi<ConversationQueueItem[]>(() => queue)
};
