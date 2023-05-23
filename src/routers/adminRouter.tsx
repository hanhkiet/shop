import AdminDashboard from '../layout/AdminDashboard';
import AdminPage from '../pages/AdminPage';

export const adminRouter = {
  path: '/admin',
  element: <AdminPage />,
  children: [
    {
      path: '',
      element: <AdminDashboard />,
    },
  ],
};
