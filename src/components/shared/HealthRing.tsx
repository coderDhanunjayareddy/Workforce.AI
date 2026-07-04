export function HealthRing({ value, label = "Health" }: { value: number; label?: string }) {
  const color = value >= 90 ? "var(--success)" : value >= 70 ? "var(--warning)" : "var(--danger)";
  return (
    <div className="inline-flex items-center gap-3">
      <div
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${value * 3.6}deg, var(--border) 0deg)`
        }}
        aria-label={`${label} ${value}%`}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--surface)] text-sm font-bold">
          {value}%
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-[var(--text-secondary)]">Enterprise ready</p>
      </div>
    </div>
  );
}
