import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ItemsInStore, Product } from '../app/types';
import axios from 'axios';

type Props = {
  productId: string;
  size: string;
  quantity: number;
  className?: string;
};

function ProductCardCheckout(props: Props) {
  const [thisProductCartCheckout, setThisProductCartCheckout] =
    useState<Product>();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/${props.productId}`)
      .then(res => setThisProductCartCheckout(res.data));
  });
  if (!thisProductCartCheckout) return <></>;
  return (
    <div className={`flex max-w-md items-center gap-4 ${props.className}`}>
      <div className="relative">
        <img
          className="w-24 rounded"
          src={thisProductCartCheckout.images[0]}
          alt=""
        />
        <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-900 text-center text-xs">
          <div className="grid h-5 w-5 select-none place-items-center text-center text-xs text-white">
            {props.quantity}
          </div>
        </div>
      </div>
      <div className="basis-full">
        <p className="text-md w-72">{thisProductCartCheckout.name}</p>
        <p className="text-xs">Size: {props.size}</p>
      </div>
      <div>${thisProductCartCheckout.price * props.quantity}</div>
    </div>
  );
}

export default ProductCardCheckout;
