import { useEffect, useRef } from "react";

import type { DemoPlaybackStatus } from "../types/demo.types";

export function useAudio(src: string, status: DemoPlaybackStatus, progressSeconds: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = src;
    audioRef.current.load();
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (Math.abs(audio.currentTime - progressSeconds) > 2) {
      audio.currentTime = progressSeconds;
    }
    if (status === "playing") {
      void audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  }, [progressSeconds, status]);

  return audioRef;
}
