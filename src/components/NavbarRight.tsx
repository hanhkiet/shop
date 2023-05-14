import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleVisibility } from '../app/cartSlice';
import Modal from './Modal';
import CartContent from './CartContent';

type Props = {
  className?: string;
  changeColor: boolean;
};

function NavbarRight(props: Props) {
  const visible = useSelector((state: RootState) => state.cart.visible);
  const dispatch = useDispatch();
  function handleCartAppear() {
    dispatch(toggleVisibility());
  }
  return (
    <>
      <ul
        className={`flex w-1/6 items-center justify-start gap-6 uppercase md:flex lg:hidden ${props.className}`}
      >
        <li>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? `` : `grayscale invert`
            }`}
          />
        </li>
        <li>
          <img
            onClick={handleCartAppear}
            alt=""
            src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png"
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? `` : `grayscale invert`
            }`}
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-end gap-12 px-6 font-light md:hidden lg:flex ${props.className}`}
      >
        <li className="capitalize">
          <Link to="/account">account</Link>
        </li>
        <li className="capitalize hover:cursor-pointer">search</li>
        <li>
          <button className="capitalize" onClick={handleCartAppear}>
            cart
          </button>
        </li>
      </ul>
      {visible && (
        <Modal className="w-1/6" onClose={handleCartAppear}>
          <CartContent />
        </Modal>
      )}
    </>
  );
}

export default NavbarRight;
