import { Activity, HeartPulse, PauseCircle, TrendingUp, UsersRound } from "lucide-react";

import { MetricCard } from "@/components/shared";

import type { EmployeeDirectoryStats } from "../types/employeeModule.types";

export function EmployeeStatsBar({ stats }: { stats: EmployeeDirectoryStats }) {
  return (
    <section aria-label="AI Workforce summary" className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <MetricCard icon={UsersRound} label="AI Employees" value={String(stats.total)} trend="+2 this month" subtitle={`${stats.active} active employees`} />
      <MetricCard icon={Activity} label="In Training" value={String(stats.training)} trend="guided" subtitle="Training reviews ready" />
      <MetricCard icon={PauseCircle} label="Paused" value={String(stats.paused)} trend="review" subtitle="Paused for manager action" />
      <MetricCard icon={HeartPulse} label="Average Health" value={`${stats.averageHealth}%`} trend="+3%" subtitle="Knowledge, voice and tools" />
      <MetricCard icon={TrendingUp} label="Appointments Today" value={String(stats.appointmentsToday)} trend="+9%" subtitle="Across active campaigns" />
    </section>
  );
}
