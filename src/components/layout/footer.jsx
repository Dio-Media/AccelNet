import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="App-footer">
      <div className="Footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h3>About AccelNet</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/structure">Our Structure</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Networking Tools</h3>
            <ul>
              <li><Link to="/working-groups">Working Groups</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/grants">Grants</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/resources">Documents & Guidelines</Link></li>
              <li><Link to="/multimedia">Multimedia</Link></li>
              <li><Link to="/news">News</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <ul>
              <li><a href="https://twitter.com/COSTprogramme" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/cost-programme" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/COST.Programme" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.youtube.com/c/COSTprogramme" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="Footer-links">
          <Link to="/about">About</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <p>© 2025 AccelNet</p>
      </div>
    </footer>
  );
}