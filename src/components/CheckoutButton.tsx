import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { toggleVisibility } from '../app/cartSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';

function CheckoutButton() {
  const visible = useSelector((state: RootState) => state.cart.visible);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  if (!items) return <></>;

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
              `${import.meta.env.VITE_PRODUCTS_API_URL}/${item.id}`,
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

  return (
    <Link
      to="/checkout/information"
      onClick={() => dispatch(toggleVisibility(!visible))}
    >
      <button className="relative mt-5 h-12 w-full bg-black text-white">
        <div className="flex flex-row align-top">
          <div className="basis-2/5 text-right">Checkout</div>
          <div className="relative basis-1/5 text-center leading-none">
            <div className="align-top">.</div>
          </div>
          <div className="basis-2/5 text-left">${totalPrice} USD</div>
        </div>
      </button>
    </Link>
  );
}

export default CheckoutButton;
