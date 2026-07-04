import { Download, RotateCcw, Search } from "lucide-react";

import { Button, Input, Select, Tabs } from "@/components/ui";

import { knowledgeCategories } from "../constants/knowledge.constants";
import type { KnowledgeFilters, KnowledgeViewMode } from "../types/knowledgeModule.types";

export function KnowledgeToolbar({
  filters,
  departments,
  view,
  onViewChange,
  onFilterChange,
  onReset
}: {
  filters: KnowledgeFilters;
  departments: string[];
  view: KnowledgeViewMode;
  onViewChange: (view: KnowledgeViewMode) => void;
  onFilterChange: <TKey extends keyof KnowledgeFilters>(key: TKey, value: KnowledgeFilters[TKey]) => void;
  onReset: () => void;
}) {
  return (
    <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4" aria-label="Knowledge filters">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
          <Input aria-label="Search knowledge" className="pl-9" value={filters.search} onChange={(event) => onFilterChange("search", event.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tabs active={view} onChange={(id) => onViewChange(id as KnowledgeViewMode)} tabs={[{ id: "grid", label: "Grid" }, { id: "table", label: "Table" }]} />
          <Button variant="secondary" type="button"><Download className="h-4 w-4" /> Export</Button>
          <Button variant="ghost" type="button" onClick={onReset}><RotateCcw className="h-4 w-4" /> Reset</Button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
        <Select value={filters.department} onChange={(event) => onFilterChange("department", event.target.value)}>
          <option value="all">All departments</option>
          {departments.map((item) => <option key={item} value={item}>{item}</option>)}
        </Select>
        <Select value={filters.category} onChange={(event) => onFilterChange("category", event.target.value)}>
          <option value="all">All categories</option>
          {knowledgeCategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </Select>
        <Select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value as KnowledgeFilters["status"])}>
          <option value="all">All status</option>
          <option value="indexed">Indexed</option>
          <option value="processing">Processing</option>
          <option value="needs-review">Needs Review</option>
          <option value="failed">Failed</option>
        </Select>
        <Select value={filters.owner} onChange={(event) => onFilterChange("owner", event.target.value)}>
          <option value="all">All owners</option>
          <option>Priya Reddy</option>
          <option>Rahul Sharma</option>
          <option>Meera Iyer</option>
        </Select>
        <Select value={filters.language} onChange={(event) => onFilterChange("language", event.target.value)}>
          <option value="all">All languages</option>
          <option>English</option>
          <option>Hindi</option>
        </Select>
        <Select value={filters.score} onChange={(event) => onFilterChange("score", event.target.value as KnowledgeFilters["score"])}>
          <option value="all">All scores</option>
          <option value="excellent">Excellent 95%+</option>
          <option value="good">Good 85-94%</option>
          <option value="review">Requires review</option>
        </Select>
        <Select value={filters.assignment} onChange={(event) => onFilterChange("assignment", event.target.value as KnowledgeFilters["assignment"])}>
          <option value="all">All assignments</option>
          <option value="workforce">Entire Workforce</option>
          <option value="department">Department</option>
          <option value="individual">Individual</option>
        </Select>
        <Select value={filters.sort} onChange={(event) => onFilterChange("sort", event.target.value as KnowledgeFilters["sort"])}>
          <option value="freshness">Sort: Freshness</option>
          <option value="title">Sort: Title</option>
          <option value="department">Sort: Department</option>
          <option value="version">Sort: Version</option>
          <option value="status">Sort: Status</option>
        </Select>
      </div>
    </section>
  );
}
