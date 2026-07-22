import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { router } from "@/routes/router";

import { demoScenarios } from "../scenarios";
import { demoExperiences } from "../scenarios/experiences";
import type { DemoContextValue, DemoState } from "../types/demo.types";
import { DemoContext } from "./DemoContext";
import { useTranscript } from "./useTranscript";

const initialScenarioId = demoScenarios[0].id;

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>({
    enabled: false,
    started: false,
    status: "idle",
    selectedExperienceId: "investor",
    currentScenarioId: initialScenarioId,
    progressSeconds: 0
  });

  const selectedExperience = useMemo(
    () => demoExperiences.find((experience) => experience.id === state.selectedExperienceId) ?? demoExperiences[1],
    [state.selectedExperienceId]
  );
  const activeScenarios = useMemo(
    () => selectedExperience.scenarioIds.map((id) => demoScenarios.find((scenario) => scenario.id === id)).filter((scenario): scenario is NonNullable<typeof scenario> => Boolean(scenario)),
    [selectedExperience.scenarioIds]
  );
  const currentScenario = useMemo(
    () => demoScenarios.find((scenario) => scenario.id === state.currentScenarioId) ?? demoScenarios[0],
    [state.currentScenarioId]
  );
  const currentIndex = activeScenarios.findIndex((scenario) => scenario.id === currentScenario.id);
  const { activeId } = useTranscript(currentScenario.transcript, state.progressSeconds);

  const navigateToScenario = useCallback((scenarioId: string) => {
    const scenario = demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0];
    void router.navigate({ to: scenario.route });
  }, []);

  const jumpToScenario = useCallback((scenarioId: string) => {
    const scenario = activeScenarios.find((item) => item.id === scenarioId) ?? demoScenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    setState((value) => ({ ...value, started: true, status: selectedExperience.autoPlay ? "playing" : "paused", currentScenarioId: scenario.id, progressSeconds: 0 }));
    navigateToScenario(scenario.id);
  }, [activeScenarios, navigateToScenario, selectedExperience.autoPlay]);

  const nextScenario = useCallback(() => {
    const next = activeScenarios[currentIndex + 1];
    if (!next) {
      setState((value) => ({ ...value, status: "completed", progressSeconds: currentScenario.duration }));
      return;
    }
    jumpToScenario(next.id);
  }, [activeScenarios, currentIndex, currentScenario.duration, jumpToScenario]);

  const previousScenario = useCallback(() => {
    const previous = activeScenarios[Math.max(0, currentIndex - 1)] ?? activeScenarios[0];
    jumpToScenario(previous.id);
  }, [activeScenarios, currentIndex, jumpToScenario]);

  useEffect(() => {
    if (state.status !== "playing") return undefined;
    const timer = window.setInterval(() => {
      setState((value) => {
        if (value.progressSeconds >= currentScenario.duration) return value;
        return { ...value, progressSeconds: value.progressSeconds + 1 };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [currentScenario.duration, state.status]);

  useEffect(() => {
    if (state.status === "playing" && state.progressSeconds >= currentScenario.duration) {
      nextScenario();
    }
  }, [currentScenario.duration, nextScenario, state.progressSeconds, state.status]);

  useEffect(() => {
    if (!state.enabled) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "Space") {
        event.preventDefault();
        setState((value) => ({ ...value, status: value.status === "playing" ? "paused" : "playing" }));
      }
      if (event.key === "ArrowRight") nextScenario();
      if (event.key === "ArrowLeft") previousScenario();
      if (event.key === "Escape") setState((value) => ({ ...value, enabled: false, started: false, status: "idle", progressSeconds: 0 }));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextScenario, previousScenario, state.enabled]);

  const value: DemoContextValue = {
    ...state,
    scenarios: activeScenarios,
    experiences: demoExperiences,
    selectedExperience,
    currentScenario,
    activeTranscriptId: activeId,
    completion: Math.min(100, Math.round((state.progressSeconds / currentScenario.duration) * 100)),
    enableDemo: () => setState((current) => ({ ...current, enabled: true, started: false, status: "idle", currentScenarioId: initialScenarioId, progressSeconds: 0 })),
    disableDemo: () => setState((current) => ({ ...current, enabled: false, started: false, status: "idle", progressSeconds: 0 })),
    selectExperience: (experienceId) => {
      const experience = demoExperiences.find((item) => item.id === experienceId) ?? demoExperiences[1];
      setState((current) => ({ ...current, selectedExperienceId: experience.id, currentScenarioId: experience.scenarioIds[0], progressSeconds: 0 }));
    },
    startDemo: () => jumpToScenario(selectedExperience.scenarioIds[0] ?? initialScenarioId),
    pauseDemo: () => setState((current) => ({ ...current, status: "paused" })),
    resumeDemo: () => setState((current) => ({ ...current, status: "playing" })),
    nextScenario,
    previousScenario,
    jumpToScenario,
    seekTranscript: (seconds: number) => setState((current) => ({ ...current, progressSeconds: Math.max(0, Math.min(seconds, currentScenario.duration)) }))
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
