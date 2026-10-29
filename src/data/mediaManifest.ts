export type Photo = {
  src: string;
  alt: string;
};

export type Video = {
  src: string;
  poster: string;
  alt: string;
};

export const mediaManifest = {
  photos: [
    { src: "/media/photos/photo_2026-10-28_20-26-40.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-34.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-38.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-44.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-49.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-53.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-30-58.jpg", alt: "Priscilla Barfo" },
    { src: "/media/photos/photo_2026-10-28_20-31-43.jpg", alt: "Priscilla Barfo" },
  ],
  videos: [
    {
      src: "/media/videos/video_2026-10-28_20-31-04.mp4",
      poster: "/media/photos/photo_2026-10-28_20-31-43.jpg",
      alt: "Priscilla Barfo",
    },
    {
      src: "/media/videos/video_2026-10-28_22-14-06.mp4",
      poster: "/media/photos/photo_2026-10-28_20-30-44.jpg",
      alt: "Priscilla Barfo",
    },
    {
      src: "/media/videos/video_2026-10-28_22-14-47.mp4",
      poster: "/media/photos/photo_2026-10-28_20-30-58.jpg",
      alt: "Priscilla Barfo",
    },
  ],
  audio: "/media/audio/birthday-music.mp3",
};

export const PLACEHOLDER_NOTICE =
  "Real photos and videos have not been added yet. Replace the placeholder files in public/media with Priscilla's real media.";
