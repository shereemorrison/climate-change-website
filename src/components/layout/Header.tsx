"use client";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";
import { PAGE_CONTAINER, SITE_NAME } from "@/lib/constants";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/85 backdrop-blur-md">
      <Container
        width={PAGE_CONTAINER}
        className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4"
      >
        <a
          href="#hero"
          className="justify-self-start text-caption text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {SITE_NAME}
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-8 md:flex"
        >
          <NavLink href="#data">Data</NavLink>
          <NavLink href="#atmosphere">Atmosphere</NavLink>
          <NavLink href="#impact">Impact</NavLink>
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-caption text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)]"
    >
      {children}
    </a>
  );
}
