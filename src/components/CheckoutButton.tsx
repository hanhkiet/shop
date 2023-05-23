import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function CheckoutButton() {
  const products = useSelector((state: RootState) => state.product.products);
  const items = useSelector((state: RootState) => state.cart.items);

  if (!products || !items) return <></>;

  const totalPrice = items.reduce((total, item) => {
    const product = products.find(p => p.uuid === item.id);

    if (product && product.price) {
      return total + item.quantity * product.price;
    } else {
      return total;
    }
  }, 0);

  return (
    <button className="relative mt-5 h-12 w-full bg-black text-white">
      <div className="flex flex-row align-top">
        <div className="basis-2/5 text-right">Checkout</div>
        <div className="relative basis-1/5 text-center leading-none">
          <div className="align-top">.</div>
        </div>
        <div className="basis-2/5 text-left">${totalPrice} USD</div>
      </div>
    </button>
  );
}

export default CheckoutButton;
