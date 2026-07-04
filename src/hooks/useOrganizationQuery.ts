import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services";

export function useOrganizationQuery() {
  return useQuery({ queryKey: ["organization"], queryFn: organizationService.getOrganization });
}
