import React from "react";
import { Link } from "react-router-dom"


const SectionCard = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  </section>
);

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">About</h1>
        <p className="text-gray-600 mt-2">
            AccelNet (Accelerating Research Translation Networks) is an initiative funded by the National Science Foundation (NSF) aimed at transforming the research ecosystem in the United States. The program's primary objective is to create networks that accelerate the translation of fundamental research discoveries into innovations that benefit society.        </p>
      </header>

      {/* Local in-page nav */}
      <nav className="mb-8">
        <ul className="flex flex-wrap gap-3">
          <li>
            <a href="#vision" className="text-blue-900 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
              Vision &amp; Mission
            </a>
          </li>
          <li>
            <a href="#background" className="text-blue-900 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
              Background
            </a>
          </li>
          <li>
            <a href="#scientific-program" className="text-blue-900 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
              Scientific Program
            </a>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 gap-6">
        <SectionCard id="vision" title="Vision & Mission">
          <h3 className="text-lg text-blue-900 font-semibold mb-2">Mission</h3>
          <p>
            TThis AccelNet will identify and accelerate new convergent research that aims to understand the mechanisms, and develop applications, by which practicing music and dance affects the brain function, creativity, and promotes health and well-being across the lifespan. 
          </p>

          <h3 className="text-lg font-semibold text-blue-900 mt-5 mb-2">Goals</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
                <strong>Network Building:</strong> Create national and international networks that unit diverse expertise and
                resources to advance impactful research translation.
            </li>
            <li>
                <strong>Research Translation:</strong> Help researchers move beyond basic science to apply discoveries in real-world
                settings-turning innovations into practical technologies, solutions, or processes with societal benefit
            </li>
            <li>
                <strong>Global and Domestic Engagement:</strong> Build domestic and global partnerships to strengthen U.S. and
              international competitiveness in science and innovation.
            </li>
            <li>
                <strong>Innovation Focus Areas:</strong> Support networks across fields (e.g., engineering, materials, biological sciences)
              to address critical challenges such as health, energy, climate, and security.
            </li>
          </ul>
        </SectionCard>

        <SectionCard id="background" title="Background">
          <p>
            The network includes experts from neuroscience, humanities, biomedical and neural engineering, ethics,
            and team science across IUCRC nodes (BRAIN, CARTA, UCSF) and international partners
            (Swiss Center for Affective Sciences, NEUROLIVE, and EBRAINS).
          </p>
          <p className="mt-4">
            AccelNet (Accelerating Research Translation Networks) builds international research ecosystems to translate
            discoveries into innovations that benefit society, focusing here on coupled brain activity, expressive movement, and music.
          </p>
        </SectionCard>

        <SectionCard id="scientific-program" title="Scientific Program">
          <p>
            Convergent research across neural, cognitive, affective, social, and computational neuroscience, as well as
            humanities (dance, music, ethics), biomedical engineering, brain–computer interfacing (BCI), and team science.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
