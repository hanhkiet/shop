import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartItem } from '../app/types';
import ProductCardCheckout from './ProductCardCheckout';

function OrderSummarySection() {
  const products = useSelector((state: RootState) => state.product.products);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = items.reduce((total, item) => {
    const product = products.find(p => p.uuid === item.id);

    if (product && product.price) {
      return total + item.quantity * product.price;
    } else {
      return total;
    }
  }, 0);
  const subtotalPrice = 50;
  const shippingPrice = 50;

  return (
    <div className="static top-0 right-0 order-1 grid h-full basis-1/3 flex-col place-content-center gap-4 bg-neutral-100 p-6 lg:fixed lg:h-screen">
      <div className="flex flex-col gap-3">
        {items
          .slice(0)
          .reverse()
          .map((item: CartItem, index) => (
            <ProductCardCheckout
              key={index}
              productId={item.id}
              quantity={item.quantity}
              size={item.size}
            />
          ))}
      </div>
      <div className="grid w-full max-w-md border-t border-neutral-300 pt-3">
        <div className="flex justify-between">
          <p className="text-md">Subtotal</p>
          <p>${subtotalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-md">Shipping</p>
          <p>${shippingPrice}</p>
        </div>
      </div>
      <div className="flex w-full max-w-md justify-between border-t border-neutral-300 py-3">
        <p className="text-md">Total</p>
        <p>${totalPrice + subtotalPrice + shippingPrice}</p>
      </div>
    </div>
  );
}

export default OrderSummarySection;
