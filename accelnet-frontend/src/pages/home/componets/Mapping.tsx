import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../componets/ui/card";

type NetworkItem = {
  title: string;
  src: string; // must be in /public so <img> + download works reliably
  alt: string;
  downloadName: string;
};

export function ResearchFindings() {
  const networks: NetworkItem[] = [
    {
      title: "UH CIP Subnetwork",
      src: "/cip_uh_network.png",
      alt: "UH CIP subnetwork visualization",
      downloadName: "cip_uh_network.png",
    },
    {
      title: "UH Affiliations Subnetwork",
      src: "/aff_uh_network.png",
      alt: "UH affiliations subnetwork visualization",
      downloadName: "aff_uh_network.png",
    },
    {
      title: "All CIP Network",
      src: "/accelnet_all_cip_network.png",
      alt: "AccelNet all CIP network visualization",
      downloadName: "accelnet_all_cip_network.png",
    },
    {
      title: "All Affiliations Network",
      src: "/accelnet_all_aff_network.png",
      alt: "AccelNet all affiliations network visualization",
      downloadName: "accelnet_all_aff_network.png",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<NetworkItem | null>(null);

  const openModal = (item: NetworkItem) => {
    setActive(item);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    // small delay prevents flicker if you add transitions later
    setTimeout(() => setActive(null), 0);
  };

  // ESC to close
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          Network Visualizations
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Click any card to enlarge. Use Download to save the model image.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {networks.map((n) => (
            <Card
              key={n.title}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {n.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <button
                  type="button"
                  onClick={() => openModal(n)}
                  className="w-full text-left"
                  aria-label={`Open enlarged view: ${n.title}`}
                >
                  <div className="w-full rounded-lg border bg-white overflow-hidden">
                    <div className="h-[260px] md:h-[340px] flex items-center justify-center">
                      <img
                        src={n.src}
                        alt={n.alt}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </button>
              </CardContent>

              <CardFooter className="gap-2">
                <button
                  type="button"
                  onClick={() => openModal(n)}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                >
                  Enlarge
                </button>

                <a
                  href={n.src}
                  download={n.downloadName}
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800"
                >
                  Download
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && active && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${active.title}`}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
            aria-label="Close modal"
          />

          {/* Panel */}
          <div className="relative w-full max-w-6xl rounded-xl bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b">
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                  {active.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  Click outside or press ESC to close
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={active.src}
                  download={active.downloadName}
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800"
                >
                  Download
                </a>

                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="w-full rounded-lg border bg-white overflow-hidden">
                <div className="h-[70vh] flex items-center justify-center">
                  <img
                    src={active.src}
                    alt={active.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
