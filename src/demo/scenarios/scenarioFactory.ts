import type { DemoScenario, DemoTranscriptSegment } from "../types/demo.types";

const audioBase = "/demo/assets/audio";

export function createTranscript(lines: string[], duration: number): DemoTranscriptSegment[] {
  const segmentLength = Math.max(1, Math.floor(duration / lines.length));
  return lines.map((text, index) => ({
    id: `line_${index + 1}`,
    start: index * segmentLength,
    end: index === lines.length - 1 ? duration : (index + 1) * segmentLength,
    text
  }));
}

export function createScenario(input: Omit<DemoScenario, "transcript"> & { transcript: string[] }): DemoScenario {
  return {
    ...input,
    audio: `${audioBase}/${input.audio}`,
    transcript: createTranscript(input.transcript, input.duration)
  };
}
