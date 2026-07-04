import { useQuery } from "@tanstack/react-query";

import { knowledgeService } from "@/services";

export const knowledgeKeys = {
  all: ["knowledge"] as const,
  detail: (id: string) => ["knowledge", id] as const
};

export function useKnowledge() {
  return useQuery({ queryKey: knowledgeKeys.all, queryFn: knowledgeService.getKnowledge });
}

export function useDocument(id: string) {
  return useQuery({ queryKey: knowledgeKeys.detail(id), queryFn: () => knowledgeService.getDocument(id) });
}
