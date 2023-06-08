import { addItem, toggleVisibility } from '../app/cartSlice';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { Catalog } from '../app/types';
import { useState } from 'react';
import QuantityWarningModal from '../modals/QuantityWarningModal';

type Props = {
  id: string;
  className?: string;
  catalogs: Catalog[];
};

function Size(props: Props) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const [showMaxQuantityMessage, setShowMaxQuantityMessage] = useState(false);
  const handleAddToCart = (size: string) => {
    dispatch(
      addItem({
        id: props.id,
        size: size,
      }),
    );
    dispatch(toggleVisibility(true));
  };
  return (
    <>
      <div className={`flex h-6 gap-2 ${props.className}`}>
        {props.catalogs.map((item: Catalog, index) => (
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
      <QuantityWarningModal
        isShown={showMaxQuantityMessage}
        onClose={() => setShowMaxQuantityMessage(false)}
      />
    </>
  );
}

export default Size;
