export function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span key={`${index}-${char}`} className="preloader-char">
          <span>{char}</span>
        </span>
      ))}
    </>
  );
}
