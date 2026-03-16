import { useEffect, useMemo, useState, useCallback } from "react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

const INTERVAL_TIME_MS = 6 * 1000;

export function ResearchHero() {
  const slides = useMemo(() => [
    {
      src: "/Florence_italy.jpg",
      alt: "EBrains Summer School",
      caption: "EBrains Summer School",
      info: "Human Data Management, Modelling and AI • Digital Brain Twins • Data • Large Brain Models • Brain-Computer Interfaces • AI & Synthetic Data & EBRAINS Infrastructure • Hands-on project-based workshop. Learning Center Morgagni, University of Florence",
      registerLink: "https://ebrains.eu/news-and-events/events/2026/ebrains-summer-school-on-human-data-management-and-modellingai",
    },
    {
      src: "/Niccolini_Theater.jpg",
      alt: "AccelNet EBrains",
      caption: "AccelNet EBrains",
      info: "Infrastructure, AI & Human Impact Keynote: Rinpoche • “Meditation & Brain Health” • Respondant - Philippe Vernier(EBRAINS)",
      registerLink: "https://ebrains.eu/news-and-events/events/2026/ebrains-accelnet-joint-day",
    },
    {
      src: "/florence_italy_2.jpg",
      alt: "AccelNet Summit",
      caption: "AccelNet Summit",
      info: "More Information Coming Soon",
      registerLink: null,
    },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = useCallback((index) => {
    setCurrentIndex(((index % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_TIME_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
  index === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
}`}
          aria-hidden={index !== currentIndex}
        >
          <ImageWithFallback
            src={slide.src}
            alt={slide.alt}
            className="w-full h-auto object-cover"
          />

          {/* Caption — always shown */}
          <div className="absolute top-1/2 left-2 text-white text-lg font-semibold bg-black/50 px-4 py-1 rounded-full">
            {slide.caption}
          </div>

          {/* Event info + register button — only on slides that have it */}
          {slide.info && (
            <div className="absolute bottom-2 left bg-black/50 text-white text-sm text-justify max-w-xl px-10 py-2 rounded-full">
              <p className="text-justify">{slide.info}</p>
             {slide.registerLink && (
              <a
                href={slide.registerLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block rounded-full px-4 py-2 font-semibold text-white bg-[#00A79D] hover:opacity-90 transition-opacity">
                Register Now
              </a>
             )}
            </div>
          )}
        </div>
      ))}

      {/* Prev / Next buttons */}
      <div className="YOUR NAV CONTAINER STYLES">
        <button type="button" onClick={prev} aria-label="Previous slide" className="YOUR PREV BUTTON STYLES">
          ←
        </button>
        <button type="button" onClick={next} aria-label="Next slide" className="YOUR NEXT BUTTON STYLES">
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={i === currentIndex ? "YOUR ACTIVE DOT STYLES" : "YOUR INACTIVE DOT STYLES"}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

    </section>
  );
}