import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { setHoverMenuId } from '../app/menuSlice';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';
import ScrollToTop from './ScrollToTop';
import { setPathName } from '../app/pathSlice';
import NavbarLogo from './NavbarLogo';

function Navbar() {
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
      dispatch(setHoverMenuId(0));
    }, 300);
  };
  const handleHeaderEnter = () => {
    clearTimeout(checkOut.current);
  };
  return (
    <>
      <header
        className="relative"
        onMouseEnter={handleHeaderEnter}
        onMouseLeave={handleHeaderLeave}
      >
        <nav
          className={`min-h-16 fixed top-0 left-0 right-0 z-40 flex justify-between px-6 text-sm font-light transition-colors duration-300 ${
            checkNavbar
              ? 'border-b-2 border-gray-300 bg-white'
              : 'border-b-0 border-transparent bg-transparent'
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
