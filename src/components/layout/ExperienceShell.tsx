"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/atmosphere/LoadingScreen";
import { ScrollProgress } from "@/components/atmosphere/ScrollProgress";

const SmoothScroll = dynamic(
  () => import("@/components/layout/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false },
);

type ExperienceShellProps = {
  children: React.ReactNode;
};

/** Global cinematic layer: loader, scroll progress, smooth scroll. */
export function ExperienceShell({ children }: ExperienceShellProps) {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <ScrollProgress />
      {children}
    </SmoothScroll>
  );
}
