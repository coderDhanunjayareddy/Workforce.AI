import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, Button, Modal } from "@/components/ui";

import { demoService } from "../services/demo.service";
import type { VoicePreviewProfile } from "../types/demo.types";
import { TranscriptPlayer } from "./TranscriptPlayer";

let activeAudio: HTMLAudioElement | null = null;

export function VoicePreview({
  employee,
  open,
  onClose
}: {
  employee: { id?: string; name: string; role: string; voice: string; avatarUrl?: string };
  open: boolean;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const profile: VoicePreviewProfile = demoService.getVoicePreview(employee);
  const active = profile.transcript.find((line) => progress >= line.start && progress < line.end) ?? profile.transcript[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadStart = () => setLoading(true);
    const onLoadedMetadata = () => setLoading(false);
    const onCanPlay = () => setLoading(false);
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };
    const onError = () => {
      setLoading(false);
      setAudioError(true);
      setPlaying(false);
    };

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [profile.audio]);

  useEffect(() => {
    setAudioError(false);
    setLoading(false);
    setProgress(0);
    if (!open) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [open, profile.audio]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    if (playing) {
      audio.pause();
      return;
    }
    if (activeAudio && activeAudio !== audio) activeAudio.pause();
    activeAudio = audio;
    setLoading(true);
    try {
      await audio.play();
      setLoading(false);
    } catch {
      setAudioError(true);
      setLoading(false);
    }
  };

  const duration = audioRef.current?.duration && Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : 17;

  return (
    <Modal open={open} title="Preview Voice" onClose={onClose}>
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} src={employee.avatarUrl} className="h-16 w-16" />
          <div>
            <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{profile.role}</p>
            <p className="mt-1 text-xs font-semibold text-[var(--ai-accent)]">{profile.voice}</p>
          </div>
        </div>
        <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
          <audio ref={audioRef} src={profile.audio} preload="metadata" />
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Professional voice sample</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {audioError ? "Voice preview is unavailable. The employee profile remains accessible." : loading ? "Loading voice preview..." : "Production voice preview is ready."}
              </p>
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => { void togglePlayback(); }}
              disabled={audioError}
              aria-label={playing ? "Pause voice preview" : "Play voice preview"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div className="h-full bg-[var(--ai-accent)] transition-all" style={{ width: `${Math.min(100, (progress / duration) * 100)}%` }} />
          </div>
        </div>
        <div className="rounded-[16px] bg-slate-950 p-3">
          <TranscriptPlayer
            transcript={profile.transcript}
            activeTranscriptId={active?.id}
            onSeek={(seconds) => {
              setProgress(seconds);
              if (audioRef.current) audioRef.current.currentTime = seconds;
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
