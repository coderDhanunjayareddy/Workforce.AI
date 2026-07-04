import type { Conversation } from "@/types";

export function sentimentTone(sentiment: Conversation["sentiment"]) {
  const tones: Record<Conversation["sentiment"], "slate" | "blue" | "green" | "amber" | "red" | "teal"> = {
    positive: "green",
    neutral: "blue",
    satisfied: "teal",
    negative: "red"
  };
  return tones[sentiment];
}

export function statusTone(status: Conversation["status"]) {
  const tones: Record<Conversation["status"], "slate" | "blue" | "green" | "amber" | "red" | "teal"> = {
    live: "green",
    completed: "teal",
    queued: "blue",
    "on-hold": "amber",
    escalated: "red"
  };
  return tones[status];
}
