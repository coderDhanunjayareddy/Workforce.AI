import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { organizationService } from "@/services";
import type { NotificationSettings, OrganizationAdminDashboard, OrganizationProfile, TeamMember } from "@/types";

export const organizationKeys = {
  organization: ["organization"] as const,
  admin: ["organization", "admin"] as const,
  team: ["organization", "team"] as const,
  roles: ["organization", "roles"] as const,
  security: ["organization", "security"] as const,
  billing: ["organization", "billing"] as const,
  integrations: ["organization", "integrations"] as const,
  notifications: ["organization", "notifications"] as const,
  audit: ["organization", "audit"] as const
};

export function useOrganizationQuery() {
  return useQuery({ queryKey: organizationKeys.organization, queryFn: organizationService.getOrganization });
}

export function useOrganizationAdmin() {
  return useQuery({ queryKey: organizationKeys.admin, queryFn: organizationService.getAdminDashboard });
}

export function useTeam() {
  return useQuery({ queryKey: organizationKeys.team, queryFn: organizationService.getTeam });
}

export function useRoles() {
  return useQuery({ queryKey: organizationKeys.roles, queryFn: organizationService.getRoles });
}

export function useSecurity() {
  return useQuery({ queryKey: organizationKeys.security, queryFn: organizationService.getSecurity });
}

export function useBilling() {
  return useQuery({ queryKey: organizationKeys.billing, queryFn: organizationService.getBilling });
}

export function useIntegrations() {
  return useQuery({ queryKey: organizationKeys.integrations, queryFn: organizationService.getIntegrations });
}

export function useOrganizationNotifications() {
  return useQuery({ queryKey: organizationKeys.notifications, queryFn: organizationService.getNotifications });
}

export function useAuditLogs() {
  return useQuery({ queryKey: organizationKeys.audit, queryFn: organizationService.getAuditLogs });
}

export function useUpdateOrganizationProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: Partial<OrganizationProfile>) => organizationService.updateProfile(profile),
    onSuccess: (profile) => {
      queryClient.setQueryData<OrganizationAdminDashboard>(organizationKeys.admin, (dashboard) =>
        dashboard ? { ...dashboard, profile } : dashboard
      );
    }
  });
}

export function useInviteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: organizationService.inviteTeamMember,
    onSuccess: (member) => {
      queryClient.setQueryData<TeamMember[]>(organizationKeys.team, (team = []) => [member, ...team]);
      queryClient.setQueryData<OrganizationAdminDashboard>(organizationKeys.admin, (dashboard) =>
        dashboard ? { ...dashboard, team: [member, ...dashboard.team] } : dashboard
      );
    }
  });
}

export function useUpdateOrganizationNotifications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: NotificationSettings) => organizationService.updateNotifications(settings),
    onSuccess: (notifications) => {
      queryClient.setQueryData(organizationKeys.notifications, notifications);
      queryClient.setQueryData<OrganizationAdminDashboard>(organizationKeys.admin, (dashboard) =>
        dashboard ? { ...dashboard, notifications } : dashboard
      );
    }
  });
}

export function useGenerateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: organizationService.generateApiKey,
    onSuccess: (key) => {
      queryClient.setQueryData<OrganizationAdminDashboard>(organizationKeys.admin, (dashboard) =>
        dashboard ? { ...dashboard, api: { ...dashboard.api, keys: [key, ...dashboard.api.keys] } } : dashboard
      );
    }
  });
}
