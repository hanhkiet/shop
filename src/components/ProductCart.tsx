import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as cartSlice from '../app/cartSlice';
import { ItemsInStore } from '../app/types';

type Props = {
  productId: string;
  size: string;
  quantity: number;
  className?: string;
};

export default function ProductCart(props: Props) {
  const products = useSelector(
    (state: RootState) => state.product.products,
  ).filter(item => item.uuid == props.productId)[0];
  const productQuantity = useSelector(
    (state: RootState) => state.productQuantity.productQuantity,
  );
  const thisProductQuantity = productQuantity.filter(
    (prod: ItemsInStore) => prod.productUuid === props.productId,
  );
  const thisProductQuantitySize = thisProductQuantity.find(
    (prod: ItemsInStore) => prod.size === props.size,
  )!;
  const dispatch = useDispatch();
  const handleRemove = (productId: string, size: string) => {
    dispatch(cartSlice.removeItem({ productId, size }));
  };
  const handleIncrement = (productId: string, size: string) => {
    if (thisProductQuantitySize.quantity > props.quantity) {
      dispatch(cartSlice.incrementQuantity({ productId, size }));
    }
  };
  const handleDecrement = (productId: string, size: string) => {
    dispatch(cartSlice.decrementQuantity({ productId, size }));
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value);
    if (!newQuantity || newQuantity <= 0) {
      newQuantity = 1;
    }
    if (thisProductQuantitySize.quantity < newQuantity) {
      newQuantity = thisProductQuantitySize.quantity;
    }
    dispatch(
      cartSlice.setQuantity({
        productId: props.productId,
        size: props.size,
        quantity: newQuantity,
      }),
    );
  };
  if (!products) return <></>;
  return (
    <div className={`m-5 flex flex-row ${props.className}`}>
      <div className="my-auto basis-1/4">
        <img className="mx-auto w-40" src={products.images[0]} alt="" />
      </div>
      <div className="my-auto ml-5 basis-3/4">
        <Link
          onClick={() => {
            dispatch(cartSlice.toggleVisibility(false));
            dispatch(cartSlice.setSizeCartItemChosen(props.size));
          }}
          to={`/products/${products.uuid}`}
        >
          {products.name}
        </Link>
        <p className="mt-2">Size: {props.size}</p>
        <p className="mt-2">Unit Price: ${products.price}</p>
        <div className="mt-5 flex flex-row">
          <div className="m-auto basis-1/2 border border-neutral-500 text-center">
            <div className="flex flex-row">
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
          </div>
          <div className="m-auto basis-1/2 text-center">
            <button
              className="underline underline-offset-4 hover:cursor-pointer hover:no-underline"
              onClick={() => handleRemove(props.productId, props.size)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
