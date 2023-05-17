import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setHoverMenuId } from '../app/menuSlice';
import MenuDropDown from './MenuDropdown';
import Modal from './Modal';
import MegaMenu from './MegaMenu';

type Props = {
  className?: string;
  changeColor: boolean;
  onClose: () => void;
};

export default function NavbarLeft(props: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [megaMenuData, setMegaMenuData] = useState([]);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const hoverMenuId = useSelector((state: RootState) => state.menu.hoverMenuId);
  const dispatch = useDispatch();
  const API_MENUS_URL = import.meta.env.VITE_MENUS_API_URL;
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  const handleDisappearMenu = () => {
    setShowMenu(false);
    props.onClose();
  };
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setMegaMenuData(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(API_MENUS_URL).then(response => {
      setMenuData(response.data);
    });
  }, []);
  return (
    <>
      <ul className="flex w-1/6 items-center justify-start gap-6 uppercase md:flex lg:hidden">
        <li>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png"
            onClick={() => {
              setShowMenu(true);
            }}
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? '' : 'grayscale invert'
            }`}
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-start gap-12 px-6 uppercase md:hidden lg:flex ${
          props.changeColor ? `text-neutral-600` : `text-white`
        }`}
      >
        {menuData.map((item: any, index: any) => (
          <li
            key={index}
            className="hover:cursor-pointer hover:underline"
            onMouseOver={() => {
              setShowShopMenu(
                megaMenuData.some((obj: any) => obj.menuId === item.id),
              );
              dispatch(setHoverMenuId(item.id));
            }}
          >
            <Link
              to={item.url}
              className="hover:cursor-pointer hover:underline"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {showMenu && (
        <Modal onClose={handleDisappearMenu}>
          <MenuDropDown onClickClose={handleDisappearMenu} />
        </Modal>
      )}
      {
        <MegaMenu
          menuId={hoverMenuId}
          className={
            showShopMenu && hoverMenuId !== 0
              ? `visible opacity-100`
              : `collapse`
          }
        />
      }
    </>
  );
}
