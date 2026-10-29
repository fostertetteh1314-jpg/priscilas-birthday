import { useState } from 'react';

export type SceneSecretProps = {
  kicker: string;
  body: string;
  buttonLabel: string;
  onNext: () => void;
};

export function SceneSecret({ kicker, body, buttonLabel, onNext }: SceneSecretProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="stage" aria-label="Secret message">
      <p className="kicker">{kicker}</p>
      <div className="secret-card">
        {revealed ? (
          <p className="secret-body">{body}</p>
        ) : (
          <button
            className="button secondary large"
            onClick={() => setRevealed(true)}
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {revealed && (
        <button className="button" onClick={onNext}>
          Continue
        </button>
      )}
    </section>
  );
}
