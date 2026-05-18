"use client";

import dynamic from "next/dynamic";
import { MotionFade } from "@/components/animations/MotionFade";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { PAGE_CONTAINER } from "@/lib/constants";

const HeroGlobe = dynamic(
  () => import("@/components/three/HeroGlobe").then((mod) => mod.HeroGlobe),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full min-h-[280px] w-full animate-pulse rounded-2xl bg-[var(--color-bg-muted)]/40 sm:min-h-[320px]"
        aria-hidden
      />
    ),
  },
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center pt-16"
      aria-labelledby="hero-heading"
    >
      <Container
        width={PAGE_CONTAINER}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20"
      >
        <div className="flex max-w-2xl flex-col gap-6 sm:gap-8">
          <MotionFade>
            <Heading id="hero-heading" level={1}>
              The atmosphere remembers every choice we make
            </Heading>
          </MotionFade>
          <MotionFade delay={0.1}>
            <Text size="lg" muted>
              An immersive editorial journey through the signals of a changing planet —
              measured in data, felt in landscapes, understood through time.
            </Text>
          </MotionFade>
          <MotionFade delay={0.2}>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                onClick={() =>
                  document.getElementById("data")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore the data
              </Button>
              <Button variant="outline">About this project</Button>
            </div>
          </MotionFade>
        </div>
        <MotionFade
          delay={0.1}
          direction="none"
          className="relative mx-auto aspect-square w-full max-w-md lg:max-h-[min(70vh,520px)] lg:max-w-none"
        >
          <HeroGlobe />
        </MotionFade>
      </Container>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[image:var(--gradient-horizon)]"
      />
    </section>
  );
}
