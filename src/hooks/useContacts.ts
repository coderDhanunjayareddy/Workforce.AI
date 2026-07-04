import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { contactService } from "@/services";
import type { Contact, ContactSegment } from "@/types";

export function useContacts() {
  return useQuery({ queryKey: ["contacts"], queryFn: contactService.getContacts });
}

export function useContact(contactId: string) {
  return useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => contactService.getContact(contactId),
    enabled: Boolean(contactId)
  });
}

export function useContactDashboard() {
  return useQuery({ queryKey: ["contacts", "dashboard"], queryFn: contactService.getDashboard });
}

export function useSegments() {
  return useQuery({ queryKey: ["contacts", "segments"], queryFn: contactService.getSegments });
}

export function useLeadScoring() {
  return useQuery({ queryKey: ["contacts", "lead-scoring"], queryFn: contactService.getLeadScoring });
}

export function useImportContacts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactService.importContacts,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Contact) => contactService.createContact(contact),
    onSuccess: (contact) => {
      queryClient.setQueryData<Contact[]>(["contacts"], (contacts = []) => [contact, ...contacts]);
    }
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Contact> }) => contactService.updateContact(id, updates),
    onSuccess: (_contact, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["contacts"] });
      void queryClient.invalidateQueries({ queryKey: ["contact", variables.id] });
    }
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactService.deleteContact,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Contact[]>(["contacts"], (contacts = []) => contacts.filter((contact) => contact.id !== id));
      queryClient.removeQueries({ queryKey: ["contact", id] });
    }
  });
}

export function useCreateSegment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (segment: Pick<ContactSegment, "name" | "description" | "filters">) => contactService.createSegment(segment),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contacts", "segments"] });
    }
  });
}

export function useAssignContactEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ contactIds, employeeId }: { contactIds: string[]; employeeId: string }) =>
      contactService.assignEmployee(contactIds, employeeId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });
}
