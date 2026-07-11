import { mockApi } from "@/mocks/mockApi";
import { campaigns, contacts, employees } from "@/mocks/mockData";
import type {
  Contact,
  ContactDashboard,
  ContactDetail,
  ContactImportResult,
  ContactSegment,
  ContactTimelineItem,
  LeadScoreCategory,
  LeadScoreSummary
} from "@/types";

const tags = ["high-value", "renewal", "family-plan", "fleet", "priority", "support-case", "warm-lead"];

const contactDirectory: Contact[] = contacts.map((contact, index) => {
  const employee = employees.find((item) => item.id === contact.assignedEmployeeId);
  const campaign = campaigns[index % campaigns.length];
  return {
    ...contact,
    assignedEmployeeName: employee?.name,
    currentCampaign: contact.currentCampaign ?? campaign?.name,
    recentActivity: contact.recentActivity ?? (index % 2 === 0 ? "Voice conversation completed" : "Renewal reminder sent"),
    tags: contact.tags ?? [tags[index % tags.length], tags[(index + 1) % tags.length]],
    policyType: contact.policyType ?? "Motor Insurance",
    industry: contact.industry ?? "Insurance",
    city: contact.city ?? "Hyderabad",
    state: contact.state ?? "Telangana",
    country: contact.country ?? "India",
    lastContact: contact.lastContact ?? new Date(Date.now() - (index + 2) * 12 * 60 * 60 * 1000).toISOString(),
    policyNumber: contact.policyNumber ?? `NOVA-${2026}${String(index + 1).padStart(4, "0")}`
  };
});

const segments: ContactSegment[] = [
  ["seg_motor", "Motor Insurance", "Fleet owners and personal vehicle buyers ready for outreach.", 580, "Motor Insurance", "emp_sophia", 28, 91],
  ["seg_health", "Health Insurance", "Families and small businesses comparing health coverage.", 430, "Health Insurance", "emp_liam", 24, 88],
  ["seg_travel", "Travel Insurance", "Frequent travelers and agencies with active trips.", 260, "Travel Insurance", "emp_lucas", 21, 83],
  ["seg_life", "Life Insurance", "Long-term protection prospects with high planning intent.", 390, "Life Insurance", "emp_mia", 31, 90],
  ["seg_high_value", "High Value Customers", "Customers with premium potential above Rs. 75,000.", 210, "Mixed", "emp_harper", 38, 94],
  ["seg_renewals", "Renewals Due", "Policies expiring in the next 30 days.", 310, "Mixed", "emp_emma", 34, 87],
  ["seg_cold", "Cold Leads", "Low engagement contacts needing nurture campaigns.", 180, "Mixed", "emp_james", 9, 62],
  ["seg_qualified", "Qualified Leads", "High-intent prospects ready for appointment setting.", 640, "Mixed", "emp_sophia", 36, 92],
  ["seg_support", "Support Cases", "Contacts with recent claims, complaints or service requests.", 145, "Mixed", "emp_david", 18, 74]
].map(([id, name, description, count, policyType, ownerEmployeeId, conversionRate, health], index) => ({
  id: String(id),
  name: String(name),
  description: String(description),
  contacts: Number(count),
  policyType: String(policyType),
  ownerEmployeeId: String(ownerEmployeeId),
  conversionRate: Number(conversionRate),
  health: Number(health),
  lastUpdated: new Date(Date.now() - (index + 1) * 7 * 60 * 60 * 1000).toISOString(),
  filters: index % 2 === 0 ? ["Lead Score", "Policy Type", "Location"] : ["Status", "Campaign", "Last Contact Date"]
}));

function getLeadCategory(score: number): LeadScoreCategory {
  if (score >= 85) return "Qualified";
  if (score >= 70) return "Hot";
  if (score >= 50) return "Warm";
  return "Cold";
}

function buildLeadScoring(contact: Contact, index: number): LeadScoreSummary {
  return {
    contactId: contact.id,
    score: contact.leadScore,
    category: getLeadCategory(contact.leadScore),
    trend: index % 4 === 0 ? "down" : index % 3 === 0 ? "stable" : "up",
    reason:
      contact.status === "renewal-due"
        ? "Renewal date is close and recent response quality is strong."
        : contact.leadScore > 80
          ? "High engagement, policy fit and recent appointment intent."
          : "Engagement is developing but needs one more qualifying conversation."
  };
}

function timeline(contact: Contact): ContactTimelineItem[] {
  const campaignHref = "/app/campaigns";
  const conversationHref = "/app/conversations";
  return [
    {
      id: `${contact.id}_created`,
      type: "created",
      title: "Created",
      description: `${contact.fullName} was added to Nova Insurance customer intelligence.`,
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `${contact.id}_imported`,
      type: "imported",
      title: "Imported",
      description: `Imported from ${contact.policyType ?? "insurance"} customer data with mapped phone, email and company fields.`,
      date: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `${contact.id}_assigned`,
      type: "assigned",
      title: "Assigned Employee",
      description: `${contact.assignedEmployeeName ?? "AI Employee"} took ownership for follow-up.`,
      date: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `${contact.id}_campaign`,
      type: "campaign",
      title: "Campaign Started",
      description: `${contact.currentCampaign ?? "Insurance outreach"} began with personalized qualification steps.`,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      href: campaignHref
    },
    {
      id: `${contact.id}_conversation`,
      type: "conversation",
      title: "Conversation",
      description: "Customer questions were answered using approved knowledge and policy details.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      href: conversationHref
    },
    {
      id: `${contact.id}_appointment`,
      type: "appointment",
      title: "Appointment",
      description: "Advisor appointment scheduled for premium comparison and documentation.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `${contact.id}_policy`,
      type: "policy",
      title: "Policy Purchased",
      description: `${contact.policyType ?? "Insurance"} policy moved into active customer lifecycle.`,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `${contact.id}_renewal`,
      type: "renewal",
      title: "Renewal",
      description: contact.status === "renewal-due" ? "Renewal decision due this week." : "Renewal date tracked for future engagement.",
      date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString()
    }
  ];
}

function buildContactDetail(contact: Contact, index: number): ContactDetail {
  const [firstName = contact.fullName, ...lastNameParts] = contact.fullName.split(" ");
  const contactTimeline = timeline(contact);

  return {
    ...contact,
    firstName,
    lastName: lastNameParts.join(" ") || firstName,
    language: index % 3 === 0 ? "Hindi" : index % 3 === 1 ? "English" : "Telugu",
    leadSource: index % 2 === 0 ? "Campaign Import" : "Manual Entry",
    notes: `${contact.fullName} prefers concise follow-ups and policy comparisons before appointments.`,
    leadScoring: buildLeadScoring(contact, index),
    communicationHistory: contactTimeline.filter((item) => ["conversation", "email", "appointment", "feedback"].includes(item.type)),
    campaignHistory: contactTimeline.filter((item) => item.type === "campaign"),
    timeline: contactTimeline,
    appointments: [
      {
        id: `${contact.id}_appt_1`,
        title: "Policy consultation",
        date: new Date(Date.now() + (index + 1) * 9 * 60 * 60 * 1000).toISOString(),
        ownerEmployeeId: contact.assignedEmployeeId,
        outcome: "Scheduled"
      }
    ],
    policiesPurchased: [
      {
        id: `${contact.id}_policy_1`,
        type: contact.policyType ?? "Motor Insurance",
        policyNumber: contact.policyNumber ?? `NOVA-${2026}${String(index + 1).padStart(4, "0")}`,
        premium: `Rs. ${(42000 + index * 3500).toLocaleString("en-IN")}`,
        renewalDate: new Date(Date.now() + (30 + index) * 24 * 60 * 60 * 1000).toISOString(),
        status: contact.status === "renewal-due" ? "renewal-due" : "active"
      }
    ]
  };
}

const dashboard: ContactDashboard = {
  totalContacts: contactDirectory.length,
  qualifiedLeads: contactDirectory.filter((contact) => contact.status === "qualified").length,
  activeCustomers: contactDirectory.filter((contact) => contact.status === "customer").length,
  renewalsDue: contactDirectory.filter((contact) => contact.status === "renewal-due").length,
  pendingFollowUps: contactDirectory.filter((contact) => contact.recentActivity?.includes("Follow-up")).length,
  appointmentsToday: 216,
  recentlyAdded: 185,
  campaignCoverage: 84,
  activeConversations: 72,
  appointmentsScheduled: 216,
  recommendations: [
    {
      id: "rec_follow_up",
      priority: "high",
      title: "120 contacts require follow-up.",
      reason: "Several high-intent customers have not been reached after the latest campaign response.",
      impact: "Recover up to Rs. 18L in pipeline before lead quality cools.",
      action: "Launch Campaign",
      href: "/app/campaigns"
    },
    {
      id: "rec_renewals",
      priority: "critical",
      title: "45 renewals due this week.",
      reason: "Renewal customers show high response rates when contacted by Emma.",
      impact: "Protect active premium revenue and reduce churn risk.",
      action: "Assign Emma",
      href: "/app/employees/emp_emma"
    },
    {
      id: "rec_quality",
      priority: "medium",
      title: "Lead quality decreasing.",
      reason: "Cold lead segment grew 12% while qualification outcomes dipped.",
      impact: "Review qualification workflow before scaling the next import.",
      action: "Review qualification workflow",
      href: "/app/contacts/segments"
    }
  ],
  insights: [
    { id: "lead_quality", label: "Lead Quality", value: "78%", trend: "+6%", description: "Weighted by score, intent and recency." },
    { id: "response_rate", label: "Response Rate", value: "42%", trend: "+4%", description: "Across active outreach campaigns." },
    { id: "appointment_rate", label: "Appointment Rate", value: "18%", trend: "+3%", description: "Qualified contacts moving to meetings." },
    { id: "conversion_rate", label: "Conversion Rate", value: "11%", trend: "+2%", description: "Contacts converted into policies." },
    { id: "response_time", label: "Average Response Time", value: "1h 12m", trend: "-18m", description: "Median time to first follow-up." },
    { id: "satisfaction", label: "Customer Satisfaction", value: "94%", trend: "+1%", description: "Post-conversation feedback." }
  ],
  recentActivity: [
    {
      id: "activity_import",
      type: "imported",
      title: "Recently Added",
      description: "185 contacts entered the customer database in the last 7 days.",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "activity_campaign",
      type: "campaign",
      title: "Campaign Coverage",
      description: "84% of active contacts are covered by a current campaign.",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      href: "/app/campaigns"
    },
    {
      id: "activity_conversations",
      type: "conversation",
      title: "Active Conversations",
      description: "72 customer conversations are currently being handled by the workforce.",
      date: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      href: "/app/conversations"
    }
  ]
};

export const contactService = {
  getContacts: () => mockApi<Contact[]>(() => contactDirectory),
  getContact: (id: string) =>
    mockApi<ContactDetail>(() => {
      const contact = contactDirectory.find((item) => item.id === id);
      if (!contact) throw new Error("Contact was not found.");
      return buildContactDetail(contact, contactDirectory.findIndex((item) => item.id === id));
    }),
  getDashboard: () => mockApi<ContactDashboard>(() => dashboard),
  getSegments: () => mockApi<ContactSegment[]>(() => segments),
  getLeadScoring: () => mockApi<LeadScoreSummary[]>(() => contactDirectory.map((contact, index) => buildLeadScoring(contact, index))),
  importContacts: (source: string) =>
    mockApi<ContactImportResult>(() => ({
      imported: 185,
      duplicates: 12,
      validationErrors: 3,
      source,
      completedAt: new Date().toISOString()
    })),
  createContact: (contact: Contact) => mockApi<Contact>(() => contact),
  updateContact: (id: string, updates: Partial<Contact>) =>
    mockApi<Contact>(() => {
      const contact = contactDirectory.find((item) => item.id === id);
      if (!contact) throw new Error("Contact was not found.");
      return { ...contact, ...updates };
    }),
  deleteContact: (id: string) => mockApi<{ id: string; deleted: true }>(() => ({ id, deleted: true })),
  createSegment: (segment: Pick<ContactSegment, "name" | "description" | "filters">) =>
    mockApi<ContactSegment>(() => ({
      id: `seg_${segment.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}`,
      name: segment.name,
      description: segment.description,
      contacts: 0,
      policyType: "Mixed",
      ownerEmployeeId: "emp_sophia",
      conversionRate: 0,
      health: 75,
      lastUpdated: new Date().toISOString(),
      filters: segment.filters
    })),
  assignEmployee: (contactIds: string[], employeeId: string) =>
    mockApi<{ contactIds: string[]; employeeId: string; assigned: true }>(() => ({ contactIds, employeeId, assigned: true }))
};
