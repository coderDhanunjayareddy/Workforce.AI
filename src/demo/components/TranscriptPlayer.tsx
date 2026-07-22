import { useEffect, useRef } from "react";

import type { DemoTranscriptSegment } from "../types/demo.types";

export function TranscriptPlayer({
  transcript,
  activeTranscriptId,
  onSeek
}: {
  transcript: DemoTranscriptSegment[];
  activeTranscriptId?: string;
  onSeek: (seconds: number) => void;
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeTranscriptId]);

  return (
    <div className="max-h-40 space-y-2 overflow-y-auto pr-1" aria-label="Synchronized demo transcript">
      {transcript.map((segment) => {
        const active = segment.id === activeTranscriptId;
        return (
          <button
            key={segment.id}
            ref={active ? activeRef : undefined}
            type="button"
            onClick={() => onSeek(segment.start)}
            className={`w-full rounded-[12px] px-3 py-2 text-left text-sm leading-6 transition ${
              active ? "bg-white text-slate-950 shadow-sm" : "bg-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            <span className="mr-2 text-xs font-semibold opacity-70">{formatTime(segment.start)}</span>
            {segment.text}
          </button>
        );
      })}
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}
