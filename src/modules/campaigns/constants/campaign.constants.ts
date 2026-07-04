import type { CampaignFilters, CampaignTabId } from "../types/campaignModule.types";

export const defaultCampaignFilters: CampaignFilters = {
  search: "",
  status: "all",
  employeeId: "all",
  department: "all",
  type: "all",
  priority: "all",
  date: "all"
};

export const campaignTypes = [
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
] as const;

export const createCampaignSteps = [
  "Campaign Information",
  "Assign AI Employee",
  "Select Contacts",
  "Knowledge Assignment",
  "Calling Strategy",
  "Schedule",
  "Review",
  "Launch"
];

export const campaignTabs: { id: CampaignTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "live", label: "Live Monitoring" },
  { id: "performance", label: "Performance" },
  { id: "contacts", label: "Contacts" },
  { id: "knowledge", label: "Knowledge" },
  { id: "timeline", label: "Timeline" }
];
