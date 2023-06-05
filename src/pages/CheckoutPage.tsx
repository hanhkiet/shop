import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import OrderSummarySection from '../components/OrderSummarySection';
import Modal from '../modals/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setPathName } from '../app/pathSlice';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { deleteAllCartData } from '../app/cartSlice';

function CheckoutPage() {
  const location = useLocation();
  const [showRefund, setShowRefund] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [urlTurnBack, setUrlTurnBack] = useState('');
  const [urlNext, setUrlNext] = useState('');
  const [textTurnBack, setTextTurnBack] = useState('');
  const [textButton, setTextButton] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowRefund(false);
        setShowPrivacy(false);
        setShowTerms(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (location.pathname.includes('information')) {
      setUrlTurnBack('/cart');
      setTextTurnBack('cart');
      setTextButton('Continue to shipping');
      setUrlNext('/checkout/shipping');
    } else if (location.pathname.includes('shipping')) {
      setUrlTurnBack('/checkout/information');
      setTextTurnBack('information');
      setTextButton('Complete order');
      setUrlNext('');
    } else {
      setUrlTurnBack('/checkout/shipping');
      setTextTurnBack('shipping');
      setTextButton('Pay now');
      setUrlNext('/checkout/payment');
    }
  }, [location]);
  const dispatch = useDispatch();
  const pathName = useSelector((state: RootState) => state.path.pathName);
  if (pathName != location.pathname) {
    dispatch(setPathName(location.pathname));
    window.scrollTo(0, 0);
  }
  const navigate = useNavigate();
  const handleFinish = () => {
    setConfirmOrder(false);
    navigate('/');
    localStorage.removeItem('cartItems');
    dispatch(deleteAllCartData());
  }
  return (
    <>
      <div className="grid flex-row font-[avenir-next] font-bold lg:flex">
        <div className="order-2 flex basis-2/3 flex-col gap-3 px-6 py-3 lg:order-1">
          <img
            onClick={() => navigate('/')}
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW.png"
            className={`mx-auto mt-5 hidden h-12 cursor-pointer lg:block`}
            alt=""
          />
          <nav className="flex place-content-center gap-2 text-gray-900 font-[Mulish]">
            <Link to="/cart" className='opacity-80'>Cart</Link>
            <span className="cursor-default text-black selection:bg-transparent opacity-80">
              {'>'}
            </span>
            <Link
              to="/checkout/information"
              className={`${
                location.pathname.includes('information')
                  ? `opacity-100`
                  : `opacity-80`
              }`}
            >
              Information
            </Link>
            <span className="cursor-default text-black selection:bg-transparent opacity-80">
              {'>'}
            </span>
            <Link
              to="/checkout/shipping"
              className={`${
                location.pathname.includes('shipping') ? `opacity-100` : `opacity-50`
              }`}
            >
              Shipping
            </Link>
          </nav>
          <Outlet />
          <div className="flex w-full flex-row gap-2 mt-20 lg:mt-auto">
            <Link to={urlTurnBack} className="w-full p-2">
              {'< '}Return to {textTurnBack}
            </Link>
            {location.pathname.includes('shipping') ? <div className="w-full"><button onClick={() => setShowConfirmModal(true)} className="button bg-gray-900 text-white w-full normal-case duration-300 hover:bg-black">
                {textButton}
              </button></div> : <Link className="w-full" to={urlNext}>
              <button className="button bg-gray-900 text-white w-full normal-case duration-300 hover:bg-black">
                {textButton}
              </button>
            </Link>}
          </div>
          <div className="h-px w-full bg-gray-300"></div>
          <div className="flex flex-row gap-12">
            <span
              onClick={() => setShowRefund(true)}
              className="cursor-pointer text-gray-500 duration-300 hover:text-black"
            >
              Refund policy
            </span>
            <span
              onClick={() => setShowPrivacy(true)}
              className="cursor-pointer text-gray-500 duration-300 hover:text-black"
            >
              Privacy policy
            </span>
            <span
              onClick={() => setShowTerms(true)}
              className="cursor-pointer text-gray-500 duration-300 hover:text-black"
            >
              Terms of service
            </span>
          </div>
        </div>
        <OrderSummarySection />
      </div>
      <Modal
        className={`flex items-center justify-center overflow-y-auto duration-300 ${
          showRefund ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => setShowRefund(false)}
      >
        <>
          {showRefund && <RemoveScrollBar />}
          <div className="mt-1 border-b-[2px] border-neutral-300">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light capitalize">
                Refund policy
              </div>
              <img
                onClick={() => setShowRefund(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
          </div>

          <div className="grid max-h-96 w-96 overflow-auto px-6 py-3 text-justify">
            <p className="mb-5">Return Conditions:</p>
            <p className="mb-5">
              Products must be unwashed and unworn with original tags.
            </p>
            <p className="mb-5">
              No returns or exchanges on leggings, underwear, or socks.
            </p>
            <p className="mb-5">
              All markdown sales are final and no exchanges or returns will be
              accepted on sale items.
            </p>
            <p className="mb-5">U.S. Returns and Exchanges:</p>
            <p className="mb-5">
              Please submit a return or exchange request at our Returns &
              Exchanges Center. We will provide you with a prepaid shipping
              label to return your item for a refund or exchange. If you are
              returning a product, we will refund you the price of the original
              order excluding shipping within 7 business days after we receive
              the product in returnable condition at our warehouse. If you are
              exchanging a product we will issue you store credit within 7
              business days after we receive the product in exchangeable
              condition at our warehouse.
            </p>
            <p className="mb-5">International Returns and Exchanges:</p>
            <p className="mb-5">
              To initiate an international return or exchange, please fill out
              the appropriate International Returns Form or International
              Exchanges Form (both forms were included in your order envelope
              with your invoice or you can click either for a printable PDF).
              Include the form with your return/exchange item and ship to the
              address listed below. If you are returning a product, we will
              refund you the price of the original order excluding shipping once
              we receive the product in returnable condition at our warehouse.
              If you are exchanging a product, we will issue you store credit
              that is redeemable immediately once the product arrives at our
              warehouse in returnable condition. Unfortunately we cannot offer
              refunds on international shipping or customs and duties charges.
            </p>
            <p className="mb-5">Please ship all returns and exchanges to:</p>
            <p className="mb-5">ASRV Returns/Exchanges</p>
            <p className="mb-5">2251 Rutherford Rd. Ste. 150</p>
            <p className="mb-5">Carlsbad, CA 92008</p>
            <p className="mb-5">USA</p>
          </div>
        </>
      </Modal>
      <Modal
        className={`flex items-center justify-center overflow-y-auto duration-300 ${
          showPrivacy ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => setShowPrivacy(false)}
      >
        <>
          {showPrivacy && <RemoveScrollBar />}
          <div className="mt-1 border-b-[2px] border-neutral-300">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light capitalize">
                Privacy policy
              </div>
              <img
                onClick={() => setShowPrivacy(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
          </div>

          <div className="grid max-h-96 w-96 overflow-auto px-6 py-3 text-justify">
            <p>
              When you purchase something from our store, as part of the buying
              and selling process, we collect the personal information you give
              us such as your name, address and email address.
            </p>
          </div>
        </>
      </Modal>
      <Modal
        className={`flex items-center justify-center overflow-y-auto duration-300 ${
          showTerms ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => setShowTerms(false)}
      >
        <>
          {showTerms && <RemoveScrollBar />}
          <div className="mt-1 border-b-[2px] border-neutral-300">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light capitalize">
                Terms of service
              </div>
              <img
                onClick={() => setShowTerms(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
          </div>

          <div className="grid max-h-96 w-96 overflow-auto px-6 py-3 text-justify">
            <p>
              This website is operated by Aesthetic Revolution . Throughout the
              site, the terms “we”, “us” and “our” refer to Aesthetic Revolution
              . Aesthetic Revolution offers this website, including all
              information, tools and services available from this site to you,
              the user, conditioned upon your acceptance of all terms,
              conditions, policies and notices stated here.
            </p>
          </div>
        </>
      </Modal>
      <Modal
        className={`flex items-center justify-center overflow-y-auto duration-300 ${
          showConfirmModal ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => setShowConfirmModal(false)}
      >
        <>
          {showConfirmModal && <RemoveScrollBar />}
          <div className="mt-1 border-b-[2px] border-neutral-300">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light capitalize">
                Confirm
              </div>
              <img
                onClick={() => setShowConfirmModal(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
          </div>
          <div className="grid max-h-96 w-96 overflow-auto px-6 py-3 text-center">
            <p>Would you like to submit this order with the information you entered?</p>
            <div className="flex flex-row justify-between gap-3 mt-3">
              <button onClick={() => setShowConfirmModal(false)} className='basis-1/2 grid items-center px-3 py-1 bg-black text-white rounded opacity-70 hover:opacity-80 duration-300'>Cancel</button>
              <button onClick={() => {setConfirmOrder(true); setShowConfirmModal(false)}} className='basis-1/2 grid items-center px-3 py-1 bg-black text-white rounded opacity-90 hover:opacity-100 duration-300'>Confirm</button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        className={`flex items-center justify-center overflow-y-auto duration-300 ${
          confirmOrder ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => {}}
      >
        <>
          {confirmOrder && <RemoveScrollBar />}
          <div className="mt-1 border-b-[2px] border-neutral-300">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light capitalize">
                Successfully confirmed
              </div>
              <img
                onClick={handleFinish}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
                data-duration={5}
              />
            </div>
          </div>
          <div className="grid max-h-96 w-96 overflow-auto px-6 py-3 text-center">
            <img
              src="https://i.gifer.com/7efs.gif"
              alt="Animated GIF"
              id="gifImage"
            />
            <p>Your order has been sent. We will contact you soon to confirm.</p>
            <div className="grid items-center mt-3">
              <button onClick={handleFinish} className='grid items-center px-3 py-1 bg-black text-white rounded opacity-90 hover:opacity-100 duration-300'>Confirm</button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default CheckoutPage;
