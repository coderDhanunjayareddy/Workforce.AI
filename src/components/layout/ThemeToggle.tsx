import { Moon, Monitor, Sun } from "lucide-react";

import { Button, Dropdown } from "@/components/ui";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Moon : theme === "system" ? Monitor : Sun;

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon" aria-label="Change theme">
          <Icon className="h-5 w-5" />
        </Button>
      }
    >
      {(["light", "dark", "system"] as const).map((mode) => (
        <button
          key={mode}
          className="block w-full rounded-[8px] px-3 py-2 text-left text-sm capitalize hover:bg-[var(--surface-elevated)]"
          onClick={() => setTheme(mode)}
          type="button"
        >
          {mode}
        </button>
      ))}
    </Dropdown>
  );
}
