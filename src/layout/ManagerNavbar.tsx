import ManagerLeftNavbar from '../components/ManagerLeftNavbar';
import ManagerRightNavbar from '../components/ManagerRightNavbar';
import NavbarLogo from '../components/NavbarLogo';
import ScrollToTop from '../components/ScrollToTop';

function ManagerNavbar() {
  return (
    <>
      <header className="relative">
        <nav className="min-h-16 fixed top-0 left-0 right-0 z-40 flex justify-between px-6 text-sm font-light transition-colors duration-300">
          <ManagerLeftNavbar />
          <NavbarLogo />
          <ManagerRightNavbar />
        </nav>
      </header>
      <ScrollToTop />
    </>
  );
}

export default ManagerNavbar;
