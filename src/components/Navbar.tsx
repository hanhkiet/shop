import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import CartContent from './CartContent';
import MegaMenu from './MegaMenu';
import Modal from './Modal';
import ScrollToTop from './ScrollToTop';
import { toggleVisibility } from '../app/cartSlice';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const visible = useSelector((state: RootState) => state.cart.visible);
  const location = useLocation();
  const dispatch = useDispatch();
  function handleCartAppear() {
    dispatch(toggleVisibility());
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setChangeNavbarColor(true);
      } else {
        setChangeNavbarColor(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      onMouseLeave={() => {
        setShowShopMenu(false);
        setShowExploreMenu(false);
      }}
    >
      <nav
        className={`top-0 left-0 right-0 z-40 flex justify-between px-6 py-6 text-sm font-light duration-300 ${showShopMenu ||
          showExploreMenu ||
          changeNavbarColor ||
          location.pathname != '/'
          ? 'bg-white text-neutral-600'
          : 'text-white'
          } ${location.pathname == '/' ? 'fixed' : 'sticky'
          } hover:bg-white hover:text-neutral-600`}
        onMouseOver={() => setHoverNavbar(true)}
        onMouseLeave={() => setHoverNavbar(false)}
      >
        {/* Left navbar */}
        <ul className="flex w-1/6 items-center justify-start gap-6 uppercase md:hidden lg:hidden">
          <li>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png"
              onClick={() => { setShowMenu(true) }}
              className={`mx-auto h-4 cursor-pointer duration-300 ${changeNavbarColor ||
                location.pathname != '/' ||
                hoverNavbar ||
                showShopMenu ||
                showExploreMenu
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
        </ul>
        <ul className="hidden w-1/6 items-center justify-start gap-12 px-6 uppercase md:flex lg:flex">
          <li
            className="hover:cursor-pointer hover:underline"
            onMouseOver={() => {
              setShowShopMenu(true);
              setShowExploreMenu(false);
            }}
          >
            <Link to="/category">shop</Link>
          </li>
          <li
            className="hover:underline"
            onMouseOver={() => {
              setShowShopMenu(false);
              setShowExploreMenu(false);
            }}
          >
            <Link to="/kits">kits</Link>
          </li>
          <li
            className="hover:cursor-pointer hover:underline"
            onMouseOver={() => {
              setShowShopMenu(false);
              setShowExploreMenu(true);
            }}
          >
            <Link to="/explore">explore</Link>
          </li>
        </ul>
        <div className="flex w-8/12 items-center justify-center">
          <Link to="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
              className={`mx-auto h-5 duration-300 ${showShopMenu ||
                showExploreMenu ||
                changeNavbarColor ||
                hoverNavbar ||
                location.pathname != '/'
                ? ''
                : 'brightness-200'
                }`}
              alt=""
            />
          </Link>
        </div>

        {/* Right navbar */}
        <ul className="flex w-1/6 items-center justify-start gap-6 uppercase md:hidden lg:hidden">
          <li>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
              className={`mx-auto h-4 cursor-pointer duration-300 ${changeNavbarColor || location.pathname != '/' || hoverNavbar
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
          <li>
            <img
              onClick={handleCartAppear}
              alt=""
              src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png"
              className={`mx-auto h-4 cursor-pointer duration-300 ${changeNavbarColor || location.pathname != '/' || hoverNavbar
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
        </ul>
        <ul className="hidden w-1/6 items-center justify-end gap-12 px-6 font-light md:flex lg:flex">
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
      </nav>

      {visible && (
        <Modal className="w-1/6" onClose={handleCartAppear}>
          <CartContent />
        </Modal>
      )}
      {changeNavbarColor && <ScrollToTop />}
      <MegaMenu
        className={showShopMenu ? 'visible opacity-100' : 'collapse'}
        itemMenuType="header-shop"
      />
      <MegaMenu
        className={showExploreMenu ? 'visible opacity-100' : 'collapse'}
        itemMenuType="header-explore"
      />
    </header>
  );
}
export default Navbar;
