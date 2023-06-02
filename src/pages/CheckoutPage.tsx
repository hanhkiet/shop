import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import OrderSummarySection from '../components/OrderSummarySection';

function CheckoutPage() {
  const location = useLocation();
  return (
    <>
      <div className="grid flex-row font-[avenir-next] font-bold lg:flex">
        <div className="order-2 flex basis-2/3 flex-col items-center gap-3 px-6 py-3 lg:order-1">
          <Link to="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW.png"
              className={`mx-auto mt-5 h-12`}
              alt=""
            />
          </Link>
          <nav className="flex gap-2 text-gray-300">
            <Link to="/cart">Cart</Link>
            <span className="cursor-default text-black selection:bg-transparent">
              {'>'}
            </span>
            <Link
              to="/checkout/information"
              className={`${
                location.pathname.includes('information')
                  ? `text-neutral-900`
                  : ``
              }`}
            >
              Information
            </Link>
            <span className="cursor-default text-black selection:bg-transparent">
              {'>'}
            </span>
            <Link
              to="/checkout/shipping"
              className={`${
                location.pathname.includes('shipping') ? `text-neutral-900` : ``
              }`}
            >
              Shipping
            </Link>
            <span className="cursor-default text-black selection:bg-transparent">
              {'>'}
            </span>
            <Link
              to="/checkout/payment"
              className={`${
                location.pathname.includes('payment') ? `text-neutral-900` : ``
              }`}
            >
              Payment
            </Link>
          </nav>
          <Outlet />
          <div className="h-px w-full bg-gray-300"></div>
          <div className="flex flex-row place-content-start place-items-start items-start justify-start gap-3 text-start">
            <span>Refund policy</span>
            <span>Privacy policy</span>
            <span>Terms of service</span>
          </div>
        </div>
        <OrderSummarySection />
      </div>
    </>
  );
}

export default CheckoutPage;
