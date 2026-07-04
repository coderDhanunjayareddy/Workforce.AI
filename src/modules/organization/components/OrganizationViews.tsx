import { Link } from "@tanstack/react-router";
import { Building2, Clock, Globe2, ShieldCheck, UsersRound } from "lucide-react";

import { HealthRing, MetricCard } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Checkbox, Input, Table } from "@/components/ui";
import type { OrganizationAdminDashboard, OrganizationRole, TeamMember } from "@/types";

export function AdminKpis({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const kpis = dashboard.kpis;
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
      <MetricCard icon={UsersRound} label="Human Users" value={String(kpis.humanUsers)} trend="+6" subtitle="Active workspace users" />
      <MetricCard icon={UsersRound} label="AI Employees" value={String(kpis.aiEmployees)} trend="+2" subtitle="Digital workforce size" />
      <MetricCard icon={Building2} label="Departments" value={String(kpis.departments)} trend="Live" subtitle="Business units configured" />
      <MetricCard icon={Globe2} label="Storage" value={`${kpis.storageUsedGb} GB / ${kpis.storageLimitGb} GB`} trend="14%" subtitle="Knowledge and reports" />
      <MetricCard icon={Clock} label="API Requests Today" value={kpis.apiRequestsToday.toLocaleString("en-IN")} trend="+18%" subtitle="Integration activity" />
      <MetricCard icon={ShieldCheck} label="Subscription" value={kpis.subscription} trend="Active" subtitle="Enterprise plan" />
    </section>
  );
}

export function OrganizationProfilePanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const profile = dashboard.profile;
  const fields = [
    ["Organization Name", profile.name],
    ["Website", profile.website],
    ["Industry", profile.industry],
    ["Phone", profile.phone],
    ["Email", profile.email],
    ["Country", profile.country],
    ["Timezone", profile.timezone],
    ["Business Hours", profile.businessHours],
    ["Currency", profile.currency],
    ["Date Format", profile.dateFormat],
    ["Language", profile.language],
    ["Workspace URL", profile.workspaceUrl]
  ];
  return (
    <Card>
      <CardHeader title="Organization Profile" description="Core workspace identity, locale and business operating preferences." action={<Badge tone="green">Enterprise Ready</Badge>} />
      <CardContent className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="grid place-items-center rounded-[20px] bg-[var(--surface-elevated)] p-6 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-[24px] bg-[var(--primary)] font-display text-3xl font-semibold text-white">{profile.logoInitials}</div>
          <p className="mt-4 font-semibold">{profile.name}</p>
          <p className="text-sm text-[var(--text-secondary)]">{profile.industry}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {fields.map(([label, value]) => (
            <label key={label} className="space-y-1 text-sm font-semibold">
              <span>{label}</span>
              <Input defaultValue={value} aria-label={label} />
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkspaceHealth({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.7fr_1fr]">
      <Card>
        <CardHeader title="Workspace Health" description="Security, storage, knowledge and service readiness." />
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <HealthRing value={98} label="Overall Readiness" />
          {dashboard.systemHealth.slice(0, 5).map((item) => (
            <MetricBox key={item.id} label={item.service} value={item.value} helper={item.description} />
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Recent Activity" description="Administrative changes and security-relevant workspace events." />
        <CardContent className="space-y-3">
          {dashboard.recentActivity.map((item) => (
            <div key={item.id} className="rounded-[16px] border border-[var(--border)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">{item.action}</p>
                <Badge tone={item.status === "success" ? "green" : item.status === "blocked" ? "red" : "amber"}>{item.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.user} updated {item.resource}</p>
              <p className="mt-2 text-xs text-[var(--text-muted)]">{item.timestamp} | {item.ipAddress}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export function TeamManagement({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;
  return (
    <Card>
      <CardHeader title="Team Management" description="Invite, edit, deactivate, assign roles and review access for human users." action={<Button size="sm">Invite Member</Button>} />
      <CardContent>
        <Table>
          <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["User", "Email", "Department", "Role", "Status", "Last Login", "Actions"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
          <tbody>{team.map((member) => <tr key={member.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-elevated)] text-xs font-bold">{member.avatar}</span><span className="font-semibold">{member.name}</span></div></td><td className="p-3 text-[var(--text-secondary)]">{member.email}</td><td className="p-3">{member.department}</td><td className="p-3">{member.role}</td><td className="p-3"><Badge tone={member.status === "active" ? "green" : member.status === "invited" ? "blue" : "slate"}>{member.status}</Badge></td><td className="p-3">{member.lastLogin}</td><td className="p-3"><Button variant="secondary" size="sm">Edit</Button></td></tr>)}</tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function RolesPermissions({ roles }: { roles: OrganizationRole[] }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Roles & Permissions</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Control what each human user can view, edit, launch, export and manage.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader title={role.name} description={role.description} action={<Badge tone="teal">{role.users} users</Badge>} />
            <CardContent className="space-y-3">
              {role.permissions.map((permission) => (
                <div key={permission.area} className="rounded-[16px] bg-[var(--surface-elevated)] p-3">
                  <p className="font-semibold">{permission.area}</p>
                  <div className="mt-2 flex flex-wrap gap-2">{permission.permissions.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function SecurityCenter({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const security = dashboard.security;
  return (
    <section className="grid gap-6 xl:grid-cols-[0.7fr_1fr]">
      <Card>
        <CardHeader title="Security Center" description="Password policy, session timeout, two-factor access and device controls." />
        <CardContent className="space-y-4">
          <MetricBox label="Password Policy" value={security.passwordPolicy} />
          <MetricBox label="Session Timeout" value={security.sessionTimeout} />
          {[
            ["Two-Factor Authentication", security.twoFactorEnabled],
            ["IP Whitelist", security.ipWhitelistEnabled],
            ["Device Management", security.deviceManagement]
          ].map(([label, enabled]) => <label key={String(label)} className="flex items-center gap-3 rounded-[16px] bg-[var(--surface-elevated)] p-3 text-sm font-semibold"><Checkbox defaultChecked={Boolean(enabled)} aria-label={String(label)} />{label}</label>)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Active Sessions" description="Devices currently authorized for this organization." />
        <CardContent>
          <Table>
            <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Device", "Browser", "Location", "IP Address", "Last Active", "Action"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
            <tbody>{security.activeSessions.map((session) => <tr key={session.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{session.device}</td><td className="p-3">{session.browser}</td><td className="p-3">{session.location}</td><td className="p-3">{session.ipAddress}</td><td className="p-3">{session.lastActive}</td><td className="p-3"><Button variant="secondary" size="sm">Terminate</Button></td></tr>)}</tbody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export function WorkforceDefaultsPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const defaults = dashboard.workforceDefaults;
  return (
    <Card>
      <CardHeader title="AI Workforce Defaults" description="Default behavior applied when new AI Employees join this organization." />
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(defaults).map(([key, value]) => <MetricBox key={key} label={labelize(key)} value={String(value)} />)}
      </CardContent>
    </Card>
  );
}

export function NotificationSettingsPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <Card>
      <CardHeader title="Notification Settings" description="Control email, push, campaign, conversation, security, knowledge and employee health alerts." action={<Button size="sm">Save Preferences</Button>} />
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(dashboard.notifications).map(([key, enabled]) => (
          <label key={key} className="flex items-center gap-3 rounded-[16px] bg-[var(--surface-elevated)] p-4 text-sm font-semibold">
            <Checkbox defaultChecked={enabled} aria-label={labelize(key)} />
            {labelize(key)}
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

export function SupportResources({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboard.support.map((item) => (
        <Link key={item.id} to={item.href} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
          <p className="font-display text-lg font-semibold">{item.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
        </Link>
      ))}
    </section>
  );
}

function MetricBox({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-sm text-[var(--text-secondary)]">{label}</p><p className="mt-2 font-display text-lg font-semibold">{value}</p>{helper ? <p className="mt-2 text-xs text-[var(--text-muted)]">{helper}</p> : null}</div>;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
