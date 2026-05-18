"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useTheme, type Theme } from "@/hooks/useTheme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

/** Keeps `data-theme` in sync with storage and refreshes scroll layout on change. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useTheme();

  useEffect(() => {
    applyTheme(theme);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [theme]);

  return children;
}
