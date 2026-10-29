import { useState } from "react";

export function VirtualCandle() {
  const [lit, setLit] = useState(true);
  const [blown, setBlown] = useState(false);

  const toggle = () => {
    if (blown) {
      setBlown(false);
      setLit(true);
    } else {
      setLit(false);
      setBlown(true);
      setTimeout(() => setLit(true), 2500);
    }
  };

  return (
    <div
      className="candle-wrap"
      role="button"
      tabIndex={0}
      aria-label={lit ? "Blow out the candle" : "Relight the candle"}
      aria-pressed={blown}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="candle">
        <div className="wick" />
        {lit && (
          <div className="flame">
            <div className="flame-inner" />
            <div className="glow" />
          </div>
        )}
      </div>
      {blown && (
        <p className="candle-hint">Blown out — tap to relight 🤍</p>
      )}
    </div>
  );
}
