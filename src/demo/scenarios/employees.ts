import { createScenario } from "./scenarioFactory";

export const employeesScenario = createScenario({
  id: "employees",
  title: "AI Employees",
  route: "/app/employees",
  narration: "Sophia introduces the AI Workforce directory.",
  audio: "employees.mp3",
  duration: 40,
  highlightTargets: ["employee-directory", "employee-health", "preview-voice"],
  nextScenario: "workspace",
  transcript: [
    "The AI Workforce directory treats every AI Employee like a real member of the organization.",
    "Each profile has a role, department, voice, Knowledge score, campaign assignment, health and measurable performance.",
    "A manager can preview voice, pause work, assign campaigns or open the full Employee Workspace.",
    "This is digital workforce management, not software configuration."
  ]
});
