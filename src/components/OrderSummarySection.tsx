import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartItem } from '../app/types';
import ProductCardCheckout from './ProductCardCheckout';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function OrderSummarySection() {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showScrollNotice, setShowScrollNotice] = useState(true);
  const [textVoucher, setTextVoucher] = useState('');
  const items = useSelector((state: RootState) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setTotalPrice(0);
        return;
      }

      const productPrices = await Promise.all(
        items.map(async item => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_PRODUCTS_API_URL}/${item.productUuid}`,
            );
            const product = response.data;
            return product.price * item.quantity;
          } catch (error) {
            console.error('Error fetching product:', error);
            return 0;
          }
        }),
      );

      const calculatedTotalPrice = productPrices.reduce(
        (total, price) => total + price,
        0,
      );
      setTotalPrice(calculatedTotalPrice);
    };

    fetchProducts();
  }, [items]);
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextVoucher(event.target.value);
  };
  const divRef = useRef<any>(null);

  const handleScroll = () => {
    const divElement = divRef.current;
    if (divElement.scrollTop > 0) {
      setShowScrollNotice(false);
    }
  };
  useEffect(() => {
    handleScroll();
  }, []);
  const shippingPrice = useSelector(
    (state: RootState) => state.order.shippingPrice,
  );

  return (
    <>
      <div className="block bg-white py-3 lg:hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW.png"
          className={`mx-auto h-6 cursor-pointer`}
          alt=""
          onClick={() => navigate('/')}
        />
      </div>
      <div
        onClick={() => setShowOrderSummary(!showOrderSummary)}
        className="flex h-24 cursor-pointer flex-row items-center justify-between bg-gray-300 p-6 lg:hidden"
      >
        <div className="flex flex-row justify-center gap-3">
          <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
          </svg>
          <span>{showOrderSummary ? 'Hide' : 'Show'} order summary</span>
          <div className="grid items-center">
            {showOrderSummary ? (
              <svg
                width="11"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
              >
                <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
              </svg>
            ) : (
              <svg
                width="11"
                height="6"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
              >
                <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
              </svg>
            )}
          </div>
        </div>
        <div>
          <p className="font-[Mulish]">${totalPrice + shippingPrice}</p>
        </div>
      </div>
      <div
        className={`static top-0 right-0 order-1 grid ${
          showOrderSummary
            ? `visible h-full w-full gap-4 p-6`
            : `collapse h-0 w-0 gap-0 p-0`
        } basis-1/2 flex-col place-content-center bg-gray-100 lg:visible lg:sticky lg:grid lg:h-screen lg:w-full lg:gap-4 lg:p-6`}
      >
        <div className="relative">
          <div
            ref={divRef}
            onScroll={handleScroll}
            className="grid gap-6 overflow-y-hidden p-3 hover:overflow-y-auto lg:max-h-96"
          >
            {items
              .slice(0)
              .reverse()
              .map((item: CartItem, index) => (
                <ProductCardCheckout
                  key={index}
                  productId={item.productUuid}
                  quantity={item.quantity}
                  size={item.size}
                />
              ))}
          </div>
          {items.length > 4 && (
            <div
              className={`collapse absolute bottom-0 left-1/3 flex flex-row justify-center gap-1 rounded-full bg-black px-3 py-1 text-white opacity-0 ${
                showScrollNotice ? `lg:visible lg:opacity-100` : ``
              } lg:duration-300`}
            >
              <p className="z-50">Scroll for more items</p>
              <div className="grid place-content-center">
                <img
                  alt=""
                  className="h-3 w-3 select-none grayscale invert"
                  src="https://icons-for-free.com/iconfiles/png/256/down+arrow+download+icon-1320185738770602413.png"
                />
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex w-full max-w-md flex-row gap-3 border-t border-neutral-300 p-3">
          <div className="relative mt-3 basis-2/3 rounded border bg-white p-3">
            {textVoucher && <div className="h-6"></div>}
            <input
              value={textVoucher}
              onChange={handleChange}
              type="text"
              className={`w-[100%] outline-none ${
                textVoucher ? `absolute top-5 left-0 px-3 text-sm` : `text-base`
              }`}
            />
            <label
              htmlFor="voucher"
              className={`pointer-events-none absolute left-3 text-gray-500 duration-300 ${
                textVoucher ? `top-1 text-xs` : `text-md top-3`
              }`}
            >
              Gift card or discount code
            </label>
          </div>
          <div className="mt-3 basis-1/3">
            <button
              className={`h-full w-full rounded bg-gray-900 px-3 py-1 text-white ${
                textVoucher
                  ? `opacity-100 hover:bg-black`
                  : `cursor-default opacity-50`
              }`}
            >
              Apply
            </button>
          </div>
        </div> */}
        <div className="grid w-full max-w-md border-t border-neutral-300 pt-3">
          <div className="flex justify-between">
            <p className="text-md">Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-md">Shipping</p>
            <p>
              {shippingPrice == 0
                ? `Calculated at next step`
                : `$${shippingPrice}`}
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-md flex-row justify-between border-t border-neutral-300 py-3">
          <div className="text-md grid basis-10/12 items-center">Total</div>
          <div className="flex basis-2/12 flex-row justify-between gap-3">
            <div className="grid items-center text-xs text-gray-500">USD</div>
            <div className="grid items-center text-right font-[Mulish] text-2xl">
              ${totalPrice + shippingPrice}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummarySection;
