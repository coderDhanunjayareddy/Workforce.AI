import type {
  AnalyticsSummary,
  AppNotification,
  Campaign,
  Contact,
  Conversation,
  Employee,
  Insight,
  Knowledge,
  Organization,
  Session
} from "@/types";

export const organization: Organization = {
  id: "org_nova",
  name: "Nova Insurance Pvt. Ltd.",
  industry: "Insurance",
  headquarters: "Hyderabad, India",
  subscription: "Enterprise Pro",
  timezone: "Asia/Kolkata",
  owner: "Rahul Sharma",
  humanEmployees: 240,
  aiEmployees: 18,
  customers: 82000,
  branches: 14
};

export const session: Session = {
  token: "mock.jwt.session",
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  verified: true,
  organizationId: "org_nova",
  user: {
    id: "user_priya",
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya.reddy@nova-insurance.demo",
    role: "Primary Admin"
  }
};

const departments = ["Sales", "Customer Support", "Claims", "HR", "Finance", "Operations"];
const names = [
  ["Sophia", "Sales Executive", "Sales", "Motor Insurance", 99],
  ["Emma", "Customer Success Specialist", "Customer Support", "Customer Renewal", 98],
  ["David", "Support Specialist", "Claims", "Claims Support", 95],
  ["Olivia", "HR Recruiter", "HR", "Hiring", 97],
  ["Noah", "Finance Assistant", "Finance", "Payment Follow-up", 99],
  ["Liam", "Insurance Advisor", "Sales", "Health Insurance", 96],
  ["Ava", "Customer Care", "Customer Support", "General Support", 97],
  ["Mason", "Operations Coordinator", "Operations", "Operations", 94],
  ["Charlotte", "Claims Assistant", "Claims", "Claim Support July", 96],
  ["James", "Lead Qualification", "Sales", "Motor Insurance Q3", 98],
  ["Amelia", "Renewal Specialist", "Customer Support", "Policy Renewal Drive", 95],
  ["Benjamin", "Appointment Manager", "Sales", "Motor Insurance Q3", 97],
  ["Harper", "Relationship Manager", "Sales", "Policy Renewal Drive", 94],
  ["Lucas", "Travel Insurance", "Sales", "Travel Insurance", 96],
  ["Mia", "Life Insurance", "Sales", "Life Insurance", 98],
  ["Henry", "Commercial Insurance", "Sales", "Commercial Insurance", 95],
  ["Evelyn", "Support Executive", "Customer Support", "General Support", 94],
  ["Alexander", "Policy Advisor", "Compliance", "Policy Review", 97]
] as const;

export const employees: Employee[] = names.map(([name, role, department, campaign, health], index) => ({
  id: `emp_${name.toLowerCase()}`,
  name,
  role,
  department,
  status: index < 14 ? "active" : index < 16 ? "training" : index === 16 ? "paused" : "draft",
  voice: `${name} Premium`,
  language: "English",
  health,
  knowledgeScore: Math.max(88, health - 2),
  performance: Math.min(99, health + (index % 3)),
  callsToday: 42 + index * 7,
  appointmentsToday: 4 + (index % 6),
  csat: Math.min(99, health - 1 + (index % 2)),
  currentCampaign: campaign,
  lastActive: new Date(Date.now() - index * 9 * 60 * 1000).toISOString()
}));

export const campaigns: Campaign[] = [
  ["Motor Insurance Q3", "running", "emp_sophia", 680, 72, 84, 2480000],
  ["Health Insurance Premium", "scheduled", "emp_liam", 420, 18, 0, 0],
  ["Policy Renewal Drive", "running", "emp_emma", 540, 64, 67, 1620000],
  ["Claim Support July", "running", "emp_david", 310, 58, 24, 420000],
  ["Recruitment Campaign", "paused", "emp_olivia", 180, 34, 12, 0]
].map(([name, status, assignedEmployeeId, contacts, progress, appointments, revenue]) => ({
  id: `camp_${String(name).toLowerCase().replaceAll(" ", "_")}`,
  name: String(name),
  status: status as Campaign["status"],
  assignedEmployeeId: String(assignedEmployeeId),
  contacts: Number(contacts),
  progress: Number(progress),
  appointments: Number(appointments),
  revenueInfluenced: Number(revenue)
}));

export const knowledge: Knowledge[] = [
  ["Insurance Products.pdf", "pdf", "indexed", "Sales", 96, "v3.2"],
  ["Claims SOP.pdf", "pdf", "indexed", "Claims", 94, "v2.1"],
  ["Pricing Guide v3.pdf", "pdf", "needs-review", "Sales", 72, "v3.0"],
  ["FAQ.pdf", "faq", "indexed", "Support", 97, "v4.4"],
  ["Sales Script.docx", "docx", "indexed", "Sales", 95, "v2.8"],
  ["IRDA Guidelines.pdf", "policy", "indexed", "Compliance", 98, "v1.9"],
  ["Company Policies.pdf", "policy", "indexed", "HR", 96, "v2.0"],
  ["Health Insurance Handbook.pdf", "pdf", "indexed", "Sales", 95, "v2.6"],
  ["Travel Insurance Handbook.pdf", "pdf", "indexed", "Sales", 93, "v1.7"],
  ["nova-insurance.demo", "website", "indexed", "Operations", 99, "live"]
].map(([title, type, status, department, freshness, version]) => ({
  id: `kn_${String(title).toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}`,
  title: String(title),
  type: type as Knowledge["type"],
  status: status as Knowledge["status"],
  department: String(department),
  freshness: Number(freshness),
  version: String(version)
}));

export const contacts: Contact[] = [
  ["Rajesh Kumar", "RK Logistics", "rajesh@rklogistics.demo", "+91 98765 12001", "qualified", 88, "emp_sophia"],
  ["Anjali Rao", "Aarav Clinics", "anjali@aaravclinics.demo", "+91 98765 12002", "renewal-due", 81, "emp_emma"],
  ["Suresh Patel", "Patel Motors", "suresh@patelmotors.demo", "+91 98765 12003", "customer", 76, "emp_david"],
  ["Meera Iyer", "Iyer Foods", "meera@iyerfoods.demo", "+91 98765 12004", "new-lead", 64, "emp_liam"]
].map(([fullName, company, email, phone, status, leadScore, assignedEmployeeId]) => ({
  id: `contact_${String(fullName).toLowerCase().replaceAll(" ", "_")}`,
  fullName: String(fullName),
  company: String(company),
  email: String(email),
  phone: String(phone),
  status: status as Contact["status"],
  leadScore: Number(leadScore),
  assignedEmployeeId: String(assignedEmployeeId)
}));

export const conversations: Conversation[] = [
  ["emp_sophia", "Rajesh Kumar", "Motor Insurance", "03:41", "positive", "live"],
  ["emp_emma", "Anjali Rao", "Policy Renewal", "06:18", "neutral", "live"],
  ["emp_david", "Suresh Patel", "Claim Status", "04:12", "satisfied", "live"],
  ["emp_noah", "ABC Hospitals", "Invoice Follow-up", "02:51", "neutral", "live"]
].map(([employeeId, customerName, goal, duration, sentiment, status], index) => ({
  id: `conv_${index + 1}`,
  employeeId: String(employeeId),
  customerName: String(customerName),
  goal: String(goal),
  duration: String(duration),
  sentiment: sentiment as Conversation["sentiment"],
  status: status as Conversation["status"]
}));

export const analyticsSummary: AnalyticsSummary = {
  revenueInfluenced: 24000000,
  appointments: 1248,
  qualifiedLeads: 842,
  policiesSold: 486,
  customerSatisfaction: 94,
  hoursSaved: 1842,
  callsAutomated: 18420
};

export const notifications: AppNotification[] = [
  ["Pricing Guide requires review.", "Update knowledge before the renewal campaign expands.", "warning", "/app/knowledge"],
  ["Emma completed Campaign.", "Policy Renewal Drive reached the planned call volume.", "success", "/app/campaigns"],
  ["Sophia booked 14 appointments.", "Motor Insurance Q3 is outperforming target.", "success", "/app/employees/emp_sophia"],
  ["Knowledge sync completed.", "Nine indexed documents are available to the workforce.", "info", "/app/knowledge"],
  ["Health Insurance launches tomorrow.", "Liam is ready for scheduled outreach.", "info", "/app/campaigns"]
].map(([title, description, type, href], index) => ({
  id: `notif_${index + 1}`,
  title: String(title),
  description: String(description),
  type: type as AppNotification["type"],
  read: index > 1,
  href: String(href),
  createdAt: new Date(Date.now() - index * 18 * 60 * 1000).toISOString()
}));

export const insights: Insight[] = [
  {
    id: "insight_pricing",
    priority: "critical",
    title: "Pricing Guide knowledge is outdated",
    description: "Sophia and Liam reference Pricing Guide v3 across active insurance campaigns.",
    impact: "May reduce quote accuracy in high-intent conversations.",
    action: "Update Knowledge",
    href: "/app/knowledge"
  },
  {
    id: "insight_sophia",
    priority: "high",
    title: "Sophia increased appointment booking by 14%",
    description: "Motor Insurance Q3 is converting better after the latest sales script update.",
    impact: "Projected revenue influence increased by Rs. 4.2L this week.",
    action: "Review Performance",
    href: "/app/employees/emp_sophia"
  }
];

export const departmentsList = departments;
