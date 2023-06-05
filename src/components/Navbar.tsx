import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setHoverMenuId } from '../app/collectionSlice';
import { setPathName } from '../app/pathSlice';
import { RootState } from '../app/store';
import NavbarLeft from './NavbarLeft';
import NavbarLogo from './NavbarLogo';
import NavbarRight from './NavbarRight';
import ScrollToTop from './ScrollToTop';

function Navbar() {
  const hasSale = true;
  const [showSale, setShowSale] = useState(true);
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const dispatch = useDispatch();
  const pathName = useSelector((state: RootState) => state.path.pathName);
  const location = useLocation();
  if (pathName != location.pathname) {
    dispatch(setPathName(location.pathname));
    window.scrollTo(0, 0);
  }
  const handleAppearModal = () => {
    setShowModal(true);
    setHoverNavbar(false);
  };
  const handleDisappearModal = () => {
    setShowModal(false);
    setHoverNavbar(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setChangeNavbarColor(true);
      } else {
        setChangeNavbarColor(false);
      }
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowSale(scrollTop === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const checkNavbarFirst =
    location.pathname != '/' || (hoverNavbar && !showModal);
  const checkNavbar = changeNavbarColor || checkNavbarFirst;
  const checkOut = useRef<any>(null);
  const handleHeaderLeave = () => {
    checkOut.current = setTimeout(() => {
      dispatch(setHoverMenuId(-1));
    }, 300);
  };
  const handleHeaderEnter = () => {
    clearTimeout(checkOut.current);
  };
  return (
    <>
      {hasSale && (
        <div className="relative flex h-16 items-center justify-center bg-red-800 px-4 text-xs font-bold uppercase text-white">
          <span>END OF SEASON SALE - ENDS 5.31.23</span>
        </div>
      )}
      <header
        className="sticky top-0 left-0 right-0 z-40 h-0"
        onMouseEnter={handleHeaderEnter}
        onMouseLeave={handleHeaderLeave}
      >
        <nav
          className={`flex h-16 justify-between border-b-2 px-6 text-sm font-light transition-colors duration-300 ${
            checkNavbar
              ? 'border-gray-300 bg-white'
              : 'border-transparent bg-transparent'
          }`}
          onMouseOver={() => {
            setHoverNavbar(true);
          }}
          onMouseLeave={() => {
            setHoverNavbar(false);
          }}
        >
          <NavbarLeft
            changeColorFirst={checkNavbarFirst}
            changeColor={checkNavbar}
            saleAppear={hasSale && showSale}
            onClick={handleAppearModal}
            onClose={handleDisappearModal}
          />
          <NavbarLogo checkNavbar={checkNavbar} />
          <NavbarRight
            changeColor={checkNavbar}
            onClick={handleAppearModal}
            onClose={handleDisappearModal}
          />
        </nav>
      </header>
      <ScrollToTop />
    </>
  );
}
export default Navbar;
