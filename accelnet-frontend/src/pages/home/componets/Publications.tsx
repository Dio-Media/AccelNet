import { useEffect, useMemo, useState, useCallback } from "react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

type Slide = {
  id: number;
  src: string;
  alt?: string;
};

export function Publications() {
  const images: Slide[] = useMemo(
    () => [
      // TODO: replace with real publication images
      { id: 1, src: "/ebrains_summit.jpg" },
      { id: 2, src: "/Loving_acting.jpg"  },
      { id: 3, src: "/MeetingofMinds2.jpg"},
      { id: 4, src: "/mariachi_uh.jpg"},
      { id: 5, src: "/herobg2.jpg"},
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
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          Featured Collaborations
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We collaborate with minds all over the world, to spread new ideas and form connections across the global. With the use of dancing, music, and acting, we fashion research to help the mind build connections in real time.
        </p>
      </div>
      {/* Slides */}
      <div className="relative mx-auto h-[260px] sm:h-[340px] md:h-[510px] bg-black max-w-5xl overflow-hidden rounded-2xl shadow">
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
