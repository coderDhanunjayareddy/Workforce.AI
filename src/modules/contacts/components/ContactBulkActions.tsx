import { Archive, Download, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardContent } from "@/components/ui";
import { useDeleteContact, useUpdateContact } from "@/hooks";
import type { Contact } from "@/types";

import { downloadContacts } from "../utils/contactCsv";

export function ContactBulkActions({ contacts, onClear }: { contacts: Contact[]; onClear: () => void }) {
  const remove = useDeleteContact();
  const update = useUpdateContact();
  const [busy, setBusy] = useState(false);
  if (!contacts.length) return null;
  const run = async (action: "delete" | "archive") => {
    if (action === "delete" && !window.confirm(`Delete ${contacts.length} selected contacts? This cannot be undone.`)) return;
    setBusy(true);
    let completed = 0;
    try {
      for (const contact of contacts) {
        if (action === "delete") await remove.mutateAsync(contact.id);
        else await update.mutateAsync({ id: contact.id, updates: { status: "archived" } });
        completed++;
      }
      toast.success(`${completed} contacts ${action === "delete" ? "deleted" : "archived"}.`);
      onClear();
    } catch (error) {
      toast.error(`${completed} saved before the operation stopped. ${error instanceof Error ? error.message : "Please retry."}`);
    } finally { setBusy(false); }
  };
  return <Card><CardContent className="flex flex-wrap items-center justify-between gap-3"><p>{contacts.length} contacts selected</p><div className="flex flex-wrap gap-2">
    <Button variant="secondary" size="sm" disabled={busy} onClick={() => downloadContacts(contacts)}><Download className="h-4 w-4" />Export</Button>
    <Button variant="secondary" size="sm" disabled={busy} onClick={() => void run("archive")}><Archive className="h-4 w-4" />Archive</Button>
    <Button variant="danger" size="sm" disabled={busy} onClick={() => void run("delete")}><Trash2 className="h-4 w-4" />Delete</Button>
    <Button variant="ghost" size="sm" disabled={busy} onClick={onClear}><X className="h-4 w-4" />Clear</Button>
  </div></CardContent></Card>;
}
