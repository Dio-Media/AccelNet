import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="App">
      <Header />
      {/* Outlet renders the matched child route */}
      <Outlet />
      <Footer />
    </div>
  );
}