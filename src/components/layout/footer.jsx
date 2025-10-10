import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="App-footer">
      <div className="Footer-content">
        <p>© 2025 AccelNet</p>
        <div className="Footer-links">
          <Link to="/about">About</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}