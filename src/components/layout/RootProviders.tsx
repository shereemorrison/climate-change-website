"use client";

import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

type RootProvidersProps = {
  children: React.ReactNode;
};

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <ThemeProvider>
      <ExperienceShell>{children}</ExperienceShell>
    </ThemeProvider>
  );
}
