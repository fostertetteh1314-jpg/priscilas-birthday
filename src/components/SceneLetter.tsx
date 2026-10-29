import { useState } from 'react';

export type SceneLetterProps = {
  letter: string;
  signature: string;
  onNext: () => void;
};

export function SceneLetter({ letter, signature, onNext }: SceneLetterProps) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="stage" aria-label="Letter from Foster">
      <p className="kicker">Something from the Heart</p>
      <p className="subtitle">There's something I really want you to know…</p>

      <div className="envelope-wrap" role="region" aria-label="Letter envelope">
        <div
          className={`envelope ${opened ? "opened" : ""}`}
          role="button"
          tabIndex={0}
          aria-label={opened ? "Close the letter" : "Open the letter"}
          aria-expanded={opened}
          onClick={() => setOpened(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpened(true);
            }
          }}
        >
          <div className="back" />
          <div className="flap" />
          <div className="seal" />
          <div className="letter-content">
            <p style={{ whiteSpace: "pre-wrap" }}>{letter}</p>
            <p className="letter-signature">{signature}</p>
          </div>
        </div>
      </div>

      {!opened ? (
        <p className="body-text" style={{ marginTop: 6 }}>
          Tap the envelope to read Foster's letter.
        </p>
      ) : (
        <div className="continue-wrapper">
          <button className="button" onClick={onNext}>
            Continue
          </button>
        </div>
      )}
    </section>
  );
}
