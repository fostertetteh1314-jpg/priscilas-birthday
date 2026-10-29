import { useEffect, useRef, useState } from "react";

export function PreRecordedAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio("/media/audio/voice-message.mp3");
    audio.loop = false;
    audio.volume = 0.8;
    audioRef.current = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);
    const handleError = () => {
      setError("Voice message not available yet.");
      audioRef.current = null;
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Autoplay on user interaction (browsers block autoplay without gesture)
    const tryPlay = () => {
      audio.play().catch(() => {
        // Autoplay blocked; user can click play button instead
      });
    };
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setError("Browser blocked playback. Tap again."));
    }
  };

  if (error && !playing) {
    return (
      <div className="voice-error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <button
      className="button secondary"
      onClick={toggle}
      aria-label={playing ? "Pause voice message" : "Play voice message from Foster"}
      aria-pressed={playing}
      title={playing ? "Pause voice message" : "Play voice message from Foster"}
    >
      {playing ? "⏸ Pause Voice Message" : "▶ Play Voice Message"}
    </button>
  );
}
