import { demoScenarios } from "../scenarios";
import type { ConversationPlaybackData, DemoScenario, VoicePreviewProfile } from "../types/demo.types";
import { employeeAssetService } from "@/services/employeeAssetService";

export const demoService = {
  getScenarios: (): Promise<DemoScenario[]> => Promise.resolve(demoScenarios),
  getScenario: (scenarioId: string): DemoScenario => demoScenarios.find((scenario) => scenario.id === scenarioId) ?? demoScenarios[0],
  getScenarioIndex: (scenarioId: string): number => Math.max(0, demoScenarios.findIndex((scenario) => scenario.id === scenarioId)),
  getVoicePreview: (employee: { id?: string; name: string; role: string; voice: string }): VoicePreviewProfile => {
    const asset = employee.id ? employeeAssetService.getByEmployeeId(employee.id) : undefined;
    return {
      name: employee.name,
      role: employee.role,
      voice: employee.voice,
      audio: asset?.previewAudio ?? "/demo/assets/audio/workspace.mp3",
      transcript: asset?.id === employeeAssetService.customerSuccessHeroEmployeeId ? [
        { id: "voice_1", start: 0, end: 5, text: "నమస్కారం. నేను ఎమ్మా." },
        { id: "voice_2", start: 5, end: 11, text: "Workforce AI నుండి Customer Success Specialist‌గా మాట్లాడుతున్నాను." },
        { id: "voice_3", start: 11, end: 17, text: "మీ సమస్యను ప్రశాంతంగా విని స్పష్టమైన సహాయం అందిస్తాను." }
      ] : asset ? [
        { id: "voice_1", start: 0, end: 5, text: "నమస్కారం. నేను సోఫియా." },
        { id: "voice_2", start: 5, end: 11, text: "Workforce AI నుండి Senior AI Sales Executive‌గా మాట్లాడుతున్నాను." },
        { id: "voice_3", start: 11, end: 17, text: "మీ అవసరాలను ప్రశాంతంగా అర్థం చేసుకుని సరైన తదుపరి దశను సూచిస్తాను." }
      ] : [
        { id: "voice_1", start: 0, end: 5, text: `Hello, I am ${employee.name}, an AI Employee for Nova Insurance.` },
        { id: "voice_2", start: 5, end: 11, text: "I help customers understand their options clearly and schedule the right next step." },
        { id: "voice_3", start: 11, end: 17, text: "My voice profile is designed to be professional, calm and consultative." }
      ]
    };
  },
  getConversationPlayback: (): ConversationPlaybackData => {
    const asset = employeeAssetService.getHeroEmployee();
    const conversation = asset.conversations[0];
    return {
      audio: asset.previewAudio,
      participants: conversation.participants,
      analytics: [
        { label: "Confidence", value: conversation.analytics.Confidence ?? "High", detail: conversation.objective },
        { label: "Compliance", value: conversation.analytics.Compliance ?? "100%", detail: "Conversation follows approved speaking and compliance rules." },
        { label: "Outcome", value: conversation.analytics.Outcome ?? "Appointment Booked", detail: conversation.outcome.join(", ") }
      ],
      sentiment: [
        { label: conversation.analytics.Sentiment ?? "Positive", tone: "positive" },
        { label: "Lead Qualified", tone: "positive" },
        { label: "Appointment Booked", tone: "positive" }
      ],
      knowledgeUsed: conversation.knowledgeUsed,
      outcome: conversation.outcome,
      timeline: conversation.transcript.map((line) => ({ stage: line.speaker, detail: line.text, time: line.timestamp }))
    };
  }
};
