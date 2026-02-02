import { useEffect, useId, useState, type FormEvent } from "react";

export function ResearchMethodology() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const formUrl =
    "https://forms.cloud.microsoft/pages/responsepage.aspx?id=vboLF_CikEytSw6PDwxCWZXdNLLzg6xEqEIhtxz_Bu9URFE5SVRUTVJaSUk2MUNLUEtRRTRMMU45WS4u&route=shorturl";

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Optional: do something with local form fields if you add them later
    // For now we just close.
    setOpen(false);
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          Join Us
        </h2>

        <div className="text-center text-gray-600 mb-12 max-w-2xl mx-auto space-y-6">
          <p>
            Ever thought of contributing to groundbreaking research in movement, music, and brain
            health? We&apos;re always looking for passionate individuals to join our team. Whether
            you&apos;re a researcher, artist, or enthusiast, there&apos;s a place for you in our
            community. Explore our current opportunities and find out how you can get involved!
          </p>

          <img
            src="/QRCodeforAnalysisofAccelNet(WEBSITE)1.png"
            alt="Join Us QR Code"
            className="mx-auto w-72 h-72 md:w-96 md:h-96"
          />

          <div className="space-y-3">
            <p className="text-gray-700">
              QR code not working properly? Feel free to submit your contact through the button
              below:
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-md px-5 py-3 font-semibold text-white shadow-sm transition
                         bg-[#00A79D] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A79D]"
            >
              Register Here
            </button>
          </div>

          <p className="text-gray-700">
            Or use this link:{" "}
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Analysis of AccelNet (WEBSITE)
            </a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)} // click backdrop closes
        >
          <div
            className="relative w-full max-w-3xl rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b px-6 py-4">
              <div>
                <h3 id={titleId} className="text-lg font-semibold text-gray-900">
                  Register
                </h3>
                <p className="text-sm text-gray-600">
                  Fill out the form below. If the embed doesn’t load, use “Open form in new tab”.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-4 rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <div className="rounded-lg border overflow-hidden">
                <iframe
                  title="Register form"
                  src={formUrl}
                  className="w-full h-[70vh] min-h-[520px]"
                />
              </div>
            </div>

            {/* Footer */}
            <form
              onSubmit={onSubmit}
              className="flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-end"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold text-gray-900
                           border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>

              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold text-white shadow-sm transition
                           bg-[#00A79D] hover:opacity-90"
              >
                Open form in new tab
              </a>

              <button type="submit" className="sr-only">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
