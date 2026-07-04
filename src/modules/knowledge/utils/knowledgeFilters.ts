import type { Knowledge } from "@/types";

import type { KnowledgeFilters } from "../types/knowledgeModule.types";

export function getFilteredKnowledge(items: Knowledge[], filters: KnowledgeFilters) {
  const search = filters.search.trim().toLowerCase();

  return items
    .filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.department.toLowerCase().includes(search) ||
        item.type.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search);
      const matchesScore =
        filters.score === "all" ||
        (filters.score === "excellent" && item.freshness >= 95) ||
        (filters.score === "good" && item.freshness >= 85 && item.freshness < 95) ||
        (filters.score === "review" && item.freshness < 85);

      return (
        matchesSearch &&
        (filters.department === "all" || item.department === filters.department) &&
        (filters.category === "all" || item.department === filters.category || item.type === filters.category.toLowerCase()) &&
        (filters.status === "all" || item.status === filters.status) &&
        matchesScore
      );
    })
    .sort((first, second) => {
      if (filters.sort === "title") return first.title.localeCompare(second.title);
      if (filters.sort === "department") return first.department.localeCompare(second.department);
      if (filters.sort === "version") return first.version.localeCompare(second.version);
      if (filters.sort === "status") return first.status.localeCompare(second.status);
      return second.freshness - first.freshness;
    });
}

export const getKnowledgeOwner = (department: string) =>
  department === "Sales" ? "Rahul Sharma" : department === "Claims" ? "Meera Iyer" : department === "HR" ? "Anita Rao" : "Priya Reddy";

export const getAssignedEmployeeCount = (department: string) => (department === "Sales" ? 9 : department === "Claims" ? 4 : 3);
