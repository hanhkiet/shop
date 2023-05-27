import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../app/cartSlice';
import { toggleVisibility } from '../app/cartSlice';

type Props = {
  id: string;
  className?: string;
};

function Size(props: Props) {
  const sizes = useSelector((state: RootState) => state.product.sizes);
  const dispatch = useDispatch();
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
    <div className={`flex gap-2 ${props.className}`}>
      {sizes.map((eachSize: string, index) => (
        <Link
          to=""
          key={index}
          onClick={() => {
            handleAddToCart(eachSize);
            handleCartAppear();
          }}
        >
          <span
            key={eachSize}
            className="border border-solid border-neutral-300 px-3 text-xs transition-colors hover:border-neutral-600"
          >
            {eachSize}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Size;
