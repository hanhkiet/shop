import { useState } from 'react';
import { Link } from 'react-router-dom';
function Product(props: any) {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <div
        onClick={props.onClick || ''}
        key={props.productId}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="m-10 mx-auto w-fit text-center"
      >
        {!isShown && <img src={props.imageOne} className="mx-auto h-96 w-96" />}
        {isShown && (
          <Link
            to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
          >
            <img src={props.imageTwo} className="mx-auto h-96 w-96" />
          </Link>
        )}
        <Link
          to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
        >
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
          <Link to="/">
            {props.size.map((eachSize: any) => (
              <span
                key={eachSize}
                className="mx-1 border-2 border-solid border-indigo-500 px-5 hover:border-indigo-900"
              >
                {eachSize}
              </span>
            ))}
          </Link>
        )}
      </div>
    </>
  );
}

export default Product;
