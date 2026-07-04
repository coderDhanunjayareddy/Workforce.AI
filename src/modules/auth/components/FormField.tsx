import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button, Input } from "@/components/ui";

export function FormField({
  label,
  type = "text",
  autoComplete,
  registration,
  error
}: {
  label: string;
  type?: string;
  autoComplete?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <span className="relative">
        <Input type={inputType} autoComplete={autoComplete} aria-invalid={Boolean(error)} {...registration} />
        {isPassword ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-0.5"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        ) : null}
      </span>
      {error ? <span className="text-xs font-medium text-[var(--danger)]">{error.message}</span> : null}
    </label>
  );
}
