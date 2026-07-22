import { Building2, CheckCircle2, Play } from "lucide-react";

import { Avatar, Button } from "@/components/ui";

import { useDemo } from "../hooks";

export function DemoPlayer() {
  const { enabled, started, startDemo, disableDemo, experiences, selectedExperience, selectExperience } = useDemo();

  if (!enabled || started) return null;

  return (
    <section className="fixed inset-0 z-50 grid place-items-center bg-slate-950 text-white" aria-label="Investor Demo welcome experience">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.18),transparent_32%),linear-gradient(135deg,rgba(15,27,61,0.98),rgba(2,6,23,1))]" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <div className="mb-7 flex items-center gap-4 rounded-[24px] border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur">
          <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-white text-slate-950">
            <Building2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Nova Insurance Pvt. Ltd.</p>
            <p className="text-xs text-white/65">Enterprise Pro · 18 AI Employees</p>
          </div>
        </div>
        <p className="text-sm font-semibold uppercase tracking-normal text-teal-200">Investor Demo</p>
        <h1 className="mt-4 font-display text-5xl font-semibold transition md:text-6xl">Workforce AI</h1>
        <p className="mt-4 text-2xl font-semibold text-white/90">Build Your Digital Workforce</p>
        <div className="mt-6 flex max-w-2xl items-center gap-4 rounded-[24px] border border-white/15 bg-white/10 p-4 text-left backdrop-blur">
          <Avatar name="Sophia" className="h-16 w-16 text-xl" />
          <p className="text-sm leading-6 text-white/75">
            I am Sophia, an AI Employee at Nova Insurance. Choose the demo path and I will guide the story from Knowledge to Campaigns, Conversations and measurable Analytics.
          </p>
        </div>
        <div className="mt-7 grid w-full gap-3 md:grid-cols-3" aria-label="Choose demo experience">
          {experiences.map((experience) => {
            const selected = experience.id === selectedExperience.id;
            return (
              <button
                key={experience.id}
                type="button"
                onClick={() => selectExperience(experience.id)}
                className={`rounded-[20px] border p-4 text-left transition ${
                  selected ? "border-teal-200 bg-white text-slate-950" : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-base font-semibold">{experience.title}</p>
                  {selected ? <CheckCircle2 className="h-5 w-5 text-teal-600" aria-hidden="true" /> : null}
                </div>
                <p className={`mt-1 text-xs font-semibold ${selected ? "text-teal-700" : "text-teal-200"}`}>{experience.durationLabel}</p>
                <p className={`mt-3 text-sm leading-6 ${selected ? "text-slate-600" : "text-white/65"}`}>{experience.description}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={startDemo}>
            <Play className="h-5 w-5" />
            Start Demo
          </Button>
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10" onClick={disableDemo}>
            Exit
          </Button>
        </div>
      </div>
    </section>
  );
}
