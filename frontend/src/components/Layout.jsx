// frontend/src/components/Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="site-container">
      <Navbar />
      
      {/* The 'children' here is the Home component */}
      <main className="content-area">
        {children}
      </main>

      <Footer /> {/* THIS MUST BE HERE */}
    </div>
  );
};

export default Layout;