import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Catalog } from '../app/types';
import Size from './Size';

type Props = {
  id: string;
  imageOne: string;
  imageTwo?: string;
  className?: string;
  name: string;
  price: number;
  catalogs: Catalog[];
  onClick?: () => void;
};

function ProductCard(props: Props) {
  const [isShown, setIsShown] = useState(false);
  const hasSale = false;
  const isSoldOut = props.catalogs.every(
    (product: Catalog) => product.quantity === 0,
  );
  return (
    <div
      className={`relative m-5 flex flex-col items-center text-center ${props.className}`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Link to={`/products/${props.id}`}>
        <div className="relative grid place-items-center">
          <img
            src={props.imageOne}
            className={`absolute block ${
              !isShown ? `visible opacity-100` : `collapse opacity-0`
            } duration-300`}
            alt=""
          />
          <img
            onClick={props.onClick}
            src={props.imageTwo || props.imageOne}
            className={`relative top-0 block ${
              isShown ? `visible opacity-100` : `collapse opacity-0`
            } duration-300`}
            alt=""
          />
          {(hasSale || isSoldOut) && (
            <div
              className={`absolute top-0 left-0 mt-2 ml-2 rounded-md bg-gray-100 px-4 py-1 font-[ASRV-Standard] text-xs text-gray-500`}
            >
              {isSoldOut ? 'SOLD OUT' : 'SALE'}
            </div>
          )}
        </div>
      </Link>

      <Link
        className="mb-5 h-8 text-sm font-light uppercase text-neutral-800"
        to={`/products/${props.id}`}
        onClick={props.onClick}
      >
        {props.name}
      </Link>
      {!isShown && (
        <p className="font-light uppercase text-neutral-500">
          ${props.price} usd
        </p>
      )}
      {isShown && (
        <>
          {props.catalogs.length > 0 ? (
            <Size id={props.id} catalogs={props.catalogs} />
          ) : (
            <p className="font-light uppercase text-neutral-500">
              ${props.price} usd
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ProductCard;
