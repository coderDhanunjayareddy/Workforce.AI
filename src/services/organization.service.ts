import { mockApi } from "@/mocks/mockApi";
import { organization } from "@/mocks/mockData";
import type { Organization } from "@/types";

export const organizationService = {
  getOrganization: () => mockApi<Organization>(() => organization),
  updateOrganization: (updates: Partial<Organization>) =>
    mockApi<Organization>(() => ({ ...organization, ...updates }))
};
