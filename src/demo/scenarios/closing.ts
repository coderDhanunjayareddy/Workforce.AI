import { createScenario } from "./scenarioFactory";

export const closingScenario = createScenario({
  id: "closing",
  title: "Closing",
  route: "/app/workforce",
  narration: "Sophia concludes the guided demo.",
  audio: "closing.mp3",
  duration: 34,
  highlightTargets: ["workforce-overview", "analytics", "campaigns"],
  transcript: [
    "That completes the Workforce AI demo.",
    "You have seen how an organization can hire AI Employees, train them with Knowledge, activate Campaigns, review Conversations and measure Analytics.",
    "The Demo Experience Layer is modular, so it can be disabled without changing production business logic.",
    "Thank you for exploring Workforce AI."
  ]
});
