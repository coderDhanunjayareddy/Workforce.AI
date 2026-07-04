import { Link } from "@tanstack/react-router";
import { CalendarCheck2, FileText, MessageSquareText, ShieldCheck, UserRoundCog } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { ContactDetail, ContactTimelineItem } from "@/types";

import { scoreTone, statusLabel, statusTone } from "./contactDisplay";

function TimelineList({ items }: { items: ContactTimelineItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border-l-2 border-[var(--ai-accent)] pl-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
            <time className="text-xs font-semibold text-[var(--text-muted)]">
              {new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(item.date))}
            </time>
          </div>
          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
          {item.href ? <Link to={item.href} className="mt-2 inline-flex text-sm font-semibold text-[var(--ai-accent)]">Open workflow</Link> : null}
        </div>
      ))}
    </div>
  );
}

export function ContactProfileOverview({ contact }: { contact: ContactDetail }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader title="Personal Information" description="Core customer fields used by campaigns, conversations and analytics." />
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[
            ["First Name", contact.firstName],
            ["Last Name", contact.lastName],
            ["Company", contact.company],
            ["Phone", contact.phone],
            ["Email", contact.email],
            ["Country", contact.country],
            ["City", contact.city],
            ["State", contact.state],
            ["Industry", contact.industry],
            ["Policy Type", contact.policyType],
            ["Lead Source", contact.leadSource],
            ["Language", contact.language]
          ].map(([label, value]) => (
            <div key={label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</p>
              <p className="mt-2 font-semibold text-[var(--text-primary)]">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader title="Lead Scoring" description="Score, category, trend and reason." />
          <CardContent>
            <div className="flex items-center justify-between gap-3">
              <Badge tone={scoreTone(contact.leadScore)}>{contact.leadScore}/100</Badge>
              <Badge tone={contact.leadScoring.trend === "down" ? "red" : contact.leadScoring.trend === "stable" ? "slate" : "green"}>
                {contact.leadScoring.trend}
              </Badge>
            </div>
            <p className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">{contact.leadScoring.category}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{contact.leadScoring.reason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Assigned AI Employee" description="Current owner for next best action." />
          <CardContent>
            <Link
              to="/app/employees/$employeeId"
              params={{ employeeId: contact.assignedEmployeeId }}
              className="inline-flex items-center gap-3 font-display text-xl font-semibold text-[var(--ai-accent)]"
            >
              <UserRoundCog className="h-5 w-5" aria-hidden="true" />
              {contact.assignedEmployeeName}
            </Link>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{contact.currentCampaign}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone={statusTone(contact.status)}>{statusLabel(contact.status)}</Badge>
              {(contact.tags ?? []).map((tag) => <Badge key={tag} tone="slate">{tag}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Notes" description="Relationship context for follow-up." />
          <CardContent>
            <p className="text-sm leading-6 text-[var(--text-secondary)]">{contact.notes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ContactProfileHistory({ contact }: { contact: ContactDetail }) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card>
        <CardHeader title="Communication History" description="Calls, emails, appointments, responses and feedback." />
        <CardContent><TimelineList items={contact.communicationHistory.length ? contact.communicationHistory : contact.timeline.slice(3, 6)} /></CardContent>
      </Card>
      <Card>
        <CardHeader title="Campaign History" description="Campaigns connected to this customer journey." />
        <CardContent><TimelineList items={contact.campaignHistory.length ? contact.campaignHistory : contact.timeline.slice(2, 4)} /></CardContent>
      </Card>
      <Card>
        <CardHeader title="Conversation Timeline" description="Customer interactions and outcome checkpoints." />
        <CardContent><TimelineList items={contact.timeline.filter((item) => ["conversation", "appointment", "feedback"].includes(item.type))} /></CardContent>
      </Card>
    </div>
  );
}

export function ContactProfileAssets({ contact }: { contact: ContactDetail }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader title="Appointments" description="Scheduled and completed customer meetings." />
        <CardContent className="space-y-3">
          {contact.appointments.map((appointment) => (
            <div key={appointment.id} className="rounded-[16px] border border-[var(--border)] p-4">
              <CalendarCheck2 className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
              <p className="mt-3 font-semibold text-[var(--text-primary)]">{appointment.title}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{appointment.outcome}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Policies Purchased" description="Policies tied to current and renewal revenue." />
        <CardContent className="grid gap-3 md:grid-cols-2">
          {contact.policiesPurchased.map((policy) => (
            <div key={policy.id} className="rounded-[16px] border border-[var(--border)] p-4">
              <ShieldCheck className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
              <p className="mt-3 font-semibold text-[var(--text-primary)]">{policy.type}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{policy.policyNumber}</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{policy.premium}</p>
              <Badge className="mt-3" tone={policy.status === "renewal-due" ? "amber" : "green"}>{policy.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function CustomerTimeline({ contact }: { contact: ContactDetail }) {
  return (
    <Card>
      <CardHeader title="Customer Timeline" description="Created, imported, assigned, campaigned, engaged, appointed, purchased and renewed." />
      <CardContent>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          <span>Complete journey view</span>
        </div>
        <TimelineList items={contact.timeline} />
      </CardContent>
    </Card>
  );
}
