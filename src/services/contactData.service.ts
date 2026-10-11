import { z } from "zod";

import type { Contact, ContactImportResult } from "@/types";

import { apiRequest, backendEnabled } from "./apiClient";
import { readBrowserStore, writeBrowserStore } from "./browserStore";

const key = "workforce-ai-contacts-v1";

export const contactInputSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the contact's full name.").max(160),
  company: z.string().trim().max(160),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().regex(/^\+?[\d ()-]{7,24}$/, "Enter a valid phone number."),
  status: z.enum(["new-lead", "qualified", "customer", "renewal-due", "inactive", "blacklisted", "archived"]),
  leadScore: z.number().int().min(0).max(100),
  assignedEmployeeId: z.string().max(100),
  city: z.string().trim().max(100),
  country: z.string().trim().max(100)
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isDuplicateContact(contact: Contact, records: Contact[]) {
  return records.some((record) => record.id !== contact.id && (
    record.email.toLowerCase() === contact.email.toLowerCase() || normalizePhone(record.phone) === normalizePhone(contact.phone)
  ));
}

export function contactDataService(seed: Contact[]) {
  const list = async () => backendEnabled
    ? apiRequest<Contact[]>("/contacts")
    : readBrowserStore<Contact[]>(key, seed);
  const create = async (contact: Contact) => {
    contactInputSchema.parse({ city: "", country: "", ...contact });
    if (backendEnabled) return apiRequest<Contact>("/contacts", { method: "POST", body: JSON.stringify(contact) });
    const records = await list();
    if (records.some((record) => record.id === contact.id) || isDuplicateContact(contact, records)) {
      throw new Error("A contact with that email or phone already exists.");
    }
    writeBrowserStore(key, [contact, ...records]);
    return contact;
  };
  const update = async (id: string, updates: Partial<Contact>) => {
    const records = await list();
    const original = records.find((record) => record.id === id);
    if (!original) throw new Error("Contact was not found.");
    const contact = { ...original, ...updates, id };
    contactInputSchema.parse({ city: "", country: "", ...contact });
    if (backendEnabled) return apiRequest<Contact>(`/contacts/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(contact) });
    if (isDuplicateContact(contact, records)) throw new Error("A contact with that email or phone already exists.");
    writeBrowserStore(key, records.map((record) => record.id === id ? contact : record));
    return contact;
  };
  const remove = async (id: string): Promise<{ id: string; deleted: true }> => {
    if (backendEnabled) return apiRequest(`/contacts/${encodeURIComponent(id)}`, { method: "DELETE" });
    const records = await list();
    if (!records.some((record) => record.id === id)) throw new Error("Contact was not found.");
    writeBrowserStore(key, records.filter((record) => record.id !== id));
    return { id, deleted: true };
  };
  const importRecords = async (input: { contacts: Contact[]; validationErrors: number }): Promise<ContactImportResult> => {
    if (backendEnabled) return apiRequest("/contacts/import", { method: "POST", body: JSON.stringify(input) });
    const records = await list();
    let duplicates = 0;
    const accepted: Contact[] = [];
    for (const contact of input.contacts) {
      if (isDuplicateContact(contact, [...records, ...accepted])) duplicates++;
      else accepted.push(contact);
    }
    writeBrowserStore(key, [...accepted, ...records]);
    return { imported: accepted.length, duplicates, validationErrors: input.validationErrors, source: "csv", completedAt: new Date().toISOString() };
  };
  return { list, create, update, remove, importRecords };
}
