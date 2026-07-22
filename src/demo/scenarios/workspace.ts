import { createScenario } from "./scenarioFactory";

export const workspaceScenario = createScenario({
  id: "workspace",
  title: "Employee Workspace",
  route: "/app/employees/emp_sophia",
  narration: "Sophia walks through her workspace.",
  audio: "workspace.mp3",
  duration: 45,
  highlightTargets: ["workspace-header", "workspace-tabs", "voice-profile", "conversation-history"],
  nextScenario: "knowledge",
  transcript: [
    "This is my Employee Workspace.",
    "It combines identity, performance, Knowledge, voice, policies, tools, training, versions and health.",
    "Managers can understand why I am performing well and what should improve next.",
    "My workspace also keeps conversation history connected to campaign outcomes and Knowledge usage."
  ]
});
