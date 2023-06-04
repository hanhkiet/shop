import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { ItemsInStore } from '../app/types';
import { addItem } from '../app/cartSlice';
import { toggleVisibility } from '../app/cartSlice';

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
  const handleCartAppear = () => {
    dispatch(toggleVisibility(true));
  };
  const handleAddToCart = (size: string) => {
    dispatch(
      addItem({
        id: props.id,
        size: size,
      }),
    );
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
                handleCartAppear();
              }
            }}
          >
            {item.size}
          </button>
        ))}
      </div>
    </>
  );
}

export default Size;
