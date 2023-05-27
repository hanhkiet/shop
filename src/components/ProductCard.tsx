import { useState } from 'react';
import { Link } from 'react-router-dom';
import Size from './Size';

type Props = {
  id: string;
  imageOne: string;
  imageTwo: string;
  name: string;
  price: number;
  onClick?: () => void;
};

function ProductCard(props: Props) {
  const [isShown, setIsShown] = useState(false);
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
      {isShown && <Size id={props.id} />}
    </div>
  );
}

export default ProductCard;
