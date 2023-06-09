import CollectionManagementSection from '../components/management/CollectionManagementSection';
import ProductManagementSection from '../components/management/ProductManagementSection';
import ManagerAccountSection from '../layout/ManagerAccountSection';
import ManagerOrderSection from '../layout/ManagerOrderSection';
import ManagerStorageSection from '../layout/ManagerStorageSection';
import ManagerPage from '../pages/ManagerPage';

export const managerRouter = {
  path: '/manager',
  element: <ManagerPage />,
  children: [
    {
      path: 'orders',
      element: <ManagerOrderSection />,
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
