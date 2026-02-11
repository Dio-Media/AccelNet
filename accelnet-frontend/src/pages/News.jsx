import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import api from "../lib/api";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/news", {
          params: { limit: 12, page: 1 }, // Increased limit slightly for a better grid fill
        });
        setNews(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load news articles.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Latest News
        </h1>

        {loading && <div className="text-center text-blue-800 p-8">Loading news...</div>}
        {error && <div className="text-center text-red-600 p-8">{error}</div>}
        
        {!loading && !error && (
          /* --- Grid Layout Container --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((item) => (
              <article
                key={item.news_id} 
                className="flex flex-col bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-blue-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-4">
                    {new Date(item.publish_date).toLocaleDateString(undefined, { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </p>
                  <p className="text-blue-700 text-sm leading-relaxed line-clamp-4">
                    {item.excerpt}
                  </p>
                </div>
                
                {/* Optional: Add a "Read More" link/button at the bottom of the card */}
                <div className="mt-6 pt-4 border-t border-blue-50">
                   <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition">
                     Read Article →
                   </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}