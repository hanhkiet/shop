import { Link } from 'react-router-dom';

export default function ManagerRightNavbar() {
  return (
    <ul className="hidden w-1/6 items-center justify-end gap-12 px-6 font-light duration-300 md:hidden lg:flex">
      <li className="capitalize">
        <Link to="account">account</Link>
      </li>
      <li className="navbar-list capitalize hover:cursor-pointer">
        <Link to="/">logout</Link>
      </li>
    </ul>
  );
}
