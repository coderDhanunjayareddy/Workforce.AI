import type { PasswordRule } from "../types/auth.types";

export function getPasswordRules(password: string): PasswordRule[] {
  return [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(password) }
  ];
}

export function getPasswordStrength(password: string) {
  const score = getPasswordRules(password).filter((rule) => rule.valid).length;
  if (score <= 2) return { label: "Weak", score, width: "25%" };
  if (score === 3) return { label: "Medium", score, width: "50%" };
  if (score === 4) return { label: "Strong", score, width: "75%" };
  return { label: "Excellent", score, width: "100%" };
}
