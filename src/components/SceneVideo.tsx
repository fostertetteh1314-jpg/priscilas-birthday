import { useRef, useState } from "react";

export type SceneVideoProps = {
  videos: { src: string; poster: string; alt: string }[];
  onNext: () => void;
};

export function SceneVideo({ videos, onNext }: SceneVideoProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  return (
    <section className="stage" aria-label="Video moments">
      <h1 className="title">Moments in Motion</h1>
      <p className="subtitle">
        Some moments deserve more than a place in our gallery. They deserve to
        be relived.
      </p>
      {videos.length === 0 ? (
        <div className="video-placeholder" aria-hidden="true">
          <span className="icon" role="img" aria-label="video placeholder">
            🎬
          </span>
          <p>
            Add Priscilla's videos to public/media/videos to see them here.
          </p>
        </div>
      ) : (
        <div className="video-grid" role="grid" aria-label="Video gallery">
          {videos.map((video, i) => {
            const isPlaying = playingIndex === i;
            return (
              <div key={i} className="video-card" aria-label={video.alt}>
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el as HTMLVideoElement;
                  }}
                  src={video.src}
                  poster={video.poster}
                  preload="none"
                  playsInline
                  controls
                  onClick={() => {
                    if (isPlaying) {
                      videoRefs.current[i]?.pause();
                      setPlayingIndex(null);
                    } else {
                      videoRefs.current[i]?.play();
                      setPlayingIndex(i);
                    }
                  }}
                  onPlay={() => setPlayingIndex(i)}
                  onPause={() => setPlayingIndex(null)}
                  onEnded={() => setPlayingIndex(null)}
                />
                {!isPlaying && (
                  <div
                    className="video-poster"
                    onClick={() => {
                      videoRefs.current[i]?.play();
                      setPlayingIndex(i);
                    }}
                  >
                    <div className="video-play" aria-hidden="true" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="continue-wrapper">
        <button className="button" onClick={onNext}>
          Continue
        </button>
      </div>
    </section>
  );
}
