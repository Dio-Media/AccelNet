import { Building2, Info } from "lucide-react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

type MapMarker = {
  label: string;
  left: string; // percent, e.g. "32%"
  top: string;  // percent, e.g. "52%"
};

const markers: MapMarker[] = [
  // These positions are approximate for the static image.
  { label: "University site", left: "34%", top: "55%" },
  { label: "University site", left: "36%", top: "48%" },
  { label: "University site", left: "41%", top: "50%" },
  { label: "University site", left: "38%", top: "62%" },
  { label: "University site", left: "30%", top: "62%" },
];

export function ConnectionMap() {
  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Brain Sites and network connections
            </h2>
            <p className="text-gray-600 max-w-xl">
              Click through our network visualizations to see how institutions connect across disciplines,
              and how collaborations form across the globe.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/about#network-visualizations"
                className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                View network visualizations
              </a>
              <a
                href="/about#participants"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Meet the participants
              </a>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm text-gray-500">
              <Info className="mt-0.5 h-4 w-4" />
              <p>
                This is a visual preview. We can make each marker clickable once we finalize the university list
                and coordinates.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[31/10]">
              <ImageWithFallback
                src="/network-map.jpg"
                alt="Network map with university sites"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Pins overlay */}
              {markers.map((m, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{ left: m.left, top: m.top, transform: "translate(-50%, -50%)" }}
                >
                  <div className="group/pin relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10">
                      <Building2 className="h-5 w-5 text-gray-800" />
                    </div>

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute left-1/2 top-11 w-max -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover/pin:opacity-100">
                      {m.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}