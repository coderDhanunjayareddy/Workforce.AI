import { createScenario } from "./scenarioFactory";

export const campaignsScenario = createScenario({
  id: "campaigns",
  title: "Campaigns",
  route: "/app/campaigns",
  narration: "Sophia frames Campaigns as business objectives assigned to AI Employees.",
  audio: "campaigns.mp3",
  duration: 40,
  highlightTargets: ["campaign-dashboard", "campaign-health", "campaign-performance"],
  nextScenario: "liveCalls",
  transcript: [
    "Campaigns are where AI Employees create measurable value.",
    "A Campaign combines an objective, Contacts, Knowledge, schedule, assigned employee and business KPIs.",
    "Motor Insurance Renewal Q3 is assigned to me, and its progress rolls into live conversations and analytics.",
    "This makes performance visible while work is happening, not after the month ends."
  ]
});
