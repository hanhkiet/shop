import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCollectionData } from './app/collectionSlice';
import { getProductQuantityData } from './app/productQuantitySlice';
import { getProductData } from './app/productSlice';
import { AppDispatch } from './app/store';
import ErrorPopUp from './components/ErrorPopUp';
import { accountRouter } from './routers/accountRouter';
import { authRouter } from './routers/authRouter';
import { categoryRouter } from './routers/categoryRouter';
import { cartRouter } from './routers/cartRouter';
import { checkoutRouter } from './routers/checkoutRouter';
import { errorRouter } from './routers/errorRouter';
import { homeRouter } from './routers/homeRouter';
import { managerRouter } from './routers/managerRouter';
import { productRouter } from './routers/productRouter';

const router = createBrowserRouter([
  homeRouter,
  accountRouter,
  managerRouter,
  authRouter,
  cartRouter,
  checkoutRouter,
  categoryRouter,
  errorRouter,
  productRouter,
]);

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollectionData());
    dispatch(getProductData());
    dispatch(getProductQuantityData());
  }, []);

  return (
    <>
      <ErrorPopUp />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
