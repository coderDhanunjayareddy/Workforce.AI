import { mockApi } from "@/mocks/mockApi";
import { contacts, conversationRecords, conversations, employees, knowledge } from "@/mocks/mockData";
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

const baseLiveCalls: Conversation[] = conversations;

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
    { id: "notif_renewal", title: "Emma resolved customer query.", description: "Health policy clarification closed with no escalation required.", time: "7m ago", href: "/app/conversations/conv_2" }
  ],
  recommendations: [
    { id: "rec_intent", priority: "high", title: "Customer showing strong buying intent.", action: "Offer Premium Plan", reason: "Positive sentiment and premium questions indicate readiness.", href: "/app/conversations/conv_1" },
    { id: "rec_negative", priority: "critical", title: "Negative sentiment increasing.", action: "Escalate conversation", reason: "Support conversation includes repeated objection signals.", href: "/app/conversations/conv_10" },
    { id: "rec_docs", priority: "medium", title: "Customer requested documentation.", action: "Send brochure", reason: "Pricing and coverage documents were requested.", href: "/app/knowledge" }
  ]
};

function transcript(conversation: Conversation): TranscriptLine[] {
  return conversationRecords.find((item) => item.id === conversation.id)?.transcript ?? [];
}

function insight(conversation: Conversation): ConversationInsight {
  return {
    customerSentiment: conversation.sentiment,
    confidence: conversation.confidence ?? 94,
    buyingIntent: conversation.buyingIntent ?? "High",
    riskLevel: conversation.riskLevel ?? "Low",
    knowledgeUsed: conversationRecords.find((item) => item.id === conversation.id)?.knowledgeUsed ?? ["Customer FAQ"],
    currentObjective: "Book Appointment",
    recommendedAction: conversation.riskLevel === "High" ? "Escalate conversation" : "Offer Premium Plan"
  };
}

function summary(conversation: Conversation): ConversationSummary {
  const record = conversationRecords.find((item) => item.id === conversation.id);
  return {
    topicsDiscussed: [conversation.goal, "Coverage", "Premium", "Appointment timing"],
    products: ["Comprehensive Plan", "Premium Plan"],
    objections: conversation.sentiment === "negative" ? ["Pricing concern", "Claim delay"] : ["Needs comparison"],
    questions: ["Premium amount", "Coverage benefits", "Documents required"],
    commitments: record?.appointment === "Not scheduled" ? ["Send follow-up note", "Monitor response"] : ["Send brochure", "Schedule appointment"],
    appointmentStatus: record?.appointment === "Not scheduled" ? "Not scheduled" : "Scheduled"
  };
}

function postCall(conversation: Conversation): PostCallSummary {
  const record = conversationRecords.find((item) => item.id === conversation.id);
  return {
    customerIntent: conversation.buyingIntent ?? "High",
    summary: record?.summary ?? `${conversation.customerName} discussed ${conversation.goal.toLowerCase()} and showed ${conversation.buyingIntent ?? "High"} intent.`,
    productsDiscussed: ["Premium Plan", "Comprehensive Plan"],
    outcome: conversation.outcome ?? "Follow-up needed",
    appointment: record?.appointment === "Not scheduled" ? "Not scheduled" : "Scheduled",
    followUpNeeded: record?.followUp ?? "Send brochure and confirm appointment slot.",
    suggestedNextSteps: record?.appointment === "Not scheduled" ? ["Send status note", "Monitor customer sentiment", "Update conversation outcome"] : ["Send policy comparison", "Confirm appointment", "Update campaign outcome"],
    knowledgeUsed: record?.knowledgeUsed ?? ["Customer FAQ"],
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
  const record = conversationRecords.find((item) => item.id === conversation.id);
  const contact = contacts.find((item) => item.id === conversation.contactId) ?? contacts[0];
  const usedKnowledge = record?.knowledgeUsed ?? knowledge.slice(0, 3).map((item) => item.title);
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
      knowledgeReferenced: usedKnowledge.join(", "),
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
      previousCalls: Math.max(1, conversationRecords.filter((item) => item.contactId === contact.id).length),
      assignedCampaign: conversation.campaignName ?? "Motor Insurance Renewal Q3",
      lastConversation: "Jun 28",
      lifetimeValue: `Rs. ${Math.max(1.2, (contact.leadScore / 18)).toFixed(1)}L`
    },
    summary: summary(conversation),
    postCallSummary: postCall(conversation),
    sentimentTimeline: sentimentTimeline(conversation)
  };
}

const queue: ConversationQueueItem[] = [
  ["queue_1", "Meera Iyer", "high", "01:20", "emp_liam", "Liam", "Health Insurance Premium"],
  ["queue_2", "Farah Khan", "medium", "02:45", "emp_mia", "Mia", "Corporate Health Plans"],
  ["queue_3", "Harish Gupta", "critical", "00:54", "emp_henry", "Henry", "Corporate Health Plans"],
  ["queue_4", "Rina Fernandes", "medium", "03:10", "emp_lucas", "Lucas", "Travel Insurance Leads"]
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
