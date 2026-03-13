import { ResearchHero } from './componets/ResearchHero';
import { DataVisualization } from './componets/DataVisualization';
import { ConnectionMap } from './componets/ConnectionMap';
import { ResearchMethodology } from './componets/JoinUs';
import { Publications } from './componets/Publications';

// We do NOT import the ResearchFooter, because your Layout.jsx already adds your site-wide footer.

export default function HomePage() {
  return (
    <>
      <ResearchHero />
      <DataVisualization />
      <Publications />
      <ConnectionMap />
      <ResearchMethodology />
    </>
  );
}