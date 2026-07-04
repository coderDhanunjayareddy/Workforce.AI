import { mockApi } from "@/mocks/mockApi";
import { contacts } from "@/mocks/mockData";
import type { Contact } from "@/types";

export const contactService = {
  getContacts: () => mockApi<Contact[]>(() => contacts),
  getContact: (id: string) =>
    mockApi<Contact>(() => {
      const contact = contacts.find((item) => item.id === id);
      if (!contact) throw new Error("Contact was not found.");
      return contact;
    }),
  createContact: (contact: Contact) => mockApi<Contact>(() => contact)
};
