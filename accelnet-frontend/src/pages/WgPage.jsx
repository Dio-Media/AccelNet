// accelnet-frontend/src/pages/WgPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api"; 

export default function WgPage() {
  const [workingGroups, setWorkingGroups] = useState([]); // Renamed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/working-groups"); // <-- FETCH FROM /wg
        
        setWorkingGroups(res.data.data || []); // Set the new state
        setError(null);

      } catch (err) {
        console.error(err);
        setError("Failed to load working groups."); // Updated error message
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-md">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/brain.svg" alt="logo" className="h-12 w-12" />
            <h1 className="text-2xl font-bold text-blue-900">AccelNet</h1>
          </Link>
          <Link to="/" className="text-blue-800 hover:text-blue-600 font-medium">
            &larr; Back to Home
          </Link>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Working Groups
        </h1>

        {loading && <div className="text-center text-blue-800 p-8">Loading...</div>}
        {error && <div className="text-center text-red-600 p-8">{error}</div>}
        
        {!loading && !error && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Map over the new state */}
            {workingGroups.map((wg) => (
              <article
                key={wg.wg_id} // Use wg_id
                className="card-glass p-6"
              >
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {wg.wg_code}: {wg.wg_name}
                </h2>
                <p className="text-blue-800">{wg.wg_description}</p>
                {/* You can add focus_area here later if you want */}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}