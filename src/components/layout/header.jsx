import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="App-header">
      <div className="Header-content">
        <div className="Logo"><Link to="/">AccelNet</Link></div>
        <nav className="Nav-bar">
          {/* Use Link components for internal navigation */}
          <Link to="/" className="Nav-link">Home</Link>
          <Link to="/working-groups" className="Nav-link">Working Groups</Link>
          <Link to="/activities" className="Nav-link">Activities</Link>
          <Link to="/resources" className="Nav-link">Resources</Link>
          <Link to="/about" className="Nav-link">About</Link>
          {/* CTA Link */}
          <Link to="/login" className="Nav-link Primary-cta">Login / Register</Link>
        </nav>
      </div>
    </header>
  );
}