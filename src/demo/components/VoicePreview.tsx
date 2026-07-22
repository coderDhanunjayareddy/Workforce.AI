import { Pause, Play } from "lucide-react";
import { useState } from "react";

import { Avatar, Button, Modal } from "@/components/ui";

import { demoService } from "../services/demo.service";
import type { VoicePreviewProfile } from "../types/demo.types";
import { TranscriptPlayer } from "./TranscriptPlayer";

export function VoicePreview({
  employee,
  open,
  onClose
}: {
  employee: { name: string; role: string; voice: string };
  open: boolean;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const profile: VoicePreviewProfile = demoService.getVoicePreview(employee);
  const active = profile.transcript.find((line) => progress >= line.start && progress < line.end) ?? profile.transcript[0];

  return (
    <Modal open={open} title="Preview Voice" onClose={onClose}>
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} className="h-16 w-16" />
          <div>
            <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{profile.role}</p>
            <p className="mt-1 text-xs font-semibold text-[var(--ai-accent)]">{profile.voice}</p>
          </div>
        </div>
        <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Professional voice sample</p>
              <p className="text-sm text-[var(--text-secondary)]">Placeholder audio is ready for a real MP3 replacement.</p>
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                setPlaying((value) => !value);
                setProgress((value) => (value >= 16 ? 0 : value + 5));
              }}
              aria-label={playing ? "Pause voice preview" : "Play voice preview"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div className="h-full bg-[var(--ai-accent)] transition-all" style={{ width: `${Math.min(100, (progress / 17) * 100)}%` }} />
          </div>
        </div>
        <div className="rounded-[16px] bg-slate-950 p-3">
          <TranscriptPlayer transcript={profile.transcript} activeTranscriptId={active?.id} onSeek={setProgress} />
        </div>
      </div>
    </Modal>
  );
}
