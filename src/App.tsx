import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountAdressSection from './components/AccountAdressSection';
import AccountOverviewSection from './components/AccountOverviewSection';
import LoginSection from './components/LoginSection';
import RegisterSection from './components/RegisterSection';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
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
        element: <div>Orders</div>,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
