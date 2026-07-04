import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FolderKanban, Send } from "lucide-react";

import { ErrorState, PageHeader } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Table } from "@/components/ui";
import { useContacts, useSegments } from "@/hooks";

const savedLists = [
  { id: "list_renewal", name: "Renewal Sprint This Week", description: "Renewal Due contacts grouped for fast follow-up.", status: "Active", owner: "Emma" },
  { id: "list_motor", name: "Motor Insurance Priority", description: "Fleet and personal vehicle prospects with high lead scores.", status: "Active", owner: "Sophia" },
  { id: "list_health", name: "Health Insurance Families", description: "Families comparing coverage and appointment slots.", status: "Draft", owner: "Liam" },
  { id: "list_support", name: "Support Case Recovery", description: "Customers with recent service issues and satisfaction risk.", status: "Review", owner: "David" }
];

export function ContactListsPage() {
  const contactsQuery = useContacts();
  const segmentsQuery = useSegments();

  if (contactsQuery.isLoading || segmentsQuery.isLoading) {
    return <div className="space-y-6"><PageHeader title="Lists" description="Loading saved contact lists..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (contactsQuery.isError || segmentsQuery.isError) {
    return (
      <ErrorState
        title="Contact lists could not be loaded"
        description="List services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => {
          void contactsQuery.refetch();
          void segmentsQuery.refetch();
        }}
      />
    );
  }

  const contacts = contactsQuery.data ?? [];
  const segments = segmentsQuery.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contacts"
        title="Lists"
        description="Organize reusable contact lists for campaigns, renewals, exports and workforce assignment."
        actions={
          <Link to="/app/contacts" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Contacts
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Saved contact lists">
        {savedLists.map((list, index) => (
          <Card key={list.id}>
            <CardHeader title={list.name} description={list.description} />
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge tone={list.status === "Active" ? "green" : list.status === "Review" ? "amber" : "slate"}>{list.status}</Badge>
                <span className="text-sm font-semibold text-[var(--text-secondary)]">{list.owner}</span>
              </div>
              <p className="font-display text-3xl font-semibold text-[var(--text-primary)]">{(segments[index]?.contacts ?? contacts.length).toLocaleString("en-IN")}</p>
              <p className="text-sm text-[var(--text-secondary)]">Contacts connected to {segments[index]?.name ?? "customer database"}.</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" type="button">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Launch
                </Button>
                <Button variant="secondary" size="sm" type="button" aria-label={`Export ${list.name}`}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader title="List Coverage" description="How saved lists connect contacts, segments and campaigns." />
        <CardContent>
          <Table>
            <thead>
              <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <th className="p-3">List</th>
                <th className="p-3">Segment</th>
                <th className="p-3">Contacts</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {savedLists.map((list, index) => (
                <tr key={list.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="p-3 font-semibold text-[var(--text-primary)]">{list.name}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{segments[index]?.name ?? "Custom List"}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{(segments[index]?.contacts ?? contacts.length).toLocaleString("en-IN")}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{list.owner}</td>
                  <td className="p-3">
                    <Link to="/app/contacts/segments" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ai-accent)]">
                      <FolderKanban className="h-4 w-4" aria-hidden="true" />
                      View Segment
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
