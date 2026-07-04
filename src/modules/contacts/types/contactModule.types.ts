import type { Contact } from "@/types";

export type ContactViewMode = "grid" | "table";

export interface ContactFilters {
  search: string;
  status: Contact["status"] | "all";
  leadScore: "all" | "cold" | "warm" | "hot" | "qualified";
  campaign: string;
  assignedEmployeeId: string;
  industry: string;
  policyType: string;
  location: string;
  lastContactDate: "all" | "today" | "week" | "month";
}
