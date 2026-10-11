import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Contact } from "@/types";

import { contactDataService } from "./contactData.service";

const contact: Contact = { id: "contact_test", fullName: "Test Customer", email: "test@example.com", phone: "+919876543210", company: "Acme", status: "new-lead", leadScore: 0, assignedEmployeeId: "" };

beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
});

describe("persisted contact operations", () => {
  it("retains create, update and delete across service instances", async () => {
    await contactDataService([]).create(contact);
    expect(await contactDataService([]).list()).toHaveLength(1);
    await contactDataService([]).update(contact.id, { fullName: "Updated Customer" });
    expect((await contactDataService([]).list())[0].fullName).toBe("Updated Customer");
    await contactDataService([]).remove(contact.id);
    expect(await contactDataService([contact]).list()).toEqual([]);
  });
  it("rejects duplicates without altering saved records", async () => {
    const data = contactDataService([]);
    await data.create(contact);
    await expect(data.create({ ...contact, id: "other" })).rejects.toThrow("already exists");
    expect(await data.list()).toHaveLength(1);
  });
  it("imports unique rows with real counts", async () => {
    const data = contactDataService([]);
    const result = await data.importRecords({ contacts: [contact, { ...contact, id: "duplicate" }], validationErrors: 2 });
    expect(result).toMatchObject({ imported: 1, duplicates: 1, validationErrors: 2 });
    expect(await data.list()).toHaveLength(1);
  });
  it("does not report success when storage fails", async () => {
    vi.stubGlobal("localStorage", { getItem: () => null, setItem: () => { throw new Error("quota"); } });
    await expect(contactDataService([]).create(contact)).rejects.toThrow("could not save");
  });
});
