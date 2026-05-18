"use client";

import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { getLenisScroller } from "@/lib/lenis-config";
import {
  type DiveEarthHandoff,
  getDiveEarthTransform,
} from "@/lib/earth-dive-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type EarthAnchor = "left" | "center" | "right";

const ANCHOR_X: Record<EarthAnchor, number> = {
  left: 0.32,
  center: 0.5,
  right: 0.78,
};

const BASE_OPACITY = 0.52;
const HERO_OPACITY = 0.68;
const SCALE_REFERENCE = 1.05;
const DEFAULT_CAMERA_Z = 8;
const DIVE_CAMERA_Z = 3.35;
const MOBILE_MAX_WIDTH = 768;

type Waypoint = { x: number; y: number; scale: number };

function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_MAX_WIDTH;
}

/** Pull the globe inward on narrow screens so it stays in frame */
function adjustWaypoint(wp: Waypoint): Waypoint {
  if (!isMobileViewport()) return wp;
  return {
    x: lerp(wp.x, 50, 0.42),
    y: wp.y,
    scale: Math.min(wp.scale * 1.06, 1.14),
  };
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function interpolateWaypoints(waypoints: Waypoint[], progress: number): Waypoint {
  if (waypoints.length === 0) return { x: 50, y: 48, scale: 0.75 };
  if (waypoints.length === 1) return waypoints[0];

  const segments = waypoints.length - 1;
  const scaled = Math.min(Math.max(progress, 0), 1) * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const t = smoothstep(scaled - index);

  const p0 = waypoints[Math.max(0, index - 1)];
  const p1 = waypoints[index];
  const p2 = waypoints[Math.min(index + 1, waypoints.length - 1)];
  const p3 = waypoints[Math.min(index + 2, waypoints.length - 1)];

  const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
  const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
  const scale = catmullRom(p0.scale, p1.scale, p2.scale, p3.scale, t);

  const driftMix =
    progress > 0.88 ? 0 : Math.pow(Math.min(progress / 0.12, 1), 1.4);
  const driftX =
    driftMix *
    (Math.sin(progress * Math.PI * 2.4) * 5 + Math.cos(progress * Math.PI * 1.6) * 3);
  const driftY = driftMix * Math.sin(progress * Math.PI * 3.1 + 0.6) * 4;

  return adjustWaypoint({ x: x + driftX, y: y + driftY, scale });
}

function journeyOpacity(progress: number): number {
  const fadeOut = progress > 0.985 ? 1 - (progress - 0.985) / 0.015 : 1;
  const heroBlend = progress < 0.12 ? 1 - progress / 0.12 : 0;
  const opacity = BASE_OPACITY + (HERO_OPACITY - BASE_OPACITY) * heroBlend;
  return opacity * fadeOut;
}

function scaleToSizePx(scale: number): number {
  if (typeof window === "undefined") return 520;
  const w = window.innerWidth;
  const mobile = w < MOBILE_MAX_WIDTH;
  const viewportCap = mobile ? Math.min(w * 0.88, 520) : Math.min(w * 0.72, 760);
  const minSize = mobile ? 200 : 260;
  const normalized = scale / SCALE_REFERENCE;
  return Math.max(minSize, viewportCap * normalized);
}

function sectionToWaypoint(section: HTMLElement): Waypoint {
  const anchor = (section.dataset.earthAnchor as EarthAnchor) ?? "center";
  const yBias = Number(section.dataset.earthY ?? "48");
  const scale = Number(section.dataset.earthScale ?? "0.75");
  const x = section.dataset.earthX
    ? Number(section.dataset.earthX)
    : ANCHOR_X[anchor] * 100;
  return { x, y: yBias, scale };
}

function waypointToHandoff(wp: Waypoint, scrollProgress: number): DiveEarthHandoff {
  return {
    x: wp.x,
    y: wp.y,
    size: scaleToSizePx(wp.scale),
    opacity: journeyOpacity(scrollProgress),
  };
}

/* Journey path + dive; earth continues into Solutions after dive */
export function useEarthJourney(
  mainRef: RefObject<HTMLElement | null>,
  earthRef: RefObject<HTMLDivElement | null>,
  scrollProgressRef: MutableRefObject<number>,
  diveProgressRef: MutableRefObject<number>,
  cameraZRef: MutableRefObject<number>,
) {
  const reducedMotion = useReducedMotion();
  const diveHandoffRef = useRef<DiveEarthHandoff | null>(null);
  const prevDivePRef = useRef(-1);

  useEffect(() => {
    const main = mainRef.current;
    const el = earthRef.current;
    if (!main || !el) return;

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>("[data-earth-anchor]"),
    );
    const pathSections = sections.filter((s) => s.id !== "earth-dive");
    if (!pathSections.length) return;

    const waypoints = pathSections.map(sectionToWaypoint);

    const apply = (scrollProgress: number) => {
      const diveP = diveProgressRef.current;
      const inDive = diveP >= 0;

      if (inDive && prevDivePRef.current < 0) {
        const wp = interpolateWaypoints(waypoints, scrollProgress);
        diveHandoffRef.current = waypointToHandoff(wp, scrollProgress);
        gsap.set(el, {
          left: `${diveHandoffRef.current.x}%`,
          top: `${diveHandoffRef.current.y}%`,
          width: diveHandoffRef.current.size,
          height: diveHandoffRef.current.size,
          opacity: diveHandoffRef.current.opacity,
          xPercent: -50,
          yPercent: -50,
        });
      }
      if (!inDive) {
        diveHandoffRef.current = null;
      }
      prevDivePRef.current = diveP;

      scrollProgressRef.current = scrollProgress;

      const exitWp = interpolateWaypoints(waypoints, scrollProgress);
      const exitTarget = waypointToHandoff(exitWp, scrollProgress);

      if (inDive && diveHandoffRef.current) {
        const dive = getDiveEarthTransform(diveP, diveHandoffRef.current, exitTarget);
        cameraZRef.current = lerp(
          DEFAULT_CAMERA_Z,
          DIVE_CAMERA_Z,
          easeInOut(dive.cameraT),
        );

        gsap.set(el, {
          left: `${dive.x}%`,
          top: `${dive.y}%`,
          width: dive.size,
          height: dive.size,
          opacity: dive.opacity,
          xPercent: -50,
          yPercent: -50,
        });
        el.classList.add("scrolling-earth--dive-bg");
        return;
      }

      el.classList.remove("scrolling-earth--dive-bg");
      const wp = interpolateWaypoints(waypoints, scrollProgress);
      const size = scaleToSizePx(wp.scale);
      const opacity = journeyOpacity(scrollProgress);
      cameraZRef.current = DEFAULT_CAMERA_Z;

      gsap.set(el, {
        left: `${wp.x}%`,
        top: `${wp.y}%`,
        width: size,
        height: size,
        opacity,
        zIndex: 2,
        xPercent: -50,
        yPercent: -50,
      });
    };

    if (reducedMotion) {
      apply(0.5);
      return;
    }

    registerGSAP();
    const scroller = getLenisScroller();
    const triggers: ScrollTrigger[] = [];
    let journeyTrigger: ScrollTrigger | null = null;

    const tick = () => {
      if (journeyTrigger) apply(journeyTrigger.progress);
    };

    const setup = () => {
      triggers.forEach((t) => t.kill());
      triggers.length = 0;

      const journeyEnd = pathSections[pathSections.length - 1];

      journeyTrigger = ScrollTrigger.create({
        trigger: pathSections[0],
        start: "top top",
        endTrigger: journeyEnd,
        end: "bottom top",
        scrub: 2.4,
        scroller,
        invalidateOnRefresh: true,
      });
      triggers.push(journeyTrigger);

      gsap.ticker.add(tick);
      apply(journeyTrigger.progress);
      ScrollTrigger.refresh();
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(setup);
    });

    const onResize = () => {
      if (diveProgressRef.current >= 0 && diveHandoffRef.current && journeyTrigger) {
        const exitWp = interpolateWaypoints(waypoints, journeyTrigger.progress);
        const exitTarget = waypointToHandoff(exitWp, journeyTrigger.progress);
        const dive = getDiveEarthTransform(
          diveProgressRef.current,
          diveHandoffRef.current,
          exitTarget,
        );
        gsap.set(el, { width: dive.size, height: dive.size });
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      gsap.ticker.remove(tick);
      triggers.forEach((t) => t.kill());
      diveHandoffRef.current = null;
      prevDivePRef.current = -1;
      el.classList.remove("scrolling-earth--dive-bg");
      window.removeEventListener("resize", onResize);
    };
  }, [
    mainRef,
    earthRef,
    scrollProgressRef,
    diveProgressRef,
    cameraZRef,
    reducedMotion,
  ]);
}
