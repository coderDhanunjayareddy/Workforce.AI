import { mockApi } from "@/mocks/mockApi";
import { employees, knowledge } from "@/mocks/mockData";
import type { Knowledge, KnowledgeDashboard, KnowledgeDetail, KnowledgeVersion } from "@/types";

const collections = ["Insurance", "Claims", "Sales", "Support", "HR", "Finance", "Compliance", "Training", "Policies", "FAQs", "Scripts"];

const getDocumentOrThrow = (id: string) => {
  const document = knowledge.find((item) => item.id === id);
  if (!document) throw new Error("Knowledge source was not found.");
  return document;
};

const getDashboard = (): KnowledgeDashboard => ({
  stats: {
    totalSources: 128,
    indexed: 118,
    processing: 6,
    requiresReview: 4,
    freshness: 95,
    storageUsed: "2.8 GB"
  },
  collections: collections.map((name, index) => ({
    id: `collection_${name.toLowerCase()}`,
    name,
    department: index % 3 === 0 ? "Sales" : index % 3 === 1 ? "Claims" : "Support",
    documents: 8 + index * 3,
    freshness: Math.max(82, 98 - index),
    employeesAssigned: 2 + (index % 6)
  })),
  processingQueue: [
    { id: "queue_1", title: "Renewal FAQ.xlsx", stage: "Chunking", progress: 68, eta: "4 min", status: "processing" },
    { id: "queue_2", title: "Claims Escalation SOP.pdf", stage: "Indexing", progress: 84, eta: "2 min", status: "indexing" },
    { id: "queue_3", title: "Policy Addendum.docx", stage: "Virus Scan", progress: 22, eta: "8 min", status: "scanning" }
  ],
  activity: [
    { id: "activity_1", title: "Pricing Guide uploaded", description: "Sales collection received updated premium tables.", time: "09:42", href: "/app/knowledge/kn_pricing_guide_v3_pdf" },
    { id: "activity_2", title: "Claims SOP updated", description: "David and Charlotte were assigned the new claims flow.", time: "09:18", href: "/app/knowledge/kn_claims_sop_pdf" },
    { id: "activity_3", title: "Emma retrained", description: "Renewal knowledge refreshed for Customer Support.", time: "08:56", href: "/app/employees/emp_emma" },
    { id: "activity_4", title: "Insurance FAQ indexed", description: "FAQ collection passed quality checks.", time: "08:21", href: "/app/knowledge/kn_faq_pdf" }
  ],
  recommendations: [
    { id: "rec_pricing", priority: "critical", title: "Pricing Guide is outdated", impact: "Quote accuracy may drop in active sales conversations.", action: "Update document", href: "/app/knowledge/kn_pricing_guide_v3_pdf" },
    { id: "rec_claims", priority: "high", title: "Claims SOP has low usage", impact: "Claims employees can resolve more cases if this is assigned broadly.", action: "Assign to Support Team", href: "/app/knowledge/kn_claims_sop_pdf" },
    { id: "rec_sales", priority: "medium", title: "Sales Script missing FAQ", impact: "Add objection responses to improve conversion.", action: "Upload additional material", href: "/app/knowledge/upload" },
    { id: "rec_overlap", priority: "low", title: "Knowledge overlap detected", impact: "Merge duplicate policy sections to reduce conflicting answers.", action: "Merge documents", href: "/app/knowledge/categories" }
  ],
  recentlyUpdated: ["Pricing Guide v3.pdf", "Claims SOP.pdf", "FAQ.pdf", "IRDA Guidelines.pdf"],
  mostUsed: ["Insurance Products.pdf", "Sales Script.docx", "FAQ.pdf", "Health Insurance Handbook.pdf"]
});

const getDetail = (id: string): KnowledgeDetail => {
  const document = getDocumentOrThrow(id);
  const owner = document.department === "Sales" ? "Rahul Sharma" : document.department === "Claims" ? "Meera Iyer" : "Priya Reddy";
  const assignedEmployees = employees
    .filter((employee) => employee.department === document.department || document.department === "Sales")
    .slice(0, 5)
    .map((employee) => employee.name);

  return {
    ...document,
    category: document.department === "Sales" ? "Insurance" : document.department,
    owner,
    description: `${document.title} powers customer conversations, campaign responses and policy guidance for Nova Insurance.`,
    tags: [document.department, document.type.toUpperCase(), "Nova Insurance"],
    language: "English",
    indexedDate: "2026-07-02",
    assignedEmployees,
    quality: {
      coverage: Math.min(100, document.freshness + 1),
      freshness: document.freshness,
      completeness: Math.max(82, document.freshness - 3),
      accuracy: Math.max(84, document.freshness - 2),
      readability: Math.max(86, document.freshness - 1),
      usage: document.status === "needs-review" ? 72 : 94,
      confidence: document.status === "needs-review" ? 76 : 96,
      overall: Math.round((document.freshness + Math.max(84, document.freshness - 2) + 96) / 3)
    },
    usage: {
      employeesUsing: assignedEmployees.length,
      campaignsUsing: document.department === "Sales" ? 3 : 1,
      conversationsReferenced: document.department === "Sales" ? 1248 : 462,
      customerQuestionsAnswered: document.department === "Sales" ? 842 : 226,
      appointmentsGenerated: document.department === "Sales" ? 216 : 48,
      revenueInfluenced: document.department === "Sales" ? "Rs. 24.8L" : "Rs. 4.2L"
    },
    summary: {
      purpose: "Convert company material into reliable, reusable knowledge for AI Employees.",
      keyTopics: ["Policy coverage", "Pricing", "Eligibility", "Escalation", "Customer questions"],
      businessValue: "Improves conversation consistency, quote accuracy and campaign conversion.",
      recommendedDepartments: [document.department, "Operations", "Compliance"],
      employeesUsingIt: assignedEmployees
    },
    versions: getVersions(id),
    processingLog: [
      { id: "log_1", title: "Upload", stage: "Completed", progress: 100, eta: "Done", status: "processing" },
      { id: "log_2", title: "Virus Scan", stage: "Completed", progress: 100, eta: "Done", status: "scanning" },
      { id: "log_3", title: "OCR", stage: "Completed", progress: 100, eta: "Done", status: "processing" },
      { id: "log_4", title: "Indexing", stage: document.status === "indexed" ? "Completed" : "Needs Review", progress: document.status === "indexed" ? 100 : 84, eta: document.status === "indexed" ? "Done" : "Review", status: "indexing" }
    ],
    relatedDocuments: knowledge.filter((item) => item.id !== id).slice(0, 4).map((item) => item.title)
  };
};

const getVersions = (id = "all"): KnowledgeVersion[] => [
  { id: `${id}_v1`, version: "v1.0", published: "2026-01-12", changes: "Initial indexed source", author: "Priya Reddy", status: "published" },
  { id: `${id}_v1_1`, version: "v1.1", published: "2026-03-08", changes: "Added campaign examples and FAQ entries", author: "Rahul Sharma", status: "published" },
  { id: `${id}_v2`, version: "v2.0", published: "2026-06-21", changes: "Updated policy terms and compliance notes", author: "Meera Iyer", status: "current" }
];

export const knowledgeService = {
  getKnowledge: () => mockApi<Knowledge[]>(() => knowledge),
  getDashboard: () => mockApi<KnowledgeDashboard>(() => getDashboard()),
  getDocument: (id: string) => mockApi<KnowledgeDetail>(() => getDetail(id)),
  uploadDocument: (document: Knowledge) => mockApi<Knowledge>(() => document),
  deleteDocument: (id: string) => mockApi(() => ({ id, deleted: true })),
  assignKnowledge: (id: string, employeeIds: string[]) => mockApi(() => ({ id, employeeIds, assigned: true })),
  updateMetadata: (id: string, updates: Partial<Knowledge>) =>
    mockApi<Knowledge>(() => ({ ...getDocumentOrThrow(id), ...updates })),
  getCollections: () => mockApi<KnowledgeDashboard["collections"]>(() => getDashboard().collections),
  getVersions: (id?: string) => mockApi<KnowledgeVersion[]>(() => getVersions(id)),
  searchKnowledge: (query: string) =>
    mockApi<Knowledge[]>(() =>
      knowledge.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    )
};
