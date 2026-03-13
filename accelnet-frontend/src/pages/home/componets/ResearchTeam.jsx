import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../../componets/ui/card";
import api from "../../../lib/api";

type Participant = {
  id: number;
  name: string;
  role: string | null;
  affiliation: string | null;
  specialty: string | null;
  academicRank?: string | null;
  orcid?: string | null;
  googleScholarId?: string | null;
  pfp?: string | null; // backend sends pfp (base64 data url)
};

type FeaturedParticipantsProps = {
  title?: string;
  description?: string;
  limit?: number;
  /** By default, this section is plain (no gray band). */
  showBackground?: boolean;
};

const FeaturedParticipants: React.FC<FeaturedParticipantsProps> = ({
  title = "Featured participants",
  description =
    "A few of the key people helping drive AccelNet’s collaborations across neuroscience, engineering, and the arts.",
  limit = 6,
  showBackground = false,
}) => {
  const [team, setTeam] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [imgFailed, setImgFailed] = useState<Set<number>>(new Set());

  const paramsString = useMemo(() => {
    const params = new URLSearchParams({ limit: String(limit) });
    return params.toString();
  }, [limit]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/participants/homepage?${paramsString}`);

        const participants = res.data?.data;
        setTeam(Array.isArray(participants) ? participants.slice(0, limit) : []);
        setImgFailed(new Set());
      } catch (err) {
        console.error("Failed to load homepage participants:", err);
        setError("Unable to load participants at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [limit, paramsString]);

  return (
    <section className={`py-10 md:py-14 ${showBackground ? "bg-gray-50" : ""}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">{description}</p>

        {loading && <p className="text-center text-gray-500">Loading participants…</p>}

        {error && !loading && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        {!loading && !error && team.length === 0 && (
          <p className="text-center text-gray-500">No participants to display yet.</p>
        )}

        {!loading && !error && team.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {team.map((person) => {
              const showImg = !!person.pfp && !imgFailed.has(person.id);

              return (
                <Card
                  key={person.id}
                  className="w-full max-w-sm flex flex-col items-center text-center p-6 rounded-3xl shadow-sm bg-white"
                >
                  <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-blue-50 overflow-hidden">
                    {showImg ? (
                      <img
                        src={person.pfp!}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={() =>
                          setImgFailed((prev) => {
                            const next = new Set(prev);
                            next.add(person.id);
                            return next;
                          })
                        }
                      />
                    ) : (
                      <span className="text-xl font-semibold text-blue-600">
                        {getInitials(person.name)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">{person.name}</h3>

                  {person.role && <p className="text-sm text-gray-600 mb-2">{person.role}</p>}

                  {person.affiliation && (
                    <p className="text-sm text-gray-500 mb-1">{person.affiliation}</p>
                  )}

                  {person.specialty && (
                    <p className="text-sm text-gray-500">{person.specialty}</p>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default FeaturedParticipants;