import { Activity, BookOpen, Headphones, TrendingUp, UsersRound } from "lucide-react";

import { Avatar, Badge, Card, CardContent } from "@/components/ui";
import { employeeAssetService } from "@/services/employeeAssetService";

const workforce = [
  ["Sophia", "Senior AI Sales Executive", "97%"],
  ["Emma", "Renewal Specialist", "98%"],
  ["David", "Claims Support", "95%"]
];

export function HeroVisual() {
  const sophia = employeeAssetService.getHeroEmployee();

  return (
    <figure className="relative" aria-label="Workforce AI product preview">
      <Card className="overflow-hidden shadow-lg">
        <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-semibold">Nova Insurance Workforce</p>
              <p className="text-sm text-[var(--text-secondary)]">Live executive command center</p>
            </div>
            <Badge tone="green">Active</Badge>
          </div>
        </div>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [UsersRound, "18", "AI Employees"],
              [Headphones, "8", "Live Conversations"],
              [TrendingUp, "Rs. 24.8L", "Revenue Influenced"]
            ].map(([Icon, value, label]) => (
              <div key={String(label)} className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                <Icon className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-semibold">{String(value)}</p>
                <p className="text-xs text-[var(--text-secondary)]">{String(label)}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            {workforce.map(([name, role, health]) => (
              <div key={name} className="flex items-center justify-between rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={name} src={name === sophia.name ? sophia.profileImage : undefined} />
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--success)]">{health}</p>
                  <p className="text-xs text-[var(--text-secondary)]">Health</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] bg-[var(--primary)] p-5 text-white dark:bg-[var(--surface-elevated)]">
            <div className="flex items-center gap-4">
              <img src={sophia.heroImage} alt="Sophia, Workforce AI Hero AI Employee" className="h-16 w-16 rounded-full object-cover" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-[var(--ai-accent)]" />
                  <p className="font-semibold">AI Insight</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Sophia increased appointment booking by 14% after the latest Sales Script knowledge update.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="absolute -bottom-6 -left-6 hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-md lg:block">
        <BookOpen className="h-5 w-5 text-[var(--ai-accent)]" />
        <p className="mt-2 text-sm font-semibold">10 Knowledge Sources</p>
        <p className="text-xs text-[var(--text-secondary)]">95% freshness</p>
      </div>
    </figure>
  );
}
