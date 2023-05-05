import { Outlet } from 'react-router-dom';
import OrderSummarySection from '../components/OrderSummarySection';

function CheckoutPage() {
  return (
    <>
      <div className="flex items-center justify-center border-b p-3">
        <img
          className=""
          src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
          alt="logo"
        />
      </div>
      <div className="flex h-screen flex-col lg:flex-row">
        <OrderSummarySection />
        <Outlet />
      </div>
    </>
  );
}

export default CheckoutPage;
