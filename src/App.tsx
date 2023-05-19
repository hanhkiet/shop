import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { clearAddresses } from './app/addressSlice';
import { sendAuthenticateRequest } from './app/authSlice';
import { AppDispatch } from './app/store';
import { accountRouter } from './routers/accountRouter';
import { authRouter } from './routers/authRouter';
import { checkoutRouter } from './routers/checkoutRouter';
import { homeRouter } from './routers/homeRouter';

const router = createBrowserRouter([
  homeRouter,
  accountRouter,
  authRouter,
  checkoutRouter,
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAddresses());
    dispatch(sendAuthenticateRequest());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
