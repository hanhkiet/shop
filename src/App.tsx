import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { sendAuthenticateRequest } from './app/authSlice';
import { AppDispatch } from './app/store';
import CheckoutInformationSection from './components/CheckoutInformationSection';
import LoginSection from './components/LoginSection';
import PaymentSection from './components/PaymentSection';
import RegisterSection from './components/RegisterSection';
import AccountAddressSection from './layout/AccountAddressSection';
import AccountOrdersSection from './layout/AccountOrdersSection';
import AccountOverviewSection from './layout/AccountOverviewSection';
import AccountOrderDetailSection from './modals/AccountOrderDetailsModal';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
    children: [
      {
        path: '',
        element: <AccountOverviewSection />,
      },
      {
        path: 'addresses',
        element: <AccountAddressSection />,
      },
      {
        path: 'orders',
        element: <AccountOrdersSection />,
        children: [
          {
            path: ':orderId',
            element: <AccountOrderDetailSection />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth/*',
    element: <AuthPage />,
    children: [
      {
        path: 'login',
        element: <LoginSection />,
      },
      {
        path: 'register',
        element: <RegisterSection />,
      },
      {
        path: '*',
        element: <div>404 Not found</div>,
      },
    ],
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
    children: [
      {
        path: '*',
        element: <div>404 Not found</div>,
      },
      {
        path: 'information',
        element: <CheckoutInformationSection />,
      },
      {
        path: 'payment',
        element: <PaymentSection />,
      },
    ],
  },
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(sendAuthenticateRequest());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
