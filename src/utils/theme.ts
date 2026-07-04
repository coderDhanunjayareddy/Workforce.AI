import type { ThemeMode } from "@/types";

export const themeStorageKey = "workforce-ai-theme";

export const resolveSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const applyThemeClass = (theme: ThemeMode) => {
  const resolved = theme === "system" ? resolveSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};
