import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './Navbar'
import Cover from './Cover'
import Footer from './Footer'
import NoPage from './NoPage'
import Category from './Category'
import Product from './Product'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Cover />} />
          <Route path='category' element={<Category />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
