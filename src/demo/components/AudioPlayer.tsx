import { Volume2 } from "lucide-react";

import { Button } from "@/components/ui";

import { useAudio } from "../hooks";
import type { DemoPlaybackStatus } from "../types/demo.types";

export function AudioPlayer({
  src,
  status,
  progressSeconds,
  onPause,
  onResume
}: {
  src: string;
  status: DemoPlaybackStatus;
  progressSeconds: number;
  onPause: () => void;
  onResume: () => void;
}) {
  const audioRef = useAudio(src, status, progressSeconds);

  return (
    <div className="flex items-center gap-2 rounded-[16px] border border-white/20 bg-white/10 px-3 py-2 text-white">
      <audio ref={audioRef} preload="none" aria-label="Demo narration audio" />
      <Volume2 className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-semibold">{status === "playing" ? "Narrating" : status === "paused" ? "Paused" : "Ready"}</span>
      <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10" onClick={status === "playing" ? onPause : onResume}>
        {status === "playing" ? "Pause" : "Resume"}
      </Button>
    </div>
  );
}
