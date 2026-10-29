import { useEffect, useRef, useState } from "react";

export function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, []);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        audioRef.current = new Audio(url);
        setHasRecording(true);
        setRecording(false);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.onerror = () => {
        setError("Could not record audio.");
        setRecording(false);
      };

      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access was not granted.");
    }
  };

  const stop = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recording) recorder.stop();
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => setError("Browser blocked playback."));
  };

  if (error) {
    return (
      <div className="voice-error" role="alert">
        {error}
      </div>
    );
  }

  if (recording) {
    return (
      <button
        className="button secondary"
        onClick={stop}
        aria-label="Stop recording"
      >
        ⏹ Stop recording
      </button>
    );
  }

  if (hasRecording) {
    return (
      <div className="voice-controls">
        <button className="button" onClick={play} aria-label="Play your voice message">
          ▶ Play your message
        </button>
        <button
          className="button secondary"
          onClick={start}
          aria-label="Record again"
        >
          🔁 Record again
        </button>
      </div>
    );
  }

  return (
    <button
      className="button"
      onClick={start}
      aria-label="Record a voice message for Priscilla"
    >
      🎙 Record a voice message
    </button>
  );
}
