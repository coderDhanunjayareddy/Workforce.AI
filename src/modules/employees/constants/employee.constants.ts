import type { EmployeeFilters, EmployeeSortKey } from "../types/employeeModule.types";

export const defaultEmployeeFilters: EmployeeFilters = {
  search: "",
  department: "all",
  role: "all",
  status: "all",
  health: "all",
  voice: "all",
  language: "all",
  performance: "all",
  sort: "performance"
};

export const employeeSortOptions: { value: EmployeeSortKey; label: string }[] = [
  { value: "performance", label: "Performance" },
  { value: "health", label: "Health" },
  { value: "calls", label: "Calls" },
  { value: "appointments", label: "Appointments" },
  { value: "lastActive", label: "Last Active" },
  { value: "name", label: "Name" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" }
];

export const employeeWizardSteps = [
  { id: "identity", label: "Identity", description: "Name, department and role" },
  { id: "communication", label: "Communication", description: "Voice, language and tone" },
  { id: "personality", label: "Personality", description: "Working style and customer approach" },
  { id: "responsibilities", label: "Responsibilities", description: "Business outcomes and tasks" },
  { id: "knowledge", label: "Knowledge", description: "Documents, FAQs and websites" },
  { id: "tools", label: "Tools", description: "CRM, calendar and workflow systems" },
  { id: "policies", label: "Policies", description: "Rules, escalation and compliance" },
  { id: "review", label: "Review", description: "Confirm employee profile" }
];

export const departmentOptions = ["Sales", "Customer Support", "Claims", "HR", "Finance", "Operations", "Compliance"];
export const responsibilityOptions = ["Lead Qualification", "Sales", "Support", "Scheduling", "Claims", "Recruitment", "Collections"];
export const toolOptions = ["CRM", "Calendar", "Email", "Webhook", "API"];
export const knowledgeOptions = ["PDFs", "DOCX", "Website", "FAQs", "Text"];
export const personalityOptions = ["Professional", "Friendly", "Formal", "Consultative", "Confident", "Empathetic"];
export const policyOptions = ["Business Rules", "Escalation", "Compliance", "Working Hours"];
