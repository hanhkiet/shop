import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setHoverMenuId } from '../app/menuSlice';
import MenuDropDown from './MenuDropdown';
import MegaMenu from './MegaMenu';
import ModalNavbar from '../modals/ModalNavbar';

type Props = {
  className?: string;
  changeColor: boolean;
  onClick: () => void;
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
  const checkMenu = showShopMenu && hoverMenuId !== 0;
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
        <li className="navbar-list">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png"
            onClick={() => {
              setShowMenu(true);
              props.onClick();
            }}
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? '' : 'grayscale invert'
            }`}
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-start gap-12 px-6 uppercase duration-300 md:hidden lg:flex ${
          props.changeColor ? `text-neutral-600` : `text-white`
        }`}
      >
        {menuData.map((item: any, index: any) => (
          <li key={index}>
            <div className={`navbar-list z-50`}>
              <Link
                onMouseOver={() => {
                  setShowShopMenu(
                    megaMenuData.some((obj: any) => obj.menuId === item.id),
                  );
                  dispatch(setHoverMenuId(item.id));
                }}
                to={item.url}
              >
                {item.name}
              </Link>
            </div>
            <div
              className={`relative left-0 top-[1.5px] z-50 bg-black py-px duration-300 ${
                hoverMenuId === item.id && props.changeColor
                  ? `visible w-full`
                  : `collapse w-0`
              }`}
            ></div>
          </li>
        ))}
      </ul>
      {showMenu && (
        <ModalNavbar onClose={handleDisappearMenu}>
          <MenuDropDown onClickClose={handleDisappearMenu} />
        </ModalNavbar>
      )}
      {
        <MegaMenu
          menuId={hoverMenuId}
          className={
            checkMenu && props.changeColor
              ? `visible opacity-100`
              : `collapse opacity-0`
          }
        />
      }
    </>
  );
}
