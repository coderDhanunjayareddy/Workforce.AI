import { CalendarCheck2, Clock3, Crown, RefreshCw, Target, UsersRound } from "lucide-react";

import { MetricCard } from "@/components/shared";
import type { ContactDashboard } from "@/types";

export function ContactStatsBar({ dashboard }: { dashboard: ContactDashboard }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6" aria-label="Contact KPI cards">
      <MetricCard icon={UsersRound} label="Total Contacts" value={dashboard.totalContacts.toLocaleString("en-IN")} trend="+185" subtitle="Customer database size" />
      <MetricCard icon={Target} label="Qualified Leads" value={dashboard.qualifiedLeads.toLocaleString("en-IN")} trend="+6%" subtitle="Ready for outreach" />
      <MetricCard icon={Crown} label="Active Customers" value={dashboard.activeCustomers.toLocaleString("en-IN")} trend="+4%" subtitle="Policy owners" />
      <MetricCard icon={RefreshCw} label="Renewals" value={dashboard.renewalsDue.toLocaleString("en-IN")} trend="due" subtitle="Next 30 days" />
      <MetricCard icon={Clock3} label="Pending Follow-ups" value={dashboard.pendingFollowUps.toLocaleString("en-IN")} trend="action" subtitle="Manager attention" />
      <MetricCard icon={CalendarCheck2} label="Appointments Today" value={dashboard.appointmentsToday.toLocaleString("en-IN")} trend="+12" subtitle="Scheduled meetings" />
    </section>
  );
}
