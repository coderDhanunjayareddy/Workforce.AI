import { Avatar } from "@/components/ui";

import { useDemo } from "../hooks";

export function TourOverlay() {
  const { enabled, started, currentScenario } = useDemo();

  if (!enabled || !started) return null;

  return (
    <aside className="fixed right-4 top-20 z-40 hidden w-80 rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/92 p-4 shadow-xl backdrop-blur lg:block" aria-label="Sophia demo presenter">
      <div className="flex items-center gap-3">
        <Avatar name="Sophia" className="h-12 w-12" />
        <div>
          <p className="font-display text-base font-semibold">Sophia</p>
          <p className="text-xs text-[var(--text-secondary)]">AI Employee · Sales Executive</p>
        </div>
      </div>
      <div className="mt-4 rounded-[16px] bg-[var(--surface-elevated)] p-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-[var(--ai-accent)]">{currentScenario.title}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{currentScenario.narration}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Highlighted demo areas">
        {currentScenario.highlightTargets.map((target) => (
          <span key={target} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
            {target.replaceAll("-", " ")}
          </span>
        ))}
      </div>
    </aside>
  );
}
