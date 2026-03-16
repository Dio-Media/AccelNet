import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Define the async function inside useEffect
    const fetchParticipants = async () => {
      try {
        // TODO: Replace with your actual Worker URL or environment variable
        // e.g., `${import.meta.env.VITE_API_BASE}/participants`
        const API_BASE = import.meta.env.VITE_WORKER_API_URL ||"https://accelnet-worker-api.diogomiranda8091.workers.dev";
        const response = await axios.get(`${API_BASE}/api/participants`);
        
        // Axios automatically parses the JSON, so the data is available at response.data
        setParticipants(response.data);
      } catch (err) {
        // 2. Axios provides detailed error objects
        // err.response exists if the server responded with a status code outside 2xx
        // err.request exists if the request was made but no response was received

        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    // 3. Call the function
    fetchParticipants();
  }, []);

  // 4. Handle Loading and Error States
  if (isLoading) return <div className="p-8 text-center">Loading participants...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  // 5. Render your UI
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AccelNet Participants</h1>
      
      {/* TODO: Map through participants and render them */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants.map((participant) => (
          <div key={participant.id} className="border p-4 rounded shadow-sm">
            {/* Display data like participant.name, participant.institution, etc. */}
            <div>
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mt-2">{participant.name}</h2>
              <p className="text-sm text-gray-600">{participant.institution}</p>
              <p className="text-sm text-gray-600">{participant.role}</p>
              <p className="text-sm text-gray-600">{participant.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}