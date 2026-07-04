import { Link } from "@tanstack/react-router";
import { BarChart3, CreditCard, Database, KeyRound, PlugZap, ShieldAlert } from "lucide-react";

import { MetricCard } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Input, Table } from "@/components/ui";
import type { Integration, OrganizationAdminDashboard } from "@/types";

export function IntegrationsGrid({ integrations }: { integrations: Integration[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {integrations.map((integration) => (
        <Card key={integration.id}>
          <CardHeader
            title={integration.name}
            description={`${integration.category} integration`}
            action={<Badge tone={integration.status === "connected" ? "green" : integration.status === "error" ? "red" : "slate"}>{integration.status}</Badge>}
          />
          <CardContent>
            <p className="text-sm leading-6 text-[var(--text-secondary)]">{integration.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Last Sync</p>
            <p className="mt-1 font-semibold">{integration.lastSync}</p>
            <div className="mt-5 flex gap-2">
              <Button size="sm" variant={integration.status === "connected" ? "secondary" : "primary"}>{integration.status === "connected" ? "Configure" : "Connect"}</Button>
              {integration.status === "connected" ? <Button size="sm" variant="ghost">Disconnect</Button> : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function BillingPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const billing = dashboard.billing;
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={CreditCard} label="Subscription" value={billing.subscription} trend="Active" subtitle={`Renews ${billing.renewalDate}`} />
        <MetricCard icon={BarChart3} label="Seats" value={`${billing.seatsUsed} / ${billing.seatsLimit}`} trend="64%" subtitle="Human user seats" />
        <MetricCard icon={Database} label="AI Employees" value={`${billing.aiEmployeesUsed} / ${billing.aiEmployeesLimit}`} trend="60%" subtitle="Plan capacity" />
        <MetricCard icon={PlugZap} label="API Usage" value={billing.apiUsage.toLocaleString("en-IN")} trend="+18%" subtitle="Requests today" />
      </div>
      <Card>
        <CardHeader title="Invoices" description={`Payment method: ${billing.paymentMethod}`} action={<Button size="sm">Upgrade Plan</Button>} />
        <CardContent>
          <Table>
            <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Invoice", "Date", "Amount", "Status", "Action"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
            <tbody>{billing.invoices.map((invoice) => <tr key={invoice.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3 font-semibold">{invoice.id}</td><td className="p-3">{invoice.date}</td><td className="p-3">{invoice.amount}</td><td className="p-3"><Badge tone={invoice.status === "paid" ? "green" : invoice.status === "upcoming" ? "blue" : "red"}>{invoice.status}</Badge></td><td className="p-3"><Button variant="secondary" size="sm">Preview</Button></td></tr>)}</tbody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export function ApiManagementPanel({ dashboard, onGenerate, generating }: { dashboard: OrganizationAdminDashboard; onGenerate: () => void; generating: boolean }) {
  const api = dashboard.api;
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={KeyRound} label="API Requests Today" value={api.requestsToday.toLocaleString("en-IN")} trend="+18%" subtitle="Secure workspace traffic" />
        <MetricCard icon={ShieldAlert} label="Error Rate" value={`${api.errorRate}%`} trend="Healthy" subtitle="Integration reliability" />
        <MetricCard icon={PlugZap} label="Webhook Endpoints" value={String(api.webhooks.length)} trend="Active" subtitle="Outbound events" />
      </div>
      <Card>
        <CardHeader title="API Keys" description="Generate, rotate and revoke mock API keys for backend integration." action={<Button size="sm" loading={generating} onClick={onGenerate}>Generate API Key</Button>} />
        <CardContent className="space-y-3">
          {api.keys.map((key) => (
            <div key={key.id} className="flex flex-col gap-3 rounded-[16px] border border-[var(--border)] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{key.name}</p>
                <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">{key.keyPreview}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Created {key.created} | Last used {key.lastUsed}</p>
              </div>
              <div className="flex gap-2"><Badge tone="green">{key.status}</Badge><Button size="sm" variant="secondary">Rotate</Button><Button size="sm" variant="ghost">Revoke</Button></div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Webhook Endpoints" description="Send business events to approved internal systems." action={<Link to={api.documentationUrl}><Button size="sm" variant="secondary">Documentation</Button></Link>} />
        <CardContent className="space-y-3">
          {api.webhooks.map((webhook) => <MetricBox key={webhook.id} label={webhook.url} value={webhook.events.join(", ")} helper={webhook.status} />)}
        </CardContent>
      </Card>
    </section>
  );
}

export function AuditLogTable({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <Card>
      <CardHeader title="Audit Logs" description="Login, knowledge, campaign, employee, role, billing, security events and IP Address tracking." action={<Input aria-label="Search audit logs" placeholder="Search audit logs" className="w-56" />} />
      <CardContent>
        <Table>
          <thead><tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{["Timestamp", "User", "Action", "Resource", "IP Address", "Status"].map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead>
          <tbody>{dashboard.auditLogs.map((log) => <tr key={log.id} className="border-b border-[var(--border)] last:border-0"><td className="p-3">{log.timestamp}</td><td className="p-3 font-semibold">{log.user}</td><td className="p-3">{log.action}</td><td className="p-3">{log.resource}</td><td className="p-3">{log.ipAddress}</td><td className="p-3"><Badge tone={log.status === "success" ? "green" : log.status === "blocked" ? "red" : "amber"}>{log.status}</Badge></td></tr>)}</tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function WorkspaceCustomizationPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  const items = Object.entries(dashboard.customization);
  return (
    <Card>
      <CardHeader title="Workspace Customization" description="Logo, brand colors, company name, email footer, signatures and dashboard layout." />
      <CardContent className="grid gap-3 md:grid-cols-2">
        {items.map(([key, value]) => <label key={key} className="space-y-1 text-sm font-semibold"><span>{labelize(key)}</span><Input defaultValue={String(value)} aria-label={labelize(key)} /></label>)}
      </CardContent>
    </Card>
  );
}

export function SystemHealthPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dashboard.systemHealth.map((item) => (
        <Card key={item.id}>
          <CardHeader title={item.service} description={item.description} action={<Badge tone={item.status === "operational" ? "green" : item.status === "degraded" ? "amber" : "blue"}>{item.status}</Badge>} />
          <CardContent><p className="font-display text-2xl font-semibold">{item.value}</p></CardContent>
        </Card>
      ))}
    </section>
  );
}

export function DataManagementPanel({ dashboard }: { dashboard: OrganizationAdminDashboard }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Data Management</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Export, import, back up, restore and review restricted workspace data actions.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.dataManagement.map((item) => (
          <Card key={item.id}>
            <CardHeader title={item.title} description={item.description} />
            <CardContent><Button variant={item.tone === "danger" ? "danger" : item.tone === "secondary" ? "secondary" : "primary"}>{item.action}</Button></CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function MetricBox({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-sm text-[var(--text-secondary)]">{label}</p><p className="mt-2 font-display text-lg font-semibold">{value}</p>{helper ? <p className="mt-2 text-xs text-[var(--text-muted)]">{helper}</p> : null}</div>;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
