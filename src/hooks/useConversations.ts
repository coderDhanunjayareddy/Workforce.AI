import { useQuery } from "@tanstack/react-query";

import { conversationService } from "@/services";

export function useLiveCalls() {
  return useQuery({ queryKey: ["live-calls"], queryFn: conversationService.getLiveCalls });
}
