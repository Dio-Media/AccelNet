import { useEffect, useMemo, useState, useCallback } from "react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

export function ResearchHero() {
  const images = useMemo(
    () => ["/herobg4.jpg", "/SN.gif", "/herobg2.jpg", "/herobg3.jpg"],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance settings
  const INTERVAL_TIME_MS = 6 * 1000; // 6 seconds

  const goTo = useCallback(
    (index: number) => {
      const safeIndex = ((index % images.length) + images.length) % images.length;
      setCurrentIndex(safeIndex);
    },
    [images.length]
  );

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance with reset after manual changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, INTERVAL_TIME_MS);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-black h-96 md:h-[500px] lg:h-[600px]">
      {/* 1) Background Image Stack (cross-fade) */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <ImageWithFallback
            src={src}
            alt={`Research background ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* 2) Overlay + Content */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-black/40">
        <div className="container mx-auto flex h-full items-center px-6">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-white">Advancing Brain-Inspired Computing</h1>
            <p className="mb-6 text-white/90">
              A collaborative network accelerating research in neuroscience, artificial intelligence,
              and brain-computer interfaces to improve brain health through art and science.
            </p>

            <div className="flex gap-6 text-white/80">
              <div>
                <div className="text-white">50+</div>
                <div>Researchers across the globe</div>
              </div>
              <div className="border-l border-white/30 pl-6">
                <div className="text-white">35+</div>
                <div>Skilled professionals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3) Manual Controls */}
      <div className="absolute inset-x-0 bottom-6 z-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="rounded-full border border-white/25 bg-black/30 px-4 py-2 text-sm text-white hover:bg-black/45"
                aria-label="Previous background"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full border border-white/25 bg-black/30 px-4 py-2 text-sm text-white hover:bg-black/45"
                aria-label="Next background"
              >
                Next →
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/65"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
