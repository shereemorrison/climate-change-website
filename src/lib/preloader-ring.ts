/* SVG viewBox ring geometry (0–100 space). */

export const RING_VIEW = { cx: 50, cy: 50, r: 46 } as const;
export const RING_C = 2 * Math.PI * RING_VIEW.r;

export type TitleCutout = { x: number; y: number; width: number; height: number };

export const DEFAULT_TITLE_CUTOUT: TitleCutout = { x: 6, y: 43, width: 88, height: 14 };

/* Title bounding box in SVG viewBox coords — punches a horizontal gap through the ring. */
export function measureTitleCutout(
  svgEl: SVGSVGElement,
  titleEl: HTMLElement,
): TitleCutout {
  const svg = svgEl.getBoundingClientRect();
  const title = titleEl.getBoundingClientRect();
  if (svg.width < 1 || svg.height < 1 || title.width < 1) return DEFAULT_TITLE_CUTOUT;

  const padX = Math.max(8, title.width * 0.04);
  const padY = Math.max(5, title.height * 0.38);

  const toViewX = (px: number) => ((px - svg.left) / svg.width) * 100;
  const toViewY = (px: number) => ((px - svg.top) / svg.height) * 100;

  const x1 = toViewX(title.left - padX);
  const y1 = toViewY(title.top - padY);
  const x2 = toViewX(title.right + padX);
  const y2 = toViewY(title.bottom + padY);

  return {
    x: Math.max(0, x1),
    y: Math.max(0, y1),
    width: Math.min(100, x2) - Math.max(0, x1),
    height: Math.min(100, y2) - Math.max(0, y1),
  };
}

/** Centre-out order by on-screen position (not string index). */
export function sortCharsFromVisualCenter(
  titleEl: HTMLElement,
  chars: HTMLElement[],
): HTMLElement[] {
  const titleRect = titleEl.getBoundingClientRect();
  const cx = titleRect.left + titleRect.width / 2;

  return [...chars].sort((a, b) => {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const da = Math.abs(ra.left + ra.width / 2 - cx);
    const db = Math.abs(rb.left + rb.width / 2 - cx);
    if (da !== db) return da - db;
    return ra.left - rb.left;
  });
}

export function applyTitleCutout(rect: SVGRectElement, cutout: TitleCutout) {
  rect.setAttribute("x", String(cutout.x));
  rect.setAttribute("y", String(cutout.y));
  rect.setAttribute("width", String(cutout.width));
  rect.setAttribute("height", String(cutout.height));
}
