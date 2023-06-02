import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ItemsInStore } from '../app/types';

type Props = {
  productId: string;
  size: string;
  quantity: number;
  className?: string;
};

function ProductCardCheckout(props: Props) {
  const product = useSelector(
    (state: RootState) => state.product.products,
  ).filter(item => item.uuid == props.productId)[0];
  if (!product) return <></>;
  return (
    <div className={`flex max-w-md items-center gap-4 ${props.className}`}>
      <div className="relative">
        <img className="w-24 rounded" src={product.images[0]} alt="" />
        <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-900 text-center text-xs">
          <div className="grid h-5 w-5 place-items-center text-center text-xs text-white">
            {props.quantity}
          </div>
        </div>
      </div>
      <div className="basis-full">
        <p className="text-md">{product.name}</p>
        <p className="text-xs">Size: {props.size}</p>
      </div>
      <div>${product.price * props.quantity}</div>
    </div>
  );
}

export default ProductCardCheckout;
