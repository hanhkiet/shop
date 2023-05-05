import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function CheckoutButton() {
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = items.reduce((total, item) => {
        return total + item.quantity * item.product.price;
    }, 0);

    return (
        <Link to="/checkout">
            <button className="relative mt-5 h-12 w-full bg-black text-white">
                <div className="flex flex-row align-top">
                    <div className="basis-2/5 text-right">Checkout</div>
                    <div className="relative basis-1/5 text-center leading-none">
                        <div className="align-top">.</div>
                    </div>
                    <div className="basis-2/5 text-left">${totalPrice} USD</div>
                </div>
            </button>
        </Link>
    );
}

export default CheckoutButton;
