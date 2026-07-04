import { Link } from "@tanstack/react-router";
import { Archive, Copy, Download, Pause, Play, UserRoundCheck } from "lucide-react";

import { HealthRing } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Checkbox, Table } from "@/components/ui";
import type { Campaign, Employee } from "@/types";

import { formatRevenue, statusLabel, statusTone } from "./campaignDisplay";

export function CampaignCard({ campaign, onPause, onResume, onDuplicate }: { campaign: Campaign; onPause: (id: string) => void; onResume: (id: string) => void; onDuplicate: (id: string) => void }) {
  return (
    <Card className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader
        title={<Link to="/app/campaigns/$campaignId" params={{ campaignId: campaign.id }} className="hover:text-[var(--ai-accent)]">{campaign.name}</Link>}
        description={campaign.businessGoal}
        action={<Badge tone={statusTone(campaign.status)}>{statusLabel(campaign.status)}</Badge>}
      />
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{campaign.assignedEmployeeName}</p>
            <p className="text-xs text-[var(--text-muted)]">{campaign.type} | {campaign.department}</p>
          </div>
          <HealthRing value={campaign.health ?? 82} label="Health" />
        </div>
        <div className="h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${campaign.progress}%` }} /></div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <Metric label="Contacts" value={String(campaign.contacts)} />
          <Metric label="Progress" value={`${campaign.progress}%`} />
          <Metric label="Appointments" value={String(campaign.appointments)} />
          <Metric label="Revenue" value={formatRevenue(campaign.revenueInfluenced)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/app/employees/$employeeId" params={{ employeeId: campaign.assignedEmployeeId }} className="inline-flex h-9 items-center rounded-[12px] border border-[var(--border)] px-3 text-sm font-semibold hover:bg-[var(--surface-elevated)]">Employee</Link>
          {campaign.status === "paused" ? (
            <Button variant="secondary" size="sm" type="button" onClick={() => onResume(campaign.id)}><Play className="h-4 w-4" />Resume</Button>
          ) : (
            <Button variant="secondary" size="sm" type="button" onClick={() => onPause(campaign.id)}><Pause className="h-4 w-4" />Pause</Button>
          )}
          <Button variant="secondary" size="sm" type="button" onClick={() => onDuplicate(campaign.id)}><Copy className="h-4 w-4" />Duplicate</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><p className="font-display text-lg font-semibold text-[var(--text-primary)]">{value}</p><p className="text-xs text-[var(--text-muted)]">{label}</p></div>;
}

export function CampaignTable({ campaigns, selectedIds, onSelectionChange }: { campaigns: Campaign[]; selectedIds: string[]; onSelectionChange: (ids: string[]) => void }) {
  const allSelected = campaigns.length > 0 && campaigns.every((campaign) => selectedIds.includes(campaign.id));
  const toggle = (id: string) => onSelectionChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  return (
    <Table>
      <thead>
        <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <th className="p-3"><Checkbox checked={allSelected} onChange={(event) => onSelectionChange(event.target.checked ? campaigns.map((campaign) => campaign.id) : [])} aria-label="Select all campaigns" /></th>
          {["Campaign", "Status", "Employee", "Contacts", "Calls", "Appointments", "Revenue", "Health", "Launch Date", "Actions"].map((header) => <th key={header} className="p-3">{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign) => (
          <tr key={campaign.id} className="border-b border-[var(--border)] last:border-0">
            <td className="p-3"><Checkbox checked={selectedIds.includes(campaign.id)} onChange={() => toggle(campaign.id)} aria-label={`Select ${campaign.name}`} /></td>
            <td className="min-w-64 p-3"><Link to="/app/campaigns/$campaignId" params={{ campaignId: campaign.id }} className="font-semibold text-[var(--text-primary)]">{campaign.name}</Link><p className="text-xs text-[var(--text-muted)]">{campaign.businessGoal}</p></td>
            <td className="p-3"><Badge tone={statusTone(campaign.status)}>{statusLabel(campaign.status)}</Badge></td>
            <td className="p-3"><Link to="/app/employees/$employeeId" params={{ employeeId: campaign.assignedEmployeeId }} className="font-semibold text-[var(--ai-accent)]">{campaign.assignedEmployeeName}</Link></td>
            <td className="p-3 text-[var(--text-secondary)]">{campaign.contacts}</td>
            <td className="p-3 text-[var(--text-secondary)]">{Math.round((campaign.contacts * campaign.progress) / 100)}</td>
            <td className="p-3 text-[var(--text-secondary)]">{campaign.appointments}</td>
            <td className="p-3 text-[var(--text-secondary)]">{formatRevenue(campaign.revenueInfluenced)}</td>
            <td className="p-3"><Badge tone={(campaign.health ?? 0) > 85 ? "green" : "amber"}>{campaign.health}%</Badge></td>
            <td className="p-3 text-[var(--text-secondary)]">{campaign.launchDate ? new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(campaign.launchDate)) : "Planned"}</td>
            <td className="p-3"><Link to="/app/campaigns/$campaignId" params={{ campaignId: campaign.id }} className="font-semibold text-[var(--ai-accent)]">Open</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export function CampaignBulkActions({ count, onClear }: { count: number; onClear: () => void }) {
  if (count === 0) return null;
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold">{count} campaigns selected</p>
        <div className="flex flex-wrap gap-2">
          {[
            ["Pause", Pause],
            ["Resume", Play],
            ["Archive", Archive],
            ["Duplicate", Copy],
            ["Export", Download],
            ["Assign Employee", UserRoundCheck]
          ].map(([label, Icon]) => (
            <Button key={String(label)} variant="secondary" size="sm" type="button"><Icon className="h-4 w-4" />{String(label)}</Button>
          ))}
          <Button variant="ghost" size="sm" type="button" onClick={onClear}>Clear</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CampaignToolbar({ filters, employees, departments, view, onViewChange, onFilterChange, onReset }: { filters: import("../types/campaignModule.types").CampaignFilters; employees: Employee[]; departments: string[]; view: "grid" | "table"; onViewChange: (view: "grid" | "table") => void; onFilterChange: <TKey extends keyof import("../types/campaignModule.types").CampaignFilters>(key: TKey, value: import("../types/campaignModule.types").CampaignFilters[TKey]) => void; onReset: () => void }) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row">
          <input className="h-11 flex-1 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.search} onChange={(event) => onFilterChange("search", event.target.value)} placeholder="Search campaign name, employee, department, business goal or knowledge" aria-label="Search campaigns" />
          <div className="flex gap-2"><Button variant={view === "grid" ? "primary" : "secondary"} type="button" onClick={() => onViewChange("grid")}>Cards</Button><Button variant={view === "table" ? "primary" : "secondary"} type="button" onClick={() => onViewChange("table")}>Table</Button><Button variant="secondary" type="button" onClick={onReset}>Reset</Button></div>
        </div>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.status} onChange={(event) => onFilterChange("status", event.target.value as typeof filters.status)} aria-label="Filter by status"><option value="all">All Statuses</option>{["draft", "scheduled", "running", "paused", "completed", "cancelled", "archived"].map((status) => <option key={status} value={status}>{statusLabel(status as Campaign["status"])}</option>)}</select>
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.employeeId} onChange={(event) => onFilterChange("employeeId", event.target.value)} aria-label="Filter by employee"><option value="all">All Employees</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select>
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.department} onChange={(event) => onFilterChange("department", event.target.value)} aria-label="Filter by department"><option value="all">All Departments</option>{departments.map((department) => <option key={department} value={department}>{department}</option>)}</select>
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.type} onChange={(event) => onFilterChange("type", event.target.value as typeof filters.type)} aria-label="Filter by type"><option value="all">All Types</option>{["Sales", "Lead Qualification", "Renewals", "Customer Support", "Claims", "Collections", "Recruitment", "Surveys", "Feedback", "Custom Campaign"].map((type) => <option key={type} value={type}>{type}</option>)}</select>
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.priority} onChange={(event) => onFilterChange("priority", event.target.value as typeof filters.priority)} aria-label="Filter by priority"><option value="all">All Priorities</option>{["low", "medium", "high", "critical"].map((priority) => <option key={priority} value={priority}>{priority}</option>)}</select>
          <select className="h-11 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" value={filters.date} onChange={(event) => onFilterChange("date", event.target.value as typeof filters.date)} aria-label="Filter by date"><option value="all">Any Date</option><option value="week">Last 7 Days</option><option value="month">Last 30 Days</option></select>
        </div>
      </CardContent>
    </Card>
  );
}
