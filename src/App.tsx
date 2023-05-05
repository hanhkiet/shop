import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountAdressSection from './components/AccountAdressSection';
import AccountOrderDetailSection from './components/AccountOrderDetails';
import AccountOrdersSection from './components/AccountOrdersSection';
import AccountOverviewSection from './components/AccountOverviewSection';
import CheckoutInformationSection from './components/CheckoutInformationSection';
import LoginSection from './components/LoginSection';
import PaymentSection from './components/PaymentSection';
import RegisterSection from './components/RegisterSection';
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
        element: <AccountAdressSection />,
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
  return <RouterProvider router={router} />;
}

export default App;
