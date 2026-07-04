import { Link } from "@tanstack/react-router";
import { Plus, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState, ErrorState, PageHeader } from "@/components/shared";
import { Button, Card, CardContent } from "@/components/ui";
import { useCampaigns, useContactDashboard, useContacts, useCreateContact, useEmployees, useSegments } from "@/hooks";
import type { Contact } from "@/types";

import { ContactBulkActions } from "../components/ContactBulkActions";
import { ContactCard } from "../components/ContactCard";
import { ContactDirectorySkeleton } from "../components/ContactSkeletons";
import { ContactStatsBar } from "../components/ContactStatsBar";
import { ContactTable } from "../components/ContactTable";
import { ContactToolbar } from "../components/ContactToolbar";
import { ContactActivityPanel, ContactDashboardWidgets, ContactInsights, ContactRecommendations, SegmentPanel } from "../components/ContactWidgets";
import { defaultContactFilters } from "../constants/contact.constants";
import type { ContactFilters, ContactViewMode } from "../types/contactModule.types";
import { getFilteredContacts } from "../utils/contactFilters";

const pageSize = 8;

export function ContactsPage() {
  const contactsQuery = useContacts();
  const dashboardQuery = useContactDashboard();
  const segmentsQuery = useSegments();
  const employeesQuery = useEmployees();
  const campaignsQuery = useCampaigns();
  const createContact = useCreateContact();
  const [filters, setFilters] = useState<ContactFilters>(defaultContactFilters);
  const [view, setView] = useState<ContactViewMode>("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const contacts = useMemo(() => contactsQuery.data ?? [], [contactsQuery.data]);
  const filteredContacts = useMemo(() => getFilteredContacts(contacts, filters), [contacts, filters]);
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const campaigns = useMemo(() => Array.from(new Set(contacts.map((contact) => contact.currentCampaign).filter(Boolean))).sort() as string[], [contacts]);
  const industries = useMemo(() => Array.from(new Set(contacts.map((contact) => contact.industry).filter(Boolean))).sort() as string[], [contacts]);
  const policyTypes = useMemo(() => Array.from(new Set(contacts.map((contact) => contact.policyType).filter(Boolean))).sort() as string[], [contacts]);
  const locations = useMemo(() => Array.from(new Set(contacts.flatMap((contact) => [contact.city, contact.state]).filter(Boolean))).sort() as string[], [contacts]);

  const updateFilter = <TKey extends keyof ContactFilters>(key: TKey, value: ContactFilters[TKey]) => {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const addContact = () => {
    const contact: Contact = {
      id: `contact_manual_${Date.now()}`,
      fullName: "Manual Entry Contact",
      company: "Nova Prospect",
      email: "manual.entry@nova-prospect.demo",
      phone: "+91 98765 12999",
      status: "new-lead",
      leadScore: 61,
      assignedEmployeeId: "emp_sophia",
      assignedEmployeeName: "Sophia",
      currentCampaign: "Motor Insurance Q3",
      recentActivity: "Manual Entry",
      tags: ["manual-entry"],
      policyType: "Motor Insurance",
      industry: "Retail",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      lastContact: new Date().toISOString(),
      policyNumber: "NOVA-20269999"
    };

    createContact.mutate(contact, {
      onSuccess: () => toast.success("Contact created for manual review."),
      onError: () => toast.error("Validation Error. Retry contact creation.")
    });
  };

  if (contactsQuery.isLoading || dashboardQuery.isLoading || segmentsQuery.isLoading || employeesQuery.isLoading || campaignsQuery.isLoading) {
    return <ContactDirectorySkeleton />;
  }

  if (contactsQuery.isError || dashboardQuery.isError || segmentsQuery.isError || employeesQuery.isError || campaignsQuery.isError || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Contact hub could not be loaded"
        description="Customer intelligence services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => {
          void contactsQuery.refetch();
          void dashboardQuery.refetch();
          void segmentsQuery.refetch();
          void employeesQuery.refetch();
          void campaignsQuery.refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer Intelligence Hub"
        title="Contacts"
        description="Manage your customer database, organize intelligent segments, and power your AI Workforce."
        actions={
          <>
            <Button variant="secondary" type="button" onClick={addContact} loading={createContact.isPending}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Contact
            </Button>
            <Link to="/app/contacts/import" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Import Contacts
            </Link>
          </>
        }
      />

      <ContactStatsBar dashboard={dashboardQuery.data} />

      <div className="grid gap-6 2xl:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-6">
          <ContactToolbar
            filters={filters}
            campaigns={campaigns}
            employees={employeesQuery.data ?? []}
            industries={industries}
            policyTypes={policyTypes}
            locations={locations}
            view={view}
            onViewChange={setView}
            onFilterChange={updateFilter}
            onReset={() => {
              setFilters(defaultContactFilters);
              setSelectedIds([]);
            }}
          />

          <ContactBulkActions count={selectedIds.length} onClear={() => setSelectedIds([])} />

          {visibleContacts.length === 0 ? (
            <EmptyState
              title="No contacts available."
              description="Import your customer database to start building your digital workforce."
              action={<Link to="/app/contacts/import" className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Import Contacts</Link>}
            />
          ) : view === "grid" ? (
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Contact cards">
              {visibleContacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)}
            </section>
          ) : (
            <Card>
              <CardContent>
                <ContactTable contacts={visibleContacts} selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--text-secondary)]">Showing {visibleContacts.length} of {filteredContacts.length} contacts</p>
            <div className="flex gap-2">
              <Button variant="secondary" type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</Button>
              <Button variant="secondary" type="button" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Next</Button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <ContactDashboardWidgets dashboard={dashboardQuery.data} />
          <SegmentPanel segments={segmentsQuery.data ?? []} />
          <ContactRecommendations dashboard={dashboardQuery.data} />
        </aside>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <ContactInsights dashboard={dashboardQuery.data} />
        <ContactActivityPanel dashboard={dashboardQuery.data} />
      </section>
    </div>
  );
}
