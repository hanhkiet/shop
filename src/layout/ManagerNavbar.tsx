import ManagerLeftNavbar from '../components/management/ManagerLeftNavbar';
import ManagerNavBarLogo from '../components/management/ManagerNavBarLogo';
import ManagerRightNavbar from '../components/management/ManagerRightNavbar';
import ScrollToTop from '../components/ScrollToTop';

function ManagerNavbar() {
  return (
    <>
      <header className="relative">
        <nav className="min-h-16 fixed top-0 left-0 right-0 z-40 flex justify-between px-6 text-sm font-light transition-colors duration-300">
          <ManagerLeftNavbar />
          <ManagerNavBarLogo />
          <ManagerRightNavbar />
        </nav>
      </header>
      <ScrollToTop />
    </>
  );
}

export default ManagerNavbar;
