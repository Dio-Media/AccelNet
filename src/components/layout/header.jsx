import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="App-header">
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-links">
            <a href="https://twitter.com/COSTprogramme" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.linkedin.com/company/cost-programme" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com/COST.Programme" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.youtube.com/c/COSTprogramme" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
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