import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/media/audio/birthday-music.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setPlaying(false);
      });
    }
  };

  return (
    <button
      className="music-toggle"
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
      onClick={toggle}
      title={playing ? "Pause birthday music" : "Play birthday music"}
    >
      {playing ? "♫" : "♪"}
    </button>
  );
}
