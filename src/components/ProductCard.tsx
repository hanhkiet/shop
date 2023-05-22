import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../app/cartSlice';
import { RootState } from '../app/store';
import { toggleVisibility } from '../app/cartSlice';

type Props = {
  id: number;
  imageOne: string;
  imageTwo: string;
  name: string;
  size: [];
  price: number;
  onClick?: any;
};

function ProductCard(props: Props) {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const handleCartAppear = () => {
    dispatch(toggleVisibility());
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
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className="relative flex flex-col items-center text-center"
    >
      {!isShown && <img src={props.imageOne} className="block w-60" alt="" />}
      {isShown && (
        <Link
          to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
        >
          <img src={props.imageTwo} className="block w-60" alt="" />
        </Link>
      )}
      <Link
        className="mb-5 text-sm font-light uppercase text-neutral-800"
        to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
      >
        {props.name}
      </Link>
      {!isShown && (
        <p className="font-light uppercase text-neutral-500">
          ${props.price} usd
        </p>
      )}
      {isShown && (
        <div className="flex gap-2">
          {props.size.map((eachSize: any, index) => (
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
      )}
    </div>
  );
}

export default ProductCard;
