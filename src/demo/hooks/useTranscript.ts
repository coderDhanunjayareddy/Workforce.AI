import type { DemoTranscriptSegment } from "../types/demo.types";

export function useTranscript(transcript: DemoTranscriptSegment[], progressSeconds: number) {
  const active = transcript.find((segment) => progressSeconds >= segment.start && progressSeconds < segment.end) ?? transcript[transcript.length - 1];
  return {
    active,
    activeId: active?.id
  };
}
