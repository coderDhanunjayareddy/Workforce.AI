import { CheckCircle2, Rocket } from "lucide-react";

import { WizardShell } from "@/components/shared";
import { Badge, Button, Card, CardContent } from "@/components/ui";
import type { Employee, KnowledgeCollection } from "@/types";

import { createCampaignSteps } from "../constants/campaign.constants";

export function CreateCampaignWizard({ step, employees, collections, onLaunch, launching }: { step: number; employees: Employee[]; collections: KnowledgeCollection[]; onLaunch: () => void; launching: boolean }) {
  return (
    <WizardShell title={createCampaignSteps[step - 1]} step={step} totalSteps={createCampaignSteps.length}>
      <div className="space-y-6">
        <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-8">
          {createCampaignSteps.map((label, index) => (
            <div key={label} className={`rounded-[12px] p-3 text-xs font-semibold ${index + 1 <= step ? "bg-teal-50 text-[var(--ai-accent)] dark:bg-teal-950" : "bg-[var(--surface-elevated)] text-[var(--text-muted)]"}`}>
              {index + 1 < step ? <CheckCircle2 className="mb-2 h-4 w-4" aria-hidden="true" /> : null}
              {label}
            </div>
          ))}
        </div>
        {step === 1 ? <InfoStep /> : step === 2 ? <EmployeeStep employees={employees} /> : step === 3 ? <ContactsStep /> : step === 4 ? <KnowledgeStep collections={collections} /> : step === 5 ? <StrategyStep /> : step === 6 ? <ScheduleStep /> : step === 7 ? <ReviewStep /> : <LaunchStep onLaunch={onLaunch} launching={launching} />}
      </div>
    </WizardShell>
  );
}

function InfoStep() {
  return <div className="grid gap-4 md:grid-cols-2">{["Campaign Name", "Description", "Business Goal", "Department", "Priority"].map((field) => <Field key={field} label={field} value={field === "Campaign Name" ? "Motor Insurance Expansion" : field === "Business Goal" ? "Generate qualified policy appointments" : field === "Priority" ? "High" : "Sales"} />)}</div>;
}

function EmployeeStep({ employees }: { employees: Employee[] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{employees.slice(0, 6).map((employee) => <Card key={employee.id}><CardContent><p className="font-semibold">{employee.name}</p><p className="text-sm text-[var(--text-secondary)]">{employee.department} | {employee.voice}</p><Badge className="mt-3" tone={employee.health > 95 ? "green" : "teal"}>{employee.health}% health</Badge><p className="mt-3 text-xs text-[var(--text-muted)]">Availability: Ready this business day</p></CardContent></Card>)}</div>;
}

function ContactsStep() {
  return <div className="grid gap-4 md:grid-cols-4">{["Segment", "Manual Selection", "CSV", "Saved List"].map((item, index) => <Card key={item}><CardContent><p className="font-semibold">{item}</p><p className="mt-2 text-sm text-[var(--text-secondary)]">{index === 0 ? "Qualified Leads selected" : index === 1 ? "Pick specific contacts" : index === 2 ? "Upload customer file" : "Use Renewal Sprint This Week"}</p></CardContent></Card>)}</div>;
}

function KnowledgeStep({ collections }: { collections: KnowledgeCollection[] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["FAQs", "Scripts", "Policies", "Documents"].map((type, index) => <Card key={type}><CardContent><p className="font-semibold">{type}</p><p className="mt-2 text-sm text-[var(--text-secondary)]">{collections[index]?.name ?? "Sales Knowledge"} assigned with freshness checks.</p></CardContent></Card>)}</div>;
}

function StrategyStep() {
  return <div className="grid gap-4 md:grid-cols-2">{["Business Hours: 09:30-18:30 IST", "Retry Rules: two spaced retries", "Call Attempts: 3", "Escalation Rules: manager review", "Follow-up Delay: 24 hours"].map((item) => <Card key={item}><CardContent><p className="font-semibold">{item}</p></CardContent></Card>)}</div>;
}

function ScheduleStep() {
  return <div className="grid gap-4 md:grid-cols-4">{["Launch Now", "Future Date", "Recurring", "Business Calendar"].map((item) => <Card key={item}><CardContent><p className="font-semibold">{item}</p><p className="mt-2 text-sm text-[var(--text-secondary)]">Configured for India business calendar.</p></CardContent></Card>)}</div>;
}

function ReviewStep() {
  return <div className="grid gap-4 md:grid-cols-3">{[["Campaign Summary", "AI Employee, contacts and knowledge are ready."], ["Estimated Duration", "10 business days"], ["Expected Outcomes", "42 appointments and Rs. 6.2L revenue influence"]].map(([title, desc]) => <Card key={title}><CardContent><p className="font-semibold">{title}</p><p className="mt-2 text-sm text-[var(--text-secondary)]">{desc}</p></CardContent></Card>)}</div>;
}

function LaunchStep({ onLaunch, launching }: { onLaunch: () => void; launching: boolean }) {
  return <div className="rounded-[20px] bg-[var(--surface-elevated)] p-8 text-center"><Rocket className="mx-auto h-12 w-12 text-[var(--ai-accent)]" /><h2 className="mt-4 font-display text-2xl font-semibold">Launch</h2><p className="mx-auto mt-2 max-w-lg text-sm text-[var(--text-secondary)]">Success Screen confirms the campaign is ready to activate the AI Workforce.</p><Button className="mt-5" type="button" onClick={onLaunch} loading={launching}>Launch Campaign</Button></div>;
}

function Field({ label, value }: { label: string; value: string }) {
  return <Card><CardContent><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p><p className="mt-2 font-semibold">{value}</p></CardContent></Card>;
}
