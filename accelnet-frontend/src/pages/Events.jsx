import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';

// Simple card for styling
const EventCard = ({ event }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-blue-100 p-6 overflow-hidden">
    <h3 className="text-2xl font-bold text-blue-900 mb-2">{event.title}</h3>
    <p className="text-gray-600 mb-1 font-semibold">
      {new Date(event.start_datetime).toLocaleString()}
    </p>
    <p className="text-gray-600 mb-2">Location: {event.location}</p>
    <p className="text-blue-800 mb-4">{event.event_description}</p>
    <a href="#" className="text-blue-600 hover:underline font-semibold">
      View Details
    </a>
  </div>
);

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Fetch data from your backend API
        const res = await api.get('/events');
        setEvents(res.data.data); // Set the array of events
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          All Events
        </h2>
        {loading && <p className="text-center text-blue-800">Loading events...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;