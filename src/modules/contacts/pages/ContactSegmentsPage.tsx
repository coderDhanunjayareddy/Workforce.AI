import { Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, UsersRound } from "lucide-react";
import { toast } from "sonner";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { useCreateSegment, useEmployees, useSegments } from "@/hooks";

export function ContactSegmentsPage() {
  const segmentsQuery = useSegments();
  const employeesQuery = useEmployees();
  const createSegment = useCreateSegment();

  const createHighIntentSegment = () => {
    createSegment.mutate(
      {
        name: "High Intent Appointments",
        description: "Contacts with appointment intent and lead score above 80.",
        filters: ["Lead Score", "Appointment Rate", "Last Contact Date"]
      },
      {
        onSuccess: () => toast.success("Segment created."),
        onError: () => toast.error("Validation Error. Retry segment creation.")
      }
    );
  };

  if (segmentsQuery.isLoading || employeesQuery.isLoading) {
    return <div className="space-y-6"><PageHeader title="Segments" description="Loading contact segments..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (segmentsQuery.isError || employeesQuery.isError) {
    return (
      <ErrorState
        title="Segments could not be loaded"
        description="Segment services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => {
          void segmentsQuery.refetch();
          void employeesQuery.refetch();
        }}
      />
    );
  }

  const segments = segmentsQuery.data ?? [];
  const employees = employeesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contacts"
        title="Segments"
        description="Create dynamic customer groups for policy type, lead quality, renewals, support cases and campaign targeting."
        actions={
          <>
            <Link to="/app/contacts" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Contacts
            </Link>
            <Button type="button" onClick={createHighIntentSegment} loading={createSegment.isPending}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create Segment
            </Button>
          </>
        }
      />

      {segments.length === 0 ? (
        <EmptyState title="No segments available." description="Create dynamic customer groups to launch focused campaigns and renewals." action={<Button type="button" onClick={createHighIntentSegment}>Create Segment</Button>} />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Contact segments">
          {segments.map((segment) => {
            const owner = employees.find((employee) => employee.id === segment.ownerEmployeeId);
            return (
              <Card key={segment.id} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader title={segment.name} description={segment.description} />
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-3">
                      <p className="font-display text-xl font-semibold">{segment.contacts.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-[var(--text-muted)]">Contacts</p>
                    </div>
                    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-3">
                      <p className="font-display text-xl font-semibold">{segment.conversionRate}%</p>
                      <p className="text-xs text-[var(--text-muted)]">Conversion</p>
                    </div>
                    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-3">
                      <p className="font-display text-xl font-semibold">{segment.health}%</p>
                      <p className="text-xs text-[var(--text-muted)]">Health</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="teal">{segment.policyType}</Badge>
                    {segment.filters.map((filter) => <Badge key={filter} tone="slate">{filter}</Badge>)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <UsersRound className="h-4 w-4 text-[var(--ai-accent)]" aria-hidden="true" />
                    Owned by {owner?.name ?? "AI Workforce"}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}
    </div>
  );
}
