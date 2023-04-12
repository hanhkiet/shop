import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  Router,
  RouterProvider,
} from 'react-router-dom';
import Navbar from './components/NavbarDemo';
import Cover from './components/Cover';
import Footer from './components/Footer';
import NoPage from './pages/NoPage';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // return (
  //   <>
  //     <BrowserRouter>
  //       <Navbar />
  //       <Routes>
  //         <Route path="/" element={<Cover />} />
  //         <Route path="category" element={<Category />} />
  //         <Route path="search" element={<Search />} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="register" element={<Register />} />
  //         <Route path="checkout" element={<Checkout />} />
  //         <Route path="/products/:productName" element={<ProductDetail />} />
  //         <Route path="*" element={<NoPage />} />
  //       </Routes>
  //       <Footer />
  //     </BrowserRouter>
  //   </>
  // );
}

export default App;
