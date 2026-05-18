"use client";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { useTheme } from "@/hooks/useTheme";
import { useScrolled } from "@/hooks/useScrolled";
import { useLightNav } from "@/hooks/useLightNav";
import { cn } from "@/utils/cn";
import { PAGE_CONTAINER } from "@/lib/constants";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const scrolled = useScrolled(32);
  const onDarkSurface = useLightNav();
  const lightNav = onDarkSurface && !scrolled;

  return (
    <header
      className={cn(
        "navbar-floating fixed top-0 right-0 left-0 z-50 border-b",
        scrolled ? "navbar-floating--scrolled" : "navbar-floating--top",
        lightNav && "navbar-floating--hero",
      )}
    >
      <Container
        width={PAGE_CONTAINER}
        className="grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center gap-4"
      >
        <a
          href="#hero"
          className={cn(
            "justify-self-start text-caption transition-colors",
            lightNav
              ? "text-white/70 hover:text-white"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
          )}
        >
          Home
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-6 lg:gap-8 md:flex"
        >
          <NavLink href="#story" light={lightNav}>
            Story
          </NavLink>
          <NavLink href="#impact" light={lightNav}>
            Impact
          </NavLink>
          <NavLink href="#earth" light={lightNav}>
            Earth
          </NavLink>
          <NavLink href="#solutions" light={lightNav}>
            Solutions
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark theme" : "Switch to light theme"
          }
          className={cn(
            "justify-self-end flex h-10 w-10 items-center justify-center rounded-full",
            "border border-[var(--color-border)] text-[var(--color-text-muted)]",
            "transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
            !scrolled &&
              (lightNav
                ? "border-white/15 bg-white/10 text-white/80 backdrop-blur-sm hover:text-white"
                : "border-transparent bg-[var(--color-surface)]/20 backdrop-blur-sm"),
          )}
        >
          {mounted && theme === "light" ? (
            <HiOutlineMoon className="h-5 w-5" aria-hidden />
          ) : (
            <HiOutlineSun className="h-5 w-5" aria-hidden />
          )}
        </button>
      </Container>
    </header>
  );
}

function NavLink({
  href,
  children,
  light,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "text-caption transition-colors",
        light
          ? "text-white/60 hover:text-white"
          : "text-[var(--color-text-subtle)] hover:text-[var(--color-text)]",
      )}
    >
      {children}
    </a>
  );
}
