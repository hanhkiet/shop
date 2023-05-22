import AdminPage from '../pages/AdminPage';
import NoPage from '../pages/NoPage';

export const accountRouter = {
  path: '/admin',
  element: <AdminPage />,
  children: [
    {
      path: '',
      element: <NoPage />,
    },
  ],
};
