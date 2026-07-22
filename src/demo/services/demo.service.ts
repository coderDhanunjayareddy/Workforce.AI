import { demoScenarios } from "../scenarios";
import type { ConversationPlaybackData, DemoScenario, VoicePreviewProfile } from "../types/demo.types";

export const demoService = {
  getScenarios: (): Promise<DemoScenario[]> => Promise.resolve(demoScenarios),
  getScenario: (scenarioId: string): DemoScenario => demoScenarios.find((scenario) => scenario.id === scenarioId) ?? demoScenarios[0],
  getScenarioIndex: (scenarioId: string): number => Math.max(0, demoScenarios.findIndex((scenario) => scenario.id === scenarioId)),
  getVoicePreview: (employee: { name: string; role: string; voice: string }): VoicePreviewProfile => ({
    name: employee.name,
    role: employee.role,
    voice: employee.voice,
    audio: "/demo/assets/audio/workspace.mp3",
    transcript: [
      { id: "voice_1", start: 0, end: 5, text: `Hello, I am ${employee.name}, an AI Employee for Nova Insurance.` },
      { id: "voice_2", start: 5, end: 11, text: "I help customers understand their options clearly and schedule the right next step." },
      { id: "voice_3", start: 11, end: 17, text: "My voice profile is designed to be professional, calm and consultative." }
    ]
  }),
  getConversationPlayback: (): ConversationPlaybackData => ({
    audio: "/demo/assets/audio/live-calls.mp3",
    analytics: [
      { label: "Buying Intent", value: "High", detail: "Premium plan questions and positive sentiment" },
      { label: "Confidence", value: "94%", detail: "Knowledge references matched the customer profile" },
      { label: "Outcome", value: "Appointment likely", detail: "Follow-up slot requested by customer" }
    ],
    sentiment: [
      { label: "Greeting", tone: "neutral" },
      { label: "Need Discovery", tone: "positive" },
      { label: "Recommendation", tone: "positive" },
      { label: "Appointment", tone: "positive" }
    ],
    knowledgeUsed: ["Premium Pricing Guide", "Motor Insurance Handbook", "Sales Conversation Playbook"],
    timeline: [
      { stage: "Greeting", detail: "Sophia confirmed context and customer readiness.", time: "00:08" },
      { stage: "Need Discovery", detail: "Customer asked about premium and coverage.", time: "01:04" },
      { stage: "Recommendation", detail: "Premium Plan positioned using assigned Knowledge.", time: "01:31" },
      { stage: "Appointment", detail: "Customer requested a detailed review slot.", time: "02:12" }
    ]
  })
};
