import { createScenario } from "./scenarioFactory";

export const liveCallsScenario = createScenario({
  id: "liveCalls",
  title: "Live Calls",
  route: "/app/conversations/conv_1",
  narration: "Sophia demonstrates the conversation review experience.",
  audio: "live-calls.mp3",
  duration: 46,
  highlightTargets: ["conversation-player", "transcript", "sentiment", "knowledge-used"],
  nextScenario: "analytics",
  transcript: [
    "Now we are inside a real conversation review.",
    "The demo layer can play mock audio, synchronize transcript lines, show sentiment, call analytics, Knowledge used and a timeline.",
    "Operations teams can understand what happened, why it happened, and what follow-up should happen next.",
    "This is how conversations become business intelligence."
  ]
});
