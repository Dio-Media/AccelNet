import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import api from "../lib/api"; // Use the new api instance

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/news", {
          params: { limit: 10, page: 1 },
        });
        
        // FIX 1: Access the 'data' array from your controller's response
        setNews(res.data.data || []); //
        setError(null);

      } catch (err) {
        console.error(err);
        setError("Failed to load news articles."); // Set error message
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
    
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Latest News
        </h1>

        {/* --- Handle Loading and Error States --- */}
        {loading && <div className="text-center text-blue-800 p-8">Loading news...</div>}
        {error && <div className="text-center text-red-600 p-8">{error}</div>}
        
        {!loading && !error && (
          <div className="max-w-3xl mx-auto space-y-6">
            {news.map((item) => (
              <article
                // FIX 2: Key should be 'news_id'
                key={item.news_id} 
                className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-blue-800 text-sm mb-3">
                  Published on: {" "}
                  {/* FIX 3: Use 'publish_date' from schema */}
                  {new Date(item.publish_date).toLocaleDateString()}
                </p>
                {/* FIX 4: Use 'excerpt' from schema */}
                <p className="text-blue-700">{item.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}