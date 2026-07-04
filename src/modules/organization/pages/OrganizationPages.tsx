import { toast } from "sonner";
import type { ReactNode } from "react";

import { EmptyState, ErrorState, LoadingState } from "@/components/shared";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import {
  useGenerateApiKey,
  useInviteTeamMember,
  useOrganizationAdmin,
  useUpdateOrganizationNotifications,
  useUpdateOrganizationProfile
} from "@/hooks";
import type { OrganizationAdminDashboard } from "@/types";

import { OrganizationShell } from "../components/OrganizationShell";
import {
  AdminKpis,
  NotificationSettingsPanel,
  OrganizationProfilePanel,
  RolesPermissions,
  SecurityCenter,
  SupportResources,
  TeamManagement,
  WorkforceDefaultsPanel,
  WorkspaceHealth
} from "../components/OrganizationViews";
import {
  ApiManagementPanel,
  AuditLogTable,
  BillingPanel,
  DataManagementPanel,
  IntegrationsGrid,
  SystemHealthPanel,
  WorkspaceCustomizationPanel
} from "../components/SettingsViews";

export type OrganizationSection =
  | "organization"
  | "profile"
  | "team"
  | "roles"
  | "settings"
  | "security"
  | "integrations"
  | "billing"
  | "api"
  | "notifications"
  | "audit";

const sectionPaths: Record<OrganizationSection, string> = {
  organization: "/app/organization",
  profile: "/app/organization/profile",
  team: "/app/organization/team",
  roles: "/app/organization/roles",
  settings: "/app/settings",
  security: "/app/settings/security",
  integrations: "/app/settings/integrations",
  billing: "/app/settings/billing",
  api: "/app/settings/api",
  notifications: "/app/settings/notifications",
  audit: "/app/settings/audit"
};

export function OrganizationPage({ section = "organization" }: { section?: OrganizationSection }) {
  const dashboardQuery = useOrganizationAdmin();
  const updateProfile = useUpdateOrganizationProfile();
  const inviteMember = useInviteTeamMember();
  const updateNotifications = useUpdateOrganizationNotifications();
  const generateApiKey = useGenerateApiKey();

  const handleSave = async () => {
    if (!dashboardQuery.data) return;
    await updateProfile.mutateAsync({ name: dashboardQuery.data.profile.name });
    toast.success("Organization settings saved.");
  };

  const handleInvite = async () => {
    await inviteMember.mutateAsync("new.teammate@nova-insurance.demo");
    toast.success("Team invitation sent.");
  };

  const handleNotifications = async () => {
    if (!dashboardQuery.data) return;
    await updateNotifications.mutateAsync(dashboardQuery.data.notifications);
    toast.success("Notification preferences saved.");
  };

  const handleGenerateApiKey = async () => {
    await generateApiKey.mutateAsync("Operations Integration Key");
    toast.success("API key generated.");
  };

  return (
    <OrganizationShell activePath={sectionPaths[section]}>
      {dashboardQuery.isLoading ? <LoadingState label="Loading organization settings" /> : null}
      {dashboardQuery.isError ? (
        <ErrorState title="Settings Error" description="We could not load the administration center. Retry the request or contact support." onRetry={() => void dashboardQuery.refetch()} />
      ) : null}
      {dashboardQuery.data ? (
        <OrganizationContent
          section={section}
          dashboard={dashboardQuery.data}
          onSave={handleSave}
          onInvite={handleInvite}
          onNotifications={handleNotifications}
          onGenerateApiKey={handleGenerateApiKey}
          saving={updateProfile.isPending}
          inviting={inviteMember.isPending}
          savingNotifications={updateNotifications.isPending}
          generating={generateApiKey.isPending}
        />
      ) : null}
      {!dashboardQuery.isLoading && !dashboardQuery.data && !dashboardQuery.isError ? (
        <EmptyState title="No team members found." description="Invite your first teammate to collaborate in Workforce AI." action={<Button onClick={handleInvite}>Invite Member</Button>} />
      ) : null}
    </OrganizationShell>
  );
}

function OrganizationContent({
  section,
  dashboard,
  onSave,
  onInvite,
  onNotifications,
  onGenerateApiKey,
  saving,
  inviting,
  savingNotifications,
  generating
}: {
  section: OrganizationSection;
  dashboard: OrganizationAdminDashboard;
  onSave: () => void;
  onInvite: () => void;
  onNotifications: () => void;
  onGenerateApiKey: () => void;
  saving: boolean;
  inviting: boolean;
  savingNotifications: boolean;
  generating: boolean;
}) {
  if (section === "profile") return <Stack><OrganizationProfilePanel dashboard={dashboard} /><ActionBar onSave={onSave} saving={saving} /></Stack>;
  if (section === "team") return <Stack><TeamManagement team={dashboard.team} /><ActionBar onInvite={onInvite} inviting={inviting} /></Stack>;
  if (section === "roles") return <RolesPermissions roles={dashboard.roles} />;
  if (section === "security") return <Stack><SecurityCenter dashboard={dashboard} /><SystemHealthPanel dashboard={dashboard} /></Stack>;
  if (section === "integrations") return <IntegrationsGrid integrations={dashboard.integrations} />;
  if (section === "billing") return <BillingPanel dashboard={dashboard} />;
  if (section === "api") return <ApiManagementPanel dashboard={dashboard} onGenerate={onGenerateApiKey} generating={generating} />;
  if (section === "notifications") return <Stack><NotificationSettingsPanel dashboard={dashboard} /><ActionBar onSave={onNotifications} saving={savingNotifications} /></Stack>;
  if (section === "audit") return <AuditLogTable dashboard={dashboard} />;
  if (section === "settings") {
    return (
      <Stack>
        <SecurityCenter dashboard={dashboard} />
        <WorkforceDefaultsPanel dashboard={dashboard} />
        <NotificationSettingsPanel dashboard={dashboard} />
        <IntegrationsGrid integrations={dashboard.integrations.slice(0, 6)} />
        <WorkspaceCustomizationPanel dashboard={dashboard} />
        <SystemHealthPanel dashboard={dashboard} />
        <DataManagementPanel dashboard={dashboard} />
        <SupportResources dashboard={dashboard} />
      </Stack>
    );
  }
  return (
    <Stack>
      <AdminKpis dashboard={dashboard} />
      <WorkspaceHealth dashboard={dashboard} />
      <OrganizationProfilePanel dashboard={dashboard} />
      <TeamManagement team={dashboard.team} />
      <RolesPermissions roles={dashboard.roles} />
      <BillingPanel dashboard={dashboard} />
    </Stack>
  );
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

function ActionBar({
  onSave,
  onInvite,
  saving,
  inviting
}: {
  onSave?: () => void;
  onInvite?: () => void;
  saving?: boolean;
  inviting?: boolean;
}) {
  return (
    <Card>
      <CardHeader title="Administration Actions" description="Changes are applied through mock services and will be ready for backend API replacement." />
      <CardContent className="flex flex-wrap gap-2">
        {onSave ? <Button loading={saving} onClick={onSave}>Save Changes</Button> : null}
        {onInvite ? <Button loading={inviting} onClick={onInvite}>Invite Team Member</Button> : null}
      </CardContent>
    </Card>
  );
}
