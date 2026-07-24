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
  Session,
  TranscriptLine
} from "@/types";
import { employeeAssetService } from "@/services/employeeAssetService";

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

export interface EmployeeContentProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  aiExperienceYears: number;
  languages: string[];
  voice: string;
  personality: string;
  workingHours: string;
  health: number;
  knowledgeScore: number;
  conversationQuality: number;
  toolConnectivity: number;
  performance: number;
  callsToday: number;
  appointmentsToday: number;
  callsCompleted: number;
  appointmentsBooked: number;
  revenueInfluenced: number;
  csat: number;
  currentCampaign: string;
  goals: string[];
  knowledgeIds: string[];
  status: Employee["status"];
  lastActiveMinutesAgo: number;
}

export interface ConversationContentRecord extends Conversation {
  audio: string;
  knowledgeUsed: string[];
  transcript: TranscriptLine[];
  summary: string;
  appointment: string;
  revenueInfluenced: number;
  followUp: string;
}

const now = Date.now();
const minutesAgo = (minutes: number) => new Date(now - minutes * 60 * 1000).toISOString();
const daysAgo = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
const daysFromNow = (days: number) => new Date(now + days * 24 * 60 * 60 * 1000).toISOString();
const sophiaAsset = employeeAssetService.getHeroEmployee();
const emmaAsset = employeeAssetService.getCustomerSuccessHeroEmployee();
const kpiValue = (value: string | undefined, fallback: string) => value ?? fallback;
const percentValue = (value: string) => Number(value.replace(/[^0-9.]/g, ""));
const numberValue = (value: string) => Number(value.replace(/[^0-9]/g, ""));

export const knowledge: Knowledge[] = [
  ["kn_motor_handbook", "Motor Insurance Handbook", "pdf", "indexed", "Sales", 97, "v4.1"],
  ["kn_health_guide", "Health Insurance Guide", "pdf", "indexed", "Sales", 96, "v3.8"],
  ["kn_travel_products", "Travel Insurance Products", "pdf", "indexed", "Sales", 94, "v2.4"],
  ["kn_premium_pricing", "Premium Pricing Guide", "pdf", "needs-review", "Sales", 78, "v3.0"],
  ["kn_claims_sop", "Claims SOP", "pdf", "indexed", "Claims", 95, "v2.9"],
  ["kn_customer_verification", "Customer Verification Policy", "policy", "indexed", "Compliance", 98, "v2.2"],
  ["kn_sales_playbook", "Sales Conversation Playbook", "docx", "indexed", "Sales", 96, "v3.5"],
  ["kn_customer_faq", "Customer FAQ", "faq", "indexed", "Customer Support", 97, "v5.0"],
  ["kn_escalation_matrix", "Escalation Matrix", "policy", "indexed", "Operations", 93, "v2.1"],
  ["kn_compliance_manual", "Compliance Manual", "policy", "indexed", "Compliance", 99, "v4.0"],
  ["kn_irda_guidelines", "IRDA Guidelines", "policy", "indexed", "Compliance", 98, "v1.9"],
  ["kn_nova_website", "nova-insurance.demo", "website", "indexed", "Operations", 99, "live"]
].map(([id, title, type, status, department, freshness, version]) => ({
  id: String(id),
  title: String(title),
  type: type as Knowledge["type"],
  status: status as Knowledge["status"],
  department: String(department),
  freshness: Number(freshness),
  version: String(version)
}));

export const employeeProfiles: EmployeeContentProfile[] = [
  {
    id: "emp_sophia",
    name: "Sophia",
    role: sophiaAsset.role,
    department: sophiaAsset.department,
    manager: "Director of Sales Operations",
    aiExperienceYears: 4,
    languages: ["Telugu", "English"],
    voice: "Sophia Premium",
    personality: "Warm, calm, professional and consultative",
    workingHours: "09:00 - 18:00 IST",
    health: percentValue(kpiValue(sophiaAsset.KPIs.aiHealthScore, "97/100")),
    knowledgeScore: percentValue(kpiValue(sophiaAsset.KPIs.knowledgeAccuracy, "99.2%")),
    conversationQuality: percentValue(kpiValue(sophiaAsset.KPIs.conversationQuality, "96/100")),
    toolConnectivity: 100,
    performance: percentValue(kpiValue(sophiaAsset.KPIs.conversationQuality, "96/100")),
    callsToday: 132,
    appointmentsToday: 18,
    callsCompleted: numberValue(kpiValue(sophiaAsset.KPIs.conversationsCompleted, "14,862")),
    appointmentsBooked: numberValue(kpiValue(sophiaAsset.KPIs.appointmentsScheduled, "2,846")),
    revenueInfluenced: 48000000,
    csat: percentValue(kpiValue(sophiaAsset.KPIs.customerSatisfaction, "98%")),
    currentCampaign: "Motor Insurance Renewal Q3",
    goals: ["Book qualified advisor appointments", "Maintain Knowledge accuracy above 99%"],
    knowledgeIds: ["kn_motor_handbook", "kn_health_guide", "kn_travel_products", "kn_premium_pricing", "kn_sales_playbook", "kn_customer_faq", "kn_compliance_manual", "kn_irda_guidelines"],
    status: sophiaAsset.status,
    lastActiveMinutesAgo: 3
  },
  {
    id: "emp_emma",
    name: emmaAsset.name,
    role: emmaAsset.role,
    department: emmaAsset.department,
    manager: "Director of Customer Experience",
    aiExperienceYears: 3,
    languages: ["Telugu", "English"],
    voice: "Emma Care",
    personality: "Calm, friendly, reassuring and patient",
    workingHours: "09:00 - 18:00 IST",
    health: percentValue(kpiValue(emmaAsset.KPIs.aiHealthScore, "98/100")),
    knowledgeScore: percentValue(kpiValue(emmaAsset.KPIs.knowledgeAccuracy, "99.5%")),
    conversationQuality: percentValue(kpiValue(emmaAsset.KPIs.conversationQuality, "98/100")),
    toolConnectivity: 99,
    performance: 97,
    callsToday: 118,
    appointmentsToday: 16,
    callsCompleted: numberValue(kpiValue(emmaAsset.KPIs.customersAssisted, "22,416")),
    appointmentsBooked: numberValue(kpiValue(emmaAsset.KPIs.renewalAssistance, "5,182")),
    revenueInfluenced: 3760000,
    csat: percentValue(kpiValue(emmaAsset.KPIs.customerSatisfaction, "99%")),
    currentCampaign: "Policy Expiry Renewal Drive",
    goals: ["Resolve customer issues accurately", "Keep escalations at or below 2%"],
    knowledgeIds: ["kn_health_guide", "kn_customer_faq", "kn_claims_sop", "kn_customer_verification"],
    status: emmaAsset.status,
    lastActiveMinutesAgo: 6
  },
  {
    id: "emp_david",
    name: "David",
    role: "Claims Specialist",
    department: "Claims",
    manager: "Meera Iyer",
    aiExperienceYears: 5,
    languages: ["English", "Hindi"],
    voice: "David Calm",
    personality: "Analytical, technical and calm",
    workingHours: "10:00 - 19:00 IST",
    health: 96,
    knowledgeScore: 95,
    conversationQuality: 96,
    toolConnectivity: 98,
    performance: 95,
    callsToday: 96,
    appointmentsToday: 7,
    callsCompleted: 1960,
    appointmentsBooked: 142,
    revenueInfluenced: 980000,
    csat: 95,
    currentCampaign: "Claims Follow-up",
    goals: ["Resolve 85% claim status conversations first-call", "Reduce escalations by 10%"],
    knowledgeIds: ["kn_claims_sop", "kn_escalation_matrix", "kn_customer_verification"],
    status: "active",
    lastActiveMinutesAgo: 8
  },
  {
    id: "emp_olivia",
    name: "Olivia",
    role: "Customer Success Manager",
    department: "Customer Support",
    manager: "Priya Reddy",
    aiExperienceYears: 3,
    languages: ["English", "Hindi", "Kannada"],
    voice: "Olivia Bright",
    personality: "Friendly, energetic and customer-success oriented",
    workingHours: "09:30 - 18:30 IST",
    health: 97,
    knowledgeScore: 95,
    conversationQuality: 97,
    toolConnectivity: 98,
    performance: 96,
    callsToday: 84,
    appointmentsToday: 14,
    callsCompleted: 1720,
    appointmentsBooked: 214,
    revenueInfluenced: 1680000,
    csat: 97,
    currentCampaign: "Customer Satisfaction Pulse",
    goals: ["Schedule 60 service-review appointments", "Capture actionable CSAT reasons"],
    knowledgeIds: ["kn_customer_faq", "kn_escalation_matrix", "kn_compliance_manual"],
    status: "active",
    lastActiveMinutesAgo: 11
  },
  {
    id: "emp_noah",
    name: "Noah",
    role: "Collections Specialist",
    department: "Finance",
    manager: "Sanjay Menon",
    aiExperienceYears: 4,
    languages: ["English", "Hindi"],
    voice: "Noah Balanced",
    personality: "Measured, precise and respectful",
    workingHours: "10:00 - 19:00 IST",
    health: 97,
    knowledgeScore: 94,
    conversationQuality: 95,
    toolConnectivity: 100,
    performance: 95,
    callsToday: 76,
    appointmentsToday: 6,
    callsCompleted: 1360,
    appointmentsBooked: 96,
    revenueInfluenced: 1240000,
    csat: 94,
    currentCampaign: "High Value Customers",
    goals: ["Recover Rs. 18L overdue premium", "Keep complaint risk below 3%"],
    knowledgeIds: ["kn_customer_verification", "kn_escalation_matrix", "kn_compliance_manual"],
    status: "active",
    lastActiveMinutesAgo: 15
  },
  {
    id: "emp_liam",
    name: "Liam",
    role: "Insurance Advisor",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 3,
    languages: ["English", "Hindi", "Tamil"],
    voice: "Liam Advisory",
    personality: "Consultative, clear and reassuring",
    workingHours: "09:30 - 18:30 IST",
    health: 96,
    knowledgeScore: 96,
    conversationQuality: 95,
    toolConnectivity: 98,
    performance: 96,
    callsToday: 104,
    appointmentsToday: 15,
    callsCompleted: 2100,
    appointmentsBooked: 288,
    revenueInfluenced: 3360000,
    csat: 96,
    currentCampaign: "Health Insurance Premium",
    goals: ["Convert 120 family-plan leads", "Improve premium-plan explanation quality"],
    knowledgeIds: ["kn_health_guide", "kn_premium_pricing", "kn_sales_playbook"],
    status: "active",
    lastActiveMinutesAgo: 18
  },
  {
    id: "emp_ava",
    name: "Ava",
    role: "Customer Support",
    department: "Customer Support",
    manager: "Priya Reddy",
    aiExperienceYears: 2,
    languages: ["English", "Hindi", "Telugu"],
    voice: "Ava Support",
    personality: "Empathetic, concise and steady",
    workingHours: "08:30 - 17:30 IST",
    health: 95,
    knowledgeScore: 94,
    conversationQuality: 96,
    toolConnectivity: 97,
    performance: 94,
    callsToday: 92,
    appointmentsToday: 8,
    callsCompleted: 1640,
    appointmentsBooked: 128,
    revenueInfluenced: 860000,
    csat: 96,
    currentCampaign: "Customer Satisfaction Pulse",
    goals: ["Resolve general support questions under 5 minutes", "Improve first-call resolution"],
    knowledgeIds: ["kn_customer_faq", "kn_escalation_matrix", "kn_customer_verification"],
    status: "active",
    lastActiveMinutesAgo: 21
  },
  {
    id: "emp_mason",
    name: "Mason",
    role: "Operations Specialist",
    department: "Operations",
    manager: "Anita Deshmukh",
    aiExperienceYears: 4,
    languages: ["English", "Hindi"],
    voice: "Mason Operations",
    personality: "Structured, operational and pragmatic",
    workingHours: "09:00 - 18:00 IST",
    health: 94,
    knowledgeScore: 93,
    conversationQuality: 94,
    toolConnectivity: 98,
    performance: 93,
    callsToday: 68,
    appointmentsToday: 5,
    callsCompleted: 1180,
    appointmentsBooked: 82,
    revenueInfluenced: 620000,
    csat: 93,
    currentCampaign: "Corporate Health Plans",
    goals: ["Coordinate branch handoffs", "Keep operations escalations under 12 hours"],
    knowledgeIds: ["kn_escalation_matrix", "kn_nova_website", "kn_compliance_manual"],
    status: "active",
    lastActiveMinutesAgo: 24
  },
  {
    id: "emp_charlotte",
    name: "Charlotte",
    role: "Claims Coordinator",
    department: "Claims",
    manager: "Meera Iyer",
    aiExperienceYears: 3,
    languages: ["English", "Hindi", "Marathi"],
    voice: "Charlotte Claims",
    personality: "Patient, detail-oriented and reassuring",
    workingHours: "10:00 - 19:00 IST",
    health: 96,
    knowledgeScore: 95,
    conversationQuality: 96,
    toolConnectivity: 97,
    performance: 95,
    callsToday: 88,
    appointmentsToday: 6,
    callsCompleted: 1540,
    appointmentsBooked: 104,
    revenueInfluenced: 740000,
    csat: 95,
    currentCampaign: "Claims Follow-up",
    goals: ["Collect missing claim documents", "Improve claim-status satisfaction"],
    knowledgeIds: ["kn_claims_sop", "kn_customer_verification", "kn_escalation_matrix"],
    status: "active",
    lastActiveMinutesAgo: 27
  },
  {
    id: "emp_james",
    name: "James",
    role: "Lead Qualification Specialist",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 3,
    languages: ["English", "Hindi"],
    voice: "James Direct",
    personality: "Efficient, curious and qualification focused",
    workingHours: "09:30 - 18:30 IST",
    health: 98,
    knowledgeScore: 96,
    conversationQuality: 97,
    toolConnectivity: 99,
    performance: 98,
    callsToday: 126,
    appointmentsToday: 17,
    callsCompleted: 2280,
    appointmentsBooked: 304,
    revenueInfluenced: 2940000,
    csat: 97,
    currentCampaign: "Travel Insurance Leads",
    goals: ["Qualify 420 travel leads", "Route high-intent contacts to Lucas"],
    knowledgeIds: ["kn_travel_products", "kn_sales_playbook", "kn_customer_verification"],
    status: "active",
    lastActiveMinutesAgo: 30
  },
  {
    id: "emp_amelia",
    name: "Amelia",
    role: "Retention Specialist",
    department: "Customer Support",
    manager: "Priya Reddy",
    aiExperienceYears: 4,
    languages: ["English", "Hindi", "Malayalam"],
    voice: "Amelia Retention",
    personality: "Calm, persuasive and retention minded",
    workingHours: "09:00 - 18:00 IST",
    health: 95,
    knowledgeScore: 94,
    conversationQuality: 96,
    toolConnectivity: 98,
    performance: 95,
    callsToday: 82,
    appointmentsToday: 11,
    callsCompleted: 1480,
    appointmentsBooked: 176,
    revenueInfluenced: 2120000,
    csat: 96,
    currentCampaign: "Policy Expiry Renewal Drive",
    goals: ["Win back 80 renewal-risk customers", "Maintain empathetic objection handling"],
    knowledgeIds: ["kn_customer_faq", "kn_sales_playbook", "kn_escalation_matrix"],
    status: "active",
    lastActiveMinutesAgo: 33
  },
  {
    id: "emp_benjamin",
    name: "Benjamin",
    role: "Appointment Manager",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 2,
    languages: ["English", "Hindi"],
    voice: "Benjamin Scheduler",
    personality: "Organized, upbeat and scheduling focused",
    workingHours: "08:30 - 17:30 IST",
    health: 97,
    knowledgeScore: 95,
    conversationQuality: 96,
    toolConnectivity: 100,
    performance: 96,
    callsToday: 98,
    appointmentsToday: 20,
    callsCompleted: 1820,
    appointmentsBooked: 366,
    revenueInfluenced: 1880000,
    csat: 96,
    currentCampaign: "Motor Insurance Renewal Q3",
    goals: ["Keep appointment no-show rate below 9%", "Fill advisor calendars by Friday"],
    knowledgeIds: ["kn_motor_handbook", "kn_sales_playbook", "kn_customer_faq"],
    status: "active",
    lastActiveMinutesAgo: 36
  },
  {
    id: "emp_harper",
    name: "Harper",
    role: "Relationship Manager",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 5,
    languages: ["English", "Hindi"],
    voice: "Harper Executive",
    personality: "Polished, strategic and relationship driven",
    workingHours: "10:00 - 19:00 IST",
    health: 94,
    knowledgeScore: 93,
    conversationQuality: 95,
    toolConnectivity: 97,
    performance: 94,
    callsToday: 72,
    appointmentsToday: 9,
    callsCompleted: 1260,
    appointmentsBooked: 144,
    revenueInfluenced: 2640000,
    csat: 95,
    currentCampaign: "High Value Customers",
    goals: ["Retain premium customers", "Identify cross-sell opportunities"],
    knowledgeIds: ["kn_premium_pricing", "kn_sales_playbook", "kn_compliance_manual"],
    status: "active",
    lastActiveMinutesAgo: 39
  },
  {
    id: "emp_lucas",
    name: "Lucas",
    role: "Travel Insurance Advisor",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 2,
    languages: ["English", "Hindi", "Tamil"],
    voice: "Lucas Travel",
    personality: "Clear, practical and itinerary aware",
    workingHours: "09:30 - 18:30 IST",
    health: 96,
    knowledgeScore: 95,
    conversationQuality: 95,
    toolConnectivity: 98,
    performance: 96,
    callsToday: 86,
    appointmentsToday: 12,
    callsCompleted: 1420,
    appointmentsBooked: 198,
    revenueInfluenced: 1340000,
    csat: 96,
    currentCampaign: "Travel Insurance Leads",
    goals: ["Convert frequent travelers before trip date", "Reduce missed coverage questions"],
    knowledgeIds: ["kn_travel_products", "kn_sales_playbook", "kn_customer_faq"],
    status: "training",
    lastActiveMinutesAgo: 42
  },
  {
    id: "emp_mia",
    name: "Mia",
    role: "Life Insurance Advisor",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 3,
    languages: ["English", "Hindi", "Gujarati"],
    voice: "Mia Guidance",
    personality: "Thoughtful, reassuring and family focused",
    workingHours: "09:30 - 18:30 IST",
    health: 98,
    knowledgeScore: 96,
    conversationQuality: 97,
    toolConnectivity: 99,
    performance: 97,
    callsToday: 90,
    appointmentsToday: 13,
    callsCompleted: 1620,
    appointmentsBooked: 224,
    revenueInfluenced: 3180000,
    csat: 97,
    currentCampaign: "Corporate Health Plans",
    goals: ["Identify family protection intent", "Schedule needs-analysis reviews"],
    knowledgeIds: ["kn_health_guide", "kn_premium_pricing", "kn_sales_playbook"],
    status: "training",
    lastActiveMinutesAgo: 45
  },
  {
    id: "emp_henry",
    name: "Henry",
    role: "Commercial Insurance Advisor",
    department: "Sales",
    manager: "Rahul Sharma",
    aiExperienceYears: 4,
    languages: ["English", "Hindi"],
    voice: "Henry Commercial",
    personality: "Executive, concise and risk-aware",
    workingHours: "10:00 - 19:00 IST",
    health: 95,
    knowledgeScore: 94,
    conversationQuality: 95,
    toolConnectivity: 98,
    performance: 95,
    callsToday: 66,
    appointmentsToday: 8,
    callsCompleted: 1180,
    appointmentsBooked: 132,
    revenueInfluenced: 2980000,
    csat: 95,
    currentCampaign: "Corporate Health Plans",
    goals: ["Qualify corporate risk profiles", "Book commercial insurance reviews"],
    knowledgeIds: ["kn_health_guide", "kn_compliance_manual", "kn_premium_pricing"],
    status: "paused",
    lastActiveMinutesAgo: 48
  },
  {
    id: "emp_evelyn",
    name: "Evelyn",
    role: "Quality Assurance Specialist",
    department: "Operations",
    manager: "Anita Deshmukh",
    aiExperienceYears: 5,
    languages: ["English", "Hindi"],
    voice: "Evelyn Quality",
    personality: "Careful, objective and compliance focused",
    workingHours: "09:00 - 18:00 IST",
    health: 94,
    knowledgeScore: 95,
    conversationQuality: 94,
    toolConnectivity: 97,
    performance: 94,
    callsToday: 54,
    appointmentsToday: 4,
    callsCompleted: 840,
    appointmentsBooked: 62,
    revenueInfluenced: 480000,
    csat: 94,
    currentCampaign: "Customer Satisfaction Pulse",
    goals: ["Review low-confidence conversations", "Reduce compliance exceptions"],
    knowledgeIds: ["kn_compliance_manual", "kn_irda_guidelines", "kn_escalation_matrix"],
    status: "active",
    lastActiveMinutesAgo: 51
  },
  {
    id: "emp_alexander",
    name: "Alexander",
    role: "Policy Advisor",
    department: "Compliance",
    manager: "Kavita Rao",
    aiExperienceYears: 4,
    languages: ["English", "Hindi"],
    voice: "Alexander Policy",
    personality: "Formal, precise and policy-first",
    workingHours: "09:30 - 18:30 IST",
    health: 97,
    knowledgeScore: 98,
    conversationQuality: 96,
    toolConnectivity: 99,
    performance: 96,
    callsToday: 58,
    appointmentsToday: 5,
    callsCompleted: 920,
    appointmentsBooked: 74,
    revenueInfluenced: 520000,
    csat: 96,
    currentCampaign: "Claims Follow-up",
    goals: ["Audit policy-sensitive escalations", "Keep compliance accuracy above 98%"],
    knowledgeIds: ["kn_irda_guidelines", "kn_compliance_manual", "kn_customer_verification"],
    status: "draft",
    lastActiveMinutesAgo: 54
  }
];

export const employees: Employee[] = employeeProfiles.map((profile) => ({
  id: profile.id,
  name: profile.name,
  role: profile.role,
  department: profile.department,
  status: profile.status,
  voice: profile.voice,
  language: profile.languages.join(" + "),
  avatarUrl: employeeAssetService.getProfileImage(profile.id),
  health: profile.health,
  knowledgeScore: profile.knowledgeScore,
  performance: profile.performance,
  callsToday: profile.callsToday,
  appointmentsToday: profile.appointmentsToday,
  csat: profile.csat,
  currentCampaign: profile.currentCampaign,
  lastActive: minutesAgo(profile.lastActiveMinutesAgo)
}));

export const campaigns: Campaign[] = [
  ["camp_motor_renewal_q3", "Motor Insurance Renewal Q3", "running", "emp_sophia", 680, 72, 84, 2480000, "Renew motor policies and book advisor reviews", "Sales", "Sales", "high", 91],
  ["camp_health_premium", "Health Insurance Premium", "scheduled", "emp_liam", 420, 18, 32, 960000, "Move qualified families into premium health plans", "Sales", "Sales", "high", 88],
  ["camp_travel_leads", "Travel Insurance Leads", "running", "emp_james", 360, 58, 46, 740000, "Convert travel leads before departure dates", "Lead Qualification", "Sales", "medium", 84],
  ["camp_corporate_health", "Corporate Health Plans", "running", "emp_henry", 240, 49, 28, 1820000, "Qualify commercial health-plan demand", "Sales", "Sales", "critical", 86],
  ["camp_claims_follow_up", "Claims Follow-up", "running", "emp_david", 310, 64, 24, 420000, "Resolve claim follow-ups and reduce escalations", "Claims", "Claims", "high", 82],
  ["camp_high_value_customers", "High Value Customers", "completed", "emp_harper", 210, 100, 38, 860000, "Retain premium customers and identify cross-sell", "Renewals", "Sales", "critical", 94],
  ["camp_policy_expiry", "Policy Expiry Renewal Drive", "running", "emp_emma", 540, 64, 67, 1620000, "Protect policies expiring in the next 30 days", "Renewals", "Customer Support", "high", 87],
  ["camp_customer_satisfaction", "Customer Satisfaction Pulse", "paused", "emp_olivia", 190, 34, 18, 180000, "Capture satisfaction reasons after service conversations", "Surveys", "Customer Support", "medium", 76]
].map(([id, name, status, assignedEmployeeId, contacts, progress, appointments, revenue, businessGoal, type, department, priority, health]) => ({
  id: String(id),
  name: String(name),
  status: status as Campaign["status"],
  assignedEmployeeId: String(assignedEmployeeId),
  contacts: Number(contacts),
  progress: Number(progress),
  appointments: Number(appointments),
  revenueInfluenced: Number(revenue),
  businessGoal: String(businessGoal),
  type: type as Campaign["type"],
  department: String(department),
  priority: priority as Campaign["priority"],
  conversionRate: Math.round((Number(appointments) / Number(contacts)) * 100),
  health: Number(health),
  launchDate: daysAgo(12),
  knowledgeIds: knowledge.slice(0, 4).map((item) => item.id)
}));

const policyTypes = ["Motor Insurance", "Health Insurance", "Travel Insurance", "Life Insurance", "Commercial Insurance", "Claims Support"];
const firstNames = ["Rajesh", "Anjali", "Suresh", "Meera", "Nisha", "Arvind", "Pooja", "Vikram", "Farah", "Karthik", "Divya", "Sameer", "Ishita", "Manoj", "Rina", "Harish", "Aditi", "Rohan", "Sneha", "Kabir"];
const lastNames = ["Kumar", "Rao", "Patel", "Iyer", "Menon", "Singh", "Nair", "Reddy", "Khan", "Shah", "Chandra", "Bansal", "Das", "Kulkarni", "Fernandes", "Gupta", "Mehta", "Kapoor", "Joshi", "Pillai"];
const companies = ["RK Logistics", "Aarav Clinics", "Patel Motors", "Iyer Foods", "Lotus Retail", "Singh Exports", "Nair Resorts", "Reddy Farms", "Khan Studios", "Shah Manufacturing", "Chandra Schools", "Bansal Tech"];
const cities = ["Hyderabad", "Bengaluru", "Chennai", "Pune", "Mumbai", "Delhi", "Ahmedabad", "Kochi", "Jaipur", "Coimbatore"];
const states = ["Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Gujarat", "Kerala", "Delhi", "Rajasthan"];
const statuses: Contact["status"][] = ["qualified", "customer", "renewal-due", "new-lead", "inactive"];

export const contacts: Contact[] = Array.from({ length: 2500 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const fullName = index === 0 ? "Rajesh Kumar" : index === 1 ? "Anjali Rao" : index === 2 ? "Suresh Patel" : `${firstName} ${lastName}`;
  const assignedEmployee = employeeProfiles[index % employeeProfiles.length];
  const campaign = campaigns[index % campaigns.length];
  const policyType = policyTypes[index % policyTypes.length];
  const leadScore = Math.max(28, Math.min(98, 62 + ((index * 7) % 37)));
  return {
    id: `contact_${fullName.toLowerCase().replaceAll(" ", "_")}_${String(index + 1).padStart(4, "0")}`,
    fullName,
    company: companies[index % companies.length],
    email: `${fullName.toLowerCase().replaceAll(" ", ".")}${index + 1}@customer.nova.demo`,
    phone: `+91 98765 ${String(12000 + index).padStart(5, "0")}`,
    status: statuses[index % statuses.length],
    leadScore,
    assignedEmployeeId: assignedEmployee.id,
    assignedEmployeeName: assignedEmployee.name,
    currentCampaign: campaign.name,
    recentActivity: index % 4 === 0 ? "Appointment scheduled" : index % 4 === 1 ? "Conversation completed" : index % 4 === 2 ? "Follow-up due" : "Policy comparison requested",
    tags: [policyType.toLowerCase().replaceAll(" ", "-"), leadScore > 84 ? "high-intent" : "nurture"],
    policyType,
    industry: ["Logistics", "Healthcare", "Automotive", "Retail", "Manufacturing", "Technology"][index % 6],
    city: cities[index % cities.length],
    state: states[index % states.length],
    country: "India",
    lastContact: minutesAgo(30 + index),
    policyNumber: `NOVA-${2026}${String(index + 1).padStart(5, "0")}`
  };
});

const transcript = (conversationId: string, employee: string, customer: string, policy: string, objection: string, recommendation: string): TranscriptLine[] => [
  { id: `${conversationId}_t1`, speaker: employee, role: "employee", text: `Good morning ${customer}. This is ${employee} from Nova Insurance. Is this still a convenient time to discuss your ${policy} options?`, timestamp: "00:06" },
  { id: `${conversationId}_t2`, speaker: "Customer", role: "customer", text: "Yes, I have a few minutes. I was expecting a follow-up, but please keep it brief.", timestamp: "00:18" },
  { id: `${conversationId}_t3`, speaker: employee, role: "employee", text: "Of course. I will keep it focused. I can see your current profile and the recent question about coverage limits.", timestamp: "00:31" },
  { id: `${conversationId}_t4`, speaker: "Customer", role: "customer", text: `My main concern is ${objection}. I do not want to commit before understanding the details.`, timestamp: "00:49" },
  { id: `${conversationId}_t5`, speaker: employee, role: "employee", text: `That is reasonable. Based on the approved Knowledge available to me, ${recommendation}`, timestamp: "01:12" },
  { id: `${conversationId}_t6`, speaker: "Customer", role: "customer", text: "Okay, that makes sense. But how do I compare this with my current plan?", timestamp: "01:41" },
  { id: `${conversationId}_t7`, speaker: employee, role: "employee", text: "I can schedule a 20-minute advisor review and send a comparison before the meeting, so you can review it without pressure.", timestamp: "02:06" },
  { id: `${conversationId}_t8`, speaker: "Customer", role: "customer", text: "That would help. Tomorrow afternoon works better than today.", timestamp: "02:31" },
  { id: `${conversationId}_t9`, speaker: employee, role: "employee", text: "Done. I will mark tomorrow afternoon, send the comparison, and include the documents referenced during this conversation.", timestamp: "02:52" }
];

export const conversationRecords: ConversationContentRecord[] = [
  ["conv_1", "emp_sophia", 0, "camp_motor_renewal_q3", "Motor Insurance", "03:41", "positive", "live", "Premium difference", "the comprehensive plan improves own-damage coverage and keeps roadside support active.", 248000, "sales-renewal-01.mp3"],
  ["conv_2", "emp_emma", 1, "camp_policy_expiry", "Policy Renewal", "06:18", "satisfied", "live", "Renewal price increase", "the renewal plan preserves continuity benefits and avoids a fresh waiting period.", 186000, "renewal-01.mp3"],
  ["conv_3", "emp_david", 2, "camp_claims_follow_up", "Claim Status", "04:12", "satisfied", "live", "Document delay", "the claim can move forward today if the repair invoice and policy copy are uploaded.", 0, "claims-01.mp3"],
  ["conv_4", "emp_liam", 12, "camp_health_premium", "Health Insurance", "04:46", "positive", "live", "Family coverage exclusions", "the premium family plan includes cashless access and clearer pre-authorization steps.", 312000, "health-premium-01.mp3"],
  ["conv_5", "emp_james", 4, "camp_travel_leads", "Travel Insurance", "02:34", "positive", "live", "Trip cancellation coverage", "the travel plan covers medical emergencies and cancellation clauses listed in the product note.", 74000, "travel-01.mp3"],
  ["conv_6", "emp_harper", 5, "camp_high_value_customers", "High Value Review", "05:22", "positive", "completed", "Multi-policy discount", "the relationship review can consolidate policies and surface eligible premium benefits.", 420000, "high-value-01.mp3"],
  ["conv_7", "emp_olivia", 6, "camp_customer_satisfaction", "Customer Satisfaction", "03:18", "neutral", "live", "Service callback delay", "the service team can confirm ownership and share the callback window immediately.", 0, "satisfaction-01.mp3"],
  ["conv_8", "emp_noah", 7, "camp_high_value_customers", "Payment Follow-up", "03:22", "neutral", "queued", "Payment timing", "a compliant reminder with the payment link can prevent policy interruption.", 96000, "collections-01.mp3"],
  ["conv_9", "emp_charlotte", 8, "camp_claims_follow_up", "Claim Documents", "04:58", "satisfied", "on-hold", "Surveyor update", "the claim note shows the surveyor report is pending and can be escalated today.", 0, "claims-02.mp3"],
  ["conv_10", "emp_ava", 9, "camp_customer_satisfaction", "General Support", "06:08", "negative", "escalated", "Previous complaint", "the escalation matrix recommends manager review when sentiment remains negative.", 0, "support-01.mp3"],
  ["conv_11", "emp_benjamin", 10, "camp_motor_renewal_q3", "Appointment Scheduling", "02:44", "positive", "completed", "Advisor availability", "tomorrow afternoon has two advisor slots available for motor policy review.", 136000, "appointment-01.mp3"],
  ["conv_12", "emp_mia", 11, "camp_corporate_health", "Corporate Health Plans", "05:36", "positive", "completed", "Employee count eligibility", "corporate health eligibility starts at the employee threshold shown in the guide.", 520000, "corporate-health-01.mp3"],
  ["conv_13", "emp_lucas", 14, "camp_travel_leads", "Travel Coverage", "03:52", "neutral", "completed", "Visa document requirement", "the travel plan certificate can be issued after itinerary confirmation.", 82000, "travel-02.mp3"],
  ["conv_14", "emp_henry", 15, "camp_corporate_health", "Commercial Insurance", "05:14", "neutral", "completed", "Risk category", "a commercial review will identify the correct risk category before quote generation.", 480000, "commercial-01.mp3"],
  ["conv_15", "emp_alexander", 2, "camp_claims_follow_up", "Compliance Review", "04:04", "satisfied", "completed", "Policy wording", "the IRDA-aligned disclosure language confirms the claim communication boundary.", 0, "compliance-01.mp3"]
].map(([id, employeeId, contactIndex, campaignId, goal, duration, sentiment, status, objection, recommendation, revenueInfluenced, audio]) => {
  const employee = employeeProfiles.find((item) => item.id === employeeId)!;
  const contact = contacts[Number(contactIndex)];
  const campaign = campaigns.find((item) => item.id === campaignId)!;
  const usedKnowledge = employee.knowledgeIds.slice(0, 3).map((knowledgeId) => knowledge.find((item) => item.id === knowledgeId)?.title ?? "Customer FAQ");
  const assetConversation = String(id) === "conv_1" ? sophiaAsset.conversations[0] : String(id) === "conv_2" ? emmaAsset.conversations[0] : undefined;
  const assetAnalytics = assetConversation?.analytics;
  return {
    id: String(id),
    employeeId: String(employeeId),
    employeeName: employee.name,
    department: employee.department,
    campaignId: String(campaignId),
    campaignName: campaign.name,
    contactId: contact.id,
    customerName: contact.fullName,
    customerPhone: contact.phone,
    goal: assetConversation?.scenario ?? String(goal),
    duration: assetAnalytics?.Duration ?? String(duration),
    sentiment: sentiment as Conversation["sentiment"],
    status: status as Conversation["status"],
    outcome: assetConversation?.outcome.join(", ") ?? (Number(revenueInfluenced) > 0 ? "Appointment booked" : status === "escalated" ? "Escalated to manager" : "Question resolved"),
    health: employee.health,
    currentStage: status === "live" ? "Recommendation" : "Closing",
    buyingIntent: (assetAnalytics?.Confidence === "High" || assetAnalytics?.Confidence === "Medium" || assetAnalytics?.Confidence === "Low") ? assetAnalytics.Confidence : Number(revenueInfluenced) > 250000 ? "High" : Number(revenueInfluenced) > 0 ? "Medium" : "Low",
    riskLevel: status === "escalated" ? "High" : sentiment === "neutral" ? "Medium" : "Low",
    confidence: assetAnalytics?.Compliance ? percentValue(assetAnalytics.Compliance) : Math.min(98, employee.conversationQuality),
    audio: String(id) === "conv_1" ? sophiaAsset.previewAudio : String(id) === "conv_2" ? emmaAsset.previewAudio : `/demo/assets/audio/${String(audio)}`,
    knowledgeUsed: assetConversation?.knowledgeUsed ?? usedKnowledge,
    transcript: assetConversation?.transcript ?? transcript(String(id), employee.name, contact.fullName, String(goal).toLowerCase(), String(objection).toLowerCase(), String(recommendation)),
    summary: assetConversation ? `${employee.name} helped ${assetConversation.participants.customer} with ${assetConversation.scenario.toLowerCase()} and produced: ${assetConversation.outcome.join(", ")}.` : `${employee.name} handled ${contact.fullName} for ${goal}, referenced ${usedKnowledge.join(", ")}, and produced a ${Number(revenueInfluenced) > 0 ? "commercial" : "service"} outcome.`,
    appointment: Number(revenueInfluenced) > 0 ? daysFromNow((Number(contactIndex) % 5) + 1) : "Not scheduled",
    revenueInfluenced: Number(revenueInfluenced),
    followUp: Number(revenueInfluenced) > 0 ? "Send comparison and confirm advisor slot." : "Send status note and monitor next customer response."
  };
});

const toConversation = (record: ConversationContentRecord): Conversation => ({
  id: record.id,
  employeeId: record.employeeId,
  employeeName: record.employeeName,
  department: record.department,
  campaignId: record.campaignId,
  campaignName: record.campaignName,
  contactId: record.contactId,
  customerName: record.customerName,
  customerPhone: record.customerPhone,
  goal: record.goal,
  duration: record.duration,
  sentiment: record.sentiment,
  status: record.status,
  outcome: record.outcome,
  health: record.health,
  currentStage: record.currentStage,
  buyingIntent: record.buyingIntent,
  riskLevel: record.riskLevel,
  confidence: record.confidence
});

export const conversations: Conversation[] = conversationRecords.map(toConversation);

const revenueTotal = conversationRecords.reduce((total, conversation) => total + conversation.revenueInfluenced, 0);
const appointmentTotal = conversationRecords.filter((conversation) => conversation.appointment !== "Not scheduled").length;

export const analyticsSummary: AnalyticsSummary = {
  revenueInfluenced: 24000000,
  appointments: 1248,
  qualifiedLeads: 842,
  policiesSold: 486,
  customerSatisfaction: 94,
  hoursSaved: 1842,
  callsAutomated: 18420
};

export const audioManifest = {
  welcome: "/demo/assets/audio/welcome.mp3",
  closing: "/demo/assets/audio/closing.mp3",
  conversations: conversationRecords.map((conversation) => ({ conversationId: conversation.id, audio: conversation.audio }))
};

export const notifications: AppNotification[] = [
  ["Sophia booked an advisor appointment.", "Rajesh Kumar accepted a motor insurance renewal review.", "success", "/app/conversations/conv_1"],
  ["Pricing Guide requires review.", "Premium Pricing Guide is used in four revenue campaigns.", "warning", "/app/knowledge/kn_premium_pricing"],
  ["Emma resolved customer query.", "Health policy clarification closed with no escalation required.", "success", "/app/conversations/conv_2"],
  ["Claims follow-up improved satisfaction.", "David resolved claim status questions using Claims SOP.", "info", "/app/conversations/conv_3"],
  ["Customer Satisfaction Pulse needs attention.", "Negative support sentiment was escalated to manager review.", "error", "/app/conversations/conv_10"]
].map(([title, description, type, href], index) => ({
  id: `notif_${index + 1}`,
  title: String(title),
  description: String(description),
  type: type as AppNotification["type"],
  read: index > 1,
  href: String(href),
  createdAt: minutesAgo(index * 18)
}));

export const insights: Insight[] = [
  {
    id: "insight_pricing",
    priority: "critical",
    title: "Premium Pricing Guide requires review",
    description: "Sophia, Liam, Harper and Mia referenced this Knowledge in high-value conversations.",
    impact: "Rs. 24.8L in active campaign revenue depends on quote accuracy.",
    action: "Update Knowledge",
    href: "/app/knowledge/kn_premium_pricing"
  },
  {
    id: "insight_sophia",
    priority: "high",
    title: "Sophia is outperforming renewal targets",
    description: "Motor Insurance Renewal Q3 is converting better after the latest conversation playbook update.",
    impact: `Recent conversations influenced Rs. ${(revenueTotal / 100000).toFixed(1)}L and created ${appointmentTotal} near-term appointments.`,
    action: "Review Performance",
    href: "/app/employees/emp_sophia"
  },
  {
    id: "insight_claims",
    priority: "medium",
    title: "Claims Knowledge is reducing escalations",
    description: "Claims SOP and Escalation Matrix appear in resolved support conversations.",
    impact: "Customer satisfaction remains at 94% despite increased claim volume.",
    action: "Open Conversations",
    href: "/app/conversations"
  }
];

export const departmentsList = ["Sales", "Customer Support", "Claims", "Operations", "Finance", "Compliance"];
