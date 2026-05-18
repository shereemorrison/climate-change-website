"use client";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  delay: `${(i % 7) * 0.65}s`,
  duration: `${4 + (i % 5)}s`,
  size: i % 3 === 0 ? "md" : "sm",
}));

const SIGNALS = [
  { value: "421", unit: "ppm CO₂" },
  { value: "+1.2", unit: "°C anomaly" },
  { value: "3.3", unit: "mm / yr sea level" },
  { value: "90%", unit: "heat → oceans" },
];

export function HeroClimateVisual() {
  return (
    <div className="hero-climate" aria-hidden>
      <div className="hero-climate__aurora hero-climate__aurora--a" />
      <div className="hero-climate__aurora hero-climate__aurora--b" />
      <div className="hero-climate__grid" />

      <svg className="hero-climate__chart" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path
          className="hero-climate__chart-line"
          d="M0,95 C40,88 80,72 120,68 S200,42 240,38 320,18 400,8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="hero-climate__chart-fill"
          d="M0,95 C40,88 80,72 120,68 S200,42 240,38 320,18 400,8 L400,120 L0,120 Z"
        />
      </svg>

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`hero-climate__particle hero-climate__particle--${p.size}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      <div className="hero-climate__signals">
        {SIGNALS.map((signal) => (
          <div key={signal.unit} className="hero-climate__signal">
            <span className="hero-climate__signal-value">{signal.value}</span>
            <span className="hero-climate__signal-unit">{signal.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
