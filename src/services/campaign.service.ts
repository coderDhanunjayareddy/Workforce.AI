import { mockApi } from "@/mocks/mockApi";
import { campaigns } from "@/mocks/mockData";
import type { Campaign } from "@/types";

export const campaignService = {
  getCampaigns: () => mockApi<Campaign[]>(() => campaigns),
  getCampaign: (id: string) =>
    mockApi<Campaign>(() => {
      const campaign = campaigns.find((item) => item.id === id);
      if (!campaign) throw new Error("Campaign was not found.");
      return campaign;
    }),
  createCampaign: (campaign: Campaign) => mockApi<Campaign>(() => campaign),
  pauseCampaign: (id: string) =>
    mockApi<Campaign>(() => ({ ...campaigns.find((item) => item.id === id)!, status: "paused" })),
  resumeCampaign: (id: string) =>
    mockApi<Campaign>(() => ({ ...campaigns.find((item) => item.id === id)!, status: "running" }))
};
