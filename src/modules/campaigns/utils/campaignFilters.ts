import type { Campaign } from "@/types";

import type { CampaignFilters } from "../types/campaignModule.types";

function matchesDate(campaign: Campaign, filter: CampaignFilters["date"]) {
  if (filter === "all" || !campaign.launchDate) return true;
  const age = Date.now() - new Date(campaign.launchDate).getTime();
  const day = 24 * 60 * 60 * 1000;
  return filter === "week" ? age <= day * 7 : age <= day * 30;
}

export function getFilteredCampaigns(campaigns: Campaign[], filters: CampaignFilters) {
  const query = filters.search.trim().toLowerCase();
  return campaigns.filter((campaign) => {
    const searchable = [campaign.name, campaign.assignedEmployeeName, campaign.department, campaign.businessGoal, campaign.type, ...(campaign.knowledgeIds ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (filters.status === "all" || campaign.status === filters.status) &&
      (filters.employeeId === "all" || campaign.assignedEmployeeId === filters.employeeId) &&
      (filters.department === "all" || campaign.department === filters.department) &&
      (filters.type === "all" || campaign.type === filters.type) &&
      (filters.priority === "all" || campaign.priority === filters.priority) &&
      matchesDate(campaign, filters.date)
    );
  });
}
