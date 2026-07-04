import { Download, RotateCcw, Search } from "lucide-react";

import { Button, Input, Select, Tabs } from "@/components/ui";
import type { Status } from "@/types";

import { employeeSortOptions } from "../constants/employee.constants";
import type { EmployeeFilters, EmployeeViewMode } from "../types/employeeModule.types";

interface EmployeeDirectoryToolbarProps {
  filters: EmployeeFilters;
  departments: string[];
  roles: string[];
  voices: string[];
  languages: string[];
  view: EmployeeViewMode;
  onViewChange: (view: EmployeeViewMode) => void;
  onFilterChange: <TKey extends keyof EmployeeFilters>(key: TKey, value: EmployeeFilters[TKey]) => void;
  onReset: () => void;
}

export function EmployeeDirectoryToolbar({
  filters,
  departments,
  roles,
  voices,
  languages,
  view,
  onViewChange,
  onFilterChange,
  onReset
}: EmployeeDirectoryToolbarProps) {
  return (
    <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4" aria-label="AI Workforce filters">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
          <Input
            aria-label="Search AI Employees"
            className="pl-9"
            value={filters.search}
            onChange={(event) => onFilterChange("search", event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tabs
            active={view}
            onChange={(id) => onViewChange(id as EmployeeViewMode)}
            tabs={[
              { id: "grid", label: "Grid" },
              { id: "table", label: "Table" }
            ]}
          />
          <Button variant="secondary" type="button">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>
          <Button variant="ghost" type="button" onClick={onReset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
        <Select value={filters.department} onChange={(event) => onFilterChange("department", event.target.value)}>
          <option value="all">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </Select>
        <Select value={filters.role} onChange={(event) => onFilterChange("role", event.target.value)}>
          <option value="all">All roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
        <Select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value as Status | "all")}>
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="training">Training</option>
          <option value="active">Active</option>
          <option value="busy">Busy</option>
          <option value="paused">Paused</option>
          <option value="offline">Offline</option>
          <option value="archived">Archived</option>
        </Select>
        <Select value={filters.health} onChange={(event) => onFilterChange("health", event.target.value as EmployeeFilters["health"])}>
          <option value="all">All health</option>
          <option value="excellent">Excellent 95%+</option>
          <option value="good">Good 90-94%</option>
          <option value="attention">Needs attention</option>
        </Select>
        <Select value={filters.voice} onChange={(event) => onFilterChange("voice", event.target.value)}>
          <option value="all">All voices</option>
          {voices.map((voice) => (
            <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
        </Select>
        <Select value={filters.language} onChange={(event) => onFilterChange("language", event.target.value)}>
          <option value="all">All languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>
        <Select value={filters.performance} onChange={(event) => onFilterChange("performance", event.target.value as EmployeeFilters["performance"])}>
          <option value="all">All performance</option>
          <option value="excellent">Excellent 97%+</option>
          <option value="strong">Strong 93-96%</option>
          <option value="improving">Improving</option>
        </Select>
        <Select value={filters.sort} onChange={(event) => onFilterChange("sort", event.target.value as EmployeeFilters["sort"])}>
          {employeeSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </Select>
      </div>
    </section>
  );
}
