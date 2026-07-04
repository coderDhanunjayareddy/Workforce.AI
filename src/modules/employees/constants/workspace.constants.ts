export const workspaceTabs = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "knowledge", label: "Knowledge" },
  { id: "goals", label: "Goals" },
  { id: "skills", label: "Skills" },
  { id: "voice", label: "Voice" },
  { id: "policies", label: "Policies" },
  { id: "tools", label: "Tools" },
  { id: "analytics", label: "Analytics" },
  { id: "conversations", label: "Conversation History" },
  { id: "training", label: "Training" },
  { id: "health", label: "Health" },
  { id: "versions", label: "Versions" }
] as const;

export type WorkspaceTabId = (typeof workspaceTabs)[number]["id"];
