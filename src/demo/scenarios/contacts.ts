import { createScenario } from "./scenarioFactory";

export const contactsScenario = createScenario({
  id: "contacts",
  title: "Contacts",
  route: "/app/contacts",
  narration: "Sophia shows how customer intelligence powers the workforce.",
  audio: "contacts.mp3",
  duration: 38,
  highlightTargets: ["contact-dashboard", "segments", "lead-score"],
  nextScenario: "campaigns",
  transcript: [
    "Contacts are the customer intelligence layer.",
    "Every customer record connects to an assigned AI Employee, a Campaign, conversations, lead score and business history.",
    "Segments help Nova Insurance launch precise outreach for renewals, claims and new policies.",
    "The workforce always knows who it is serving and why that conversation matters."
  ]
});
