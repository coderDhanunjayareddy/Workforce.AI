import { Link } from "@tanstack/react-router";
import { CalendarPlus, ExternalLink, MessageSquareText } from "lucide-react";

import { Badge, Button, Checkbox, Table, Avatar } from "@/components/ui";
import type { Contact } from "@/types";

import { scoreTone, statusLabel, statusTone } from "./contactDisplay";

export function ContactTable({
  contacts,
  selectedIds,
  onSelectionChange
}: {
  contacts: Contact[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}) {
  const allSelected = contacts.length > 0 && contacts.every((contact) => selectedIds.includes(contact.id));
  const toggle = (id: string) => {
    onSelectionChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  };

  return (
    <Table>
      <thead>
        <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <th className="p-3">
            <Checkbox
              checked={allSelected}
              onChange={(event) => onSelectionChange(event.target.checked ? contacts.map((contact) => contact.id) : [])}
              aria-label="Select all contacts"
            />
          </th>
          <th className="p-3">Name</th>
          <th className="p-3">Company</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Email</th>
          <th className="p-3">Lead Score</th>
          <th className="p-3">Status</th>
          <th className="p-3">Assigned Employee</th>
          <th className="p-3">Campaign</th>
          <th className="p-3">Last Contact</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id} className="border-b border-[var(--border)] last:border-0">
            <td className="p-3">
              <Checkbox checked={selectedIds.includes(contact.id)} onChange={() => toggle(contact.id)} aria-label={`Select ${contact.fullName}`} />
            </td>
            <td className="min-w-56 p-3">
              <Link to="/app/contacts/$contactId" params={{ contactId: contact.id }} className="flex items-center gap-3 font-semibold text-[var(--text-primary)]">
                <Avatar name={contact.fullName} />
                <span>
                  <span className="block">{contact.fullName}</span>
                  <span className="text-xs font-normal text-[var(--text-muted)]">{contact.policyNumber}</span>
                </span>
              </Link>
            </td>
            <td className="p-3 text-[var(--text-secondary)]">{contact.company}</td>
            <td className="p-3 text-[var(--text-secondary)]">{contact.phone}</td>
            <td className="min-w-56 p-3 text-[var(--text-secondary)]">{contact.email}</td>
            <td className="p-3"><Badge tone={scoreTone(contact.leadScore)}>{contact.leadScore}/100</Badge></td>
            <td className="p-3"><Badge tone={statusTone(contact.status)}>{statusLabel(contact.status)}</Badge></td>
            <td className="min-w-40 p-3">
              <Link to="/app/employees/$employeeId" params={{ employeeId: contact.assignedEmployeeId }} className="font-semibold text-[var(--ai-accent)]">
                {contact.assignedEmployeeName}
              </Link>
            </td>
            <td className="min-w-44 p-3">
              <Link to="/app/campaigns" className="text-[var(--text-secondary)] hover:text-[var(--ai-accent)]">{contact.currentCampaign}</Link>
            </td>
            <td className="min-w-32 p-3 text-[var(--text-secondary)]">
              {contact.lastContact ? new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(contact.lastContact)) : "Not contacted"}
            </td>
            <td className="p-3">
              <div className="flex gap-1">
                <Link
                  to="/app/contacts/$contactId"
                  params={{ contactId: contact.id }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] hover:bg-[var(--surface-elevated)]"
                  aria-label={`Open ${contact.fullName}`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/app/conversations" className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] hover:bg-[var(--surface-elevated)]" aria-label="Open conversation timeline">
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Button variant="ghost" size="icon" type="button" aria-label="Schedule appointment">
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
