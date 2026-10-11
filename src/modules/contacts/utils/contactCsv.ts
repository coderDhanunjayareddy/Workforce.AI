import Papa from "papaparse";

import { contactInputSchema, isDuplicateContact } from "@/services/contactData.service";
import type { Contact } from "@/types";

export const csvFields = ["fullName", "company", "email", "phone", "city", "country"] as const;
export type CsvMapping = Record<typeof csvFields[number], string>;
export interface CsvPreview {
  headers: string[];
  rows: Record<string, string>[];
  mapping: CsvMapping;
}

const aliases: Record<typeof csvFields[number], string[]> = {
  fullName: ["fullname", "name", "customername"], company: ["company", "companyname"],
  email: ["email", "emailaddress"], phone: ["phone", "phonenumber", "mobile"],
  city: ["city"], country: ["country"]
};

export function parseContactCsv(text: string): CsvPreview {
  const firstRow = Papa.parse<string[]>(text, { preview: 1, skipEmptyLines: "greedy" }).data[0]?.map((header) => header.trim()) ?? [];
  if (new Set(firstRow).size !== firstRow.length || firstRow.some((header) => !header)) throw new Error("Use unique, non-empty column names.");
  const result = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: "greedy", transformHeader: (header) => header.trim() });
  if (result.errors.length) throw new Error("The CSV contains malformed rows. Check its headers and quoted values.");
  const headers = result.meta.fields ?? [];
  if (!headers.length || new Set(headers).size !== headers.length || headers.some((header) => !header)) throw new Error("Use unique, non-empty column names.");
  if (result.data.length === 0 || result.data.length > 1000) throw new Error("Choose a CSV with between 1 and 1,000 contacts.");
  const mapping = Object.fromEntries(csvFields.map((field) => [field, headers.find((header) => aliases[field].includes(header.toLowerCase().replace(/[^a-z]/g, ""))) ?? ""])) as CsvMapping;
  return { headers, rows: result.data, mapping };
}

export function validateCsvRows(preview: CsvPreview, existing: Contact[]) {
  const contacts: Contact[] = [];
  const errors: { row: number; message: string }[] = [];
  let duplicates = 0;
  preview.rows.forEach((row, index) => {
    const fields = Object.fromEntries(csvFields.map((field) => [field, row[preview.mapping[field]]?.trim() ?? ""]));
    const parsed = contactInputSchema.safeParse({ ...fields, status: "new-lead", leadScore: 0, assignedEmployeeId: "" });
    if (!parsed.success) {
      errors.push({ row: index + 2, message: parsed.error.issues.map((issue) => issue.message).join(" ") });
      return;
    }
    const contact = { ...parsed.data, id: `contact_${crypto.randomUUID()}`, recentActivity: "CSV import" };
    if (isDuplicateContact(contact, [...existing, ...contacts])) duplicates++;
    else contacts.push(contact);
  });
  return { contacts, errors, duplicates };
}

export function downloadContacts(contacts: Contact[]) {
  const csv = Papa.unparse(contacts.map((contact) => ({ fullName: contact.fullName, company: contact.company, email: contact.email, phone: contact.phone, status: contact.status, city: contact.city ?? "", country: contact.country ?? "" })), { escapeFormulae: true });
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "workforce-contacts.csv";
  link.click();
  URL.revokeObjectURL(url);
}
