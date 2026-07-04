import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui";

import type { WorkforceDashboardData } from "../types/workforceDashboard.types";

export function BusinessImpactCard({ impact }: { impact: WorkforceDashboardData["businessImpact"] }) {
  return (
    <Card>
      <CardHeader
        title="Business Impact"
        description="Revenue, efficiency and conversion outcomes created by Nova Insurance's AI Workforce."
      />
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {impact.metrics.map((metric) => (
            <div key={metric.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
              <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-muted)]">{metric.label}</p>
              <p className="mt-2 font-display text-xl font-semibold">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">{metric.trend}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 h-56" role="img" aria-label="Monthly revenue and hours saved trend">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={impact.monthlyTrend} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="value" name="Revenue in lakhs" stroke="var(--ai-accent)" fill="var(--ai-accent)" fillOpacity={0.18} />
              <Area type="monotone" dataKey="secondary" name="Hours saved" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.12} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-5 rounded-[16px] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          {impact.summary}
        </p>
      </CardContent>
    </Card>
  );
}
