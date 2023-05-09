import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCart from './ProductCart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setNote } from '../app/orderSlice';
import CheckoutButton from './CheckoutButton';
import { toggleVisibility } from '../app/cartSlice';

function CartContent() {
  const items = useSelector((state: RootState) => state.cart.items);
  const notes = useSelector((state: RootState) => state.order.note);

  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const dispatch = useDispatch();
  function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    dispatch(setNote(newNote));
  }
  function handleCartAppear() {
    dispatch(toggleVisibility());
  }
  const [showNote, setShowNote] = useState(false);

  return (
    <>
      <div className="mt-1 border-b-[2px] border-neutral-300">
        <div className="mx-5 flex h-16 justify-between">
          <div className="text-1xl grid content-center font-light">
            Cart ({totalQuantity})
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
                .map((item, index) => (
                  <li key={index}>
                    <ProductCart
                      productId={item.product.id}
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

      {showNote && (
        <>
          <div className="absolute bottom-0 right-0 z-50 w-full">
            <div className="h-[calc(100vh-250px)] bg-white opacity-50"></div>
            <div className="h-[250px] border-t-[2px] border-neutral-500 bg-white">
              <div className="m-5">
                <div className="mb-5 flex justify-between">
                  <div className="text-1xl grid content-center font-light">
                    Edit Order Note
                  </div>
                  <img
                    onClick={() => setShowNote(false)}
                    className="my-auto h-3 hover:cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                    alt=""
                  />
                </div>
                <textarea
                  placeholder="Write your order note..."
                  value={notes}
                  onChange={handleNoteChange}
                  className="h-24 w-full resize-none border-[2px] border-neutral-500 p-3 focus:outline-none"
                ></textarea>
                <CheckoutButton />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CartContent;
