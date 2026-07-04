import { useQuery } from "@tanstack/react-query";

import { conversationService } from "@/services";

export const conversationKeys = {
  dashboard: ["conversations", "dashboard"] as const,
  live: ["live-calls"] as const,
  employees: ["live-calls", "employees"] as const,
  queue: ["live-calls", "queue"] as const,
  detail: (id: string) => ["conversation", id] as const,
  transcript: (id: string) => ["conversation", id, "transcript"] as const,
  sentiment: (id: string) => ["conversation", id, "sentiment"] as const,
  summary: (id: string) => ["conversation", id, "summary"] as const
};

export function useLiveDashboard() {
  return useQuery({ queryKey: conversationKeys.dashboard, queryFn: conversationService.getDashboard });
}

export function useLiveCalls() {
  return useQuery({ queryKey: conversationKeys.live, queryFn: conversationService.getLiveCalls });
}

export function useLiveEmployees() {
  return useQuery({ queryKey: conversationKeys.employees, queryFn: conversationService.getLiveEmployees });
}

export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.detail(conversationId),
    queryFn: () => conversationService.getConversation(conversationId),
    enabled: Boolean(conversationId)
  });
}

export function useTranscript(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.transcript(conversationId),
    queryFn: () => conversationService.getTranscript(conversationId),
    enabled: Boolean(conversationId),
    refetchInterval: 8000
  });
}

export function useSentiment(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.sentiment(conversationId),
    queryFn: () => conversationService.getSentiment(conversationId),
    enabled: Boolean(conversationId),
    refetchInterval: 10000
  });
}

export function useConversationSummary(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.summary(conversationId),
    queryFn: () => conversationService.getSummary(conversationId),
    enabled: Boolean(conversationId)
  });
}

export function useQueue() {
  return useQuery({ queryKey: conversationKeys.queue, queryFn: conversationService.getQueue });
}
