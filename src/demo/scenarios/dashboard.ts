import { createScenario } from "./scenarioFactory";

export const dashboardScenario = createScenario({
  id: "dashboard",
  title: "Dashboard",
  route: "/app/workforce",
  narration: "Sophia explains the executive command center.",
  audio: "dashboard.mp3",
  duration: 42,
  highlightTargets: ["executive-kpis", "business-impact", "ai-insights", "quick-actions"],
  nextScenario: "employees",
  transcript: [
    "This is the Workforce Overview, the command center for Nova Insurance.",
    "Leadership can see live conversations, revenue influenced, customer satisfaction and the health of every AI Employee.",
    "The most important part is actionability. Insights point to Knowledge, Campaigns and Employee Workspaces instead of ending at a chart.",
    "From here, an operations leader can immediately hire, train, launch or optimize the workforce."
  ]
});
