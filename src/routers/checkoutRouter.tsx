import CheckoutInformationSection from '../components/CheckoutInformationSection';
import PaymentSection from '../components/PaymentSection';
import CheckoutPage from '../pages/CheckoutPage';

export const checkoutRouter = {
  path: '/checkout',
  element: <CheckoutPage />,
  children: [
    {
      path: '*',
      element: <div>404 Not found</div>,
    },
    {
      path: 'information',
      element: <CheckoutInformationSection />,
    },
    {
      path: 'payment',
      element: <PaymentSection />,
    },
  ],
};
