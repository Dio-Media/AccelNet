import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="App">
      <Header />
      {/* Renders the specific page component (Home, About, etc.) */}
      {children} 
      <Footer />
    </div>
  );
}