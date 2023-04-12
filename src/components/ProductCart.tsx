import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCart(props: any) {
  const [productCount, setProductCount] = useState(1);

  if (!productCount || productCount > 999) {
    setProductCount(1);
  }

  return (
    <>
      <div key={props.productId} className="m-5 flex flex-row">
        <div className="my-auto basis-1/4">
          <img className="mx-auto w-40" src={props.image} alt="" />
        </div>
        <div className="my-auto ml-5 basis-3/4">
          <Link
            to={`/products/${props.name.replace(/\W+/gi, '-').toLowerCase()}`}
          >
            {props.name}
          </Link>
          <p className="mt-2">{props.size}</p>
          <p className="mt-2">${props.price}</p>
          <div className="mt-5 flex flex-row">
            <div className="m-auto basis-1/2 border-[1px] border-neutral-500 text-center">
              <div className="flex flex-row">
                <div
                  className="basis-1/3 hover:cursor-pointer"
                  onClick={() => setProductCount(productCount - 1)}
                >
                  –
                </div>
                <div className="basis-1/3">
                  <input
                    className="w-full text-center outline-none"
                    type="number"
                    value={productCount}
                    onChange={e => setProductCount(e.target.valueAsNumber)}
                    min="1"
                  />
                </div>
                <div
                  className="basis-1/3 hover:cursor-pointer"
                  onClick={() => setProductCount(productCount + 1)}
                >
                  +
                </div>
              </div>
            </div>
            <div className="m-auto basis-1/2 text-center">
              <span className="underline underline-offset-4 hover:cursor-pointer hover:no-underline ">
                Remove
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
