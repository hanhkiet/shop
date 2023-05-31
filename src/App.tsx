import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMenuData } from './app/menuSlice';
import { getProductData } from './app/productSlice';
import { AppDispatch } from './app/store';
import { accountRouter } from './routers/accountRouter';
import { productRouter } from './routers/productRouter';
import { authRouter } from './routers/authRouter';
import { categoryRouter } from './routers/categoryRouter';
import { checkoutRouter } from './routers/checkoutRouter';
import { errorRouter } from './routers/errorRouter';
import { homeRouter } from './routers/homeRouter';
import { managerRouter } from './routers/managerRouter';
import { getProductQuantityData } from './app/productQuantitySlice';
import { getCategoryProductData } from './app/categoryProductSlice';

const router = createBrowserRouter([
  homeRouter,
  accountRouter,
  managerRouter,
  authRouter,
  checkoutRouter,
  categoryRouter,
  errorRouter,
  productRouter,
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuData());
    dispatch(getProductData());
    dispatch(getProductQuantityData());
    dispatch(getCategoryProductData());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
