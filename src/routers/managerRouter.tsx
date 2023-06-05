import CollectionManagementSection from '../components/management/CollectionManagementSection';
import ProductManagementSection from '../components/management/ProductManagementSection';
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
      children: [
        {
          path: 'collections',
          element: <CollectionManagementSection />,
        },
        {
          path: 'products',
          element: <ProductManagementSection />,
        },
      ],
    },
    {
      path: 'account',
      element: <ManagerAccountSection />,
    },
  ],
};
