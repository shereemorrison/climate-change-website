"use client";

import { LiveCityGrid } from "@/components/climate/LiveCityGrid";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { fallbackLiveCities } from "@/lib/climate-api/fallbacks";
import { liveSignalsSourceLabel } from "@/lib/climate-api/labels";
import type { LiveCityReading } from "@/lib/climate-api/types";
import { useClimateData } from "@/hooks/climate/useClimateData";

export function LiveSignalsSection() {
  const { data, source, loading } = useClimateData<{ cities: LiveCityReading[] }>("live");

  const dataSource = source ?? "fallback";
  const cities =
    data?.cities && data.cities.length >= 2 ? data.cities : fallbackLiveCities;

  return (
    <section
      id="live"
      className="data-section data-section--live"
      aria-labelledby="live-heading"
    >
      <Container width={PAGE_CONTAINER}>
        <div className="data-section__split">
          <header className="data-section__header data-section__header--split">
            <p className="data-section__eyebrow">Live signals</p>
            <h2 id="live-heading" className="data-section__title">
              Conditions on the ground, right now
            </h2>
            <p className="data-section__lede">
              Temperature and humidity from cities across continents — a reminder that
              climate change is felt locally, not only in global averages.
            </p>
            {!loading && (
              <p className="data-section__source">{liveSignalsSourceLabel(dataSource)}</p>
            )}
          </header>

          <div className="data-section__split-body">
            {loading ? (
              <div
                className="data-section__skeleton data-section__skeleton--grid"
                aria-busy="true"
              />
            ) : (
              <LiveCityGrid cities={cities} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
