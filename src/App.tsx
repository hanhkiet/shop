import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCollectionData } from './app/collectionSlice';
import { getProductData } from './app/productSlice';
import { AppDispatch } from './app/store';
import ErrorPopUp from './components/ErrorPopUp';
import { accountRouter } from './routers/accountRouter';
import { authRouter } from './routers/authRouter';
import { cartRouter } from './routers/cartRouter';
import { categoryRouter } from './routers/categoryRouter';
import { checkoutRouter } from './routers/checkoutRouter';
import { errorRouter } from './routers/errorRouter';
import { homeRouter } from './routers/homeRouter';
import { managerRouter } from './routers/managerRouter';
import { productRouter } from './routers/productRouter';
import { searchRouter } from './routers/searchRouter';

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
  searchRouter,
]);

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollectionData());
    dispatch(getProductData());
  }, []);

  return (
    <>
      <ErrorPopUp />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
