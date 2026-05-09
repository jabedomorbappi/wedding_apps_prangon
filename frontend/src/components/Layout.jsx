// frontend/src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Adjust paths based on your file names
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      {/* Navbar stays at the top of every page */}
      <Navbar />

      {/* 
          This 'main' tag ensures the background is consistent 
          and the footer stays at the bottom even on short pages 
      */}
      <main style={{ minHeight: '80vh', background: '#080808' }}>
        {children}
      </main>

      {/* Footer stays at the bottom of every page */}
      <Footer />
    </>
  );
};

export default Layout;