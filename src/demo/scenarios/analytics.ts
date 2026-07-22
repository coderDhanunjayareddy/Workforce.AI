import { createScenario } from "./scenarioFactory";

export const analyticsScenario = createScenario({
  id: "analytics",
  title: "Analytics",
  route: "/app/analytics",
  narration: "Sophia closes the business value loop.",
  audio: "analytics.mp3",
  duration: 42,
  highlightTargets: ["executive-kpis", "business-impact", "employee-leaderboard", "forecasts"],
  nextScenario: "closing",
  transcript: [
    "Analytics proves whether the AI Workforce is improving the business.",
    "Executives see revenue influenced, appointments, calls completed, qualified leads, satisfaction, hours saved and ROI.",
    "Employee, Campaign, Conversation and Knowledge analytics connect into one story.",
    "Nova Insurance can decide where to expand, retrain or optimize with confidence."
  ]
});
