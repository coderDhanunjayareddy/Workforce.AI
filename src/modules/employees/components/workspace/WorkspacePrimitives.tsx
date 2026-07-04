import type { ReactNode } from "react";

export function MetricTile({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) {
  return (
    <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
      <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold">{value}</p>
      {detail ? <p className="mt-1 text-xs text-[var(--text-secondary)]">{detail}</p> : null}
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

export function ProgressRow({ label, value, detail }: { label: string; value: number; detail?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[var(--border)]">
        <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${value}%` }} />
      </div>
      {detail ? <p className="mt-1 text-xs text-[var(--text-muted)]">{detail}</p> : null}
    </div>
  );
}
