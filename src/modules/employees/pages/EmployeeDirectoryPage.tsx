import { Link } from "@tanstack/react-router";
import { Download, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Button, Card, CardContent } from "@/components/ui";
import { useArchiveEmployee, useEmployees, usePauseEmployee, useResumeEmployee } from "@/hooks";
import type { Employee } from "@/types";

import { EmployeeBulkActions } from "../components/EmployeeBulkActions";
import { EmployeeDirectoryCard } from "../components/EmployeeDirectoryCard";
import { EmployeeDirectorySkeleton } from "../components/EmployeeDirectorySkeleton";
import { EmployeeDirectoryToolbar } from "../components/EmployeeDirectoryToolbar";
import { EmployeeStatsBar } from "../components/EmployeeStatsBar";
import { EmployeeTable } from "../components/EmployeeTable";
import { useEmployeeFilters } from "../hooks/useEmployeeFilters";
import type { EmployeeViewMode } from "../types/employeeModule.types";

const pageSize = 8;

export function EmployeeDirectoryPage() {
  const employeesQuery = useEmployees();
  const pauseEmployee = usePauseEmployee();
  const resumeEmployee = useResumeEmployee();
  const archiveEmployee = useArchiveEmployee();
  const [view, setView] = useState<EmployeeViewMode>("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const employees = useMemo(() => employeesQuery.data ?? [], [employeesQuery.data]);
  const { filters, filteredEmployees, stats, page, setPage, updateFilter, resetFilters } = useEmployeeFilters(employees);

  const departments = useMemo(() => Array.from(new Set(employees.map((employee) => employee.department))).sort(), [employees]);
  const roles = useMemo(() => Array.from(new Set(employees.map((employee) => employee.role))).sort(), [employees]);
  const voices = useMemo(() => Array.from(new Set(employees.map((employee) => employee.voice))).sort(), [employees]);
  const languages = useMemo(() => Array.from(new Set(employees.map((employee) => employee.language))).sort(), [employees]);
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selectedEmployees = employees.filter((employee) => selectedIds.includes(employee.id));

  const pause = (employee: Employee) => pauseEmployee.mutate(employee.id);
  const resume = (employee: Employee) => resumeEmployee.mutate(employee.id);
  const archive = (employee: Employee) => archiveEmployee.mutate(employee.id);

  const runBulk = (action: "pause" | "resume" | "archive") => {
    selectedEmployees.forEach((employee) => {
      if (action === "pause") pause(employee);
      if (action === "resume") resume(employee);
      if (action === "archive") archive(employee);
    });
    setSelectedIds([]);
  };

  if (employeesQuery.isLoading) return <EmployeeDirectorySkeleton />;

  if (employeesQuery.isError) {
    return (
      <ErrorState
        title="AI Workforce could not be loaded"
        description="Employee services did not finish loading. Retry the directory or contact support if this repeats."
        onRetry={() => void employeesQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Workforce"
        title="AI Workforce"
        description="Hire, monitor and manage every AI Employee working across your organization."
        actions={
          <>
            <Button variant="secondary" type="button">
              <Download className="h-4 w-4" aria-hidden="true" />
              Import AI Employees
            </Button>
            <Link
              to="/app/employees/hire"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
            >
              <UsersRound className="h-4 w-4" aria-hidden="true" />
              Hire AI Employee
            </Link>
          </>
        }
      />

      <EmployeeStatsBar stats={stats} />

      <EmployeeDirectoryToolbar
        filters={filters}
        departments={departments}
        roles={roles}
        voices={voices}
        languages={languages}
        view={view}
        onViewChange={setView}
        onFilterChange={updateFilter}
        onReset={() => {
          resetFilters();
          setSelectedIds([]);
        }}
      />

      <EmployeeBulkActions
        count={selectedIds.length}
        onPause={() => runBulk("pause")}
        onResume={() => runBulk("resume")}
        onArchive={() => runBulk("archive")}
        onClear={() => setSelectedIds([])}
      />

      {visibleEmployees.length === 0 ? (
        <EmptyState
          title="Your workforce is ready to grow."
          description="Hire your first AI Employee to automate conversations and scale your business."
          action={
            <Link
              to="/app/employees/hire"
              className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
            >
              Hire AI Employee
            </Link>
          }
        />
      ) : view === "grid" ? (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4" aria-label="AI Employee cards">
          {visibleEmployees.map((employee) => (
            <EmployeeDirectoryCard key={employee.id} employee={employee} onPause={pause} onResume={resume} onArchive={archive} />
          ))}
        </section>
      ) : (
        <Card>
          <CardContent>
            <EmployeeTable
              employees={visibleEmployees}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onPause={pause}
              onResume={resume}
              onArchive={archive}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Showing {visibleEmployees.length} of {filteredEmployees.length} AI Employees
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            Previous
          </Button>
          <Button variant="secondary" type="button" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
