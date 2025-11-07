import { Card } from '../../../componets/ui/card';
import { FileText, TrendingUp, Users, MapPin } from 'lucide-react';

export function ResearchFindings() {
  const findings = [
    {
      icon: MapPin,
      title: 'Geographic Distribution',
      description: 'Highest concentration of specialty cafes found in Tverskoy and Arbat districts, with 43% of surveyed establishments located within 1km of major metro stations.',
    },
    {
      icon: Users,
      title: 'Consumer Demographics',
      description: 'Primary demographic: 25-35 year olds (62%), followed by 18-24 age group (28%). Average visit frequency: 4.2 times per week.',
    },
    {
      icon: TrendingUp,
      title: 'Market Growth',
      description: '37% increase in specialty coffee establishments from 2023-2025. Average price point increased by 18%, while customer satisfaction remained stable at 7.8/10.',
    },
    {
      icon: FileText,
      title: 'Cultural Impact',
      description: 'Cafes serve as informal workspaces for 68% of respondents. Average stay duration: 2.3 hours, with 82% reporting use of cafe WiFi services.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Key Research Findings</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our 18-month longitudinal study reveals critical insights into Moscow's cafe culture and its role in urban social infrastructure
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {findings.map((finding, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <finding.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">{finding.title}</h3>
                  <p className="text-gray-600">{finding.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
