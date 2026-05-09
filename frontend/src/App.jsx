// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <Layout> {/* Wrap everything inside Layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* 
              When you click "More Like This" (e.g., /category/reception), 
              the Navbar and Footer will still be there! 
          */}
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;