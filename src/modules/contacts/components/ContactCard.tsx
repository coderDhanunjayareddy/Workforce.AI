import { Link } from "@tanstack/react-router";
import { CalendarPlus, MessageSquareText, PhoneCall, UserRoundCog } from "lucide-react";

import { Badge, Button, Card, CardContent, Avatar } from "@/components/ui";
import type { Contact } from "@/types";

import { scoreTone, statusLabel, statusTone } from "./contactDisplay";

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <Link to="/app/contacts/$contactId" params={{ contactId: contact.id }} className="flex min-w-0 items-center gap-3">
            <Avatar name={contact.fullName} className="h-12 w-12" />
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-semibold text-[var(--text-primary)]">{contact.fullName}</span>
              <span className="block truncate text-sm text-[var(--text-secondary)]">{contact.company}</span>
            </span>
          </Link>
          <Badge tone={statusTone(contact.status)}>{statusLabel(contact.status)}</Badge>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</p>
            <p className="mt-1 truncate text-[var(--text-primary)]">{contact.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Phone</p>
            <p className="mt-1 text-[var(--text-primary)]">{contact.phone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Lead Score</p>
            <Badge tone={scoreTone(contact.leadScore)} className="mt-1">{contact.leadScore}/100</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Policy Type</p>
            <p className="mt-1 text-[var(--text-primary)]">{contact.policyType}</p>
          </div>
        </div>

        <div className="rounded-[16px] bg-[var(--surface-elevated)] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Assigned AI Employee</p>
          <Link
            to="/app/employees/$employeeId"
            params={{ employeeId: contact.assignedEmployeeId }}
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ai-accent)]"
          >
            <UserRoundCog className="h-4 w-4" aria-hidden="true" />
            {contact.assignedEmployeeName ?? "AI Employee"}
          </Link>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">{contact.currentCampaign}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(contact.tags ?? []).map((tag) => <Badge key={tag} tone="slate">{tag}</Badge>)}
        </div>

        <p className="text-sm text-[var(--text-secondary)]">{contact.recentActivity}</p>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" type="button" aria-label={`Call ${contact.fullName}`}>
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Link
            to="/app/conversations"
            className="inline-flex h-9 items-center justify-center rounded-[12px] border border-[var(--border)] text-sm font-semibold hover:bg-[var(--surface-elevated)]"
            aria-label={`Open conversation timeline for ${contact.fullName}`}
          >
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Button variant="secondary" size="sm" type="button" aria-label={`Schedule appointment for ${contact.fullName}`}>
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
