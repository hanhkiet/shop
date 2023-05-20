import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleVisibility } from '../app/cartSlice';
import CheckoutButton from './CheckoutButton';
import OrderNote from './OrderNote';
import ProductCart from './ProductCart';

type Props = {
  onClose: () => void;
};

function CartContent(props: Props) {
  const items = useSelector((state: RootState) => state.cart.items);
  const notes = useSelector((state: RootState) => state.order.note);
  const dispatch = useDispatch();
  function handleCartAppear() {
    dispatch(toggleVisibility());
    props.onClose();
  }
  const [showNote, setShowNote] = useState(false);
  return (
    <>
      <div className="mt-1 border-b-[2px] border-neutral-300">
        <div className="mx-5 flex h-16 justify-between">
          <div className="text-1xl grid content-center font-light capitalize">
            Cart
          </div>
          <img
            onClick={handleCartAppear}
            className="my-auto h-3 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
            alt=""
          />
        </div>
      </div>
      {items.length <= 0 ? (
        <div className="m-auto flex h-[85%] w-max items-center text-center">
          <p className="font-light">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="productCartList h-[calc(100vh-80px-140px)] overflow-y-auto">
            <ul>
              {items
                .slice(0)
                .reverse()
                .map((item: any, index) => (
                  <li key={index}>
                    <ProductCart
                      productId={item.id}
                      quantity={item.quantity}
                      size={item.size}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="absolute bottom-0 right-0 z-50 h-[150px] w-full border-t-[2px] border-neutral-500 bg-white">
            <div className="m-5">
              <p
                onClick={() => setShowNote(true)}
                className="underline hover:cursor-pointer"
              >
                {notes.trim() != '' ? 'Edit Order Note' : 'Add Order Note'}
              </p>
              <p className="text-xs">Shipping, taxes calculated at checkout</p>
              <CheckoutButton />
            </div>
          </div>
        </>
      )}
      {showNote && <OrderNote onClickCloseNote={() => setShowNote(false)} />}
    </>
  );
}

export default CartContent;
