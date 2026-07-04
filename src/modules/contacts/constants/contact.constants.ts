import type { ContactFilters } from "../types/contactModule.types";

export const defaultContactFilters: ContactFilters = {
  search: "",
  status: "all",
  leadScore: "all",
  campaign: "all",
  assignedEmployeeId: "all",
  industry: "all",
  policyType: "all",
  location: "all",
  lastContactDate: "all"
};

export const importSources = [
  { id: "csv", label: "CSV", available: true },
  { id: "excel", label: "Excel", available: true },
  { id: "google", label: "Google Contacts (Future)", available: false },
  { id: "crm", label: "CRM Integration (Future)", available: false },
  { id: "api", label: "API Import (Future)", available: false },
  { id: "manual", label: "Manual Entry", available: true }
] as const;

export const importSteps = [
  "Select Source",
  "Upload File",
  "Field Mapping",
  "Validation",
  "Duplicate Detection",
  "Review",
  "Import Completed"
];

export const standardFields = [
  "First Name",
  "Last Name",
  "Company",
  "Phone",
  "Email",
  "Country",
  "City",
  "State",
  "Industry",
  "Policy Type",
  "Lead Source",
  "Language",
  "Notes"
];

export const bulkActions = ["Assign Employee", "Launch Campaign", "Export", "Archive", "Delete", "Tag", "Move Segment"];
