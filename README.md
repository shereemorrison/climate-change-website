# Atlas of Change

A cinematic climate data storytelling experience built with Next.js

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** with CSS variable design tokens
- **Motion** (Framer Motion) for viewport-based UI transitions
- **GSAP + ScrollTrigger** for scroll-linked narrative animation
- **Lenis** for global smooth scrolling
- **React Three Fiber + Drei** for atmospheric 3D scenes
- **clsx** + **tailwind-merge** for class composition
- **React Icons** for UI iconography
- **ESLint** + **Prettier**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Project structure

```
src/
├── app/                 # Next.js App Router (layouts, pages, global styles)
├── components/
│   ├── animations/      # Motion + GSAP wrappers (MotionFade, GSAPReveal, ScrollSection)
│   ├── layout/          # Site shell, sections, containers, header/footer
│   ├── sections/        # Page narrative sections (Hero, Data, Atmosphere, Impact)
│   ├── three/           # R3F canvas and 3D scenes
│   └── ui/              # Buttons and shared UI primitives
├── hooks/               # useLenis, useGSAP, useTheme, useReducedMotion
├── lib/                 # GSAP registration, Lenis config, site constants
├── styles/              # Design tokens, typography, motion, section utilities
├── utils/               # cn() and shared helpers
└── data/                # Climate stats and content
```

## Architecture

| Layer                    | Responsibility                                   |
| ------------------------ | ------------------------------------------------ |
| `data/`                  | Content and copy — no UI logic                   |
| `components/sections/`   | Composed narrative blocks                        |
| `components/animations/` | Reusable motion primitives                       |
| `hooks/` + `lib/`        | Cross-cutting behaviour (scroll, GSAP, theme)    |
| `styles/tokens.css`      | Single source of truth for colour and atmosphere |

### Import aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).

### Smooth scrolling (Lenis)

`RootProviders` calls `useLenis()`, which:

1. Instantiates Lenis with shared options from `lib/lenis-config.ts`
2. Syncs Lenis with GSAP's ticker (not `requestAnimationFrame` directly)
3. Proxies `document.documentElement` for ScrollTrigger
4. Disables entirely when `prefers-reduced-motion: reduce`

### GSAP architecture

- Plugins register once via `registerGSAP()` in `lib/gsap.ts`
- `useGSAP()` wraps `gsap.context()` for scoped animations and automatic `revert()` on unmount
- `GSAPReveal` and `ScrollSection` encapsulate common scroll patterns
- All GSAP usage respects reduced motion via the shared hook

### Theme system

CSS variables in `styles/tokens.css` define **light atmospheric** and **dark cinematic** palettes. Theme is applied via `data-theme` on `<html>`, with:

- `ThemeScript` for flash-free initial paint
- `useTheme()` for runtime toggling and `localStorage` persistence

Each section uses `Section` + `Container` for consistent spacing (`lib/constants.ts`).
