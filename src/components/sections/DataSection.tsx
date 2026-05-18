"use client";

import { GSAPReveal } from "@/components/animations/GSAPReveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { Stat } from "@/components/typography/Stat";
import { PAGE_CONTAINER } from "@/lib/constants";
import { climateStats } from "@/data/climate-stats";

export function DataSection() {
  return (
    <Section id="data" spacing="lg" atmosphere aria-label="Climate data">
      <Container width={PAGE_CONTAINER}>
        <SectionIntro
          eyebrow="Measured signals"
          title="Four numbers that define our moment"
          description="Each figure is a chapter in the planetary story — precise enough for science, human enough to compel action."
        />
        <GSAPReveal>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {climateStats.map((stat) => (
              <div
                key={stat.id}
                data-reveal
                className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-shadow hover:shadow-[var(--shadow-elevated)] sm:p-8"
              >
                <Stat value={stat.value} unit={stat.unit} label={stat.label} />
                <p className="mt-auto pt-4 text-xs leading-relaxed text-[var(--color-text-subtle)]">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>
        </GSAPReveal>
      </Container>
    </Section>
  );
}
