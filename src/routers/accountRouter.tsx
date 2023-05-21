import AccountAddressSection from '../layout/AccountAddressSection';
import AccountOrdersSection from '../layout/AccountOrdersSection';
import AccountOverviewSection from '../layout/AccountOverviewSection';
import AccountOrderDetailModal from '../modals/AccountOrderDetailsModal';
import AccountPage from '../pages/AccountPage';

export const accountRouter = {
  path: '/account',
  element: <AccountPage />,
  children: [
    {
      path: '',
      element: <AccountOverviewSection />,
    },
    {
      path: 'addresses',
      element: <AccountAddressSection />,
    },
    {
      path: 'orders',
      element: <AccountOrdersSection />,
      children: [
        {
          path: ':orderId',
          element: <AccountOrderDetailModal />,
        },
      ],
    },
  ],
};
