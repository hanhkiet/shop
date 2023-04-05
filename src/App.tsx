import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cover from './Cover';
import Footer from './Footer';
import NoPage from './pages/NoPage';
import Category from './Category';
import ProductDetail from './ProductDetail';
import Search from './Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="category" element={<Category />} />
          <Route path="search" element={<Search />} />
          <Route path="/products/:productName" element={<ProductDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
