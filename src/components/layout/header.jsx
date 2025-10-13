import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="App-header">
      <div className="top-bar">
        <div className="top-bar-content">
          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div className="Header-content">
        <div className="Logo"><Link to="/">AccelNet</Link></div>
        <Navbar />
      </div>
    </header>
  );
}