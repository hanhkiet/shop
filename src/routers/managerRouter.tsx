import ManagerAccountSection from '../layout/ManagerAccountSection';
import ManagerDashboardSection from '../layout/ManagerDashboardSection';
import ManagerStorageSection from '../layout/ManagerStorageSection';
import ManagerPage from '../pages/ManagerPage';

export const managerRouter = {
  path: '/manager',
  element: <ManagerPage />,
  children: [
    {
      path: 'dashboard',
      element: <ManagerDashboardSection />,
    },
    {
      path: 'storage',
      element: <ManagerStorageSection />,
    },
    {
      path: 'account',
      element: <ManagerAccountSection />,
    },
  ],
};
