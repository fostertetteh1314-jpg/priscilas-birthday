import { useState } from "react";
import { PlaceholderImage, type MediaItem } from "./PlaceholderImage";
import { Lightbox } from "./Lightbox";

export type SceneGalleryProps = {
  photos: MediaItem[];
  onNext: () => void;
};

export function SceneGallery({ photos, onNext }: SceneGalleryProps) {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openLightbox = (index: number) => {
    setLightbox({ open: true, index });
  };

  return (
    <section className="stage" aria-label="Photo gallery">
      <h1 className="title">A Celebration of You</h1>
      <p className="subtitle">
        A few pictures, a few moments, and one very special person worth
        celebrating.
      </p>
      {photos.length === 0 ? (
        <div className="gallery-placeholder" aria-hidden="true">
          <span className="icon" role="img" aria-label="photo placeholder">
            🤍
          </span>
          <p>
            Add Priscilla's photos to public/media/photos to see them here.
          </p>
        </div>
      ) : (
        <div className="gallery" role="grid" aria-label="Gallery of Priscilla's photos">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="gallery-item"
              role="button"
              tabIndex={0}
              aria-label={photo.alt}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
            >
              <PlaceholderImage
                src={photo.src}
                alt={photo.alt}
                className="gallery-img"
              />
            </div>
          ))}
        </div>
      )}
      {lightbox.open && (
        <Lightbox
          isOpen
          items={photos}
          index={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
        />
      )}
      <button className="button" onClick={onNext}>
        Continue
      </button>
    </section>
  );
}
