import { ArrowRight, Phone, TrendingUp } from "lucide-react";

import { Avatar, Button, Card, CardContent } from "@/components/ui";
import type { Employee } from "@/types";
import { formatRelativeTime } from "@/utils/date";

import { HealthRing } from "./HealthRing";
import { StatusBadge } from "./StatusBadge";

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar name={employee.name} className="h-12 w-12" />
            <div>
              <h3 className="font-display text-lg font-semibold">{employee.name}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{employee.role}</p>
            </div>
          </div>
          <StatusBadge status={employee.status} />
        </div>
        <div className="mt-5">
          <HealthRing value={employee.health} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-[12px] bg-[var(--surface-elevated)] p-3">
            <dt className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Phone className="h-4 w-4" /> Calls
            </dt>
            <dd className="mt-1 font-semibold">{employee.callsToday}</dd>
          </div>
          <div className="rounded-[12px] bg-[var(--surface-elevated)] p-3">
            <dt className="flex items-center gap-2 text-[var(--text-secondary)]">
              <TrendingUp className="h-4 w-4" /> CSAT
            </dt>
            <dd className="mt-1 font-semibold">{employee.csat}%</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          {employee.department} · {employee.voice} · {formatRelativeTime(employee.lastActive)}
        </p>
        <Button className="mt-5 w-full" variant="secondary">
          Open Workspace
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
