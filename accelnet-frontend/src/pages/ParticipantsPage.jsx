import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || "https://accelnet-worker-api.diogomiranda8091.workers.dev";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/participants`);
        setParticipants(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  // Filter participants based on search query
  const filtered = participants.filter((p) =>
    [p.name, p.institution, p.title, p.department]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) return <div className="p-8 text-center">Loading participants...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">

      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">AccelNet Participants</h1>
        <input
          type="text"
          placeholder="Search by name, institution, role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-full px-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />
      </div>

      {/* No results message */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No participants found matching "{searchQuery}"</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((participant) => (
          <div key={participant.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">

            {/* Avatar */}
            <img
              src={participant.pfp}
              alt={participant.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Info */}
            <div className="ml-4">
              <h2 className="text-lg font-bold">{participant.name}</h2>
              <p className="text-gray-600">{participant.institution}</p>
              <p className="text-green-700">{participant.title}</p>
              <p className="text-gray-500">{participant.department}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}