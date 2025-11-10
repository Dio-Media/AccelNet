import React, { useEffect, useState } from 'react';
import { Card } from '../../../componets/ui/card'; // <-- correct relative path

type Participant = {
  id: number;
  name: string;
  role: string | null;
  affiliation: string | null;
  specialty: string | null;
  academicRank?: string | null;
  orcid?: string | null;
  googleScholarId?: string | null;
};

const ResearchTeam: React.FC = () => {
  const [team, setTeam] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/participants/homepage');

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: { data?: Participant[] } = await res.json();
        setTeam(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error('Failed to load homepage participants:', err);
        setError('Unable to load participants at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const renderInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          Research Team
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Our interdisciplinary team brings together expertise across engineering,
          neuroscience, data science, and the arts.
        </p>

        {loading && (
          <p className="text-center text-gray-500">Loading participants…</p>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        {!loading && !error && team.length === 0 && (
          <p className="text-center text-gray-500">
            No participants to display yet.
          </p>
        )}

        {!loading && !error && team.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <Card
                key={person.id}
                className="flex flex-col items-center text-center p-6 rounded-3xl shadow-sm bg-white"
              >
                {/* Initials circle */}
                <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-blue-50">
                  <span className="text-xl font-semibold text-blue-600">
                    {renderInitials(person.name)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 mb-1">
                  {person.name}
                </h3>

                {/* Role */}
                {person.role && (
                  <p className="text-sm text-gray-600 mb-2">{person.role}</p>
                )}

                {/* Affiliation */}
                {person.affiliation && (
                  <p className="text-sm text-gray-500 mb-1">
                    {person.affiliation}
                  </p>
                )}

                {/* Specialty / department */}
                {person.specialty && (
                  <p className="text-sm text-gray-500">{person.specialty}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchTeam;
