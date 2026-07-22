import { useEffect } from "react";

import type { DemoPlaybackStatus } from "../types/demo.types";

export function useNarration(status: DemoPlaybackStatus, duration: number, onTick: () => void, onComplete: () => void, progressSeconds: number) {
  useEffect(() => {
    if (status !== "playing") return undefined;
    const timer = window.setInterval(() => {
      if (progressSeconds >= duration) {
        onComplete();
      } else {
        onTick();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [duration, onComplete, onTick, progressSeconds, status]);
}
