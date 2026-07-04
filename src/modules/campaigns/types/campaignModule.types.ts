import type { Campaign, CampaignType, Priority } from "@/types";

export type CampaignViewMode = "grid" | "table";
export type CampaignTabId = "overview" | "live" | "performance" | "contacts" | "knowledge" | "timeline";

export interface CampaignFilters {
  search: string;
  status: Campaign["status"] | "all";
  employeeId: string;
  department: string;
  type: CampaignType | "all";
  priority: Priority | "all";
  date: "all" | "week" | "month";
}
