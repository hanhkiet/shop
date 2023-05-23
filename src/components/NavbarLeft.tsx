import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setHoverMenuId } from '../app/menuSlice';
import MenuDropDown from './MenuDropdown';
import MegaMenu from './MegaMenu';
import ModalNavbar from '../modals/ModalNavbar';
import { Menu } from '../app/types';

type Props = {
  className?: string;
  changeColorFirst: boolean;
  changeColor: boolean;
  onClick: () => void;
  onClose: () => void;
};

export default function NavbarLeft(props: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menus = useSelector((state: RootState) => state.menu.menus);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const hoverMenuId = useSelector((state: RootState) => state.menu.hoverMenuId);
  const dispatch: AppDispatch = useDispatch();
  const API_MENUS_URL = import.meta.env.VITE_MENUS_API_URL;
  const checkMenu = showShopMenu && hoverMenuId !== 0;
  const handleDisappearMenu = () => {
    setShowMenu(false);
    props.onClose();
  };
  useEffect(() => {}, []);
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
        {menus.map((item: Menu, index: any) => (
          <li key={index}>
            <div className={`navbar-list z-50`}>
              <Link
                onMouseOver={() => {
                  setShowShopMenu(item.megaMenus.length > 0);
                  if (hoverMenuId != item.id) {
                    dispatch(setHoverMenuId(0));
                    setTimeout(() => {
                      dispatch(setHoverMenuId(item.id));
                    }, 100);
                  } else {
                    dispatch(setHoverMenuId(item.id));
                  }
                }}
                to="/"
              >
                {item.name}
              </Link>
            </div>
            <div
              className={`relative left-0 bottom-0.5 z-50 bg-black py-px duration-300 ${
                hoverMenuId === item.id && props.changeColorFirst
                  ? `visible w-full`
                  : `collapse w-0`
              }`}
            ></div>
          </li>
        ))}
      </ul>
      <ModalNavbar
        isShown={showMenu}
        className={`${showMenu ? `visible` : `collapse`} duration-500`}
        onClose={handleDisappearMenu}
      >
        <MenuDropDown onClickClose={handleDisappearMenu} />
      </ModalNavbar>
      {
        <MegaMenu
          menuId={hoverMenuId}
          className={
            checkMenu && props.changeColorFirst
              ? `visible opacity-100`
              : `collapse opacity-0`
          }
        />
      }
    </>
  );
}
