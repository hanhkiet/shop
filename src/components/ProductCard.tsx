import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ItemsInStore } from '../app/types';
import Size from './Size';

type Props = {
  id: string;
  imageOne: string;
  imageTwo: string;
  className?: string;
  name: string;
  price: number;
  onClick?: () => void;
};

function ProductCard(props: Props) {
  const [isShown, setIsShown] = useState(false);
  const productQuantity = useSelector(
    (state: RootState) => state.productQuantity.productQuantity,
  );
  const thisProductQuantity = productQuantity.filter(
    (prod: ItemsInStore) => prod.productUuid === props.id,
  );
  const hasSale = true;
  const isSoldOut = thisProductQuantity.every(
    (product: ItemsInStore) => product.quantity === 0,
  );
  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={`relative m-5 flex flex-col items-center text-center ${props.className}`}
    >
      <Link to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}>
        <div className="relative">
          <img
            src={props.imageOne}
            className={`absolute block ${
              !isShown ? `visible opacity-100` : `collapse opacity-0`
            } duration-300`}
            alt=""
          />
          <img
            src={props.imageTwo}
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
