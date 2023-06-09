import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setNote } from '../app/orderSlice';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { CartItem, Collection } from '../app/types';
import ProductCartPage from '../components/ProductCartPage';
import ProductCart from '../components/ProductCart';
import axios from 'axios';

function CartPage() {
  const notes = useSelector((state: RootState) => state.order.note);
  const dispatch = useDispatch();
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = event.target.value;
    dispatch(setNote(newNote));
  };
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
  const hasSale = false;
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  return (
    <>
      <Navbar />
      {!items || items.length == 0 ? (
        <div
          className={`grid place-content-center ${
            hasSale ? `h-[calc(100vh-64px)]` : `h-screen`
          }`}
        >
          <p className="text-center">Your cart is empty</p>
          <Link
            to={`/collections/${
              collections
                .find((item: Collection) => item.type === 'FEATURED')
                ?.name.replace(/\W+/gi, '-')
                .toLowerCase() || '/'
            }`}
          >
            <button className="m-5 bg-black px-6 py-3 text-center uppercase text-white duration-300 hover:bg-gray-500">
              SHOP OUR PRODUCTS
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-16 min-h-[calc(100vh-128px)] font-[avenir-next] font-bold">
          <div className="grid h-24 place-content-center">
            <h2 className="text-center text-2xl">Cart</h2>
          </div>
          <div className="mx-3 grid gap-3">
            <div className="hidden md:block">
              <div className="flex flex-row">
                <div className="basis-6/12">Product</div>
                <div className="basis-3/12 text-center">Quantity</div>
                <div className="basis-3/12 text-right">Total</div>
              </div>
              <div className="h-px w-full bg-gray-300"></div>
            </div>
            <div>
              {items
                .slice(0)
                .reverse()
                .map((item: CartItem) => (
                  <div key={item.productUuid}>
                    <ProductCartPage
                      className="hidden md:flex"
                      productId={item.productUuid}
                      quantity={item.quantity}
                      size={item.size}
                    />
                    <ProductCart
                      className="flex md:hidden"
                      productId={item.productUuid}
                      quantity={item.quantity}
                      size={item.size}
                    />
                  </div>
                ))}
              <div className="h-px w-full bg-gray-300"></div>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/2">
                <div className="mb-5 flex justify-between">
                  <div className="text-1xl grid content-center font-light">
                    Add Order Note
                  </div>
                </div>
                <textarea
                  value={notes}
                  onChange={handleNoteChange}
                  placeholder="How can we help you?"
                  className="h-24 w-full resize-none border-[2px] border-neutral-400 bg-white p-3 focus:border-neutral-500 focus:outline-none lg:w-[75%]"
                ></textarea>
              </div>
              <div className="basis-1/2 text-right">
                <p>Total: ${totalPrice} USD</p>
                <p className="mt-3 text-xs text-gray-500">
                  Shipping & taxes calculated at checkout
                </p>
                <Link to="/checkout/information">
                  <button className="mt-3 bg-black px-6 py-3 text-center uppercase text-white duration-300 hover:bg-gray-500">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default CartPage;
