"use client";

import { Co2TrendChart } from "@/components/climate/Co2TrendChart";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { fallbackCo2Series } from "@/lib/climate-api/fallbacks";
import { co2SourceLabel } from "@/lib/climate-api/labels";
import type { Co2Point } from "@/lib/climate-api/types";
import { formatCo2Kt } from "@/lib/climate-api/worldbank";
import { useClimateData } from "@/hooks/climate/useClimateData";

type Co2ApiData = {
  series: Co2Point[];
  unit: string;
  indicator: string;
};

export function GlobalDataSection() {
  const { data, source, loading, error } = useClimateData<Co2ApiData>("co2");

  const series = data?.series ?? (error ? fallbackCo2Series : []);
  const latest = series[series.length - 1];
  const earliest = series[0];
  const growth =
    latest && earliest && earliest.value > 0
      ? Math.round(((latest.value - earliest.value) / earliest.value) * 100)
      : null;

  return (
    <section
      id="data"
      className="data-section data-section--global"
      aria-labelledby="data-heading"
    >
      <Container width={PAGE_CONTAINER}>
        <div className="data-section__grid">
          <header className="data-section__lead">
            <p className="data-section__eyebrow">Global indicators</p>
            <h2 id="data-heading" className="data-section__title">
              Emissions measured at planetary scale
            </h2>
            <p className="data-section__lede">
              The World Bank tracks greenhouse gas emissions worldwide — one
              dataset among many that document humanity&apos;s growing footprint.
            </p>

            {latest && (
              <div className="data-section__highlights">
                <div className="data-highlight">
                  <span className="data-highlight__value">{formatCo2Kt(latest.value)}</span>
                  <span className="data-highlight__label">kt CO₂ in {latest.year}</span>
                </div>
                {growth != null && (
                  <div className="data-highlight">
                    <span className="data-highlight__value">+{growth}%</span>
                    <span className="data-highlight__label">
                      since {earliest?.year ?? "1990"}
                    </span>
                  </div>
                )}
              </div>
            )}

            <p className="data-section__source">
              {co2SourceLabel(source, data?.indicator)}
            </p>
          </header>

          <div className="data-section__viz">
            {loading ? (
              <div className="data-section__skeleton data-section__skeleton--chart" aria-busy="true" />
            ) : (
              <Co2TrendChart series={series} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
