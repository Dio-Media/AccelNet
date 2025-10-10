import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/layout';

// Import Pages
import Home from '../pages/Home/home.jsx';

// Placeholder Component for pages you haven't built yet
const Placeholder = ({ title }) => (
  <main className="App-main">
    <h1>{title}</h1>
    <p>This page is under construction. It will display data from your database's {title.replace(/\s/g, '_').toLowerCase()} tables.</p>
  </main>
);

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        {/* Top-level Navigation Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Working Groups Routes (From AccelNet Document) */}
        <Route path="/working-groups" element={<Placeholder title="Working Groups" />} />
        
        {/* Activities Routes (From AccelNet Document) */}
        <Route path="/activities" element={<Placeholder title="Activities" />} />
        
        {/* About Routes (From AccelNet Document) */}
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/structure" element={<Placeholder title="Structure" />} />

        {/* Resources/Grants/Multimedia Routes */}
        <Route path="/resources" element={<Placeholder title="Resources" />} />
        <Route path="/grants" element={<Placeholder title="Grants" />} />
        <Route path="/multimedia" element={<Placeholder title="Multimedia" />} />
        
        {/* Utility/User Routes */}
        <Route path="/login" element={<Placeholder title="Login/Register" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
        
        {/* Catch-all for 404 (optional) */}
        <Route path="*" element={<Placeholder title="404 Page Not Found" />} />
      </Routes>
    </Layout>
  );
}