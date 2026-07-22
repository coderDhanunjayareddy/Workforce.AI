import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

import { Button } from "@/components/ui";

import { useDemo } from "../hooks";
import { AudioPlayer } from "./AudioPlayer";
import { ProgressTimeline } from "./ProgressTimeline";
import { TranscriptPlayer } from "./TranscriptPlayer";

export function DemoController() {
  const demo = useDemo();

  if (!demo.enabled || !demo.started) return null;

  return (
    <section
      className="fixed bottom-4 left-4 right-4 z-50 rounded-[24px] border border-white/15 bg-slate-950/88 p-4 text-white shadow-xl backdrop-blur-xl lg:left-[calc(16rem+1rem)]"
      aria-label="Investor Demo controller"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-teal-200">Investor Demo</p>
              <h2 className="font-display text-lg font-semibold">{demo.currentScenario.title}</h2>
              <p className="text-sm text-white/70">{demo.currentScenario.narration}</p>
            </div>
            <div className="flex items-center gap-2">
              <AudioPlayer src={demo.currentScenario.audio} status={demo.status} progressSeconds={demo.progressSeconds} onPause={demo.pauseDemo} onResume={demo.resumeDemo} />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={demo.disableDemo} aria-label="Exit demo">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/15" aria-label={`Scenario progress ${demo.completion}%`}>
            <div className="h-full rounded-full bg-teal-300 transition-all" style={{ width: `${demo.completion}%` }} />
          </div>
          <ProgressTimeline />
        </div>
        <div className="w-full space-y-3 lg:w-[360px]">
          <TranscriptPlayer transcript={demo.currentScenario.transcript} activeTranscriptId={demo.activeTranscriptId} onSeek={demo.seekTranscript} />
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={demo.previousScenario}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="secondary" size="sm" onClick={demo.status === "playing" ? demo.pauseDemo : demo.resumeDemo}>
              {demo.status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {demo.status === "playing" ? "Pause" : "Play"}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={demo.nextScenario}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
