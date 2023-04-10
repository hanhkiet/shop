import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cover from './components/Cover';
import Footer from './components/Footer';
import NoPage from './pages/NoPage';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="category" element={<Category />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="/products/:productName" element={<ProductDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
