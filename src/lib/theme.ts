export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "atlas-theme";
export const THEME_CHANGE_EVENT = "atlas-theme-change";
export const DEFAULT_THEME: Theme = "light";

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
