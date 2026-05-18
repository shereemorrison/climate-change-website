"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/layout/SmoothScroll").then((mod) => mod.SmoothScroll),
  { ssr: false },
);

type RootProvidersProps = {
  children: React.ReactNode;
};

export function RootProviders({ children }: RootProvidersProps) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
