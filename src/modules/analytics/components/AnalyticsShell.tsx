import { Link } from "@tanstack/react-router";
import { Download, FilePlus2 } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/shared";
import { Button, Card, CardContent, Select } from "@/components/ui";

import { analyticsTabs, dateRanges } from "../constants/analytics.constants";

export function AnalyticsShell({ active, children, onExport, exporting }: { active: string; children: ReactNode; onExport?: () => void; exporting?: boolean }) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Analytics"
        title="Analytics & Business Intelligence"
        description="Transform AI Workforce activity into measurable business outcomes."
        actions={
          <>
            <Button variant="secondary" type="button" onClick={onExport} loading={exporting}>
              <Download className="h-4 w-4" />
              Export Executive Report
            </Button>
            <Link to="/app/analytics/reports" className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]">
              <FilePlus2 className="h-4 w-4" />
              Create Custom Report
            </Link>
          </>
        }
      />
      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6" aria-label="Global filter bar">
            <Select aria-label="Date range"><option>Date Range</option>{dateRanges.map((range) => <option key={range}>{range}</option>)}</Select>
            <Select aria-label="Department"><option>Department</option><option>Sales</option><option>Customer Support</option><option>Claims</option><option>Finance</option></Select>
            <Select aria-label="Campaign"><option>Campaign</option><option>Motor Insurance Q3</option><option>Policy Renewal Drive</option></Select>
            <Select aria-label="Employee"><option>Employee</option><option>Sophia</option><option>Emma</option><option>David</option></Select>
            <Select aria-label="Customer segment"><option>Customer Segment</option><option>High Value Customers</option><option>Renewals Due</option></Select>
            <Select aria-label="Business unit"><option>Business Unit</option><option>Nova Insurance</option><option>South Region</option></Select>
          </div>
          <nav className="flex gap-2 overflow-x-auto" aria-label="Analytics sections">
            {analyticsTabs.map((tab) => (
              <Link key={tab.id} to={tab.href} className={`min-w-max rounded-[12px] px-3 py-2 text-sm font-semibold ${active === tab.id ? "bg-[var(--ai-accent)] text-white" : "bg-[var(--surface-elevated)] text-[var(--text-secondary)]"}`}>
                {tab.label}
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}
