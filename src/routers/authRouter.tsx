import LoginSection from '../components/LoginSection';
import RegisterSection from '../components/RegisterSection';
import AuthPage from '../pages/AuthPage';

export const authRouter = {
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
};
