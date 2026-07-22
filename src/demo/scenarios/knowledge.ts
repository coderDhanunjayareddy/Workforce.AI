import { createScenario } from "./scenarioFactory";

export const knowledgeScenario = createScenario({
  id: "knowledge",
  title: "Knowledge Center",
  route: "/app/knowledge",
  narration: "Sophia explains Knowledge as organizational intelligence.",
  audio: "knowledge.mp3",
  duration: 42,
  highlightTargets: ["knowledge-dashboard", "processing-queue", "knowledge-recommendations"],
  nextScenario: "contacts",
  transcript: [
    "Knowledge is the intelligence behind every AI Employee.",
    "Nova Insurance can upload policies, scripts, FAQs and regulatory documents, then assign them to employees or campaigns.",
    "Freshness and usage are tracked so business leaders know which Knowledge improves conversations.",
    "Outdated Knowledge becomes an actionable recommendation rather than a hidden operational risk."
  ]
});
