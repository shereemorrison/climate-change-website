import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { RootProviders } from "@/components/layout/RootProviders";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/typography.css";
import "@/styles/motion.css";
import "@/styles/sections.css";

const displayFont = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
