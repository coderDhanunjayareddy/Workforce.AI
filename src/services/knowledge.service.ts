import { mockApi } from "@/mocks/mockApi";
import { knowledge } from "@/mocks/mockData";
import type { Knowledge } from "@/types";

export const knowledgeService = {
  getKnowledge: () => mockApi<Knowledge[]>(() => knowledge),
  getDocument: (id: string) =>
    mockApi<Knowledge>(() => {
      const document = knowledge.find((item) => item.id === id);
      if (!document) throw new Error("Knowledge source was not found.");
      return document;
    }),
  uploadDocument: (document: Knowledge) => mockApi<Knowledge>(() => document),
  searchKnowledge: (query: string) =>
    mockApi<Knowledge[]>(() =>
      knowledge.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    )
};
