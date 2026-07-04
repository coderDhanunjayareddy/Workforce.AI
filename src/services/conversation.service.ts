import { mockApi } from "@/mocks/mockApi";
import { conversations } from "@/mocks/mockData";
import type { Conversation } from "@/types";

export const conversationService = {
  getLiveCalls: () =>
    mockApi<Conversation[]>(() => conversations.filter((item) => item.status === "live")),
  getConversation: (id: string) =>
    mockApi<Conversation>(() => {
      const conversation = conversations.find((item) => item.id === id);
      if (!conversation) throw new Error("Conversation was not found.");
      return conversation;
    }),
  getTranscript: (id: string) =>
    mockApi(() => [
      { speaker: "AI Employee", text: `Conversation ${id} opened with a warm greeting.` },
      { speaker: "Customer", text: "I am interested in understanding the policy options." }
    ])
};
