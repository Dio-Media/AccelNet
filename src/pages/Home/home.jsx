import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="App-main">
      <h1>Welcome to AccelNet</h1>
      <p>Your network for European Science and Technology Cooperation.</p>
      <div className="Cta-section">
        {/* Core actions using Links for navigation */}
        <Link to="/working-groups" className="Button-primary">Explore Working Groups</Link>
        <Link to="/grants" className="Button-secondary">View Grant Opportunities</Link>
      </div>
      
      <section className="Content-feed">
        <h2>Latest News & Events</h2>
        {/* Placeholder for future components like <NewsSection /> and <EventsSection /> */}
        <p>Dynamic content feeds from your database will go here.</p>
      </section>
    </main>
  );
}