import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  imageOne: string;
  imageTwo: string;
  name: string;
  size: [];
  price: number;
};

function ProductCard(props: Props) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className="relative flex w-fit flex-col items-center text-center"
    >
      {!isShown && <img src={props.imageOne} className="block w-60" alt="" />}
      {isShown && (
        <Link
          to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
        >
          <img src={props.imageTwo} className="block w-60" alt="" />
        </Link>
      )}
      <Link to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}>
        <p className="mb-5 text-sm font-light uppercase text-neutral-800">
          {props.name}
        </p>
      </Link>
      {!isShown && (
        <p className="font-light uppercase text-neutral-500">
          ${props.price} usd
        </p>
      )}
      {isShown && (
        <div className="absolute bottom-0 left-0 flex gap-2">
          {props.size.map((eachSize: any) => (
            <Link to="/">
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
