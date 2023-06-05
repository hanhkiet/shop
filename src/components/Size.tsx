import { useDispatch, useSelector } from 'react-redux';
import { addItem, toggleVisibility } from '../app/cartSlice';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem, ItemsInStore, ProductQuantityState } from '../app/types';
import { addItem } from '../app/cartSlice';
import { toggleVisibility } from '../app/cartSlice';
import { useState } from 'react';
import QuantityWarningModal from '../modals/QuantityWarningModal';

type Props = {
  id: string;
  className?: string;
};

function Size(props: Props) {
  const dispatch = useDispatch();
  const productQuantity = useSelector(
    (state: RootState) => state.productQuantity.productQuantity,
  );
  const thisProductQuantity = productQuantity.filter(
    (prod: ItemsInStore) => prod.productUuid === props.id,
  );
  const items = useSelector((state: RootState) => state.cart.items);
  const [showMaxQuantityMessage, setShowMaxQuantityMessage] = useState(false);
  const handleAddToCart = (size: string) => {
    const thisProductQuantitySize = thisProductQuantity.find(
      (prod: ItemsInStore) => prod.size === size,
    );
    const itemByIdAndSize = items.filter(
      (prod: CartItem) => prod.size === size && prod.id === props.id,
    )[0];
    if(!itemByIdAndSize || !thisProductQuantitySize || itemByIdAndSize.quantity < thisProductQuantitySize.quantity) {
      dispatch(
        addItem({
          id: props.id,
          size: size,
        }),
      );
      dispatch(toggleVisibility(true));
    }
    else {
      setShowMaxQuantityMessage(true);
    }
  };
  return (
    <>
      <div className={`flex gap-2 h-6 ${props.className}`}>
        {thisProductQuantity.map((item: ItemsInStore, index) => (
          <button
            key={index}
            className={`w-8 ${
              item.quantity > 0
                ? `cursor-pointer opacity-100`
                : `cursor-not-allowed opacity-50`
            } border border-solid border-neutral-300 text-center text-xs transition-colors hover:border-neutral-600`}
            onClick={() => {
              if (item.quantity > 0) {
                handleAddToCart(item.size);
              }
            }}
          >
            {item.size}
          </button>
        ))}
      </div>
      <QuantityWarningModal isShown={showMaxQuantityMessage} onClose={() => setShowMaxQuantityMessage(false)} />
    </>
  );
}

export default Size;
