"use client";

import { ScrollSection } from "@/components/animations/ScrollSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { PAGE_CONTAINER } from "@/lib/constants";

export function AtmosphereSection() {
  return (
    <Section id="atmosphere" spacing="xl" aria-label="Atmospheric narrative">
      <ScrollSection scrub={1.2}>
        <Container width={PAGE_CONTAINER}>
          <div data-parallax>
            <SectionIntro
              align="center"
              eyebrow="The thinning veil"
              title="We live inside a fragile envelope of air and water"
              description="Greenhouse gases trap heat that would otherwise escape to space. The result is not abstract — it is warmer oceans, shifting rains, and seasons that no longer arrive on schedule."
            />
          </div>
        </Container>
      </ScrollSection>
    </Section>
  );
}
