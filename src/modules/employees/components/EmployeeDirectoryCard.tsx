import { Link } from "@tanstack/react-router";
import { Archive, ArrowRight, BriefcaseBusiness, Edit3, Megaphone, PauseCircle, PlayCircle, RefreshCw } from "lucide-react";

import { HealthRing, StatusBadge } from "@/components/shared";
import { Avatar, Button, Card, CardContent } from "@/components/ui";
import { VoicePreview } from "@/demo/components";
import type { Employee } from "@/types";
import { formatRelativeTime } from "@/utils/date";
import { useState } from "react";

import { getEmployeePerformanceSummary } from "../utils/employeeFilters";

interface EmployeeDirectoryCardProps {
  employee: Employee;
  onPause: (employee: Employee) => void;
  onResume: (employee: Employee) => void;
  onArchive: (employee: Employee) => void;
}

export function EmployeeDirectoryCard({ employee, onPause, onResume, onArchive }: EmployeeDirectoryCardProps) {
  const performance = getEmployeePerformanceSummary(employee);
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <Card className="transition hover:-translate-y-0.5 hover:shadow-sm">
        <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={employee.name} className="h-12 w-12" />
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold">{employee.name}</h3>
              <p className="truncate text-sm text-[var(--text-secondary)]">{employee.role}</p>
              <p className="mt-1 truncate text-xs text-[var(--text-muted)]">{employee.department}</p>
            </div>
          </div>
          <StatusBadge status={employee.status} />
        </div>

        <div className="mt-5">
          <HealthRing value={employee.health} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <button type="button" onClick={() => setVoiceOpen(true)} className="text-left">
            <Metric label="Voice" value={employee.voice} />
          </button>
          <Metric label="Language" value={employee.language} />
          <Metric label="Calls Today" value={String(performance.callsToday)} />
          <Metric label="Appointments" value={String(performance.appointments)} />
          <Metric label="CSAT" value={`${performance.customerSatisfaction}%`} />
          <Metric label="Performance" value={`${performance.successRate}%`} />
        </dl>

        <div className="mt-4 rounded-[16px] bg-[var(--surface-elevated)] p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <BriefcaseBusiness className="h-4 w-4 text-[var(--ai-accent)]" aria-hidden="true" />
            {employee.currentCampaign ?? "Available for assignment"}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Knowledge {employee.knowledgeScore}% - {formatRelativeTime(employee.lastActive)}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={() => setVoiceOpen(true)}>
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Preview Voice
          </Button>
          <Button variant="ghost" size="sm" type="button">
            <Edit3 className="h-4 w-4" aria-hidden="true" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" type="button">
            <Megaphone className="h-4 w-4" aria-hidden="true" />
            Assign
          </Button>
          {employee.status === "paused" ? (
            <Button variant="ghost" size="sm" type="button" onClick={() => onResume(employee)}>
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Resume
            </Button>
          ) : (
            <Button variant="ghost" size="sm" type="button" onClick={() => onPause(employee)}>
              <PauseCircle className="h-4 w-4" aria-hidden="true" />
              Pause
            </Button>
          )}
          <Button variant="ghost" size="sm" type="button">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Retrain
          </Button>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <Link
            to="/app/employees/$employeeId"
            params={{ employeeId: employee.id }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold transition hover:bg-[var(--surface-elevated)]"
          >
            Open Workspace
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Button variant="ghost" size="icon" type="button" aria-label={`Archive ${employee.name}`} onClick={() => onArchive(employee)}>
            <Archive className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        </CardContent>
      </Card>
      <VoicePreview employee={employee} open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[12px] bg-[var(--surface-elevated)] p-3">
      <dt className="truncate text-xs text-[var(--text-secondary)]">{label}</dt>
      <dd className="mt-1 truncate font-semibold">{value}</dd>
    </div>
  );
}
