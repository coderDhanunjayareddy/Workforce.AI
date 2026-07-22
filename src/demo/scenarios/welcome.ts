import { createScenario } from "./scenarioFactory";

export const welcomeScenario = createScenario({
  id: "welcome",
  title: "Welcome",
  route: "/app/workforce",
  narration: "Sophia introduces Workforce AI and frames the Nova Insurance demo journey.",
  audio: "welcome.mp3",
  duration: 32,
  highlightTargets: ["workforce-overview", "business-impact", "live-workforce"],
  nextScenario: "dashboard",
  transcript: [
    "Welcome to Workforce AI.",
    "I am Sophia, an AI Employee in the Nova Insurance workforce.",
    "In the next few minutes, I will show how AI Employees turn Knowledge, Contacts, Campaigns and Conversations into measurable business outcomes.",
    "This demo is a presentation layer only, so the production workspace remains untouched."
  ]
});
