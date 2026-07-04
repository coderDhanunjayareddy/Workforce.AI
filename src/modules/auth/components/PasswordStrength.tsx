import { CheckCircle2, Circle } from "lucide-react";

import { getPasswordRules, getPasswordStrength } from "../utils/password";

export function PasswordStrength({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const rules = getPasswordRules(password);

  return (
    <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Password strength</span>
        <span className="text-[var(--text-secondary)]">{strength.label}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-[var(--border)]">
        <div className="h-2 rounded-full bg-[var(--ai-accent)] transition-all" style={{ width: strength.width }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            {rule.valid ? <CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> : <Circle className="h-4 w-4" />}
            {rule.label}
          </div>
        ))}
      </div>
    </div>
  );
}
