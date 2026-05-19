"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SITE_NAME } from "@/lib/constants";
import {
  DEFAULT_TITLE_CUTOUT,
  RING_C,
  RING_VIEW,
  applyTitleCutout,
  measureTitleCutout,
  sortCharsFromVisualCenter,
} from "@/lib/preloader-ring";
import { SplitChars } from "@/components/atmosphere/preloader-split";

const STATUS_PHASES = [
  { until: 35, label: "Initializing Atlas" },
  { until: 70, label: "Loading climate signals" },
  { until: 99, label: "Rendering planetary data" },
  { until: 100, label: "Calibration complete" },
] as const;

/** All times in seconds — single source of truth for the preloader sequence. */
const TIMING = {
  titleRevealStart: 0.35,
  titleRevealDuration: 1.15,
  titleRevealStagger: 0.38,
  progressStart: 0.9,
  progressDuration: 3.2,
  titleExitDuration: 1.05,
  splitAfterTitleExit: 1.05,
  hudFade: 0.3,
  ringFade: 0.9,
  splitDuration: 1.1,
} as const;

const TITLE_OUT =
  TIMING.progressStart + TIMING.progressDuration;
const SPLIT = TITLE_OUT + TIMING.splitAfterTitleExit;

const CHAR_FROM = {
  y: "120%",
  z: -80,
  scale: 0.78,
  rotateX: -32,
  opacity: 0,
  transformOrigin: "50% 85%",
  force3D: true,
} as const;

const CHAR_REVEAL_TO = {
  y: "0%",
  z: 48,
  opacity: 1,
  scale: 1,
  rotateX: 0,
  duration: TIMING.titleRevealDuration,
  stagger: { amount: TIMING.titleRevealStagger, from: "start" as const },
  ease: "back.out(1.55)",
} as const;

function statusForProgress(value: number): string {
  for (const phase of STATUS_PHASES) {
    if (value <= phase.until) return phase.label;
  }
  return STATUS_PHASES[STATUS_PHASES.length - 1].label;
}

function titleExitX(index: number, total: number): number {
  const mid = (total - 1) / 2;
  const side = index <= mid ? -1 : 1;
  const dist = Math.abs(index - mid);
  return side * window.innerWidth * (0.82 + dist * 0.1);
}

function titleExitY(index: number, total: number): number {
  const mid = (total - 1) / 2;
  const side = index <= mid ? -1 : 1;
  return side * (18 + Math.abs(index - mid) * 7);
}

function titleExitRotation(index: number, total: number): number {
  const mid = (total - 1) / 2;
  const side = index <= mid ? -1 : 1;
  return side * (14 + Math.abs(index - mid) * 5);
}

const EASE = "power3.inOut";

export function LoadingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();
  const loadReadyRef = useRef(false);
  const animDoneRef = useRef(false);

  const tryFinish = useCallback(() => {
    if (!loadReadyRef.current || !animDoneRef.current) return;
    setDone(true);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const onLoad = () => {
      loadReadyRef.current = true;
      tryFinish();
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => window.removeEventListener("load", onLoad);
  }, [reducedMotion, tryFinish]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const title = titleRef.current;
    const svg = svgRef.current;
    const maskRect = maskRectRef.current;
    if (!root || !ring || !title || !svg || !maskRect) return;

    registerGSAP();
    applyTitleCutout(maskRect, measureTitleCutout(svg, title));

    ring.style.strokeDasharray = `${RING_C}`;
    ring.style.strokeDashoffset = `${RING_C}`;

    const titleChars = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".preloader-char > span"),
    );
    const revealChars = sortCharsFromVisualCenter(title, titleChars);

    const panelTop = root.querySelector(".preloader-panel--top");
    const panelBottom = root.querySelector(".preloader-panel--bottom");
    if (!panelTop || !panelBottom) return;

    const progress = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.set(revealChars, CHAR_FROM);

      const tl = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          animDoneRef.current = true;
          tryFinish();
        },
      });

      tl.to(revealChars, CHAR_REVEAL_TO, TIMING.titleRevealStart);

      tl.to(
        progress,
        {
          value: 100,
          duration: TIMING.progressDuration,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progress.value);
            if (percentRef.current) percentRef.current.textContent = String(v);
            if (statusRef.current) statusRef.current.textContent = statusForProgress(v);
            ring.style.strokeDashoffset = `${RING_C * (1 - progress.value / 100)}`;
          },
        },
        TIMING.progressStart,
      );

      tl.addLabel("titleOut", TITLE_OUT);

      tl.to(".preloader-hud", { opacity: 0, duration: TIMING.hudFade, ease: "power2.in" }, "titleOut");

      tl.to(
        ".preloader-ring",
        { opacity: 0, duration: TIMING.ringFade, ease: "power2.in" },
        "titleOut",
      );

      tl.to(
        titleChars,
        {
          x: (i) => titleExitX(i, titleChars.length),
          y: (i) => titleExitY(i, titleChars.length),
          z: 200,
          rotation: (i) => titleExitRotation(i, titleChars.length),
          rotateX: -18,
          opacity: 0,
          scale: 0.65,
          duration: TIMING.titleExitDuration,
          stagger: { each: 0.032, from: "center" },
          ease: "power4.in",
        },
        "titleOut",
      );

      tl.addLabel("split", SPLIT);

      tl.add(() => {
        gsap.set(panelTop, {
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        });
        gsap.set(panelBottom, {
          clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
        });
      }, "split");

      tl.to(
        [panelTop, panelBottom],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: TIMING.splitDuration,
          ease: "power2.inOut",
        },
        "split",
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, tryFinish]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (reducedMotion || done) return null;

  return (
    <div
      ref={rootRef}
      className="preloader-root"
      role="status"
      aria-live="polite"
      aria-label="Loading experience"
    >
      <div className="preloader-panel preloader-panel--top">
        <div className="preloader-panel__glow" aria-hidden />

        <div className="preloader-hub">
          <div className="preloader-ring">
            <svg
              ref={svgRef}
              className="preloader-ring__svg"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <defs>
                <mask
                  id="preloader-ring-cutout"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect
                    ref={maskRectRef}
                    x={DEFAULT_TITLE_CUTOUT.x}
                    y={DEFAULT_TITLE_CUTOUT.y}
                    width={DEFAULT_TITLE_CUTOUT.width}
                    height={DEFAULT_TITLE_CUTOUT.height}
                    fill="black"
                  />
                </mask>
              </defs>
              <g mask="url(#preloader-ring-cutout)">
                <circle
                  className="preloader-ring__track"
                  cx={RING_VIEW.cx}
                  cy={RING_VIEW.cy}
                  r={RING_VIEW.r}
                />
                <circle
                  ref={ringRef}
                  className="preloader-ring__progress"
                  cx={RING_VIEW.cx}
                  cy={RING_VIEW.cy}
                  r={RING_VIEW.r}
                />
              </g>
            </svg>
          </div>

          <h1 ref={titleRef} className="preloader-title">
            <SplitChars text={SITE_NAME} />
          </h1>
        </div>

        <div className="preloader-hud">
          <p className="preloader-percent">
            <span ref={percentRef} className="preloader-percent__value">
              0
            </span>
            %
          </p>
          <p ref={statusRef} className="preloader-status">
            Initializing Atlas
          </p>
        </div>
      </div>

      <div className="preloader-panel preloader-panel--bottom" aria-hidden>
        <div className="preloader-panel__glow" aria-hidden />
      </div>
    </div>
  );
}