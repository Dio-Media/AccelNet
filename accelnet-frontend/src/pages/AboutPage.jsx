import React, { useEffect, useId, useMemo, useState } from "react";
import FeaturedParticipants from "./home/componets/ResearchTeam";

const ModalShell = ({ titleId, title, onClose, children }) => {
  // Close on ESC key + lock scroll
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        // click outside closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 md:p-6 border-b flex justify-between items-center bg-black text-white rounded-t-2xl">
          <h2 id={titleId} className="text-xl md:text-2xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-5 md:p-8 overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const [modal, setModal] = useState(null); // 'vision' | 'networks' | 'participants' | null
  const titleId = useId();

  const modalTitle = useMemo(() => {
    if (modal === "vision") return "Vision & Mission";
    if (modal === "networks") return "Networks";
    if (modal === "participants") return "Participants";
    return "";
  }, [modal]);

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <header className="mb-6 md:mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            AccelNet (Accelerating Research Translation Networks) is an initiative funded by the National Science
            Foundation (NSF) aimed at transforming the research ecosystem in the United States.
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-6 md:mb-8 flex justify-center">
          <ul className="flex flex-wrap gap-3">
            <li>
              <button
                onClick={() => setModal("vision")}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium text-gray-900"
              >
                Vision & Mission
              </button>
            </li>
            <li>
              <button
                onClick={() => setModal("networks")}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium text-gray-900"
              >
                Networks
              </button>
            </li>
            <li>
              <button
                onClick={() => setModal("participants")}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium text-gray-900"
              >
                Participants
              </button>
            </li>
          </ul>
        </nav>

        {/* Responsive image (scales with screen + browser zoom) */}
        <div className="mx-auto max-w-5xl">
          <img
            src="/Network.gif"
            alt="Connection of Professors"
            className="block w-full h-auto rounded-2xl border border-gray-200 shadow-sm"
          />
        </div>
      </div>

      {/* One modal only */}
      {modal && (
        <ModalShell
          titleId={titleId}
          title={modalTitle}
          onClose={() => setModal(null)}
        >
          {modal === "vision" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This AccelNet will identify and accelerate new convergent research that aims to understand the mechanisms,
                and develop applications, by which practicing music and dance affects brain function, creativity, and promotes
                health and well-being across the lifespan.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-7 mb-3">
                Goals
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Network Building",
                    text: "Create national and international networks that unite diverse expertise and resources to advance impactful research translation.",
                  },
                  {
                    label: "Research Translation",
                    text: "Help researchers move beyond basic science to apply discoveries in real-world settings—turning innovations into practical solutions.",
                  },
                  {
                    label: "Global Engagement",
                    text: "Build domestic and global partnerships to strengthen U.S. and international competitiveness in science and innovation.",
                  },
                  {
                    label: "Innovation Focus",
                    text: "Support networks across engineering, biological sciences, and humanities to address health and social challenges.",
                  },
                ].map((goal, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="font-bold text-gray-900">•</span>
                    <p className="text-gray-700">
                      <strong>{goal.label}:</strong> {goal.text}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {modal === "networks" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                The AccelNet Network
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We connect people, institutions, and research domains—so discoveries can move faster into shared standards,
                tools, and real-world outcomes.
              </p>

              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Network Maps
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <img
                  src="/aff_uh_network.png"
                  alt="University of Houston Affiliation Network"
                  className="w-full h-auto rounded-xl border border-gray-200"
                />
                <img
                  src="/cip_uh_network.png"
                  alt="University of Houston CIP Network"
                  className="w-full h-auto rounded-xl border border-gray-200"
                />
                <img
                  src="/accelnet_all_aff_network.png"
                  alt="AccelNet All Affiliations Network"
                  className="w-full h-auto rounded-xl border border-gray-200"
                />
                <img
                  src="/accelnet_all_cip_network.png"
                  alt="AccelNet All CIP Network"
                  className="w-full h-auto rounded-xl border border-gray-200"
                />
              </div>

              <p className="mt-6 text-sm text-gray-500">
                Make sure those images exist in <code className="font-mono">accelnet-frontend/public/</code> and are referenced with a leading <code>/</code>.
              </p>
            </>
          )}

          {modal === "participants" && (
            <>
              <FeaturedParticipants
                title="Key participants"
                description="A few of the most visible contributors across the network."
                limit={6}
                showBackground={false}
              />

              <div className="mt-4 flex justify-center">
                <a
                  href="/participants"
                  className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  View all participants
                </a>
              </div>
            </>
          )}
        </ModalShell>
      )}
    </div>
  );
}