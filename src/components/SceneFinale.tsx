import { useState } from 'react';
import { Confetti } from './Confetti';
import { VirtualCandle } from './VirtualCandle';
import { VoiceRecorder } from './VoiceRecorder';

export type SceneFinaleProps = {
  title: string;
  body: string;
  signature: string;
  confettiButton: string;
  replayButton: string;
  onReplay: () => void;
  onConfetti: () => void;
};

export function SceneFinale({
  title,
  body,
  signature,
  confettiButton,
  replayButton,
  onReplay,
  onConfetti,
}: SceneFinaleProps) {
  const [confetti, setConfetti] = useState(false);

  return (
    <section className="stage" aria-label="Finale">
      <span className="finale-heart" aria-hidden="true">🤍</span>
      <h1 className="title">{title}</h1>
      <p className="body-text">{body}</p>
      <p className="signature">{signature}</p>
      <Confetti active={confetti} />
      <div className="candle-section" aria-hidden="true">
        <VirtualCandle />
      </div>
      <div className="voice-section" aria-label="Voice message">
        <p className="kicker">Record a voice message</p>
        <VoiceRecorder />
      </div>
      <div className="button-row finale-actions">
        <button
          className="button gold"
          onClick={() => {
            setConfetti(true);
            onConfetti();
            setTimeout(() => setConfetti(false), 4000);
          }}
        >
          {confettiButton}
        </button>
        <button className="button secondary" onClick={onReplay}>
          {replayButton}
        </button>
      </div>
    </section>
  );
}
