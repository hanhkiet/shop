import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as cartSlice from '../app/cartSlice';
import { ItemsInStore, Product } from '../app/types';
import { useEffect, useState } from 'react';
import QuantityWarningModal from '../modals/QuantityWarningModal';
import axios from 'axios';

type Props = {
  productId: string;
  size: string;
  quantity: number;
  className?: string;
};

function ProductCartPage(props: Props) {
  const [thisProductCartPage, setThisProductCartPage] = useState<Product>();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/${props.productId}`)
      .then(res => setThisProductCartPage(res.data));
  }, []);
  const [showMaxQuantityMessage, setShowMaxQuantityMessage] = useState(false);
  const dispatch = useDispatch();
  const handleRemove = (productId: string, size: string) => {
    dispatch(cartSlice.removeItem({ productId, size }));
  };
  const handleIncrement = (productId: string, size: string) => {
    dispatch(cartSlice.incrementQuantity({ productId, size }));
  };
  const handleDecrement = (productId: string, size: string) => {
    dispatch(cartSlice.decrementQuantity({ productId, size }));
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value);
    if (!newQuantity || newQuantity <= 0) {
      newQuantity = 1;
    }
    dispatch(
      cartSlice.setQuantity({
        productId: props.productId,
        size: props.size,
        quantity: newQuantity,
      }),
    );
  };
  if (!thisProductCartPage) return <></>;
  return (
    <>
      <div className={`flex flex-row ${props.className}`}>
        <div className="basis-6/12">
          <div className="m-5 flex flex-row">
            <div className="my-auto basis-1/4">
              <img
                className="mx-auto w-40"
                src={thisProductCartPage.images[0]}
                alt=""
              />
            </div>
            <div className="my-auto ml-5 basis-3/4">
              <Link
                onClick={() => dispatch(cartSlice.toggleVisibility(false))}
                to={`/products/${thisProductCartPage.uuid}`}
              >
                {thisProductCartPage.name}
              </Link>
              <p className="mt-2">Size: {props.size}</p>
              <p className="mt-2">Unit Price: ${thisProductCartPage.price}</p>
            </div>
          </div>
        </div>
        <div className="grid basis-3/12 place-content-center text-center">
          <div className="flex flex-row border border-gray-300 py-3">
            <div
              className="basis-1/3 hover:cursor-pointer"
              onClick={() => handleDecrement(props.productId, props.size)}
            >
              –
            </div>
            <div className="basis-1/3">
              <input
                className="w-full text-center outline-none"
                type="number"
                value={props.quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <div
              className="basis-1/3 hover:cursor-pointer"
              onClick={() => handleIncrement(props.productId, props.size)}
            >
              +
            </div>
          </div>
          <button
            className="mt-5 underline underline-offset-4 hover:cursor-pointer hover:no-underline"
            onClick={() => handleRemove(props.productId, props.size)}
          >
            Remove
          </button>
        </div>
        <div className="flex basis-3/12 items-center justify-end">
          <p>${thisProductCartPage.price * props.quantity}</p>
        </div>
      </div>
      <QuantityWarningModal
        isShown={showMaxQuantityMessage}
        onClose={() => setShowMaxQuantityMessage(false)}
      />
    </>
  );
}

export default ProductCartPage;
