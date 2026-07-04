import { Search } from "lucide-react";

import { Input, Select } from "@/components/ui";

export function FilterBar() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-[1fr_180px_180px]">
      <label className="relative">
        <span className="sr-only">Search</span>
        <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
        <Input className="pl-9" placeholder="Search employees, campaigns, knowledge..." />
      </label>
      <Select aria-label="Department filter">
        <option>All departments</option>
        <option>Sales</option>
        <option>Customer Support</option>
        <option>Claims</option>
      </Select>
      <Select aria-label="Status filter">
        <option>All status</option>
        <option>Active</option>
        <option>Training</option>
        <option>Paused</option>
      </Select>
    </div>
  );
}
