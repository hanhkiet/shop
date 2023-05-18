import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { setHoverMenuId } from '../app/menuSlice';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';
import ScrollToTop from './ScrollToTop';
import { setPathName } from '../app/pathSlice';

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
  return (
    <header
      onMouseLeave={() => {
        dispatch(setHoverMenuId(0));
      }}
    >
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-between px-6 text-sm font-light duration-300 ${
          changeNavbarColor ||
          location.pathname != '/' ||
          (hoverNavbar && !showModal)
            ? 'border-b border-gray-300 bg-white'
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
          changeColor={
            changeNavbarColor ||
            location.pathname != '/' ||
            (hoverNavbar && !showModal)
          }
          onClick={handleAppearModal}
          onClose={handleDisappearModal}
        />
        <div className="flex w-2/12 items-center justify-center">
          <Link to="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
              className={`mx-auto h-5 duration-300 ${
                changeNavbarColor ||
                (hoverNavbar && !showModal) ||
                location.pathname != '/'
                  ? ''
                  : 'brightness-200'
              }`}
              alt=""
            />
          </Link>
        </div>
        <NavbarRight
          changeColor={
            changeNavbarColor ||
            location.pathname != '/' ||
            (hoverNavbar && !showModal)
          }
          onClick={handleAppearModal}
          onClose={handleDisappearModal}
        />
      </nav>
      {changeNavbarColor && <ScrollToTop />}
    </header>
  );
}
export default Navbar;
