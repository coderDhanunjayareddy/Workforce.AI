import { Link } from "@tanstack/react-router";
import { Archive, ArrowLeft, Mail, Megaphone, MoreHorizontal, PauseCircle, PlayCircle, RefreshCw } from "lucide-react";

import { HealthRing, StatusBadge } from "@/components/shared";
import { Avatar, Button } from "@/components/ui";
import type { Employee, EmployeeWorkspaceData } from "@/types";
import { formatRelativeTime } from "@/utils/date";

export function EmployeeWorkspaceHeader({
  employee,
  workspace,
  onPause,
  onResume,
  onArchive
}: {
  employee: Employee;
  workspace: EmployeeWorkspaceData;
  onPause: () => void;
  onResume: () => void;
  onArchive: () => void;
}) {
  return (
    <header className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 gap-4">
          <Avatar name={employee.name} src={employee.avatarUrl} className="h-16 w-16" />
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Link to="/app/employees" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)] hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Directory
              </Link>
              <StatusBadge status={employee.status} />
            </div>
            <h1 className="font-display text-3xl font-semibold">{employee.name}</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {employee.role} in {employee.department}. Campaign: {workspace.assignment.campaign}. Version {workspace.currentVersion}.
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Last active {formatRelativeTime(employee.lastActive)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <HealthRing value={employee.health} label="Overall Health" />
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" type="button">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Message Employee
            </Button>
            {employee.status === "paused" ? (
              <Button variant="secondary" type="button" onClick={onResume}>
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                Resume Employee
              </Button>
            ) : (
              <Button variant="secondary" type="button" onClick={onPause}>
                <PauseCircle className="h-4 w-4" aria-hidden="true" />
                Pause Employee
              </Button>
            )}
            <Button variant="secondary" type="button">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Retrain Employee
            </Button>
            <Button variant="secondary" type="button">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              Assign Campaign
            </Button>
            <Button variant="ghost" size="icon" type="button" aria-label="More actions">
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="danger" type="button" onClick={onArchive}>
              <Archive className="h-4 w-4" aria-hidden="true" />
              Archive
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
