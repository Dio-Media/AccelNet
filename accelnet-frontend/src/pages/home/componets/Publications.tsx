import { ImageWithFallback } from "../../../componets/ImageWithFallback";

type Collaboration = {
  id: number;
  title: string;
  description: string;
  src: string;
};

export function Publications() {
  /**
   * Image overlay fade effect (like your HTML example):
   * - container is `relative`
   * - overlay is `absolute inset-0` with `opacity-0`
   * - on hover: `group-hover:opacity-100` + `transition duration-500`
   */
  const collaborations: Collaboration[] = [
    {
      id: 1,
      title: "Performance + Measurement",
      description: "Capturing movement and brain signals in real settings.",
      src: "/herobg2.jpg",
    },
    {
      id: 2,
      title: "Community Workshops",
      description: "Bringing researchers, artists, and learners together.",
      src: "/CW.jpg",
    },
    {
      id: 3,
      title: "Ensemble Movement",
      description: "Studying coordination, creativity, and collaboration.",
      src: "/Loving_acting.jpg",
    },
    {
      id: 4,
      title: "EBRAINS Summit",
      description: "International collaboration and knowledge exchange.",
      src: "/ebrains_summit.jpg",
    },
    {
      id: 5,
      title: "Music and Neuroscience",
      description: "How music training shapes brain networks over time.",
      src: "/mariachi_uh.jpg",
    },
    {
      id: 6,
      title: "Meeting of Minds",
      description: "Connecting disciplines through shared research goals.",
      src: "/MeetingofMinds2.jpg",
    },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          "Meeting" of the Minds
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          A snapshot of collaborations across movement, music, neuroscience, and engineering—built through
          shared methods, data standards, and real-world impact.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collaborations.map((c) => (
            <article
              key={c.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              tabIndex={0}
            >
              <div className="relative aspect-[4/3]">
                <ImageWithFallback
                  src={c.src}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                />

                {/* Overlay (fade in) */}
                <div className="absolute inset-0 bg-[#00A79D]/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

                {/* Centered text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <h3 className="text-white font-semibold text-lg leading-snug">{c.title}</h3>
                  <p className="mt-2 text-white/95 text-sm max-w-xs">{c.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}