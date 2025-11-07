import { Card } from '../../../componets/ui/card';
import { Badge } from '../../../componets/ui/badge';
import { ExternalLink, Download } from 'lucide-react';
import { Button } from '../../../componets/ui/button';

export function Publications() {
  const publications = [
    {
      title: 'Third Places in Post-Soviet Urban Spaces: A Case Study of Moscow Cafes',
      authors: 'Ivanova, A., Petrov, D., & Sokolov, M.',
      journal: 'Journal of Urban Sociology',
      year: '2025',
      status: 'Published',
      type: 'Peer-Reviewed',
    },
    {
      title: 'Economic Impact of Specialty Coffee Culture on Central Moscow Real Estate',
      authors: 'Petrov, D., & Kuznetsova, E.',
      journal: 'Urban Economics Review',
      year: '2024',
      status: 'Published',
      type: 'Peer-Reviewed',
    },
    {
      title: 'Digital Nomadism and Cafe Workspace Usage Patterns in Moscow',
      authors: 'Sokolov, M.',
      journal: 'Contemporary Urban Research',
      year: '2024',
      status: 'Published',
      type: 'Conference Paper',
    },
    {
      title: 'Consumer Preferences and Cafe Design: A Mixed-Methods Analysis',
      authors: 'Ivanova, A., et al.',
      journal: 'International Journal of Hospitality Management',
      year: '2025',
      status: 'Under Review',
      type: 'Peer-Reviewed',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Publications & Outputs</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Academic publications and research outputs from this project
        </p>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {publications.map((pub, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="mb-2">{pub.title}</div>
                  <p className="text-gray-600 mb-2">{pub.authors}</p>
                  <p className="text-gray-500 mb-3">
                    {pub.journal} ({pub.year})
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={pub.status === 'Published' ? 'default' : 'secondary'}>
                      {pub.status}
                    </Badge>
                    <Badge variant="outline">{pub.type}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  {pub.status === 'Published' && (
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
