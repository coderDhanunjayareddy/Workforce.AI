import { Grid3X3, ListFilter, RotateCcw, Table2 } from "lucide-react";

import { Button, Card, CardContent, Input, Select, Tabs } from "@/components/ui";
import type { Contact, Employee } from "@/types";

import type { ContactFilters, ContactViewMode } from "../types/contactModule.types";

interface ContactToolbarProps {
  filters: ContactFilters;
  campaigns: string[];
  employees: Employee[];
  industries: string[];
  policyTypes: string[];
  locations: string[];
  view: ContactViewMode;
  onViewChange: (view: ContactViewMode) => void;
  onFilterChange: <TKey extends keyof ContactFilters>(key: TKey, value: ContactFilters[TKey]) => void;
  onReset: () => void;
}

export function ContactToolbar({
  filters,
  campaigns,
  employees,
  industries,
  policyTypes,
  locations,
  view,
  onViewChange,
  onFilterChange,
  onReset
}: ContactToolbarProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative flex-1">
            <span className="sr-only">Search contacts by name, phone, email, company, policy number or tags</span>
            <Input
              value={filters.search}
              onChange={(event) => onFilterChange("search", event.target.value)}
              placeholder="Search by name, phone, email, company, policy number or tags"
              aria-label="Search contacts"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              active={view}
              onChange={(id) => onViewChange(id as ContactViewMode)}
              tabs={[
                { id: "grid", label: <span className="inline-flex items-center gap-2"><Grid3X3 className="h-4 w-4" />Cards</span> },
                { id: "table", label: <span className="inline-flex items-center gap-2"><Table2 className="h-4 w-4" />Table</span> }
              ]}
            />
            <Button variant="secondary" type="button" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8" aria-label="Smart filters">
          <Select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value as Contact["status"] | "all")} aria-label="Filter by status">
            <option value="all">All Statuses</option>
            <option value="new-lead">New Lead</option>
            <option value="qualified">Qualified</option>
            <option value="customer">Customer</option>
            <option value="renewal-due">Renewal Due</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
            <option value="archived">Archived</option>
          </Select>
          <Select value={filters.leadScore} onChange={(event) => onFilterChange("leadScore", event.target.value as ContactFilters["leadScore"])} aria-label="Filter by lead score">
            <option value="all">All Scores</option>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
            <option value="hot">Hot</option>
            <option value="qualified">Qualified</option>
          </Select>
          <Select value={filters.campaign} onChange={(event) => onFilterChange("campaign", event.target.value)} aria-label="Filter by campaign">
            <option value="all">All Campaigns</option>
            {campaigns.map((campaign) => <option key={campaign} value={campaign}>{campaign}</option>)}
          </Select>
          <Select value={filters.assignedEmployeeId} onChange={(event) => onFilterChange("assignedEmployeeId", event.target.value)} aria-label="Filter by assigned employee">
            <option value="all">All Employees</option>
            {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
          </Select>
          <Select value={filters.industry} onChange={(event) => onFilterChange("industry", event.target.value)} aria-label="Filter by industry">
            <option value="all">All Industries</option>
            {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
          </Select>
          <Select value={filters.policyType} onChange={(event) => onFilterChange("policyType", event.target.value)} aria-label="Filter by policy type">
            <option value="all">All Policy Types</option>
            {policyTypes.map((policyType) => <option key={policyType} value={policyType}>{policyType}</option>)}
          </Select>
          <Select value={filters.location} onChange={(event) => onFilterChange("location", event.target.value)} aria-label="Filter by location">
            <option value="all">All Locations</option>
            {locations.map((location) => <option key={location} value={location}>{location}</option>)}
          </Select>
          <Select value={filters.lastContactDate} onChange={(event) => onFilterChange("lastContactDate", event.target.value as ContactFilters["lastContactDate"])} aria-label="Filter by last contact date">
            <option value="all">Any Last Contact</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
          <ListFilter className="h-4 w-4" aria-hidden="true" />
          Smart filters connect status, score, campaigns, employees, industry, policy type, location and recency.
        </div>
      </CardContent>
    </Card>
  );
}
