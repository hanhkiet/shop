import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartContent from './CartContent';
import Modal from './Modal';
import ScrollToTop from './ScrollToTop';

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const isModalOpen = showCart;
  const location = useLocation();
  console.log(location.pathname);
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
    <>
      <nav
        className={`top-0 left-0 right-0 z-40 flex justify-between px-6 py-6 text-sm font-light duration-300 ${
          changeNavbarColor || location.pathname != '/'
            ? 'bg-white text-neutral-600'
            : 'text-white'
        } ${
          location.pathname == '/' ? 'fixed' : 'sticky'
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
              className={`mx-auto h-4 cursor-pointer duration-300 ${
                changeNavbarColor || location.pathname != '/' || hoverNavbar
                  ? ''
                  : 'grayscale invert'
              }`}
            />
          </li>
        </ul>
        <ul className="hidden w-1/6 items-center justify-start gap-12 px-6 uppercase md:flex lg:flex">
          <li>
            <Link to="/category">shop</Link>
          </li>
          <li>
            <Link to="/kits">kits</Link>
          </li>
          <li>
            <Link to="/explore">explore</Link>
          </li>
        </ul>
        <div className="flex w-8/12 items-center justify-center">
          <Link to="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
              className={`mx-auto h-5 duration-300 ${
                changeNavbarColor || hoverNavbar || location.pathname != '/'
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
              className={`mx-auto h-4 cursor-pointer duration-300 ${
                changeNavbarColor || location.pathname != '/' || hoverNavbar
                  ? ''
                  : 'grayscale invert'
              }`}
            />
          </li>
          <li>
            <img
              alt=""
              src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png"
              className={`mx-auto h-4 cursor-pointer duration-300 ${
                changeNavbarColor || location.pathname != '/' || hoverNavbar
                  ? ''
                  : 'grayscale invert'
              }`}
            />
          </li>
        </ul>
        <ul className="hidden w-1/6 items-center justify-end gap-12 px-6 font-light md:flex lg:flex">
          <li className="capitalize">
            <Link to="/auth/login">account</Link>
          </li>
          <li className="capitalize hover:cursor-pointer">search</li>
          <li>
            <button className="capitalize" onClick={() => setShowCart(true)}>
              cart
            </button>
          </li>
        </ul>
      </nav>

      {showCart && (
        <Modal className="w-1/6" onClose={() => setShowCart(false)}>
          <CartContent />
        </Modal>
      )}
      {changeNavbarColor && <ScrollToTop />}
    </>
  );
}
export default Navbar;
