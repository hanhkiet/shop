import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './Navbar'
import Cover from './Cover'
import Footer from './Footer'
import NoPage from './NoPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Cover />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
