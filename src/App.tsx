import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css'
import Navbar from './Navbar'
import Cover from './Cover'
import Footer from './Footer'
import NoPage from './NoPage'
import Category from './Category'
import ProductDetail from "./ProductDetail";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Cover />} />
          <Route path='category' element={<Category />} />
          <Route path="/products/:productName" element={<ProductDetail />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
