import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { ChartCard } from "@/components/shared";

import type { ConversationMetricCharts } from "../types/workforceDashboard.types";

const chartColors = ["var(--ai-accent)", "var(--secondary)", "var(--warning)", "var(--success)", "var(--danger)"];

export function ConversationMetrics({ charts }: { charts: ConversationMetricCharts }) {
  return (
    <section className="grid gap-6 xl:grid-cols-2" aria-label="Conversation metrics">
      <ChartCard
        title="Calls Per Hour"
        description="Hourly call volume across active campaigns."
        summary="Call demand peaks between 12:00 and 16:00, so campaign scheduling should keep Sales and Support coverage high."
      >
        <div className="h-64" role="img" aria-label="Calls per hour chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.callsPerHour} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name="Calls" stroke="var(--ai-accent)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard
        title="Average Duration"
        description="Conversation length by department."
        summary="Claims conversations take longer by design, while Support remains efficient without reducing satisfaction."
      >
        <div className="h-64" role="img" aria-label="Average duration by department chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.duration} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Minutes" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard
        title="Sentiment Distribution"
        description="Customer sentiment across today's conversations."
        summary="Positive sentiment remains above 60%, supported by fresh knowledge and high conversation quality."
      >
        <div className="h-64" role="img" aria-label="Sentiment distribution chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={charts.sentiment} dataKey="value" nameKey="name" innerRadius={58} outerRadius={86} paddingAngle={4}>
                {charts.sentiment.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard
        title="Conversation Funnel"
        description="How conversations convert into appointments and policies."
        summary="The largest opportunity is between interested customers and booked appointments; Sophia's sales flow is outperforming the baseline."
      >
        <div className="h-64" role="img" aria-label="Conversation funnel chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.funnel} layout="vertical" margin={{ left: 24, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={96} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Customers" fill="var(--ai-accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard
        title="First Call Resolution"
        description="Resolved, follow-up and escalated conversation outcomes."
        summary="82% first call resolution indicates the knowledge base is strong, with escalations concentrated in claims."
      >
        <div className="h-64" role="img" aria-label="First call resolution chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.resolution} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Share" radius={[8, 8, 0, 0]}>
                {charts.resolution.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </section>
  );
}
