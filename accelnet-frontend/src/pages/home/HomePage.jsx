import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [stats, setStats] = useState({ researchers: 150, institutions: 25, publications: 50, countries: 10 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch upcoming events (limit is 6 by default in your API)
        const eventsRes = await api.get('/events/upcoming');
        setUpcomingEvents(eventsRes.data.data);

        // Fetch latest news (limit 3)
        const newsRes = await api.get('/news?limit=3');
        setLatestNews(newsRes.data.data);
        
        // Fetch statistics
        const statsRes = await api.get('/statistics');
        if (statsRes.data.success) {
          setStats({
            researchers: statsRes.data.data.users || 150,
            institutions: statsRes.data.data.organizations || 25,
            publications: statsRes.data.data.publications || 50,
            countries: 10 // API doesn't provide this, so we keep a static value
          });
        }

      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with calming blue gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 -z-20" />
      
      {/* Animated background lines */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <img 
          src="/bg-lines.svg" 
          alt="" 
          className="w-full h-full object-cover animate-pulse"
          style={{ animationDuration: '8s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">
              Advancing Brain-Inspired Computing
            </h2>
            <p className="text-xl text-blue-800 mb-8 leading-relaxed">
              A collaborative network accelerating research in neuroscience, artificial intelligence, 
              and brain-computer interfaces to improve brain health through art and science.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Explore Research
              </button>
              <Link to='/signup' className="bg-white/80 backdrop-blur-sm hover:bg-white text-blue-800 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-200">
                Join Network
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Content Cards */}
        <section className="container mx-auto px-6 py-12">
          {/* ... Your static cards are here ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Research</h3>
              <p className="text-blue-700">
                Cutting-edge research in brain-computer interfaces and neuroscience
              </p>
            </div>
            {/* ... Card 2 & 3 ... */}
             <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Collaboration</h3>
              <p className="text-blue-700">
                Global network of researchers, artists, and industry partners
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Publications</h3>
              <p className="text-blue-700">
                Open-access research and datasets advancing the field
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW: Upcoming Events Section --- */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.event_id} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-blue-100 p-5">
                  <h3 className="text-xl font-bold text-blue-800 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    {new Date(event.start_datetime).toLocaleDateString()} - {event.location}
                  </p>
                  <p className="text-blue-700 text-sm truncate">{event.event_description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-blue-800 md:col-span-3">No upcoming events found.</p>
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/events" className="text-blue-600 hover:underline font-semibold">
              View All Events &rarr;
            </Link>
          </div>
        </section>

        {/* --- NEW: Latest News Section --- */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.length > 0 ? (
              latestNews.map(article => (
                <div key={article.news_id} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-blue-100 p-5">
                  <h3 className="text-xl font-bold text-blue-800 mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-blue-700 text-sm">{article.excerpt}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-blue-800 md:col-span-3">No news found.</p>
            )}
          </div>
           <div className="text-center mt-8">
            <Link to="/news" className="text-blue-600 hover:underline font-semibold">
              View All News &rarr;
            </Link>
          </div>
        </section>

        {/* Stats Section - Now uses dynamic stats */}
        <section className="container mx-auto px-6 py-12">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">{stats.researchers}</p>
                <p className="text-blue-800 font-medium mt-2">Researchers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">{stats.institutions}</p>
                <p className="text-blue-800 font-medium mt-2">Institutions</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">{stats.publications}</p>
                <p className="text-blue-800 font-medium mt-2">Publications</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">{stats.countries}</p>
                <p className="text-blue-800 font-medium mt-2">Countries</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage