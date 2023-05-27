import NavbarLeftAdmin from './NavbarLeftAdmin';
import NavbarLogo from './NavbarLogo';
import NavbarRightAdmin from './NavbarRightAdmin';
import ScrollToTop from './ScrollToTop';

function ManagerNavbar() {
  return (
    <>
      <header className="relative">
        <nav
          className={`min-h-16 fixed top-0 left-0 right-0 z-40 flex justify-between px-6 text-sm font-light transition-colors duration-300 `}
        >
          <NavbarLeftAdmin />
          <NavbarLogo />
          <NavbarRightAdmin />
        </nav>
      </header>
      <ScrollToTop />
    </>
  );
}

export default ManagerNavbar;
