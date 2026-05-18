"use client";

import { useId, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import type { Co2Point } from "@/lib/climate-api/types";
import { formatCo2Kt } from "@/lib/climate-api/worldbank";
import { cn } from "@/utils/cn";

const WIDTH = 520;
const HEIGHT = 260;
const PAD = { top: 24, right: 20, bottom: 40, left: 48 };

type Co2TrendChartProps = {
  series: Co2Point[];
  className?: string;
};

export function Co2TrendChart({ series, className }: Co2TrendChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  const { path, area, labels, yTicks } = useMemo(() => {
    const data = series.filter((p) => p.value > 0);
    if (data.length < 2) {
      return { path: "", area: "", labels: [], yTicks: [] };
    }

    const values = data.map((p) => p.value);
    const minVal = Math.min(...values) * 0.92;
    const maxVal = Math.max(...values) * 1.04;
    const minYear = data[0].year;
    const maxYear = data[data.length - 1].year;

    const plotW = WIDTH - PAD.left - PAD.right;
    const plotH = HEIGHT - PAD.top - PAD.bottom;

    const x = (year: number) => PAD.left + ((year - minYear) / (maxYear - minYear)) * plotW;
    const y = (value: number) =>
      PAD.top + plotH - ((value - minVal) / (maxVal - minVal)) * plotH;

    const line = data
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year)} ${y(p.value)}`)
      .join(" ");

    const areaPath = `${line} L ${x(maxYear)} ${PAD.top + plotH} L ${x(minYear)} ${PAD.top + plotH} Z`;

    const labelYears = [minYear, data[Math.floor(data.length / 2)].year, maxYear];

    const yTicks = [minVal, (minVal + maxVal) / 2, maxVal].map((value) => ({
      value,
      label: formatCo2Kt(value),
      y: y(value),
    }));

    return {
      path: line,
      area: areaPath,
      labels: [...new Set(labelYears)].map((year) => ({ year, x: x(year) })),
      yTicks,
    };
  }, [series]);

  useGSAP(
    () => {
      const svg = rootRef.current?.querySelector("svg");
      if (!svg) return;

      const line = svg.querySelector<SVGPathElement>("[data-co2-line]");
      const fill = svg.querySelector<SVGPathElement>("[data-co2-area]");
      if (!line || !fill) return;

      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(fill, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }).to(
        fill,
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.9",
      );
    },
    { scope: rootRef, dependencies: [series] },
  );

  return (
    <div ref={rootRef} className={cn("co2-chart", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="co2-chart__svg"
        role="img"
        aria-label="Global CO2 emissions rising over time"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="co2-chart__gradient-stop co2-chart__gradient-stop--top" />
            <stop offset="100%" className="co2-chart__gradient-stop co2-chart__gradient-stop--bottom" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => (
          <g key={tick.label}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={tick.y}
              y2={tick.y}
              className="co2-chart__grid"
            />
            <text
              x={PAD.left - 8}
              y={tick.y + 4}
              textAnchor="end"
              className="co2-chart__ylabel"
            >
              {tick.label}
            </text>
          </g>
        ))}

        <path d={area} fill={`url(#${gradientId})`} data-co2-area />
        <path
          d={path}
          fill="none"
          className="co2-chart__line"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-co2-line
        />

        {labels.map((l) => (
          <text
            key={l.year}
            x={l.x}
            y={HEIGHT - 10}
            textAnchor="middle"
            className="co2-chart__label"
          >
            {l.year}
          </text>
        ))}
      </svg>
      <p className="co2-chart__caption">Global CO₂ emissions (kt) · World Bank</p>
    </div>
  );
}
