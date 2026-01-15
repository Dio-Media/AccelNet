import { ResearchHero } from './componets/ResearchHero';
import { ResearchFindings } from './componets/Mapping';
import { DataVisualization } from './componets/DataVisualization';
import { ResearchMethodology } from './componets/JoinUs';
import { Publications } from './componets/Publications';
import  ResearchTeam  from './componets/ResearchTeam';

// We do NOT import the ResearchFooter, because your Layout.jsx already adds your site-wide footer.

export default function HomePage() {
  return (
    // We use a React fragment <>...</> to avoid adding an extra <div>
    <> 
      <ResearchHero />
      <ResearchFindings />
      <DataVisualization />
      <Publications />
      <ResearchTeam />
      <ResearchMethodology />
    </>
  );
}