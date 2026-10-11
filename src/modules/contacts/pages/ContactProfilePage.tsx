import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState, PageHeader } from "@/components/shared";
import { Avatar, Badge, Button, Modal } from "@/components/ui";
import { useContact, useDeleteContact } from "@/hooks";
import { ContactForm } from "../components/ContactForm";

import { ContactProfileAssets, ContactProfileHistory, ContactProfileOverview, CustomerTimeline } from "../components/ContactProfileSections";
import { ContactProfileSkeleton } from "../components/ContactSkeletons";
import { statusLabel, statusTone } from "../components/contactDisplay";

export function ContactProfilePage() {
  const { contactId } = useParams({ strict: false });
  const id = contactId ?? "";
  const contactQuery = useContact(id);
  const navigate = useNavigate();
  const remove = useDeleteContact();
  const [editing, setEditing] = useState(false);
  const deleteContact = async () => {
    if (!window.confirm("Delete this contact? This cannot be undone.")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Contact deleted.");
      await navigate({ to: "/app/contacts" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Contact could not be deleted. Please retry.");
    }
  };

  if (contactQuery.isLoading) return <ContactProfileSkeleton />;

  if (contactQuery.isError || !contactQuery.data) {
    return (
      <ErrorState
        title="Contact profile could not be loaded"
        description="The contact record could not be found. Retry the customer profile or return to the directory."
        onRetry={() => void contactQuery.refetch()}
      />
    );
  }

  const contact = contactQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contact Profile"
        title={contact.fullName}
        description={`${contact.company || "Customer"}. ${contact.assignedEmployeeName ? `Assigned to ${contact.assignedEmployeeName}.` : "No AI Employee assigned yet."}`}
        actions={
          <>
            <Link to="/app/contacts" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Contacts
            </Link>
            <Button variant="secondary" type="button" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit Contact
            </Button>
            <Button variant="danger" type="button" loading={remove.isPending} onClick={() => void deleteContact()}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete Contact
            </Button>
          </>
        }
      />
      <Modal open={editing} title="Edit Contact" onClose={() => setEditing(false)}>
        {editing ? <ContactForm contact={contact} onComplete={() => setEditing(false)} onCancel={() => setEditing(false)} /> : null}
      </Modal>

      <section className="flex flex-col gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={contact.fullName} className="h-16 w-16 text-lg" />
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={statusTone(contact.status)}>{statusLabel(contact.status)}</Badge>
              <Badge tone="teal">{contact.leadScore}/100 lead score</Badge>
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{contact.email} | {contact.phone}</p>
          </div>
        </div>
        <Link to="/app/campaigns" className="text-sm font-semibold text-[var(--ai-accent)]">{contact.currentCampaign}</Link>
      </section>

      <ContactProfileOverview contact={contact} />
      <ContactProfileHistory contact={contact} />
      <ContactProfileAssets contact={contact} />
      <CustomerTimeline contact={contact} />
    </div>
  );
}
