import { useQuery } from "@tanstack/react-query";

import { contactService } from "@/services";

export function useContacts() {
  return useQuery({ queryKey: ["contacts"], queryFn: contactService.getContacts });
}
