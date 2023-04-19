import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
