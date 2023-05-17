import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function CheckoutButtonContent({ products }: { products: any }) {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = items.reduce((total, item) => {
    return (
      total +
      item.quantity *
        products.filter((p: any) => p.productId === item.product.id)[0].price
    );
  }, 0);

  return (
    <button className="relative mt-5 h-12 w-full bg-black text-white">
      <div className="flex flex-row align-top">
        <div className="basis-2/5 text-right">Checkout</div>
        <div className="relative basis-1/5 text-center leading-none">
          <div className="align-top">.</div>
        </div>
        <div className="basis-2/5 text-left">${totalPrice} USD</div>
      </div>
    </button>
  );
}

function CheckoutButton() {
  const baseURL = 'http://localhost:5500/src/static/data/productsData.json';
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setProducts(response.data);
    });
  }, []);
  if (!products) return <></>;

  return <CheckoutButtonContent products={products} />;
}

export default CheckoutButton;
