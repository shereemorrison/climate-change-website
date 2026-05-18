"use client";

import { MotionFade } from "@/components/animations/MotionFade";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { Text } from "@/components/typography/Text";
import { PAGE_CONTAINER } from "@/lib/constants";

const impacts = [
  {
    title: "Coastal communities",
    description:
      "Rising seas reshape shorelines and infrastructure, with disproportionate effects on low-lying regions.",
  },
  {
    title: "Ecosystems under stress",
    description:
      "Species migrate, forests burn more intensely, and coral reefs bleach as oceans absorb excess heat.",
  },
  {
    title: "Human health",
    description:
      "Heatwaves, air quality, and shifting disease patterns connect climate change directly to wellbeing.",
  },
];

export function ImpactSection() {
  return (
    <Section id="impact" spacing="lg" atmosphere aria-label="Human impact">
      <Container width={PAGE_CONTAINER}>
        <SectionIntro
          eyebrow="What changes"
          title="The cost is measured in places, not percentages"
        />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {impacts.map((item, index) => (
            <MotionFade key={item.title} delay={index * 0.1} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
                <h3 className="text-editorial text-2xl text-[var(--color-text)]">
                  {item.title}
                </h3>
                <Text muted size="sm" className="flex-1">
                  {item.description}
                </Text>
              </article>
            </MotionFade>
          ))}
        </div>
      </Container>
    </Section>
  );
}
