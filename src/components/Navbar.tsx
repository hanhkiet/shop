import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHoverMenuId } from '../app/menuSlice';
import ScrollToTop from './ScrollToTop';
import NavbarRight from './NavbarRight';
import NavbarLeft from './NavbarLeft';

function Navbar() {
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
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
        dispatch(setHoverMenuId(0));
      }}
    >
      <nav
        className={`top-0 left-0 right-0 z-40 flex justify-between px-6 py-6 text-sm font-light duration-300 ${
          changeNavbarColor || location.pathname != '/'
            ? 'bg-white text-neutral-600'
            : 'text-white'
        } ${
          location.pathname == '/' ? 'fixed' : 'sticky'
        } hover:bg-white hover:text-neutral-600`}
        onMouseOver={() => setHoverNavbar(true)}
        onMouseLeave={() => {
          setHoverNavbar(false);
        }}
      >
        <NavbarLeft
          changeColor={
            changeNavbarColor || location.pathname != '/' || hoverNavbar
          }
          onClick={() => setHoverNavbar(false)}
        />
        <div className="flex w-2/12 items-center justify-center">
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
        <NavbarRight
          changeColor={
            changeNavbarColor || location.pathname != '/' || hoverNavbar
          }
          onClick={() => setHoverNavbar(false)}
        />
      </nav>
      {changeNavbarColor && <ScrollToTop />}
    </header>
  );
}
export default Navbar;
