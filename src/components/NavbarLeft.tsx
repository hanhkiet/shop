import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHoverMenuId } from '../app/collectionSlice';
import { AppDispatch, RootState } from '../app/store';
import { Collection, CollectionType } from '../app/types';
import ModalNavbar from '../modals/ModalNavbar';
import MegaMenu from './MegaMenu';
import MenuDropDown from './MenuDropdown';

type Props = {
  className?: string;
  changeColorFirst: boolean;
  changeColor: boolean;
  onClick: () => void;
  onClose: () => void;
  saleAppear: boolean;
};

export default function NavbarLeft(props: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  const [showShopMenu, setShowShopMenu] = useState(false);
  const hoverMenuId = useSelector(
    (state: RootState) => state.collection.hoverMenuId,
  );
  const dispatch: AppDispatch = useDispatch();
  const checkMenu = showShopMenu && hoverMenuId !== -1;
  const handleDisappearMenu = () => {
    setShowMenu(false);
    props.onClose();
  };
  const arrMenu = ['FEATURED', 'TOPS', 'BOTTOMS'] as CollectionType[];
  if (collections.length === 0) return <></>;
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
        {arrMenu.map((item: CollectionType, index) => (
          <li key={index}>
            <div className={`navbar-list z-50`}>
              <Link
                onMouseOver={() => {
                  setShowShopMenu(true);
                  if (hoverMenuId != arrMenu.indexOf(item)) {
                    setTimeout(() => {
                      dispatch(setHoverMenuId(arrMenu.indexOf(item)));
                    }, 100);
                  }
                }}
                to={`/collections/${collections
                  .filter((item: Collection) => item.type === arrMenu[index])[0]
                  .name.replace(/\W+/gi, '-')
                  .toLowerCase()}`}
              >
                {item}
              </Link>
            </div>
            <div
              className={`relative left-0 bottom-0.5 z-50 bg-black py-px duration-300 ${
                hoverMenuId === arrMenu.indexOf(item) && props.changeColorFirst
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
          type={arrMenu[hoverMenuId]}
          saleAppear={props.saleAppear}
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
