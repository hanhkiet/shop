import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginSection from './components/LoginSection';
import RegisterSection from './components/RegisterSection';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
