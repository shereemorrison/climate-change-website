import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <Container
        width={PAGE_CONTAINER}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <p className="text-caption text-[var(--color-text-subtle)]">{SITE_NAME}</p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Data for demonstration. Built for cinematic climate storytelling.
        </p>
      </Container>
    </footer>
  );
}
