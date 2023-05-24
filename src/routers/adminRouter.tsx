import AdminDashboard from '../layout/AdminDashboard';
import AdminBusiness from '../layout/AdminBusiness';
import AdminDesign from '../layout/AdminDesign';
import AdminPage from '../pages/AdminPage';

export const adminRouter = {
  path: '/admin',
  element: <AdminPage />,
  children: [
    {
      path: '',
      element: <AdminDashboard />,
    },
    {
      path: 'business',
      element: <AdminBusiness />,
    },
    {
      path: 'design',
      element: <AdminDesign />,
    },
  ],
};
