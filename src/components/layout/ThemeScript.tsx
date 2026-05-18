import { THEME_STORAGE_KEY } from "@/lib/theme";

/* Inline script to apply stored theme before paint. */
export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
        var theme = stored === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
