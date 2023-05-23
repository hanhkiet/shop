import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleVisibility } from '../app/cartSlice';
import { setHoverMenuId } from '../app/menuSlice';
import ModalNavbar from '../modals/ModalNavbar';
import AdminModalContent from './AdminModalContent';

type Props = {
  className?: string;
  changeColor: boolean;
  onClick: () => void;
  onClose: () => void;
};

function NavbarRightAdmin(props: Props) {
  const visible = useSelector((state: RootState) => state.cart.visible);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const handleCartAppear = () => {
    dispatch(toggleVisibility(true));
    dispatch(setHoverMenuId(0));
  };
  const dataItem = [
    {
      name: 'account',
      url: '/admin',
    },
    {
      name: 'logout',
      url: '/',
    },
  ];
  return (
    <>
      <ul
        className={`flex w-1/6 items-center justify-end gap-6 uppercase md:flex lg:hidden ${props.className}`}
      >
        <li>
          <img
            onClick={() => {
              handleCartAppear();
              props.onClick();
            }}
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/7542/7542245.png"
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? `` : `grayscale invert`
            }`}
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-end gap-12 px-6 font-light duration-300 md:hidden lg:flex ${
          props.className
        } ${props.changeColor ? `text-neutral-600` : `text-white`}`}
      >
        <li className="capitalize">
          <Link to="/admin">account</Link>
        </li>
        <li className="navbar-list capitalize hover:cursor-pointer">
          <Link to="/">Logout</Link>
        </li>
      </ul>
      <ModalNavbar
        isRight
        isShown={visible}
        className={`flex justify-end ${
          visible ? `visible` : `collapse`
        } duration-500`}
        onClose={() => {
          dispatch(toggleVisibility(false));
          dispatch(setHoverMenuId(0));
          props.onClose();
        }}
      >
        <AdminModalContent
          name="Admin"
          dataItem={dataItem}
          onClose={props.onClose}
        />
      </ModalNavbar>
    </>
  );
}

export default NavbarRightAdmin;
