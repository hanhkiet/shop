import AdminLoginSection from '../components/AdminLoginSection';
import AuthPage from '../pages/AuthPage';

export const authAdminRouter = {
  path: '/auth/admin/*',
  element: <AuthPage />,
  children: [
    {
      path: 'login',
      element: <AdminLoginSection />,
    },
    {
      path: '*',
      element: <div>404 Not found</div>,
    },
  ],
};
