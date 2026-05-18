"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "atlas-theme";
const THEME_CHANGE = "atlas-theme-change";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored ?? getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function subscribe(onStoreChange: () => void) {
  const onSystemChange = () => {
    if (!localStorage.getItem(STORAGE_KEY)) onStoreChange();
  };

  window.addEventListener(THEME_CHANGE, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onSystemChange);

  return () => {
    window.removeEventListener(THEME_CHANGE, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    mq.removeEventListener("change", onSystemChange);
  };
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "light" ? "dark" : "light");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, mounted };
}
