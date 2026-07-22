import { CheckCircle2 } from "lucide-react";

import { useDemo } from "../hooks";

export function ProgressTimeline() {
  const { scenarios, currentScenario, jumpToScenario } = useDemo();
  const currentIndex = scenarios.findIndex((scenario) => scenario.id === currentScenario.id);

  return (
    <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1" aria-label="Demo progress timeline">
      {scenarios.map((scenario, index) => {
        const complete = index < currentIndex;
        const active = scenario.id === currentScenario.id;
        return (
          <button
            key={scenario.id}
            type="button"
            onClick={() => jumpToScenario(scenario.id)}
            className={`flex shrink-0 items-center gap-2 rounded-[999px] border px-3 py-2 text-xs font-semibold transition ${
              active
                ? "border-white bg-white text-slate-950"
                : "border-white/15 bg-white/10 text-white/75 hover:bg-white/15"
            }`}
            aria-current={active ? "step" : undefined}
          >
            {complete ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <span>{index + 1}</span>}
            {scenario.title}
          </button>
        );
      })}
    </div>
  );
}
