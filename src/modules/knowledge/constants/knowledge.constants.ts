export const knowledgeSourceTypes = ["PDF", "DOCX", "TXT", "Markdown", "CSV", "Excel", "PowerPoint", "Website URL", "FAQ", "Manual Text"];

export const knowledgeCategories = ["Insurance", "Claims", "Sales", "Support", "HR", "Finance", "Compliance", "Training", "Policies", "FAQs", "Scripts"];

export const uploadStages = [
  "Upload",
  "Virus Scan",
  "OCR",
  "Processing",
  "Chunking",
  "Embedding",
  "Indexing",
  "Quality Check",
  "Available"
];

import type { KnowledgeFilters } from "../types/knowledgeModule.types";

export const defaultKnowledgeFilters: KnowledgeFilters = {
  search: "",
  department: "all",
  category: "all",
  status: "all",
  owner: "all",
  language: "all",
  score: "all",
  assignment: "all",
  sort: "freshness"
};

export const uploadWizardSteps = [
  "Choose Source",
  "Upload Files",
  "Metadata",
  "Employee Assignment",
  "Review",
  "Processing",
  "Completed"
];
