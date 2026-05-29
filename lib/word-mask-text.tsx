import type { ReactNode } from "react";

type RenderWordMaskTextOptions = {
  getCharClassName?: (
    character: string,
    charIndex: number,
    word: string,
  ) => string | undefined;
};

export function renderWordMaskText(
  text: string,
  options?: RenderWordMaskTextOptions,
): ReactNode[] {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="hero-word">
        <span className="hero-word-text">
          {Array.from(word).map((character, charIndex) => {
            const extraClassName = options?.getCharClassName?.(
              character,
              charIndex,
              word,
            );

            return (
              <span
                key={`${word}-${charIndex}`}
                className={`hero-char${extraClassName ? ` ${extraClassName}` : ""}`}
              >
                {character}
              </span>
            );
          })}
        </span>
        <span className="hero-word-mask" aria-hidden />
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}
