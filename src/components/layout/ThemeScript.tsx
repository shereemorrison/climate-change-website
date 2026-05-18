/* Inline script to apply stored theme before paint. */
export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem('atlas-theme');
        var theme = stored === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
