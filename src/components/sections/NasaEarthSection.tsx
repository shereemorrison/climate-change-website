"use client";

import { NasaEarthPanel } from "@/components/climate/NasaEarthPanel";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { fallbackNasaEarth } from "@/lib/climate-api/fallbacks";
import type { NasaEarthImage } from "@/lib/climate-api/types";
import { useClimateData } from "@/hooks/climate/useClimateData";

export function NasaEarthSection() {
  const { data, source, loading, error } = useClimateData<NasaEarthImage>("nasa-earth");

  const earth = data ?? (error ? fallbackNasaEarth : null);
  const dataSource = source ?? "fallback";

  return (
    <section
      id="nasa"
      className="data-section data-section--nasa"
      aria-labelledby="nasa-heading"
    >
      <Container width={PAGE_CONTAINER}>
        <header className="data-section__header data-section__header--center">
          <p className="data-section__eyebrow">NASA perspective</p>
          <h2 id="nasa-heading" className="data-section__title">
            Our planet, seen from a million miles away
          </h2>
          <p className="data-section__lede data-section__lede--center">
            The EPIC instrument on DSCOVR captures natural-colour images of the
            sunlit Earth — a daily portrait of the world we share.
          </p>
        </header>

        {loading || !earth ? (
          <div className="data-section__skeleton data-section__skeleton--nasa" aria-busy="true" />
        ) : (
          <NasaEarthPanel earth={earth} source={dataSource} />
        )}
      </Container>
    </section>
  );
}
