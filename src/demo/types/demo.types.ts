import type { ReactNode } from "react";

export interface DemoTranscriptSegment {
  id: string;
  start: number;
  end: number;
  text: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  route: string;
  narration: string;
  audio: string;
  transcript: DemoTranscriptSegment[];
  duration: number;
  highlightTargets: string[];
  nextScenario?: string;
}

export type DemoPlaybackStatus = "idle" | "playing" | "paused" | "completed";
export type DemoExperienceId = "executive" | "investor" | "explore";

export interface DemoExperience {
  id: DemoExperienceId;
  title: string;
  durationLabel: string;
  description: string;
  scenarioIds: string[];
  autoPlay: boolean;
}

export interface DemoState {
  enabled: boolean;
  started: boolean;
  status: DemoPlaybackStatus;
  selectedExperienceId: DemoExperienceId;
  currentScenarioId: string;
  progressSeconds: number;
}

export interface DemoContextValue extends DemoState {
  scenarios: DemoScenario[];
  experiences: DemoExperience[];
  selectedExperience: DemoExperience;
  currentScenario: DemoScenario;
  activeTranscriptId?: string;
  completion: number;
  enableDemo: () => void;
  disableDemo: () => void;
  selectExperience: (experienceId: DemoExperienceId) => void;
  startDemo: () => void;
  pauseDemo: () => void;
  resumeDemo: () => void;
  nextScenario: () => void;
  previousScenario: () => void;
  jumpToScenario: (scenarioId: string) => void;
  seekTranscript: (seconds: number) => void;
}

export interface VoicePreviewProfile {
  name: string;
  role: string;
  voice: string;
  avatar?: ReactNode;
  transcript: DemoTranscriptSegment[];
  audio: string;
}

export interface ConversationPlaybackData {
  audio: string;
  participants: {
    employee: string;
    customer: string;
  };
  analytics: {
    label: string;
    value: string;
    detail: string;
  }[];
  sentiment: {
    label: string;
    tone: "positive" | "neutral" | "warning";
  }[];
  knowledgeUsed: string[];
  outcome: string[];
  timeline: {
    stage: string;
    detail: string;
    time: string;
  }[];
}
