import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { knowledgeService } from "@/services";
import type { Knowledge } from "@/types";

export const knowledgeKeys = {
  all: ["knowledge"] as const,
  dashboard: ["knowledge-dashboard"] as const,
  detail: (id: string) => ["knowledge", id] as const,
  collections: ["knowledge-collections"] as const,
  versions: (id = "all") => ["knowledge-versions", id] as const,
  search: (query: string) => ["knowledge-search", query] as const
};

export function useKnowledge() {
  return useQuery({ queryKey: knowledgeKeys.all, queryFn: knowledgeService.getKnowledge });
}

export function useDocument(id: string) {
  return useQuery({ queryKey: knowledgeKeys.detail(id), queryFn: () => knowledgeService.getDocument(id), enabled: Boolean(id) });
}

export function useKnowledgeDashboard() {
  return useQuery({ queryKey: knowledgeKeys.dashboard, queryFn: knowledgeService.getDashboard });
}

export function useKnowledgeSearch(query: string) {
  return useQuery({ queryKey: knowledgeKeys.search(query), queryFn: () => knowledgeService.searchKnowledge(query), enabled: query.trim().length > 0 });
}

export function useKnowledgeCollections() {
  return useQuery({ queryKey: knowledgeKeys.collections, queryFn: knowledgeService.getCollections });
}

export function useKnowledgeVersions(id?: string) {
  return useQuery({ queryKey: knowledgeKeys.versions(id), queryFn: () => knowledgeService.getVersions(id) });
}

export function useUploadKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: knowledgeService.uploadDocument,
    onSuccess: (document) => {
      queryClient.setQueryData<Knowledge[]>(knowledgeKeys.all, (items = []) => [document, ...items]);
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.dashboard });
    }
  });
}

export function useDeleteKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: knowledgeService.deleteDocument,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Knowledge[]>(knowledgeKeys.all, (items = []) => items.filter((item) => item.id !== id));
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.dashboard });
    }
  });
}

export function useAssignKnowledge() {
  return useMutation({ mutationFn: ({ id, employeeIds }: { id: string; employeeIds: string[] }) => knowledgeService.assignKnowledge(id, employeeIds) });
}

export function useUpdateKnowledgeMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Knowledge> }) => knowledgeService.updateMetadata(id, updates),
    onSuccess: (document) => {
      queryClient.setQueryData<Knowledge[]>(knowledgeKeys.all, (items = []) => items.map((item) => (item.id === document.id ? document : item)));
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.detail(document.id) });
    }
  });
}
