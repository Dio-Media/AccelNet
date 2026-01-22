import { useEffect, useMemo, useState, useCallback } from "react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

type Slide = {
  id: number;
  src: string;
  alt?: string;
  caption?: string;
};

export function OrgHero() {
  const images: Slide[] = useMemo(
    () => [
      // TODO: replace with real publication images
      { id: 1, src: "/herobg1.jpg", caption: "Caption Text" },
      { id: 2, src: "/herobg3.jpg", caption: "Caption Two" },
      { id: 3, src: "/herobg2.jpg", caption: "Caption Three" },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const INTERVAL_TIME_MS = 6 * 1000;
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const safeIndex = ((index % total) + total) % total;
      setCurrentIndex(safeIndex);
    },
    [total]
  );

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Auto-advance (equivalent to setTimeout(showSlides, …))
  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, INTERVAL_TIME_MS);

    return () => clearInterval(timer);
  }, [total]);

  if (total === 0) {
    return (
      <section className="rounded-xl border p-6 text-center text-gray-500">
        No publications available.
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl shadow">
      {/* Slides */}
      <div className="relative h-[260px] sm:h-[340px] md:h-[440px] bg-black">
        {images.map((img, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Number text */}
              <div className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                {idx + 1} / {total}
              </div>

              <ImageWithFallback
                src={img.src}
                alt={img.alt ?? `Slide ${idx + 1}`}
                className="h-full w-full object-cover"
              />

              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-sm text-white">
                  {img.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/80"
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2 pb-4">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => goTo(idx)}
              className={`h-3 w-3 rounded-full transition-colors ${
                idx === currentIndex
                  ? "bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
