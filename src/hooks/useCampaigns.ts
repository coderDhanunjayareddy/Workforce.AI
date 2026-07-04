import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { campaignService } from "@/services";
import type { Campaign } from "@/types";

export const campaignKeys = {
  all: ["campaigns"] as const,
  dashboard: ["campaigns", "dashboard"] as const,
  templates: ["campaigns", "templates"] as const,
  history: ["campaigns", "history"] as const,
  detail: (id: string) => ["campaign", id] as const,
  analytics: (id: string) => ["campaign", id, "analytics"] as const,
  health: (id: string) => ["campaign", id, "health"] as const
};

export function useCampaigns() {
  return useQuery({ queryKey: campaignKeys.all, queryFn: campaignService.getCampaigns });
}

export function useCampaign(id: string) {
  return useQuery({ queryKey: campaignKeys.detail(id), queryFn: () => campaignService.getCampaign(id), enabled: Boolean(id) });
}

export function useCampaignDashboard() {
  return useQuery({ queryKey: campaignKeys.dashboard, queryFn: campaignService.getDashboard });
}

export function useCampaignAnalytics(id: string) {
  return useQuery({ queryKey: campaignKeys.analytics(id), queryFn: () => campaignService.getCampaignAnalytics(id), enabled: Boolean(id) });
}

export function useCampaignHealth(id: string) {
  return useQuery({ queryKey: campaignKeys.health(id), queryFn: () => campaignService.getCampaignHealth(id), enabled: Boolean(id) });
}

export function useCampaignTemplates() {
  return useQuery({ queryKey: campaignKeys.templates, queryFn: campaignService.getTemplates });
}

export function useCampaignHistory() {
  return useQuery({ queryKey: campaignKeys.history, queryFn: campaignService.getHistory });
}

function updateCampaignCache(campaigns: Campaign[] | undefined, updatedCampaign: Campaign) {
  return (campaigns ?? []).map((campaign) => (campaign.id === updatedCampaign.id ? updatedCampaign : campaign));
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.createCampaign,
    onSuccess: (campaign) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns = []) => [campaign, ...campaigns]);
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    }
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Campaign> }) => campaignService.updateCampaign(id, updates),
    onSuccess: (campaign) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns) => updateCampaignCache(campaigns, campaign));
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    }
  });
}

export function usePauseCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.pauseCampaign,
    onSuccess: (campaign) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns) => updateCampaignCache(campaigns, campaign));
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    }
  });
}

export function useResumeCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.resumeCampaign,
    onSuccess: (campaign) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns) => updateCampaignCache(campaigns, campaign));
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    }
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.deleteCampaign,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns = []) => campaigns.filter((campaign) => campaign.id !== id));
      queryClient.removeQueries({ queryKey: campaignKeys.detail(id) });
    }
  });
}

export function useDuplicateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.duplicateCampaign,
    onSuccess: (campaign) => {
      queryClient.setQueryData<Campaign[]>(campaignKeys.all, (campaigns = []) => [campaign, ...campaigns]);
    }
  });
}
