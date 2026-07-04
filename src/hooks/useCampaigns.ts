import { useQuery } from "@tanstack/react-query";

import { campaignService } from "@/services";

export const campaignKeys = {
  all: ["campaigns"] as const,
  detail: (id: string) => ["campaign", id] as const
};

export function useCampaigns() {
  return useQuery({ queryKey: campaignKeys.all, queryFn: campaignService.getCampaigns });
}

export function useCampaign(id: string) {
  return useQuery({ queryKey: campaignKeys.detail(id), queryFn: () => campaignService.getCampaign(id) });
}
