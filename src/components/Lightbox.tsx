import { useEffect, useCallback } from "react";

type LightboxProps = {
  isOpen: boolean;
  items: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
};

export function Lightbox({ isOpen, items, index, onClose }: LightboxProps) {
  if (!isOpen) return null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const src = items[index]?.src;
  const alt = items[index]?.alt ?? "";

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Photo gallery lightbox">
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <div className="lightbox-panel">
        {items.length > 1 && (
          <div className="lightbox-nav">
            <button
              aria-label="Previous photo"
              disabled={index === 0}
              tabIndex={index === 0 ? -1 : 0}
              onClick={() => {}}
            >
              ‹
            </button>
            <button
              aria-label="Next photo"
              disabled={index === items.length - 1}
              tabIndex={index === items.length - 1 ? -1 : 0}
              onClick={() => {}}
            >
              ›
            </button>
          </div>
        )}
        <img
          className="lightbox-img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
        <p className="lightbox-caption">{alt}</p>
      </div>
    </div>
  );
}
