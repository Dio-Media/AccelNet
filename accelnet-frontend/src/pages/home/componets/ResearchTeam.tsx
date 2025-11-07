import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ResearchTeam() {
  const team = [
    {
      name: 'Dr. Anna Ivanova',
      role: 'Principal Investigator',
      affiliation: 'Moscow State University',
      specialty: 'Urban Sociology',
    },
    {
      name: 'Dr. Dmitry Petrov',
      role: 'Co-Investigator',
      affiliation: 'Higher School of Economics',
      specialty: 'Urban Economics',
    },
    {
      name: 'Prof. Mikhail Sokolov',
      role: 'Research Coordinator',
      affiliation: 'Moscow State University',
      specialty: 'Cultural Anthropology',
    },
    {
      name: 'Elena Kuznetsova',
      role: 'Data Analyst',
      affiliation: 'HSE University',
      specialty: 'Quantitative Methods',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Research Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our interdisciplinary team brings together expertise in urban studies, sociology, and data science
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="mb-1">{member.name}</div>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-500">{member.affiliation}</p>
              <p className="text-gray-500">{member.specialty}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
