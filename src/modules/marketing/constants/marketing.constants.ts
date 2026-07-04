import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  CalendarCheck,
  ContactRound,
  Headphones,
  LineChart,
  Megaphone,
  Mic,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow
} from "lucide-react";

import type {
  MarketingFaq,
  MarketingFeature,
  MarketingIndustry,
  MarketingLink,
  MarketingMetric
} from "../types/marketing.types";

export const marketingLinks: MarketingLink[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const trustItems = [
  { label: "Enterprise Ready", icon: Building2 },
  { label: "Secure by Design", icon: ShieldCheck },
  { label: "24/7 AI Workforce", icon: UsersRound },
  { label: "99.9% Availability", icon: LineChart },
  { label: "GDPR Ready", icon: ShieldCheck },
  { label: "SOC2 Ready", icon: ShieldCheck }
];

export const features: MarketingFeature[] = [
  {
    title: "Hire AI Employees",
    description: "Create digital employees with identity, roles, departments, voice, health, goals, and measurable performance.",
    href: "/register",
    icon: UsersRound
  },
  {
    title: "Train with Company Knowledge",
    description: "Turn policies, scripts, FAQs, websites, and operating documents into living organizational intelligence.",
    href: "/features",
    icon: BookOpen
  },
  {
    title: "Deploy Voice Workforce",
    description: "Assign natural customer conversations to AI Employees with business context, compliance, and escalation paths.",
    href: "/solutions",
    icon: Mic
  },
  {
    title: "Campaign Automation",
    description: "Give AI Employees clear business objectives, contact segments, knowledge, schedules, and performance targets.",
    href: "/features",
    icon: Megaphone
  },
  {
    title: "Conversation Intelligence",
    description: "Monitor live conversations, sentiment, outcomes, knowledge usage, and recommended next actions.",
    href: "/features",
    icon: Headphones
  },
  {
    title: "Business Analytics",
    description: "Connect every conversation to revenue influenced, appointments, qualified leads, satisfaction, and hours saved.",
    href: "/pricing",
    icon: BarChart3
  }
];

export const workflowSteps = [
  "Hire AI Employee",
  "Upload Knowledge",
  "Import Contacts",
  "Launch Campaign",
  "Monitor Conversations",
  "Improve Performance"
];

export const platformModules: MarketingFeature[] = [
  { title: "AI Workforce", description: "Manage digital employees as a real organization.", href: "/app/employees", icon: UsersRound },
  { title: "Knowledge Center", description: "Centralize and improve operational intelligence.", href: "/app/knowledge", icon: BookOpen },
  { title: "Campaigns", description: "Assign business objectives and track outcomes.", href: "/app/campaigns", icon: Megaphone },
  { title: "Contacts", description: "Power engagement with customer intelligence.", href: "/app/contacts", icon: ContactRound },
  { title: "Live Operations", description: "Monitor conversations and workforce utilization.", href: "/app/conversations", icon: Headphones },
  { title: "Analytics", description: "Prove revenue, efficiency, and customer impact.", href: "/app/analytics", icon: BarChart3 },
  { title: "Organization", description: "Control security, roles, settings, and scale.", href: "/app/organization", icon: Building2 }
];

export const industries: MarketingIndustry[] = [
  { title: "Insurance", challenge: "High-volume renewals, claims questions, and quote follow-ups.", outcome: "AI Employees qualify leads, explain policy options, and book appointments." },
  { title: "Healthcare", challenge: "Patient inquiries, appointment scheduling, and care coordination pressure.", outcome: "Digital workforce handles routine conversations while teams focus on care." },
  { title: "Education", challenge: "Admissions questions, lead nurturing, and student support at scale.", outcome: "AI Employees guide prospects and keep enrollment teams focused." },
  { title: "Banking", challenge: "Service requests, product education, and compliance-heavy conversations.", outcome: "Workforce AI keeps conversations consistent, measured, and auditable." },
  { title: "Real Estate", challenge: "Fast lead response, qualification, and appointment coordination.", outcome: "AI Employees qualify buyers and schedule human follow-up quickly." },
  { title: "Travel", challenge: "High inquiry volume, itinerary questions, and seasonal demand.", outcome: "Digital workforce supports customers across campaigns and service journeys." },
  { title: "Retail", challenge: "Promotions, support conversations, and retention campaigns.", outcome: "AI Employees convert customer intent into measurable outcomes." },
  { title: "Customer Support", challenge: "Rising support queues and uneven service quality.", outcome: "Teams scale consistent conversation handling without losing visibility." }
];

export const businessMetrics: MarketingMetric[] = [
  { label: "Revenue Influenced", value: "Rs. 2.4 Cr", description: "Attributable customer engagement impact." },
  { label: "Appointments", value: "1,248", description: "Qualified meetings generated by AI Employees." },
  { label: "Calls Automated", value: "18,420", description: "Customer conversations handled this quarter." },
  { label: "Hours Saved", value: "1,842", description: "Operational workload removed from human teams." },
  { label: "Customer Satisfaction", value: "94%", description: "Measured across live and completed conversations." },
  { label: "Conversion Rate", value: "28.6%", description: "Campaign-to-outcome performance across segments." }
];

export const comparisonRows = [
  ["Availability", "Business hours", "Team dependent", "Always-on AI Workforce"],
  ["Training", "Manual scripts", "One-time setup", "Continuous Knowledge and Performance improvement"],
  ["Visibility", "Limited call notes", "Conversation logs", "Live operations, health, analytics, and recommendations"],
  ["Scale", "More hiring required", "Workflow limits", "Deploy more AI Employees across teams"],
  ["Business Outcomes", "Hard to attribute", "Activity-focused", "Revenue, appointments, satisfaction, and hours saved"]
];

export const testimonials = [
  {
    company: "Nova Insurance",
    role: "Operations Director",
    quote: "Workforce AI helped us present AI Employees as accountable team members with clear ownership, health, and business contribution."
  },
  {
    company: "Orbit Healthcare",
    role: "Patient Experience Lead",
    quote: "The product language made adoption easier. Leadership could see what each AI Employee was doing and why it mattered."
  },
  {
    company: "Prime Education",
    role: "Admissions Head",
    quote: "Campaigns, Knowledge, Contacts, and Analytics finally felt connected instead of scattered across disconnected tools."
  },
  {
    company: "Zen Finance",
    role: "Customer Operations VP",
    quote: "The executive view gives us confidence that the workforce is improving outcomes, not just increasing activity."
  }
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Contact Sales",
    description: "For teams validating their first digital workforce.",
    features: ["3 AI Employees", "Knowledge Center", "Campaign basics", "Email support"]
  },
  {
    name: "Growth",
    price: "Contact Sales",
    description: "For scaling customer operations across departments.",
    features: ["12 AI Employees", "Live Conversations", "Advanced campaigns", "Analytics center"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations that need security, governance, and scale.",
    features: ["Unlimited AI Workforce", "Enterprise security", "Custom integrations", "Priority support"]
  }
];

export const faqs: MarketingFaq[] = [
  { question: "What is an AI Employee?", answer: "An AI Employee is a digital team member with identity, role, department, voice, knowledge, health, performance, and measurable business outcomes." },
  { question: "How secure is Workforce AI?", answer: "The platform is designed for enterprise controls including organization isolation, role-based access, auditability, and backend-ready service boundaries." },
  { question: "Can I train employees?", answer: "Yes. AI Employees learn from company Knowledge including documents, FAQs, policies, scripts, and websites." },
  { question: "Can AI Employees make calls?", answer: "Yes. The product roadmap centers on natural voice conversations with monitoring, sentiment, summaries, and escalation paths." },
  { question: "How do campaigns work?", answer: "Campaigns assign business objectives to AI Employees, connect contacts and knowledge, and measure appointments, revenue, and satisfaction." },
  { question: "Can I integrate CRM?", answer: "The architecture is designed for CRM, calendar, communication, webhook, and API integrations as the backend comes online." },
  { question: "Do you support multiple organizations?", answer: "The product model and backend roadmap are multi-tenant, with each organization owning its employees, knowledge, contacts, campaigns, and analytics." },
  { question: "What makes this different?", answer: "Workforce AI treats AI systems as accountable digital employees rather than isolated automation widgets." },
  { question: "Who is it for?", answer: "It is built for enterprises, mid-size businesses, sales, support, insurance, healthcare, education, finance, and operations teams." },
  { question: "How quickly can a team start?", answer: "The demo flow is designed to show account creation, organization setup, hiring, knowledge upload, contacts, campaigns, live calls, and analytics in minutes." }
];

export const subPageContent = {
  features: {
    title: "Enterprise AI Workforce Features",
    description: "Everything required to hire, train, deploy, monitor, and improve AI Employees inside one operating system.",
    icon: Sparkles
  },
  solutions: {
    title: "Solutions for Customer Operations",
    description: "Use AI Employees across sales, support, renewals, claims, admissions, and high-volume customer engagement.",
    icon: Workflow
  },
  pricing: {
    title: "Pricing Built for Workforce Scale",
    description: "Start with a focused team, expand across departments, and move into enterprise governance when your digital workforce grows.",
    icon: CalendarCheck
  },
  about: {
    title: "Building the Operating System for Digital Employees",
    description: "Workforce AI exists to help organizations trust, measure, and improve digital employees working alongside human teams.",
    icon: BrainCircuit
  },
  contact: {
    title: "Talk to Workforce AI",
    description: "Share your customer operations goals and see how an AI Workforce can support your business.",
    icon: Headphones
  }
} as const;
