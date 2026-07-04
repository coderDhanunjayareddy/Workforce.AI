import { Link } from "@tanstack/react-router";
import { Archive, ArrowRight, PauseCircle, PlayCircle } from "lucide-react";

import { HealthRing, StatusBadge } from "@/components/shared";
import { Avatar, Button, Checkbox, Table } from "@/components/ui";
import type { Employee } from "@/types";

interface EmployeeTableProps {
  employees: Employee[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onPause: (employee: Employee) => void;
  onResume: (employee: Employee) => void;
  onArchive: (employee: Employee) => void;
}

export function EmployeeTable({ employees, selectedIds, onSelectionChange, onPause, onResume, onArchive }: EmployeeTableProps) {
  const allVisibleSelected = employees.length > 0 && employees.every((employee) => selectedIds.includes(employee.id));

  const toggleAll = () => {
    if (allVisibleSelected) {
      onSelectionChange(selectedIds.filter((id) => !employees.some((employee) => employee.id === id)));
    } else {
      onSelectionChange(Array.from(new Set([...selectedIds, ...employees.map((employee) => employee.id)])));
    }
  };

  const toggleOne = (employeeId: string) => {
    onSelectionChange(
      selectedIds.includes(employeeId)
        ? selectedIds.filter((id) => id !== employeeId)
        : [...selectedIds, employeeId]
    );
  };

  return (
    <Table>
      <thead>
        <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
          <th className="w-10 p-3">
            <Checkbox checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all visible employees" />
          </th>
          <th className="p-3">Employee</th>
          <th className="p-3">Role</th>
          <th className="p-3">Department</th>
          <th className="p-3">Status</th>
          <th className="p-3">Health</th>
          <th className="p-3">Campaign</th>
          <th className="p-3">Calls</th>
          <th className="p-3">Appointments</th>
          <th className="p-3">CSAT</th>
          <th className="p-3">Performance</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="border-b border-[var(--border)] last:border-0">
            <td className="p-3">
              <Checkbox checked={selectedIds.includes(employee.id)} onChange={() => toggleOne(employee.id)} aria-label={`Select ${employee.name}`} />
            </td>
            <td className="min-w-56 p-3">
              <div className="flex items-center gap-3">
                <Avatar name={employee.name} className="h-9 w-9" />
                <span>
                  <span className="block font-semibold">{employee.name}</span>
                  <span className="block text-xs text-[var(--text-secondary)]">{employee.voice}</span>
                </span>
              </div>
            </td>
            <td className="min-w-44 p-3">{employee.role}</td>
            <td className="p-3">{employee.department}</td>
            <td className="p-3">
              <StatusBadge status={employee.status} />
            </td>
            <td className="p-3">
              <HealthRing value={employee.health} label="Health" />
            </td>
            <td className="min-w-44 p-3">{employee.currentCampaign ?? "Available"}</td>
            <td className="p-3">{employee.callsToday}</td>
            <td className="p-3">{employee.appointmentsToday}</td>
            <td className="p-3">{employee.csat}%</td>
            <td className="p-3">{employee.performance}%</td>
            <td className="min-w-56 p-3">
              <div className="flex items-center gap-2">
                <Link
                  to="/app/employees/$employeeId"
                  params={{ employeeId: employee.id }}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-[12px] border border-[var(--border)] px-3 text-sm font-semibold hover:bg-[var(--surface-elevated)]"
                >
                  Open
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {employee.status === "paused" ? (
                  <Button variant="ghost" size="icon" type="button" aria-label={`Resume ${employee.name}`} onClick={() => onResume(employee)}>
                    <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" type="button" aria-label={`Pause ${employee.name}`} onClick={() => onPause(employee)}>
                    <PauseCircle className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" type="button" aria-label={`Archive ${employee.name}`} onClick={() => onArchive(employee)}>
                  <Archive className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
