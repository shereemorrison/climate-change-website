"use client";

import { useId, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { fallbackTemperatureSeries } from "@/lib/climate-api/fallbacks";
import type { TemperaturePoint } from "@/lib/climate-api/types";
import { cn } from "@/utils/cn";

const WIDTH = 520;
const HEIGHT = 280;
const PAD = { top: 24, right: 20, bottom: 36, left: 44 };

type TemperatureChartProps = {
  className?: string;
  series?: TemperaturePoint[];
  caption?: string;
  loading?: boolean;
};

export function TemperatureChart({
  className,
  series: seriesProp,
  caption,
  loading,
}: TemperatureChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  const series = seriesProp?.length ? seriesProp : fallbackTemperatureSeries;

  const { path, area, labels } = useMemo(() => {
    const data = series;
    const minY = Math.min(-0.25, ...data.map((p) => p.anomaly)) - 0.1;
    const maxY = Math.max(1.35, ...data.map((p) => p.anomaly)) + 0.1;
    const minX = data[0].year;
    const maxX = data[data.length - 1].year;

    const plotW = WIDTH - PAD.left - PAD.right;
    const plotH = HEIGHT - PAD.top - PAD.bottom;

    const x = (year: number) => PAD.left + ((year - minX) / (maxX - minX)) * plotW;
    const y = (anomaly: number) =>
      PAD.top + plotH - ((anomaly - minY) / (maxY - minY)) * plotH;

    const line = data
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year)} ${y(p.anomaly)}`)
      .join(" ");

    const areaPath = `${line} L ${x(maxX)} ${y(minY)} L ${x(minX)} ${y(minY)} Z`;

    const labelYears = [
      data[0].year,
      data[Math.floor(data.length / 2)].year,
      data[data.length - 1].year,
    ];

    return {
      path: line,
      area: areaPath,
      labels: [...new Set(labelYears)].map((year) => ({ year, x: x(year) })),
    };
  }, [series]);

  useGSAP(
    () => {
      if (loading) return;
      const svg = rootRef.current?.querySelector("svg");
      if (!svg) return;

      const line = svg.querySelector<SVGPathElement>("[data-chart-line]");
      const fill = svg.querySelector<SVGPathElement>("[data-chart-area]");
      if (!line || !fill) return;

      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(fill, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.to(line, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }).to(
        fill,
        { opacity: 1, duration: 0.9, ease: "power2.out" },
        "-=0.7",
      );
    },
    { scope: rootRef, dependencies: [loading, series] },
  );

  if (loading) {
    return (
      <div className={cn("temperature-chart", className)}>
        <div className="data-section__skeleton data-section__skeleton--chart" aria-busy="true" />
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("temperature-chart", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="temperature-chart__svg"
        role="img"
        aria-label="Global temperature anomaly over time"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(76, 175, 80, 0.35)" />
            <stop offset="100%" stopColor="rgba(76, 175, 80, 0)" />
          </linearGradient>
        </defs>

        <line
          x1={PAD.left}
          x2={WIDTH - PAD.right}
          y1={PAD.top + (HEIGHT - PAD.top - PAD.bottom) * 0.35}
          y2={PAD.top + (HEIGHT - PAD.top - PAD.bottom) * 0.35}
          stroke="rgba(55, 71, 79, 0.12)"
          strokeDasharray="4 6"
        />

        <path d={area} fill={`url(#${gradientId})`} data-chart-area />
        <path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-chart-line
        />

        {labels.map((l) => (
          <text
            key={l.year}
            x={l.x}
            y={HEIGHT - 10}
            textAnchor="middle"
            className="temperature-chart__label"
          >
            {l.year}
          </text>
        ))}
      </svg>
      <p className="temperature-chart__caption">
        {caption ?? "Global surface temperature anomaly (°C)"}
      </p>
    </div>
  );
}
