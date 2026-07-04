import type { Knowledge } from "@/types";

export type KnowledgeViewMode = "grid" | "table";

export interface KnowledgeFilters {
  search: string;
  department: string;
  category: string;
  status: Knowledge["status"] | "all";
  owner: string;
  language: string;
  score: "all" | "excellent" | "good" | "review";
  assignment: "all" | "workforce" | "department" | "individual";
  sort: "freshness" | "title" | "department" | "version" | "status";
}
