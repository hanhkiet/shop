import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { clearAddresses } from './app/addressSlice';
import { sendAuthenticateRequest } from './app/authSlice';
import { AppDispatch } from './app/store';
import { accountRouter } from './routers/accountRouter';
import { adminRouter } from './routers/adminRouter';
import { authRouter } from './routers/authRouter';
import { authAdminRouter } from './routers/authAdminRouter';
import { checkoutRouter } from './routers/checkoutRouter';
import { homeRouter } from './routers/homeRouter';
import { categoryRouter } from './routers/categoryRouter';
import { errorRouter } from './routers/errorRouter';
import { getMenuData } from './app/menuSlice';

const router = createBrowserRouter([
  homeRouter,
  accountRouter,
  adminRouter,
  authRouter,
  authAdminRouter,
  checkoutRouter,
  categoryRouter,
  errorRouter,
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAddresses());
    dispatch(sendAuthenticateRequest());
    dispatch(getMenuData());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
