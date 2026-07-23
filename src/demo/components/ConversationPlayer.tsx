import { BarChart3, BookOpen, Gauge, Play, Smile, Timer } from "lucide-react";
import { useState } from "react";

import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";

import { demoService } from "../services/demo.service";
import type { DemoTranscriptSegment } from "../types/demo.types";
import { TranscriptPlayer } from "./TranscriptPlayer";

export function ConversationPlayer({ transcript }: { transcript: DemoTranscriptSegment[] }) {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playback = demoService.getConversationPlayback();
  const active = transcript.find((line) => progress >= line.start && progress < line.end) ?? transcript[0];

  return (
    <Card>
      <CardHeader
        title="Conversation Player"
        description="Play mock audio, review transcript sync, call analytics, sentiment, Knowledge used and the conversation timeline."
        action={
          <Button
            variant="secondary"
            onClick={() => {
              setPlaying((value) => !value);
              setProgress((value) => (value >= 30 ? 0 : value + 8));
            }}
          >
            <Play className="h-4 w-4" />
            {playing ? "Pause Audio" : "Play Audio"}
          </Button>
        }
      />
      <CardContent className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[16px] bg-slate-950 p-3">
          <TranscriptPlayer transcript={transcript} activeTranscriptId={active?.id} onSeek={setProgress} />
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {playback.analytics.map((item, index) => (
              <div key={item.label} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
                {index === 0 ? <Gauge className="h-4 w-4 text-[var(--ai-accent)]" /> : index === 1 ? <BarChart3 className="h-4 w-4 text-[var(--ai-accent)]" /> : <Timer className="h-4 w-4 text-[var(--ai-accent)]" />}
                <p className="mt-3 text-xs text-[var(--text-secondary)]">{item.label}</p>
                <p className="font-display text-lg font-semibold">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Panel title="Participants" icon={<Smile className="h-4 w-4" />}>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{playback.participants.employee}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{playback.participants.customer}</p>
            </Panel>
            <Panel title="Sentiment" icon={<Smile className="h-4 w-4" />}>
              <div className="flex flex-wrap gap-2">
                {playback.sentiment.map((item) => <Badge key={item.label} tone={item.tone === "positive" ? "green" : item.tone === "warning" ? "amber" : "blue"}>{item.label}</Badge>)}
              </div>
            </Panel>
            <Panel title="Knowledge Used" icon={<BookOpen className="h-4 w-4" />}>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">{playback.knowledgeUsed.map((item) => <li key={item}>{item}</li>)}</ul>
            </Panel>
            <Panel title="Timeline" icon={<Timer className="h-4 w-4" />}>
              <ol className="space-y-2 text-sm text-[var(--text-secondary)]">{playback.timeline.map((item) => <li key={`${item.time}-${item.stage}`}><span className="font-semibold text-[var(--text-primary)]">{item.time}</span> {item.stage}</li>)}</ol>
            </Panel>
            <Panel title="Outcome" icon={<Gauge className="h-4 w-4" />}>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">{playback.outcome.map((item) => <li key={item}>{item}</li>)}</ul>
            </Panel>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
      <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">{icon}{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
